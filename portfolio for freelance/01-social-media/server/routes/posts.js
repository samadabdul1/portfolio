const express  = require('express');
const admin    = require('firebase-admin');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/posts — latest 20 posts
router.get('/', async (req, res) => {
  try {
    const snap = await admin.firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get();
    const posts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(posts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/posts — create a post (auth required)
router.post('/', requireAuth, async (req, res) => {
  const { caption, imageUrl } = req.body;
  try {
    const ref = await admin.firestore().collection('posts').add({
      authorId:    req.user.uid,
      authorName:  req.user.name || req.user.email,
      caption:     caption || '',
      imageUrl:    imageUrl || '',
      likes:       0,
      commentsCount: 0,
      createdAt:   admin.firestore.FieldValue.serverTimestamp(),
    });
    res.json({ id: ref.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/posts/:id — delete own post
router.delete('/:id', requireAuth, async (req, res) => {
  const postRef = admin.firestore().collection('posts').doc(req.params.id);
  const snap    = await postRef.get();
  if (!snap.exists) return res.status(404).json({ error: 'Not found' });
  if (snap.data().authorId !== req.user.uid) return res.status(403).json({ error: 'Forbidden' });
  await postRef.delete();
  res.json({ success: true });
});

// POST /api/posts/:id/like — toggle like (auth required)
router.post('/:id/like', requireAuth, async (req, res) => {
  const db      = admin.firestore();
  const postRef = db.collection('posts').doc(req.params.id);
  const likeRef = db.collection('posts').doc(req.params.id).collection('likes').doc(req.user.uid);
  const likeSnap = await likeRef.get();

  if (likeSnap.exists) {
    await likeRef.delete();
    await postRef.update({ likes: admin.firestore.FieldValue.increment(-1) });
    res.json({ liked: false });
  } else {
    await likeRef.set({ uid: req.user.uid, ts: admin.firestore.FieldValue.serverTimestamp() });
    await postRef.update({ likes: admin.firestore.FieldValue.increment(1) });
    res.json({ liked: true });
  }
});

// GET /api/posts/:id/comments
router.get('/:id/comments', async (req, res) => {
  const snap = await admin.firestore()
    .collection('posts').doc(req.params.id).collection('comments')
    .orderBy('createdAt', 'desc').limit(20).get();
  res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
});

// POST /api/posts/:id/comments
router.post('/:id/comments', requireAuth, async (req, res) => {
  const { text } = req.body;
  if (!text?.trim()) return res.status(400).json({ error: 'Comment text required' });
  const ref = await admin.firestore()
    .collection('posts').doc(req.params.id).collection('comments').add({
      text,
      authorId:   req.user.uid,
      authorName: req.user.name || req.user.email,
      createdAt:  admin.firestore.FieldValue.serverTimestamp(),
    });
  await admin.firestore().collection('posts').doc(req.params.id)
    .update({ commentsCount: admin.firestore.FieldValue.increment(1) });
  res.json({ id: ref.id });
});

module.exports = router;
