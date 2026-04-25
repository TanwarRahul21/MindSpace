/**
 * MindSpace 3D – AI Mental Wellness Platform
 * Main Server Entry Point
 *
 * This file initializes Express server, connects to MongoDB,
 * sets up middleware, and registers all API routes.
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Import route modules
const authRoutes = require('./routes/auth');
const moodRoutes = require('./routes/mood');
const journalRoutes = require('./routes/journal');
const productRoutes = require('./routes/products');
const chatRoutes = require('./routes/chat');
const paymentRoutes = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// ─── API Routes ──────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api', chatRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MindSpace 3D API is running 🧠✨' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ─── MongoDB Connection ──────────────────────────────────────
const DB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!DB_URI) {
  console.error('❌ ERROR: MONGODB_URI is not defined in your environment variables.');
  console.error('Please add MONGODB_URI to your .env file or Render environment variables.');
  process.exit(1);
}

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
};

mongoose
  .connect(DB_URI, mongooseOptions)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🧠 MindSpace 3D server running on port ${PORT}`);
      console.log(`📊 API available at /api`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });