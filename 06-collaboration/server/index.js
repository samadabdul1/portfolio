import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import docsRouter from './routes/docs.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3006;

app.use(cors({ origin: 'http://localhost:5178' }));
app.use(express.json());

app.use('/api/docs', docsRouter);

app.get('/api/health', (_, res) => res.json({ ok: true, project: 'Co (collaboration)' }));

app.listen(PORT, () => console.log(`Co API running on http://localhost:${PORT}`));
