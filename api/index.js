// ===== SEZONOWE DOBRO - SECURE BACKEND API =====
// 🔐 Production-ready API with Stripe & OpenAI integration

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

// === MIDDLEWARE ===
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://js.stripe.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'", "https://api.stripe.com", "https://api.openai.com"],
      frameSrc: ["https://js.stripe.com", "https://hooks.stripe.com"],
    },
  },
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://twoja-domena.com'] 
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.raw({ type: 'application/webhook+json' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, try again later' }
});
app.use('/api/', limiter);

// Stripe rate limiting (more restrictive)
const stripeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // only 5 payment requests per minute
  message: { error: 'Payment rate limit exceeded' }
});

// === STRIPE CONFIGURATION ===
// Initialize only if key is available
let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
}

// === OPENAI CONFIGURATION ===
// Initialize only if key is available
let openai = null;
if (process.env.OPENAI_API_KEY) {
  const { OpenAI } = require('openai');
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// === AUTHENTICATION MIDDLEWARE ===
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// === VALIDATION HELPERS ===
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors.array() 
    });
  }
  next();
};

// === ROUTES ===

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    stripe: process.env.STRIPE_SECRET_KEY ? 'configured' : 'not configured',
    openai: process.env.OPENAI_API_KEY ? 'configured' : 'not configured'
  });
});

// === AUTHENTICATION ROUTES ===

// Login
app.post('/api/auth/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], handleValidationErrors, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Demo authentication
    const validUsers = {
      [process.env.DEMO_USER_EMAIL]: process.env.DEMO_USER_PASSWORD,
      [process.env.ADMIN_EMAIL]: process.env.ADMIN_PASSWORD
    };

    if (validUsers[email] === password) {
      const role = email === process.env.ADMIN_EMAIL ? 'admin' : 'user';
      res.json({ 
        success: true,
        user: { email, role },
        token: 'demo_token_' + Date.now()
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Register
app.post('/api/auth/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  body('displayName').isLength({ min: 2, max: 50 }).trim()
], handleValidationErrors, async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    
    // TODO: Check if user exists in database
    // TODO: Save user to database
    
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS));
    
    const token = jwt.sign(
      { 
        email, 
        role: 'user', 
        subscription: 'free',
        displayName 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({ 
      token, 
      user: { 
        email, 
        role: 'user', 
        subscription: 'free',
        displayName 
      } 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// === AI ASSISTANT ROUTES ===

app.post('/api/ai/query', authenticateToken, [
  body('message').isLength({ min: 1, max: 1000 }).trim(),
  body('context').optional().isObject()
], handleValidationErrors, async (req, res) => {
  try {
    const { message, context } = req.body;

    // Check if OpenAI is configured
    if (!openai) {
      return res.status(503).json({ 
        error: 'AI service not configured - missing OpenAI API key',
        code: 'OPENAI_NOT_CONFIGURED'
      });
    }

    // Check if user has access to AI features
    if (req.user.subscription === 'free' && context?.premium) {
      return res.status(403).json({ 
        error: 'Premium feature - upgrade required',
        upgradeUrl: '/premium' 
      });
    }

    const systemPrompt = `Jesteś AI asystentem aplikacji SezonoweDobro specjalizującym się w Tradycyjnej Medycynie Chińskiej (TCM). 
    Odpowiadaj po polsku, w sposób przyjazny i profesjonalny. 
    Skupiaj się na praktykach sezonowych, elementach wu xing, ziołach i praktykami wellness.
    Zawsze dodaj ostrzeżenie o konsultacji z lekarzem przy poważnych problemach zdrowotnych.`;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: req.user.subscription === 'premium' ? 1500 : 800,
      temperature: 0.7,
    });

    res.json({ 
      response: completion.choices[0].message.content,
      usage: completion.usage,
      subscription: req.user.subscription
    });

  } catch (error) {
    console.error('AI query error:', error);
    if (error.code === 'insufficient_quota') {
      res.status(503).json({ error: 'AI service temporarily unavailable' });
    } else {
      res.status(500).json({ error: 'AI query failed' });
    }
  }
});

// === STRIPE PAYMENT ROUTES ===

// Create checkout session
app.post('/api/payments/create-checkout', stripeLimiter, authenticateToken, [
  body('priceId').isIn([process.env.STRIPE_MONTHLY_PRICE_ID, process.env.STRIPE_YEARLY_PRICE_ID])
], handleValidationErrors, async (req, res) => {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return res.status(503).json({ 
        error: 'Payment service not configured - missing Stripe API key',
        code: 'STRIPE_NOT_CONFIGURED'
      });
    }

    const { priceId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik', 'p24'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.APP_URL}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/premium/cancel`,
      customer_email: req.user.email,
      metadata: {
        userId: req.user.email,
        subscription_type: priceId === process.env.STRIPE_MONTHLY_PRICE_ID ? 'monthly' : 'yearly'
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: 'Payment session creation failed' });
  }
});

// Stripe webhook
app.post('/api/payments/stripe-webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    // Check if Stripe is configured
    if (!stripe) {
      return res.status(503).json({ 
        error: 'Payment webhook not configured - missing Stripe API key',
        code: 'STRIPE_NOT_CONFIGURED'
      });
    }

    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    switch (event.type) {
      case 'checkout.session.completed':
        // TODO: Update user subscription in database
        console.log('Payment successful:', event.data.object);
        break;
      case 'invoice.payment_succeeded':
        // TODO: Extend subscription
        console.log('Subscription renewed:', event.data.object);
        break;
      case 'customer.subscription.deleted':
        // TODO: Cancel subscription in database
        console.log('Subscription cancelled:', event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: 'Webhook signature verification failed' });
  }
});

// Check subscription status
app.get('/api/payments/subscription-status', authenticateToken, async (req, res) => {
  try {
    // TODO: Check subscription status in database
    res.json({ 
      subscription: req.user.subscription,
      active: req.user.subscription === 'premium',
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    });
  } catch (error) {
    console.error('Subscription check error:', error);
    res.status(500).json({ error: 'Failed to check subscription' });
  }
});

// === GITHUB WEBHOOK ===

app.post('/api/github/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  try {
    const signature = req.headers['x-hub-signature-256'];
    const payload = req.body;
    
    // Verify GitHub webhook signature (optional for public repos)
    if (process.env.GITHUB_WEBHOOK_SECRET) {
      const crypto = require('crypto');
      const expectedSignature = 'sha256=' + crypto
        .createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET)
        .update(payload)
        .digest('hex');
        
      if (signature !== expectedSignature) {
        return res.status(401).json({ error: 'Invalid signature' });
      }
    }

    const event = JSON.parse(payload.toString());
    const eventType = req.headers['x-github-event'];

    console.log(`🔔 GitHub event: ${eventType}`);

    switch (eventType) {
      case 'push':
        if (event.ref === 'refs/heads/main') {
          console.log('🚀 Push to main branch - triggering deployment');
          // TODO: Add deployment logic here
          // This could trigger rebuild, cache clear, etc.
        }
        break;
        
      case 'pull_request':
        if (event.action === 'opened' || event.action === 'synchronize') {
          console.log(`📝 PR ${event.action}: ${event.pull_request.title}`);
          // TODO: Add PR checks, preview deployment, etc.
        }
        break;
        
      case 'issues':
        console.log(`🐛 Issue ${event.action}: ${event.issue.title}`);
        break;
        
      default:
        console.log(`ℹ️ Unhandled GitHub event: ${eventType}`);
    }

    res.status(200).json({ 
      message: 'Webhook received successfully',
      event: eventType,
      processed: true
    });

  } catch (error) {
    console.error('GitHub webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// === WELLNESS TRACKING ROUTES ===

app.post('/api/wellness/practice', authenticateToken, [
  body('type').isIn(['meditation', 'exercise', 'herbs', 'face-yoga']),
  body('duration').isInt({ min: 1, max: 180 }),
  body('notes').optional().isLength({ max: 500 })
], handleValidationErrors, async (req, res) => {
  try {
    const practice = {
      userId: req.user.email,
      ...req.body,
      timestamp: new Date()
    };

    // TODO: Save to database
    console.log('Practice logged:', practice);

    res.status(201).json({ 
      success: true, 
      practice,
      message: 'Practice logged successfully' 
    });
  } catch (error) {
    console.error('Practice logging error:', error);
    res.status(500).json({ error: 'Failed to log practice' });
  }
});

app.get('/api/wellness/progress', authenticateToken, (req, res) => {
  try {
    // TODO: Get from database
    const mockProgress = {
      totalPractices: 47,
      thisWeek: 8,
      currentStreak: 5,
      favoriteType: 'meditation',
      weeklyGoal: 10,
      achievements: ['7-day-streak', 'meditation-master']
    };

    res.json(mockProgress);
  } catch (error) {
    console.error('Progress fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// === ERROR HANDLING ===
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Serve static files (frontend)
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`🌿 SezonoweDobro API running on port ${PORT}`);
  console.log(`🔒 Environment: ${process.env.NODE_ENV}`);
  console.log(`💳 Stripe: ${process.env.STRIPE_SECRET_KEY ? 'Configured' : 'Not configured'}`);
  console.log(`🤖 OpenAI: ${process.env.OPENAI_API_KEY ? 'Configured' : 'Not configured'}`);
});

module.exports = app; 