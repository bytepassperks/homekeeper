# 🚀 Quick Deploy Checklist for HomeKeeper

Use this as your step-by-step deployment checklist.

## ✅ Phase 1: Supabase Database Setup (10 minutes)

**Go to**: https://supabase.com/dashboard → Your Project → SQL Editor

1. ☐ Run `schema.sql` - Creates all tables and triggers
2. ☐ Run `rls.sql` - Enables security policies  
3. ☐ Run `functions.sql` - Creates helper functions
4. ☐ Verify 8 tables exist in Table Editor
5. ☐ Configure Auth URLs in Authentication → URL Configuration:
   - Site URL: `https://your-app.onrender.com`
   - Redirect URLs: Add your Render URL + `/**`

**See**: `SUPABASE_SETUP.md` for detailed instructions

---

## ✅ Phase 2: Push to GitHub (2 minutes)

```bash
# 1. Add all files
git add .

# 2. Commit with message
git commit -m "Production-ready: Supabase configured, RLS enabled, deployment ready"

# 3. Push to GitHub
git push origin main
```

**Expected**: Code visible at `https://github.com/YOUR-USERNAME/homekeeper`

---

## ✅ Phase 3: Deploy to Render (5 minutes)

**Go to**: https://dashboard.render.com

1. ☐ Update Build Command: `npm install && npm run build`
2. ☐ Update Start Command: `npm start`
3. ☐ Add environment variables:
   ```
   VITE_SUPABASE_URL=https://eoldzusfrveckbgdszld.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvbGR6dXNmcnZlY2tiZ2RzemxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMjgyMzgsImV4cCI6MjA3NjkwNDIzOH0.1sFbCunS2jGTkMVr6_dv8NDFggglzS_IbKamwLOXhyQ
   ```
4. ☐ Click "Save Changes"
5. ☐ Click "Manual Deploy" → "Deploy latest commit"
6. ☐ Wait 3-5 minutes for deployment

**See**: `RENDER_FIX.md` for troubleshooting

---

## ✅ Phase 4: Post-Deployment (5 minutes)

1. ☐ Visit your Render URL
2. ☐ Test signup with a real email
3. ☐ Check email for confirmation (if enabled)
4. ☐ Log in successfully
5. ☐ Add a test item
6. ☐ Check that you earned points
7. ☐ View dashboard - verify stats load
8. ☐ Test maintenance calendar
9. ☐ Check warranty management
10. ☐ Verify leaderboard shows your profile

---

## ✅ Phase 5: Update Supabase with Live URL

**After Render deployment succeeds:**

1. ☐ Copy your Render URL (e.g., `https://homekeeper-xyz.onrender.com`)
2. ☐ Go to Supabase → Authentication → URL Configuration
3. ☐ Update Site URL to your Render URL
4. ☐ Test login again to ensure redirect works

---

## 📋 Files You Need

All SQL files are in the `/supabase/` folder:

- ✅ `schema.sql` - Database tables and structure
- ✅ `rls.sql` - Security policies
- ✅ `functions.sql` - Helper functions

All guide files are in the root:

- ✅ `SUPABASE_SETUP.md` - Detailed database setup
- ✅ `RENDER_FIX.md` - Render deployment fix
- ✅ `DEPLOYMENT_GUIDE.md` - Complete deployment guide

---

## 🔍 Quick Verification Commands

**Test Supabase (in SQL Editor):**
```sql
-- Should return 3 challenges, 8 tables
SELECT 
  (SELECT COUNT(*) FROM public.challenges) as challenges,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public') as tables;
```

**Test Git:**
```bash
git status  # Should show "nothing to commit, working tree clean"
git remote -v  # Should show your GitHub repo
```

---

## ⏱️ Total Time Estimate

- Supabase Setup: **10 minutes**
- Git Push: **2 minutes**
- Render Deploy: **5 minutes**
- Testing: **5 minutes**

**Total: ~22 minutes** from start to live! 🚀

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "relation does not exist" | Run `schema.sql` again |
| "permission denied" | Run `rls.sql` again |
| Render stuck at "progressing" | Check `RENDER_FIX.md` |
| Auth not working | Update Supabase redirect URLs |
| Build fails | Check environment variables |

---

## 🎉 Success Criteria

You're DONE when:

- ✅ Supabase has 8 tables
- ✅ GitHub has all your code
- ✅ Render shows "Live" status
- ✅ You can signup and login
- ✅ Dashboard loads with stats
- ✅ You can add items and earn points

---

**Ready to deploy? Start with Phase 1!** 🚀

Open `SUPABASE_SETUP.md` for detailed instructions.
