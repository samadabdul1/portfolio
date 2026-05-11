import admin from 'firebase-admin';

let initialized = false;

function initAdmin() {
  if (initialized) return;
  try {
    admin.initializeApp({
      projectId: 'portfolio-82845',
    });
  } catch (e) {
    // App already initialized
  }
  initialized = true;
}

export async function requireAuth(req, res, next) {
  initAdmin();
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing auth token' });
  }
  const token = header.split(' ')[1];
  try {
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export default admin;
