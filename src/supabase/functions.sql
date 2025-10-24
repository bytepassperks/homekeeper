-- HomeKeeper Database Functions
-- Helper functions for gamification, leaderboards, and more

-- =====================================================
-- FUNCTION: Award Points to User
-- =====================================================
CREATE OR REPLACE FUNCTION award_points(
  p_user_id UUID,
  p_points INTEGER,
  p_activity_type TEXT,
  p_description TEXT DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
  v_new_total INTEGER;
  v_new_level INTEGER;
  v_old_level INTEGER;
BEGIN
  -- Update user's total points
  UPDATE public.profiles
  SET total_points = total_points + p_points
  WHERE id = p_user_id
  RETURNING total_points, level INTO v_new_total, v_old_level;
  
  -- Calculate new level (every 1000 points = 1 level)
  v_new_level := FLOOR(v_new_total / 1000) + 1;
  
  -- Update level if changed
  IF v_new_level > v_old_level THEN
    UPDATE public.profiles
    SET level = v_new_level
    WHERE id = p_user_id;
  END IF;
  
  -- Record the activity
  INSERT INTO public.activities (user_id, type, points, description)
  VALUES (p_user_id, p_activity_type, p_points, p_description);
  
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Award Badge to User
-- =====================================================
CREATE OR REPLACE FUNCTION award_badge(
  p_user_id UUID,
  p_badge_id TEXT,
  p_badge_name TEXT,
  p_badge_icon TEXT DEFAULT '🏆'
)
RETURNS VOID AS $$
DECLARE
  v_badges JSONB;
BEGIN
  -- Get current badges
  SELECT badges INTO v_badges
  FROM public.profiles
  WHERE id = p_user_id;
  
  -- Check if badge already exists
  IF NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(v_badges) AS badge
    WHERE badge->>'id' = p_badge_id
  ) THEN
    -- Add new badge
    UPDATE public.profiles
    SET badges = badges || jsonb_build_object(
      'id', p_badge_id,
      'name', p_badge_name,
      'icon', p_badge_icon,
      'earned_at', NOW()
    )
    WHERE id = p_user_id;
    
    -- Record the activity
    INSERT INTO public.activities (user_id, type, points, description)
    VALUES (p_user_id, 'badge_earned', 50, 'Earned badge: ' || p_badge_name);
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Get City Leaderboard
-- =====================================================
CREATE OR REPLACE FUNCTION get_city_leaderboard(
  p_city TEXT,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  rank BIGINT,
  user_id UUID,
  full_name TEXT,
  total_points INTEGER,
  level INTEGER,
  avatar_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ROW_NUMBER() OVER (ORDER BY p.total_points DESC) AS rank,
    p.id AS user_id,
    p.full_name,
    p.total_points,
    p.level,
    p.avatar_url
  FROM public.profiles p
  WHERE p.city = p_city
  ORDER BY p.total_points DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Get Global Leaderboard
-- =====================================================
CREATE OR REPLACE FUNCTION get_global_leaderboard(
  p_limit INTEGER DEFAULT 100
)
RETURNS TABLE (
  rank BIGINT,
  user_id UUID,
  full_name TEXT,
  city TEXT,
  total_points INTEGER,
  level INTEGER,
  avatar_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ROW_NUMBER() OVER (ORDER BY p.total_points DESC) AS rank,
    p.id AS user_id,
    p.full_name,
    p.city,
    p.total_points,
    p.level,
    p.avatar_url
  FROM public.profiles p
  ORDER BY p.total_points DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Get User Percentile
-- =====================================================
CREATE OR REPLACE FUNCTION get_user_percentile(
  p_user_id UUID
)
RETURNS INTEGER AS $$
DECLARE
  v_total_users INTEGER;
  v_users_below INTEGER;
  v_percentile INTEGER;
BEGIN
  -- Get total number of users
  SELECT COUNT(*) INTO v_total_users
  FROM public.profiles;
  
  -- Get number of users with fewer points
  SELECT COUNT(*) INTO v_users_below
  FROM public.profiles p1
  WHERE p1.total_points < (
    SELECT total_points FROM public.profiles WHERE id = p_user_id
  );
  
  -- Calculate percentile
  IF v_total_users > 0 THEN
    v_percentile := ROUND((v_users_below::NUMERIC / v_total_users::NUMERIC) * 100);
  ELSE
    v_percentile := 0;
  END IF;
  
  RETURN v_percentile;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Update Challenge Progress
-- =====================================================
CREATE OR REPLACE FUNCTION update_challenge_progress(
  p_user_id UUID,
  p_challenge_id UUID,
  p_increment INTEGER DEFAULT 1
)
RETURNS VOID AS $$
DECLARE
  v_goal INTEGER;
  v_new_progress INTEGER;
  v_points_reward INTEGER;
BEGIN
  -- Get challenge details
  SELECT goal, points_reward INTO v_goal, v_points_reward
  FROM public.challenges
  WHERE id = p_challenge_id AND active = true;
  
  -- Update or insert progress
  INSERT INTO public.user_challenges (user_id, challenge_id, progress)
  VALUES (p_user_id, p_challenge_id, p_increment)
  ON CONFLICT (user_id, challenge_id)
  DO UPDATE SET progress = user_challenges.progress + p_increment
  RETURNING progress INTO v_new_progress;
  
  -- Check if challenge is completed
  IF v_new_progress >= v_goal THEN
    UPDATE public.user_challenges
    SET completed = true, completed_at = NOW()
    WHERE user_id = p_user_id AND challenge_id = p_challenge_id AND completed = false;
    
    -- Award points
    PERFORM award_points(
      p_user_id,
      v_points_reward,
      'challenge_completed',
      'Completed a challenge!'
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Get Expiring Warranties
-- =====================================================
CREATE OR REPLACE FUNCTION get_expiring_warranties(
  p_user_id UUID,
  p_days_ahead INTEGER DEFAULT 30
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  category TEXT,
  warranty_expiration DATE,
  days_until_expiration INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    i.id,
    i.name,
    i.category,
    i.warranty_expiration,
    (i.warranty_expiration - CURRENT_DATE) AS days_until_expiration
  FROM public.items i
  WHERE 
    i.user_id = p_user_id AND
    i.warranty_expiration IS NOT NULL AND
    i.warranty_expiration BETWEEN CURRENT_DATE AND CURRENT_DATE + p_days_ahead
  ORDER BY i.warranty_expiration ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Get Upcoming Maintenance Tasks
-- =====================================================
CREATE OR REPLACE FUNCTION get_upcoming_maintenance(
  p_user_id UUID,
  p_days_ahead INTEGER DEFAULT 7
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  due_date DATE,
  priority TEXT,
  days_until_due INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    m.id,
    m.title,
    m.description,
    m.due_date,
    m.priority,
    (m.due_date - CURRENT_DATE) AS days_until_due
  FROM public.maintenance_tasks m
  WHERE 
    m.user_id = p_user_id AND
    m.completed = false AND
    m.due_date IS NOT NULL AND
    m.due_date BETWEEN CURRENT_DATE AND CURRENT_DATE + p_days_ahead
  ORDER BY m.due_date ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Add Live Activity
-- =====================================================
CREATE OR REPLACE FUNCTION add_live_activity(
  p_city TEXT,
  p_activity_type TEXT,
  p_description TEXT,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.live_activities (user_city, activity_type, description, metadata)
  VALUES (p_city, p_activity_type, p_description, p_metadata);
  
  -- Clean up old activities (keep only last 1000)
  DELETE FROM public.live_activities
  WHERE id IN (
    SELECT id FROM public.live_activities
    ORDER BY created_at DESC
    OFFSET 1000
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION: Get Dashboard Stats
-- =====================================================
CREATE OR REPLACE FUNCTION get_dashboard_stats(
  p_user_id UUID
)
RETURNS TABLE (
  total_items BIGINT,
  total_value NUMERIC,
  warranties_expiring_soon BIGINT,
  pending_tasks BIGINT,
  completed_tasks_this_month BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM public.items WHERE user_id = p_user_id) AS total_items,
    (SELECT COALESCE(SUM(purchase_price), 0) FROM public.items WHERE user_id = p_user_id) AS total_value,
    (SELECT COUNT(*) FROM public.items 
     WHERE user_id = p_user_id 
     AND warranty_expiration BETWEEN CURRENT_DATE AND CURRENT_DATE + 30) AS warranties_expiring_soon,
    (SELECT COUNT(*) FROM public.maintenance_tasks 
     WHERE user_id = p_user_id AND completed = false) AS pending_tasks,
    (SELECT COUNT(*) FROM public.maintenance_tasks 
     WHERE user_id = p_user_id 
     AND completed = true 
     AND completed_date >= DATE_TRUNC('month', CURRENT_DATE)) AS completed_tasks_this_month;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- COMPLETED
-- =====================================================
-- All helper functions created!
-- Now you're ready to use the application
