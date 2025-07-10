// ===== SUPABASE INTEGRATION dla SezonoweDobro =====
// Dodaj te zmiany do swojego api/index.js

const { createClient } = require('@supabase/supabase-js');

// === SUPABASE CONFIGURATION ===
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// === MIDDLEWARE dla Supabase Auth ===
const authenticateSupabaseToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Supabase auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// === UPDATED ROUTES z Supabase ===

// Register with Supabase
app.post('/api/auth/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  body('displayName').isLength({ min: 2, max: 50 }).trim()
], handleValidationErrors, async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName
        }
      }
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ 
      message: 'Registration successful. Check your email for verification.',
      user: data.user 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login with Supabase
app.post('/api/auth/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], handleValidationErrors, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    res.json({ 
      success: true,
      user: data.user,
      profile: profile,
      session: data.session
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Log wellness practice
app.post('/api/wellness/practice', authenticateSupabaseToken, [
  body('type').isIn(['meditation', 'exercise', 'herbs', 'face-yoga']),
  body('duration').isInt({ min: 1, max: 180 }),
  body('notes').optional().isLength({ max: 500 }),
  body('mood_before').optional().isInt({ min: 1, max: 10 }),
  body('mood_after').optional().isInt({ min: 1, max: 10 })
], handleValidationErrors, async (req, res) => {
  try {
    const { type, duration, notes, mood_before, mood_after } = req.body;

    const { data, error } = await supabase
      .from('wellness_practices')
      .insert({
        user_id: req.user.id,
        practice_type: type,
        duration,
        notes,
        mood_before,
        mood_after
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({ 
      success: true, 
      practice: data,
      message: 'Practice logged successfully' 
    });
  } catch (error) {
    console.error('Practice logging error:', error);
    res.status(500).json({ error: 'Failed to log practice' });
  }
});

// Get user progress
app.get('/api/wellness/progress', authenticateSupabaseToken, async (req, res) => {
  try {
    // Get total practices count
    const { count: totalPractices } = await supabase
      .from('wellness_practices')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', req.user.id);

    // Get this week's practices
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { count: thisWeek } = await supabase
      .from('wellness_practices')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', req.user.id)
      .gte('created_at', oneWeekAgo.toISOString());

    // Get recent practices for streak calculation
    const { data: recentPractices } = await supabase
      .from('wellness_practices')
      .select('created_at')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(30);

    // Calculate current streak
    let currentStreak = 0;
    const today = new Date();
    const practicesByDay = {};

    recentPractices?.forEach(practice => {
      const practiceDate = new Date(practice.created_at).toDateString();
      practicesByDay[practiceDate] = true;
    });

    // Check consecutive days
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateString = checkDate.toDateString();
      
      if (practicesByDay[dateString]) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Get favorite practice type
    const { data: practiceTypes } = await supabase
      .from('wellness_practices')
      .select('practice_type')
      .eq('user_id', req.user.id);

    const typeCounts = {};
    practiceTypes?.forEach(p => {
      typeCounts[p.practice_type] = (typeCounts[p.practice_type] || 0) + 1;
    });

    const favoriteType = Object.keys(typeCounts).reduce((a, b) => 
      typeCounts[a] > typeCounts[b] ? a : b, 'meditation'
    );

    res.json({
      totalPractices: totalPractices || 0,
      thisWeek: thisWeek || 0,
      currentStreak,
      favoriteType,
      weeklyGoal: 10,
      achievements: currentStreak >= 7 ? ['7-day-streak'] : []
    });
  } catch (error) {
    console.error('Progress fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Save AI conversation
app.post('/api/ai/query', authenticateSupabaseToken, [
  body('message').isLength({ min: 1, max: 1000 }).trim(),
  body('context').optional().isObject()
], handleValidationErrors, async (req, res) => {
  try {
    const { message, context } = req.body;

    // Get user profile for subscription check
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('subscription_type')
      .eq('id', req.user.id)
      .single();

    // Check subscription for premium features
    if (profile?.subscription_type === 'free' && context?.premium) {
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
      max_tokens: profile?.subscription_type === 'premium' ? 1500 : 800,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    // Save conversation to Supabase
    await supabase
      .from('ai_conversations')
      .insert({
        user_id: req.user.id,
        user_message: message,
        ai_response: aiResponse,
        context: context || {},
        tokens_used: completion.usage.total_tokens
      });

    res.json({ 
      response: aiResponse,
      usage: completion.usage,
      subscription: profile?.subscription_type || 'free'
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

// Update subscription after Stripe payment
app.post('/api/payments/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        
        // Update user subscription in Supabase
        const { error } = await supabase
          .from('user_profiles')
          .update({
            subscription_type: 'premium',
            subscription_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            stripe_customer_id: session.customer
          })
          .eq('email', session.customer_email);

        if (error) {
          console.error('Failed to update subscription:', error);
        }

        // Save payment record
        await supabase
          .from('payment_history')
          .insert({
            user_id: (await supabase
              .from('user_profiles')
              .select('id')
              .eq('email', session.customer_email)
              .single()).data?.id,
            stripe_payment_intent_id: session.payment_intent,
            amount: session.amount_total,
            currency: session.currency,
            status: 'succeeded',
            subscription_type: session.metadata.subscription_type
          });

        console.log('✅ Payment successful and subscription updated');
        break;

      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        const subscription = event.data.object;
        
        await supabase
          .from('user_profiles')
          .update({
            subscription_type: 'free',
            subscription_expires_at: null
          })
          .eq('stripe_customer_id', subscription.customer);

        console.log('❌ Subscription cancelled');
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

module.exports = { supabase }; // Export for use in other files 