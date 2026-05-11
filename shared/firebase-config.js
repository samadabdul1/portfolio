// ============================================================
//  FIREBASE CONFIGURATION — shared across all 6 projects
// ============================================================

const firebaseConfig = {
  apiKey:            "AIzaSyCPlQcR9hk0i3JJGD8mokpLSlslSn3SHbQ",
  authDomain:        "portfolio-82845.firebaseapp.com",
  projectId:         "portfolio-82845",
  storageBucket:     "portfolio-82845.firebasestorage.app",
  messagingSenderId: "261330034495",
  appId:             "1:261330034495:web:b6cfc06e7ab60b39f9fd8a",
  measurementId:     "G-9B6K9SNZB7",
  databaseURL:       "https://portfolio-82845-default-rtdb.firebaseio.com"
};

// ============================================================
//  SERVICES TO ENABLE IN FIREBASE CONSOLE (console.firebase.google.com):
//
//  ✅ Authentication  → Sign-in methods → Email/Password ON, Google ON
//  ✅ Firestore       → Build > Firestore Database → Start in TEST mode
//  ✅ Storage         → Build > Storage → Start in TEST mode
//  ✅ Realtime DB     → Build > Realtime Database → Start in TEST mode
//
//  NOTE: databaseURL above uses the standard pattern for your project.
//  If it doesn't match, check: Firebase Console → Realtime Database → copy
//  the URL shown at the top of the data panel.
// ============================================================
