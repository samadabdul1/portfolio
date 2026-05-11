# Samad Abdul — Full-Stack Developer Portfolio

Six production-quality projects built with **React 18 + Vite**, **Node.js + Express**, and **Firebase**.

## Running a Project

Each project is self-contained with a `client/` (React + Vite) and `server/` (Express) folder.

```bash
# Example — run Social Media app:
cd 01-social-media
npm install          # installs concurrently at root
npm run dev          # starts client (port 5173) + server (port 3001) together
```

| # | Project | Client Port | Server Port |
|---|---------|-------------|-------------|
| 01 | Pulse — Social Media | 5173 | 3001 |
| 02 | Stay — E-commerce | 5174 | 3002 |
| 03 | Orbit — Admin Dashboard | 5175 | 3003 |
| 04 | Quill — CMS | 5176 | 3004 |
| 05 | Hire — Job Portal | 5177 | 3005 |
| 06 | Co — Collaboration | 5178 | 3006 |

## Firebase Setup

Config is pre-filled in each `client/src/firebase.js`. Enable these in the Firebase Console:
- Authentication → Email/Password + Google
- Firestore Database → Test mode
- Storage → Test mode
- Realtime Database → Test mode (project 06)

## Tech Stack

Frontend: React 18, Vite, Tailwind CSS, React Router v6, Firebase SDK v10
Backend: Node.js, Express, Firebase Admin SDK, cors, dotenv
Auth: Firebase Authentication (Email/Password + Google OAuth)
