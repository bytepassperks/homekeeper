-- HomeKeeper Row Level Security (RLS) Policies
-- Run this AFTER schema.sql

-- =====================================================
-- ENABLE RLS ON ALL TABLES
-- =====================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_activities ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PROFILES POLICIES
-- =====================================================
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile (handled by trigger, but allow just in case)
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Allow viewing other profiles for leaderboards (limited fields)
CREATE POLICY "Public profiles for leaderboards"
  ON public.profiles
  FOR SELECT
  USING (true); -- This allows viewing all profiles but you should only select non-sensitive fields

-- =====================================================
-- ITEMS POLICIES
-- =====================================================
-- Users can view their own items
CREATE POLICY "Users can view own items"
  ON public.items
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own items
CREATE POLICY "Users can insert own items"
  ON public.items
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own items
CREATE POLICY "Users can update own items"
  ON public.items
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own items
CREATE POLICY "Users can delete own items"
  ON public.items
  FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- MAINTENANCE TASKS POLICIES
-- =====================================================
-- Users can view their own tasks
CREATE POLICY "Users can view own tasks"
  ON public.maintenance_tasks
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own tasks
CREATE POLICY "Users can insert own tasks"
  ON public.maintenance_tasks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own tasks
CREATE POLICY "Users can update own tasks"
  ON public.maintenance_tasks
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own tasks
CREATE POLICY "Users can delete own tasks"
  ON public.maintenance_tasks
  FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- WEBHOOK CONFIGS POLICIES
-- =====================================================
-- Users can view their own webhook configs
CREATE POLICY "Users can view own webhook configs"
  ON public.webhook_configs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own webhook configs
CREATE POLICY "Users can insert own webhook configs"
  ON public.webhook_configs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own webhook configs
CREATE POLICY "Users can update own webhook configs"
  ON public.webhook_configs
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own webhook configs
CREATE POLICY "Users can delete own webhook configs"
  ON public.webhook_configs
  FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- ACTIVITIES POLICIES
-- =====================================================
-- Users can view their own activities
CREATE POLICY "Users can view own activities"
  ON public.activities
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own activities
CREATE POLICY "Users can insert own activities"
  ON public.activities
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- CHALLENGES POLICIES
-- =====================================================
-- Everyone can view active challenges
CREATE POLICY "Anyone can view challenges"
  ON public.challenges
  FOR SELECT
  USING (active = true);

-- Only admins can insert/update/delete challenges (no policy = only via service role)
-- If you want to add admins later, create an is_admin column in profiles

-- =====================================================
-- USER CHALLENGES POLICIES
-- =====================================================
-- Users can view their own challenge progress
CREATE POLICY "Users can view own challenge progress"
  ON public.user_challenges
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own challenge progress
CREATE POLICY "Users can insert own challenge progress"
  ON public.user_challenges
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own challenge progress
CREATE POLICY "Users can update own challenge progress"
  ON public.user_challenges
  FOR UPDATE
  USING (auth.uid() = user_id);

-- =====================================================
-- LIVE ACTIVITIES POLICIES
-- =====================================================
-- Everyone can view live activities (anonymized)
CREATE POLICY "Anyone can view live activities"
  ON public.live_activities
  FOR SELECT
  USING (true);

-- Anyone can insert live activities (we'll sanitize the data in app)
CREATE POLICY "Anyone can insert live activities"
  ON public.live_activities
  FOR INSERT
  WITH CHECK (true);

-- =====================================================
-- STORAGE POLICIES (for file uploads)
-- =====================================================
-- Create storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('item-photos', 'item-photos', true),
  ('receipts', 'receipts', false),
  ('manuals', 'manuals', false)
ON CONFLICT (id) DO NOTHING;

-- Item photos policies (public bucket)
CREATE POLICY "Users can upload item photos"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'item-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view item photos"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'item-photos');

CREATE POLICY "Users can update own item photos"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'item-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own item photos"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'item-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Receipts policies (private bucket)
CREATE POLICY "Users can upload receipts"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'receipts' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own receipts"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'receipts' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own receipts"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'receipts' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Manuals policies (private bucket)
CREATE POLICY "Users can upload manuals"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'manuals' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own manuals"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'manuals' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own manuals"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'manuals' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- =====================================================
-- COMPLETED
-- =====================================================
-- RLS policies are now enabled!
-- Next, run functions.sql for helper functions
