// SezonoweDobro Backend API
// Future: Node.js + Express + PostgreSQL

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes

// Authentication
app.post('/api/auth/login', (req, res) => {
  // TODO: JWT authentication
  res.json({ message: 'Login endpoint - TODO' });
});

app.post('/api/auth/register', (req, res) => {
  // TODO: User registration
  res.json({ message: 'Register endpoint - TODO' });
});

// AI Assistant
app.post('/api/ai/query', (req, res) => {
  // TODO: OpenAI integration
  res.json({ message: 'AI query endpoint - TODO' });
});

// Wellness tracking
app.post('/api/wellness/practice', (req, res) => {
  // TODO: Save practice data
  res.json({ message: 'Practice tracking - TODO' });
});

app.get('/api/wellness/progress', (req, res) => {
  // TODO: Get user progress
  res.json({ message: 'Progress endpoint - TODO' });
});

// Payments
app.post('/api/payments/stripe-webhook', (req, res) => {
  // TODO: Stripe webhook handling
  res.json({ message: 'Stripe webhook - TODO' });
});

// Notifications
app.post('/api/notifications/send', (req, res) => {
  // TODO: Push notifications
  res.json({ message: 'Notifications - TODO' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    version: '1.0.0',
    timestamp: new Date().toISOString() 
  });
});

// Serve static files (fallback to frontend)
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`🌿 SezonoweDobro API running on port ${PORT}`);
});

module.exports = app; 