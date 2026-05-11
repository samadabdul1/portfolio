import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import postsRouter from './routes/posts.js';
import mediaRouter from './routes/media.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors({ origin: 'http://localhost:5176' }));
app.use(express.json());

app.use('/api/posts', postsRouter);
app.use('/api/media', mediaRouter);

app.get('/api/health', (_, res) => res.json({ ok: true, project: 'Quill (CMS)' }));

app.listen(PORT, () => console.log(`Quill API running on http://localhost:${PORT}`));
