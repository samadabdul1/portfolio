import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jobsRouter from './routes/jobs.js';
import applicationsRouter from './routes/applications.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors({ origin: 'http://localhost:5177' }));
app.use(express.json());

app.use('/api/jobs', jobsRouter);
app.use('/api/applications', applicationsRouter);

app.get('/api/health', (_, res) => res.json({ ok: true, project: 'Hire (job portal)' }));

app.listen(PORT, () => console.log(`Hire API running on http://localhost:${PORT}`));
