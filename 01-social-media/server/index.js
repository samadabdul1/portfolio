const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok', project: 'Pulse — Social Media' }));

app.listen(PORT, () => console.log(`[Pulse API] running on http://localhost:${PORT}`));
