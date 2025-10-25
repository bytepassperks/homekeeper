# HomeKeeper Deployment Guide

This guide will walk you through deploying HomeKeeper to GitHub and Render step-by-step.

## Part 1: Push to GitHub

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top-right corner
3. Select **"New repository"**
4. Configure your repository:
   - **Repository name**: `homekeeper` (or your preferred name)
   - **Description**: "Smart home inventory and maintenance tracking application"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have our code)
5. Click **"Create repository"**

### Step 2: Prepare Your Local Project

Open your terminal/command prompt in your project directory and run these commands:

```bash
# Initialize git repository (if not already done)
git init

# Add all files to staging
git add .

# Create your first commit
git commit -m "Initial commit: HomeKeeper full application with logo system, SEO, and gamification"
```

### Step 3: Connect to GitHub and Push

Replace `YOUR-USERNAME` and `REPOSITORY-NAME` with your actual GitHub username and repository name:

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR-USERNAME/REPOSITORY-NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Expected Result**: Your code should now be visible on GitHub!

---

## Part 2: Deploy to Render

### Step 4: Create Render Account

1. Go to [Render](https://render.com)
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up with your GitHub account (recommended for easier integration)

### Step 5: Create a New Web Service

1. From your Render dashboard, click **"New +"**
2. Select **"Web Service"**
3. Click **"Connect a repository"**
4. Authorize Render to access your GitHub repositories
5. Find and select your `homekeeper` repository
6. Click **"Connect"**

### Step 6: Configure Your Web Service

Fill in the following settings:

**Basic Settings:**
- **Name**: `homekeeper` (or your preferred service name)
- **Region**: Choose closest to your users (e.g., Oregon, Frankfurt, Singapore)
- **Branch**: `main`
- **Root Directory**: Leave blank
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm run dev` (Render will auto-detect for Vite/React apps)

**Instance Type:**
- Select **"Free"** (or paid plan for better performance)

### Step 7: Add Environment Variables

This is **CRITICAL** - click **"Advanced"** and add these environment variables:

1. Click **"Add Environment Variable"**
2. Add each of these:

```
VITE_SUPABASE_URL = your-supabase-project-url
VITE_SUPABASE_ANON_KEY = your-supabase-anon-key
```

**Where to find these values:**
1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your HomeKeeper project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → Use for `VITE_SUPABASE_URL`
   - **anon/public key** → Use for `VITE_SUPABASE_ANON_KEY`

### Step 8: Deploy

1. Scroll to the bottom
2. Click **"Create Web Service"**
3. Render will start building and deploying your app
4. Wait 5-10 minutes for the first deployment

**Expected Result**: You'll see build logs in real-time. When complete, you'll get a URL like `https://homekeeper.onrender.com`

---

## Part 3: Post-Deployment Configuration

### Step 9: Update Supabase Site URL

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project → **Authentication** → **URL Configuration**
3. Add your Render URL to **Site URL**: `https://your-app-name.onrender.com`
4. Add to **Redirect URLs**: `https://your-app-name.onrender.com/**`
5. Click **Save**

### Step 10: Test Your Deployment

1. Visit your Render URL
2. Test key features:
   - ✅ Landing page loads
   - ✅ Sign up/Login works
   - ✅ Dashboard loads
   - ✅ Can add items
   - ✅ Logo displays correctly
   - ✅ SEO meta tags present (view page source)

---

## Part 4: Future Updates

When you make changes to your code:

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Description of what you changed"

# Push to GitHub
git push origin main
```

**Auto-Deploy**: Render automatically deploys when you push to GitHub! 🎉

---

## Troubleshooting

### Build Fails on Render

**Issue**: Build command fails
**Solution**: Make sure `package.json` exists with proper scripts

### Blank Page After Deploy

**Issue**: White screen
**Solution**: 
1. Check browser console for errors
2. Verify environment variables are set correctly
3. Check that Supabase URLs match

### Authentication Doesn't Work

**Issue**: Can't sign up/login
**Solution**: 
1. Verify Supabase environment variables
2. Check Supabase Site URL and Redirect URLs are configured
3. Ensure email confirmation is configured in Supabase

### Images Don't Load

**Issue**: Unsplash images broken
**Solution**: This is normal - Unsplash images are used in development. In production, you may want to host your own images or use a CDN.

---

## Custom Domain (Optional)

To use `homemaker.co.site` instead of the Render URL:

### Step 11: Add Custom Domain to Render

1. In Render dashboard, go to your service
2. Click **"Settings"** tab
3. Scroll to **"Custom Domains"**
4. Click **"Add Custom Domain"**
5. Enter: `www.homemaker.co.site`
6. Render will show DNS instructions

### Step 12: Configure DNS

Go to your domain provider's DNS settings and add:

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `your-app-name.onrender.com`

**For root domain (optional):**
- Type: `A`
- Name: `@`
- Value: (Render will provide IP addresses)

**Wait 24-48 hours** for DNS propagation.

---

## Security Checklist

Before going fully public:

- ✅ Environment variables are set (not in code)
- ✅ Supabase Row Level Security (RLS) is enabled
- ✅ API keys are never committed to GitHub
- ✅ HTTPS is enabled (Render does this automatically)
- ✅ Cookie consent is implemented (already done)
- ✅ Privacy policy is accessible (already done)
- ✅ Terms of service is accessible (already done)

---

## Next Steps After Deployment

1. **Test thoroughly** on mobile and desktop
2. **Monitor** your Render logs for errors
3. **Set up monitoring** with Render metrics
4. **Configure backups** for your Supabase database
5. **Add your domain** to Google Search Console
6. **Submit sitemap** to Google: `https://your-domain/sitemap.xml`
7. **Test SEO** with tools like [PageSpeed Insights](https://pagespeed.web.dev/)

---

## Support Resources

- **Render Docs**: https://render.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **GitHub Docs**: https://docs.github.com

---

**Congratulations!** 🎉 Your HomeKeeper application is now live!
