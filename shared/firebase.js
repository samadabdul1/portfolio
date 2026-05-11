// ─── Firebase (Modular SDK v10) ───────────────────────────────────────────────
// This file is copied into each project's client/src/firebase.js
// Update the config values below once — all projects share the same Firebase project.

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey:            "AIzaSyCPlQcR9hk0i3JJGD8mokpLSlslSn3SHbQ",
  authDomain:        "portfolio-82845.firebaseapp.com",
  projectId:         "portfolio-82845",
  storageBucket:     "portfolio-82845.firebasestorage.app",
  messagingSenderId: "261330034495",
  appId:             "1:261330034495:web:b6cfc06e7ab60b39f9fd8a",
  measurementId:     "G-9B6K9SNZB7",
  databaseURL:       "https://portfolio-82845-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

export const auth     = getAuth(app);
export const db       = getFirestore(app);
export const storage  = getStorage(app);
export const rtdb     = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
