-- HomeKeeper Database Schema
-- Run this in Supabase SQL Editor to set up all tables

-- =====================================================
-- 1. PROFILES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  city TEXT,
  total_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  badges JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- 2. ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  brand TEXT,
  model TEXT,
  serial_number TEXT,
  purchase_date DATE,
  purchase_price NUMERIC(10, 2),
  purchase_location TEXT,
  warranty_expiration DATE,
  warranty_duration_months INTEGER,
  condition TEXT,
  location TEXT,
  notes TEXT,
  photo_url TEXT,
  receipt_url TEXT,
  manual_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- 3. MAINTENANCE TASKS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.maintenance_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  item_id UUID REFERENCES public.items(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  due_date DATE,
  completed BOOLEAN DEFAULT FALSE,
  completed_date TIMESTAMP WITH TIME ZONE,
  recurring BOOLEAN DEFAULT FALSE,
  recurring_interval TEXT, -- 'weekly', 'monthly', 'quarterly', 'yearly'
  priority TEXT, -- 'low', 'medium', 'high', 'urgent'
  cost NUMERIC(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- 4. WEBHOOK CONFIGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.webhook_configs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  webhook_url TEXT NOT NULL,
  events TEXT[] DEFAULT ARRAY[]::TEXT[],
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- 5. ACTIVITIES TABLE (for gamification)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL, -- 'item_added', 'task_completed', 'warranty_checked', etc.
  points INTEGER DEFAULT 0,
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- 6. CHALLENGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- 'weekly', 'monthly', 'special'
  goal INTEGER NOT NULL,
  points_reward INTEGER DEFAULT 0,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- 7. USER CHALLENGES TABLE (tracking progress)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE NOT NULL,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, challenge_id)
);

-- =====================================================
-- 8. LIVE ACTIVITY FEED TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.live_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_city TEXT,
  activity_type TEXT NOT NULL, -- 'item_added', 'task_completed', 'level_up', etc.
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- INDEXES for better query performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_items_user_id ON public.items(user_id);
CREATE INDEX IF NOT EXISTS idx_items_warranty_expiration ON public.items(warranty_expiration);
CREATE INDEX IF NOT EXISTS idx_maintenance_user_id ON public.maintenance_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_due_date ON public.maintenance_tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_maintenance_completed ON public.maintenance_tasks(completed);
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON public.activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON public.activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_live_activities_created_at ON public.live_activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_city ON public.profiles(city);
CREATE INDEX IF NOT EXISTS idx_profiles_total_points ON public.profiles(total_points DESC);

-- =====================================================
-- TRIGGERS for updated_at timestamps
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_items_updated_at BEFORE UPDATE ON public.items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_updated_at BEFORE UPDATE ON public.maintenance_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_webhook_configs_updated_at BEFORE UPDATE ON public.webhook_configs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TRIGGER to create profile on user signup
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- SAMPLE WEEKLY CHALLENGES
-- =====================================================
INSERT INTO public.challenges (title, description, type, goal, points_reward, start_date, end_date, active)
VALUES 
  ('Add 5 Items', 'Add 5 new items to your inventory this week', 'weekly', 5, 100, CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', true),
  ('Complete 3 Tasks', 'Complete 3 maintenance tasks this week', 'weekly', 3, 75, CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', true),
  ('Check Warranties', 'Review 10 warranty expiration dates', 'weekly', 10, 50, CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- COMPLETED
-- =====================================================
-- Run this SQL in your Supabase SQL Editor
-- Then proceed to RLS policies (rls.sql)
