import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import listingsRouter from './routes/listings.js';
import bookingsRouter from './routes/bookings.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors({ origin: 'http://localhost:5174' }));
app.use(express.json());

app.use('/api/listings', listingsRouter);
app.use('/api/bookings', bookingsRouter);

app.get('/api/health', (_, res) => res.json({ ok: true, project: 'Stay (e-commerce)' }));

app.listen(PORT, () => console.log(`Stay API running on http://localhost:${PORT}`));
