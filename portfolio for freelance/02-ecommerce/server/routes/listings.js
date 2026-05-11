import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import admin from 'firebase-admin';

const router = Router();

function getDb() {
  return admin.firestore();
}

// GET /api/listings — fetch all listings
router.get('/', async (req, res) => {
  try {
    const snap = await getDb().collection('listings').orderBy('createdAt', 'desc').get();
    const listings = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/listings/:id — single listing
router.get('/:id', async (req, res) => {
  try {
    const docRef = getDb().collection('listings').doc(req.params.id);
    const snap = await docRef.get();
    if (!snap.exists) return res.status(404).json({ error: 'Not found' });
    res.json({ id: snap.id, ...snap.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/listings — create listing (auth required)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, location, price, category, image, description } = req.body;
    if (!title || !location || !price || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const docRef = await getDb().collection('listings').add({
      title, location, price: Number(price), category,
      image: image || '',
      description: description || '',
      rating: 0,
      reviews: 0,
      hostId: req.user.uid,
      hostName: req.user.name || 'Host',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/listings/:id — remove listing (auth required, own listing)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const docRef = getDb().collection('listings').doc(req.params.id);
    const snap = await docRef.get();
    if (!snap.exists) return res.status(404).json({ error: 'Not found' });
    if (snap.data().hostId !== req.user.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await docRef.delete();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
