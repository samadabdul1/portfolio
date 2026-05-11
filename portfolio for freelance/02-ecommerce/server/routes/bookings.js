import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import admin from 'firebase-admin';

const router = Router();

function getDb() {
  return admin.firestore();
}

// POST /api/bookings — create a booking
router.post('/', requireAuth, async (req, res) => {
  try {
    const { listingId, checkIn, checkOut, guests, totalPrice } = req.body;
    if (!listingId || !checkIn || !checkOut) {
      return res.status(400).json({ error: 'listingId, checkIn and checkOut are required' });
    }

    // Verify listing exists
    const listingSnap = await getDb().collection('listings').doc(listingId).get();
    if (!listingSnap.exists) return res.status(404).json({ error: 'Listing not found' });

    const booking = {
      listingId,
      listingTitle: listingSnap.data().title,
      listingImage: listingSnap.data().image || '',
      userId: req.user.uid,
      userEmail: req.user.email,
      checkIn,
      checkOut,
      guests: guests || 1,
      totalPrice: totalPrice || 0,
      status: 'confirmed',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await getDb().collection('bookings').add(booking);
    res.status(201).json({ id: docRef.id, ...booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bookings/my — current user's bookings
router.get('/my', requireAuth, async (req, res) => {
  try {
    const snap = await getDb()
      .collection('bookings')
      .where('userId', '==', req.user.uid)
      .orderBy('createdAt', 'desc')
      .get();
    const bookings = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/bookings/:id — cancel a booking
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const docRef = getDb().collection('bookings').doc(req.params.id);
    const snap = await docRef.get();
    if (!snap.exists) return res.status(404).json({ error: 'Booking not found' });
    if (snap.data().userId !== req.user.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await docRef.update({ status: 'cancelled' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
