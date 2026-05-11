import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import admin from 'firebase-admin';

const router = Router();
const getDb = () => admin.firestore();

router.get('/', async (req, res) => {
  try {
    const snap = await getDb().collection('jobListings').orderBy('postedAt', 'desc').get();
    res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const snap = await getDb().collection('jobListings').doc(req.params.id).get();
    if (!snap.exists) return res.status(404).json({ error: 'Not found' });
    res.json({ id: snap.id, ...snap.data() });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, company, location, type, salary, tags, description } = req.body;
    if (!title || !company) return res.status(400).json({ error: 'title and company required' });
    const ref = await getDb().collection('jobListings').add({
      title, company, location, type, salary,
      tags: Array.isArray(tags) ? tags : (tags || '').split(',').map(t => t.trim()).filter(Boolean),
      description, applicants: 0,
      postedBy: req.user.uid,
      postedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ id: ref.id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const snap = await getDb().collection('jobListings').doc(req.params.id).get();
    if (!snap.exists) return res.status(404).json({ error: 'Not found' });
    if (snap.data().postedBy !== req.user.uid) return res.status(403).json({ error: 'Forbidden' });
    await getDb().collection('jobListings').doc(req.params.id).delete();
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
