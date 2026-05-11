const express = require('express');
const admin   = require('firebase-admin');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/users/:uid — public profile
router.get('/:uid', async (req, res) => {
  const snap = await admin.firestore().collection('users').doc(req.params.uid).get();
  if (!snap.exists) return res.status(404).json({ error: 'User not found' });
  res.json({ id: snap.id, ...snap.data() });
});

// POST /api/users/:uid/follow — follow/unfollow a user
router.post('/:uid/follow', requireAuth, async (req, res) => {
  const db        = admin.firestore();
  const followRef = db.collection('follows').doc(`${req.user.uid}_${req.params.uid}`);
  const snap      = await followRef.get();

  if (snap.exists) {
    await followRef.delete();
    await db.collection('users').doc(req.user.uid).update({ following: admin.firestore.FieldValue.increment(-1) });
    await db.collection('users').doc(req.params.uid).update({ followers: admin.firestore.FieldValue.increment(-1) });
    res.json({ following: false });
  } else {
    await followRef.set({
      followerId:  req.user.uid,
      followingId: req.params.uid,
      createdAt:   admin.firestore.FieldValue.serverTimestamp(),
    });
    await db.collection('users').doc(req.user.uid).update({ following: admin.firestore.FieldValue.increment(1) });
    await db.collection('users').doc(req.params.uid).update({ followers: admin.firestore.FieldValue.increment(1) });
    res.json({ following: true });
  }
});

module.exports = router;
