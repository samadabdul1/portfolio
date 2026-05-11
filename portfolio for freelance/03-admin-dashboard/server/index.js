import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import analyticsRouter from './routes/analytics.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors({ origin: 'http://localhost:5175' }));
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/analytics', analyticsRouter);

app.get('/api/health', (_, res) => res.json({ ok: true, project: 'Orbit (admin dashboard)' }));

app.listen(PORT, () => console.log(`Orbit API running on http://localhost:${PORT}`));
