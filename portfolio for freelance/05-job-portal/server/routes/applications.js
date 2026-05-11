import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import admin from 'firebase-admin';

const router = Router();
const getDb = () => admin.firestore();

router.post('/', requireAuth, async (req, res) => {
  try {
    const { jobId, cover, linkedin } = req.body;
    if (!jobId) return res.status(400).json({ error: 'jobId required' });
    const jobSnap = await getDb().collection('jobListings').doc(jobId).get();
    if (!jobSnap.exists) return res.status(404).json({ error: 'Job not found' });

    const ref = await getDb().collection('jobApplications').add({
      jobId, jobTitle: jobSnap.data().title, company: jobSnap.data().company,
      applicantId: req.user.uid, email: req.user.email,
      name: req.user.name || req.user.email, cover, linkedin,
      status: 'pending',
      appliedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    await getDb().collection('jobListings').doc(jobId).update({
      applicants: admin.firestore.FieldValue.increment(1),
    });
    res.status(201).json({ id: ref.id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/my', requireAuth, async (req, res) => {
  try {
    const snap = await getDb().collection('jobApplications')
      .where('applicantId', '==', req.user.uid)
      .orderBy('appliedAt', 'desc').get();
    res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
