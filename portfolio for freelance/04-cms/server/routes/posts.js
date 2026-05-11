import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import admin from 'firebase-admin';

const router = Router();
const getDb = () => admin.firestore();

router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let q = getDb().collection('cmsPostsMeta').orderBy('createdAt', 'desc');
    if (status) q = getDb().collection('cmsPostsMeta').where('status', '==', status).orderBy('createdAt', 'desc');
    const snap = await q.get();
    res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const snap = await getDb().collection('cmsPostsMeta').doc(req.params.id).get();
    if (!snap.exists) return res.status(404).json({ error: 'Not found' });
    res.json({ id: snap.id, ...snap.data() });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, body, excerpt, category, tags, status } = req.body;
    if (!title) return res.status(400).json({ error: 'Title required' });
    const docRef = await getDb().collection('cmsPostsMeta').add({
      title, body, excerpt, category, status: status || 'draft',
      tags: tags || [],
      slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 60),
      authorId: req.user.uid,
      authorName: req.user.name || 'Author',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ id: docRef.id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.patch('/:id', requireAuth, async (req, res) => {
  try {
    await getDb().collection('cmsPostsMeta').doc(req.params.id).update({
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const snap = await getDb().collection('cmsPostsMeta').doc(req.params.id).get();
    if (!snap.exists) return res.status(404).json({ error: 'Not found' });
    if (snap.data().authorId !== req.user.uid) return res.status(403).json({ error: 'Forbidden' });
    await getDb().collection('cmsPostsMeta').doc(req.params.id).delete();
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
