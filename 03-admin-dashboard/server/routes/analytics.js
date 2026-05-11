import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import admin from 'firebase-admin';

const router = Router();
const getDb = () => admin.firestore();

// GET /api/analytics/summary — high-level KPIs
router.get('/summary', requireAuth, async (req, res) => {
  try {
    const usersSnap = await getDb().collection('adminUsers').get();
    const activeSnap = await getDb().collection('adminUsers').where('status', '==', 'Active').get();
    res.json({
      totalUsers: usersSnap.size,
      activeUsers: activeSnap.size,
      revenue: 94210,
      bouncRate: 24.6,
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/analytics/activity — recent activity log
router.get('/activity', requireAuth, async (req, res) => {
  try {
    const snap = await getDb().collection('adminActivity').orderBy('createdAt', 'desc').limit(20).get();
    res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
