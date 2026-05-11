import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import admin from 'firebase-admin';

const router = Router();
const getDb = () => admin.firestore();

// GET /api/users — list all users
router.get('/', requireAuth, async (req, res) => {
  try {
    const snap = await getDb().collection('adminUsers').get();
    res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/users/:uid
router.get('/:uid', requireAuth, async (req, res) => {
  try {
    const snap = await getDb().collection('adminUsers').doc(req.params.uid).get();
    if (!snap.exists) return res.status(404).json({ error: 'Not found' });
    res.json({ id: snap.id, ...snap.data() });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PATCH /api/users/:uid — update role/status
router.patch('/:uid', requireAuth, async (req, res) => {
  try {
    const { role, status } = req.body;
    await getDb().collection('adminUsers').doc(req.params.uid).update({ role, status });
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/users/:uid
router.delete('/:uid', requireAuth, async (req, res) => {
  try {
    await getDb().collection('adminUsers').doc(req.params.uid).delete();
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
