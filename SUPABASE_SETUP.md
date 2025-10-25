# Supabase Database Setup Guide for HomeKeeper

Complete step-by-step guide to set up your production Supabase database.

## ✅ Configuration Updated

Your Supabase credentials have been updated in the codebase:
- **Project URL**: https://eoldzusfrveckbgdszld.supabase.co
- **Anon Key**: Updated in `/utils/supabase/info.tsx`

## 🚀 Database Setup Steps

### Step 1: Access Supabase SQL Editor

1. Go to https://supabase.com/dashboard
2. Sign in to your account
3. Select your project: **eoldzusfrveckbgdszld**
4. Click **SQL Editor** in the left sidebar

### Step 2: Run Schema SQL (Tables & Indexes)

1. In the SQL Editor, click **"+ New query"**
2. Open the file `/supabase/schema.sql` in your code editor
3. **Copy ALL the contents** of `schema.sql`
4. **Paste** into the Supabase SQL Editor
5. Click **"Run"** (or press Cmd/Ctrl + Enter)
6. Wait for success message: ✅ "Success. No rows returned"

**What this does:**
- ✅ Creates 8 main tables (profiles, items, maintenance_tasks, etc.)
- ✅ Sets up indexes for fast queries
- ✅ Creates triggers for auto-updating timestamps
- ✅ Creates trigger to auto-create user profiles on signup
- ✅ Inserts sample weekly challenges

### Step 3: Run RLS Policies (Security)

1. Click **"+ New query"** again
2. Open the file `/supabase/rls.sql`
3. **Copy ALL the contents** of `rls.sql`
4. **Paste** into the Supabase SQL Editor
5. Click **"Run"**
6. Wait for success message: ✅ "Success. No rows returned"

**What this does:**
- ✅ Enables Row Level Security on all tables
- ✅ Creates policies so users can only access their own data
- ✅ Sets up storage buckets for photos, receipts, manuals
- ✅ Creates storage policies for file uploads

### Step 4: Run Helper Functions

1. Click **"+ New query"** again
2. Open the file `/supabase/functions.sql`
3. **Copy ALL the contents** of `functions.sql`
4. **Paste** into the Supabase SQL Editor
5. Click **"Run"**
6. Wait for success message: ✅ "Success. No rows returned"

**What this does:**
- ✅ Creates `award_points()` function for gamification
- ✅ Creates `award_badge()` function
- ✅ Creates leaderboard functions
- ✅ Creates challenge tracking functions
- ✅ Creates helper functions for dashboard stats

### Step 5: Verify Database Setup

1. Click **"Table Editor"** in left sidebar
2. You should see these tables:
   - ✅ profiles
   - ✅ items
   - ✅ maintenance_tasks
   - ✅ webhook_configs
   - ✅ activities
   - ✅ challenges
   - ✅ user_challenges
   - ✅ live_activities

3. Click on **"challenges"** table
4. You should see 3 sample challenges already inserted

### Step 6: Configure Authentication

1. Click **"Authentication"** in left sidebar
2. Click **"URL Configuration"**
3. Update these settings:

   **Site URL**: `https://your-render-app.onrender.com`
   (Or `https://www.homemaker.co.site` if using custom domain)

   **Redirect URLs**: Add these (one per line):
   ```
   https://your-render-app.onrender.com/**
   https://www.homemaker.co.site/**
   http://localhost:5173/**
   ```

4. Click **"Save"**

### Step 7: Configure Email Templates (Optional but Recommended)

1. Still in **Authentication** section
2. Click **"Email Templates"**
3. Customize the templates:
   - **Confirm signup** - Welcome email
   - **Magic Link** - Login email
   - **Change Email Address** - Confirmation email
   - **Reset Password** - Password reset email

4. Update templates with your branding:
   ```
   From: HomeKeeper <noreply@homemaker.co.site>
   Subject: Welcome to HomeKeeper!
   ```

### Step 8: Enable Email Confirmations (Recommended for Production)

1. Go to **Authentication** → **Settings**
2. Scroll to **"Email"** section
3. Toggle **"Enable email confirmations"** - ON
4. This prevents spam signups and ensures real email addresses

### Step 9: Set up Storage (Optional - for file uploads)

1. Click **"Storage"** in left sidebar
2. You should see 3 buckets created by the RLS script:
   - ✅ item-photos (public)
   - ✅ receipts (private)
   - ✅ manuals (private)

3. If they're not there, create them manually:
   - Click **"New bucket"**
   - Name: `item-photos`, Public: YES
   - Repeat for `receipts` and `manuals` (both private)

### Step 10: Test the Database

1. Go back to **SQL Editor**
2. Run this test query:

```sql
-- Test query to check if everything is set up
SELECT 
  (SELECT COUNT(*) FROM public.challenges) as total_challenges,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public') as total_tables;
```

**Expected result:**
- `total_challenges`: 3
- `total_tables`: 8

If you see this, **you're all set!** ✅

## 📊 Environment Variables for Render

Add these to your Render environment variables:

```
VITE_SUPABASE_URL=https://eoldzusfrveckbgdszld.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvbGR6dXNmcnZlY2tiZ2RzemxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMjgyMzgsImV4cCI6MjA3NjkwNDIzOH0.1sFbCunS2jGTkMVr6_dv8NDFggglzS_IbKamwLOXhyQ
```

**⚠️ SECURITY NOTE**: Never commit the service role key to GitHub!

## 🔄 Push Changes to GitHub

Now that the database is configured, push the updated code:

```bash
# Add all files
git add .

# Commit
git commit -m "Configure production Supabase database with schema, RLS, and functions"

# Push to GitHub
git push origin main
```

Render will automatically redeploy with the new Supabase configuration!

## 🎯 Next Steps After Deployment

1. **Test signup/login** on your live app
2. **Add a test item** to verify database writes
3. **Check gamification** - you should earn points
4. **Test maintenance tasks** 
5. **Verify leaderboards** work

## 🐛 Troubleshooting

### "relation 'public.profiles' does not exist"
- Run `schema.sql` again in SQL Editor

### "permission denied for table profiles"
- Run `rls.sql` again to enable RLS policies

### "function award_points does not exist"
- Run `functions.sql` again

### Auth not working
- Check that redirect URLs are configured correctly
- Verify environment variables in Render

### Can't upload files
- Check storage buckets exist
- Verify storage policies are created (in `rls.sql`)

## 📚 Database Schema Overview

**Main Tables:**
- `profiles` - User profiles with points, badges, level
- `items` - Home inventory items
- `maintenance_tasks` - Scheduled maintenance
- `webhook_configs` - Make.com integrations
- `activities` - Activity log for gamification
- `challenges` - Weekly/monthly challenges
- `user_challenges` - User progress on challenges
- `live_activities` - Live feed of user activities

**Storage Buckets:**
- `item-photos` - Public photos of items
- `receipts` - Private receipt uploads
- `manuals` - Private manual uploads

## ✅ Verification Checklist

Before going live, verify:

- ✅ All tables created (8 tables)
- ✅ RLS enabled on all tables
- ✅ Storage buckets created (3 buckets)
- ✅ Helper functions created (10+ functions)
- ✅ Sample challenges inserted (3 challenges)
- ✅ Auth redirect URLs configured
- ✅ Environment variables set in Render
- ✅ Code pushed to GitHub
- ✅ Render successfully deployed

---

**You're ready to go live!** 🚀🎉
