-- ===== SUPABASE DATABASE SCHEMA dla SezonoweDobro =====
-- Uruchom te komendy w Supabase SQL Editor

-- 👤 USERS TABLE (extend Supabase auth.users)
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  subscription_type TEXT DEFAULT 'free' CHECK (subscription_type IN ('free', 'premium')),
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 🌿 WELLNESS PRACTICES TABLE
CREATE TABLE public.wellness_practices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  practice_type TEXT NOT NULL CHECK (practice_type IN ('meditation', 'exercise', 'herbs', 'face-yoga')),
  duration INTEGER NOT NULL, -- minutes
  notes TEXT,
  mood_before INTEGER CHECK (mood_before >= 1 AND mood_before <= 10),
  mood_after INTEGER CHECK (mood_after >= 1 AND mood_after <= 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 💳 PAYMENT HISTORY TABLE
CREATE TABLE public.payment_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT UNIQUE,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'PLN',
  status TEXT NOT NULL CHECK (status IN ('pending', 'succeeded', 'failed', 'canceled')),
  subscription_type TEXT CHECK (subscription_type IN ('monthly', 'yearly')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 🤖 AI CONVERSATIONS TABLE
CREATE TABLE public.ai_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  context JSONB, -- store conversation context
  tokens_used INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 📊 WELLNESS GOALS TABLE
CREATE TABLE public.wellness_goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  goal_type TEXT NOT NULL CHECK (goal_type IN ('daily_meditation', 'weekly_exercise', 'monthly_herbs')),
  target_value INTEGER NOT NULL, -- target number (minutes, times, etc.)
  current_value INTEGER DEFAULT 0,
  target_date DATE,
  is_achieved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===== INDEXES dla performance =====
CREATE INDEX idx_wellness_practices_user_id ON public.wellness_practices(user_id);
CREATE INDEX idx_wellness_practices_created_at ON public.wellness_practices(created_at);
CREATE INDEX idx_payment_history_user_id ON public.payment_history(user_id);
CREATE INDEX idx_ai_conversations_user_id ON public.ai_conversations(user_id);
CREATE INDEX idx_wellness_goals_user_id ON public.wellness_goals(user_id);

-- ===== ROW LEVEL SECURITY (RLS) =====
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_practices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_goals ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own practices" ON public.wellness_practices
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own payments" ON public.payment_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own conversations" ON public.ai_conversations
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own goals" ON public.wellness_goals
  FOR ALL USING (auth.uid() = user_id);

-- ===== FUNCTIONS =====

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for auto-updating timestamps
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wellness_goals_updated_at
  BEFORE UPDATE ON public.wellness_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, display_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'display_name');
  RETURN new;
END;
$$ language plpgsql security definer;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ===== SAMPLE DATA (optional) =====
-- INSERT INTO public.user_profiles (id, email, display_name, subscription_type)
-- VALUES 
--   ('550e8400-e29b-41d4-a716-446655440000', 'demo@sezonoweDobro.pl', 'Demo User', 'free'),
--   ('550e8400-e29b-41d4-a716-446655440001', 'admin@sezonoweDobro.pl', 'Admin', 'premium');

-- ===== COMPLETED! =====
-- 🎉 Supabase database is ready!
-- Next steps:
-- 1. Go to Supabase Dashboard > Authentication > Settings
-- 2. Enable email auth + Google/Facebook if needed  
-- 3. Copy SUPABASE_URL and SUPABASE_ANON_KEY
-- 4. Add to GitHub Secrets
-- 5. Update backend to connect to Supabase 