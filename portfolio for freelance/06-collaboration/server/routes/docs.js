import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import admin from 'firebase-admin';

const router = Router();
const getDb = () => admin.firestore();

// GET /api/docs — list user's documents
router.get('/', requireAuth, async (req, res) => {
  try {
    const snap = await getDb().collection('collab_docs')
      .where('ownerId', '==', req.user.uid)
      .orderBy('updatedAt', 'desc').get();
    res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/docs — create a new document
router.post('/', requireAuth, async (req, res) => {
  try {
    const ref = await getDb().collection('collab_docs').add({
      title: req.body.title || 'Untitled document',
      content: '',
      ownerId: req.user.uid,
      ownerName: req.user.name || req.user.email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ id: ref.id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PATCH /api/docs/:id — update content/title
router.patch('/:id', requireAuth, async (req, res) => {
  try {
    const snap = await getDb().collection('collab_docs').doc(req.params.id).get();
    if (!snap.exists) return res.status(404).json({ error: 'Not found' });
    if (snap.data().ownerId !== req.user.uid) return res.status(403).json({ error: 'Forbidden' });
    await getDb().collection('collab_docs').doc(req.params.id).update({
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/docs/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const snap = await getDb().collection('collab_docs').doc(req.params.id).get();
    if (!snap.exists) return res.status(404).json({ error: 'Not found' });
    if (snap.data().ownerId !== req.user.uid) return res.status(403).json({ error: 'Forbidden' });
    await getDb().collection('collab_docs').doc(req.params.id).delete();
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/docs/:id/comments
router.get('/:id/comments', requireAuth, async (req, res) => {
  try {
    const snap = await getDb().collection('collab_docs').doc(req.params.id).collection('comments')
      .orderBy('createdAt', 'asc').get();
    res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/docs/:id/comments
router.post('/:id/comments', requireAuth, async (req, res) => {
  try {
    const ref = await getDb().collection('collab_docs').doc(req.params.id).collection('comments').add({
      text: req.body.text,
      authorId: req.user.uid,
      authorName: req.user.name || req.user.email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ id: ref.id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
