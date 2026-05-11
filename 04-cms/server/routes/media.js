import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import admin from 'firebase-admin';

const router = Router();

// GET /api/media — list files in storage bucket folder
router.get('/', requireAuth, async (req, res) => {
  try {
    const bucket = admin.storage().bucket();
    const prefix = `cms-media/${req.user.uid}/`;
    const [files] = await bucket.getFiles({ prefix });
    const list = await Promise.all(files.map(async f => {
      const [url] = await f.getSignedUrl({ action: 'read', expires: Date.now() + 60 * 60 * 1000 });
      return { name: f.name.split('/').pop(), fullPath: f.name, url };
    }));
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/media — delete a file
router.delete('/', requireAuth, async (req, res) => {
  try {
    const { fullPath } = req.body;
    if (!fullPath) return res.status(400).json({ error: 'fullPath required' });
    if (!fullPath.startsWith(`cms-media/${req.user.uid}/`)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await admin.storage().bucket().file(fullPath).delete();
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
