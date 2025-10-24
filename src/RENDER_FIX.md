# Fix Render Deployment - Port Binding Issue

## The Problem
Render is stuck at "progressing" because Vite dev server doesn't expose ports correctly for production.

## The Solution

I've created two new files that will fix this:
1. ✅ `vite.config.ts` - Configures Vite to bind to 0.0.0.0
2. ✅ Updated `package.json` - Added proper start script

## What You Need to Do NOW

### Step 1: Push the New Files to GitHub

In your terminal (same folder where you ran git before):

```bash
# Add the new files
git add vite.config.ts package.json

# Commit the changes
git commit -m "Fix: Add vite config and start script for Render deployment"

# Push to GitHub
git push origin main
```

### Step 2: Update Render Settings

1. Go to your Render dashboard: https://dashboard.render.com
2. Click on your `homekeeper` service
3. Click **"Settings"** in the left sidebar
4. Scroll to **"Build & Deploy"** section
5. Update these fields:

   **Build Command**: 
   ```
   npm install && npm run build
   ```

   **Start Command**:
   ```
   npm start
   ```

6. Click **"Save Changes"**

### Step 3: Manually Trigger a New Deploy

1. Still in your Render dashboard
2. Click **"Manual Deploy"** button (top right)
3. Select **"Deploy latest commit"**
4. Click **"Deploy"**

### Step 4: Watch the Logs

You should now see:
- ✅ Build command runs `npm install && npm run build`
- ✅ Production build created
- ✅ Start command runs `npm start`
- ✅ Server binds to `0.0.0.0:PORT`
- ✅ "Your service is live 🎉"

## Expected Timeline

- Build: 2-3 minutes
- Deploy: 1 minute
- **Total: 3-5 minutes**

## Troubleshooting

### If build fails with "TypeScript errors"
1. In Render settings, change Build Command to:
   ```
   npm install && npm run build --skipLibCheck
   ```

### If still stuck on "No open ports detected"
1. Check that you pushed the `vite.config.ts` file to GitHub
2. Verify in Render logs that it shows "Build successful"
3. Make sure Start Command is `npm start` (not `npm run dev`)

### If you see "404 Not Found" when visiting the URL
1. Check that the build created a `dist` folder
2. Verify environment variables are set (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)

## Alternative: Cancel Current Deploy

If you want to cancel the stuck deployment first:

1. In Render dashboard, find the deployment
2. Click **"Cancel deploy"** button
3. Then follow Steps 1-4 above

---

## After It's Live

Once deployment succeeds:

1. ✅ Visit your Render URL (e.g., https://homekeeper.onrender.com)
2. ✅ Test login/signup
3. ✅ Update Supabase redirect URLs (in DEPLOYMENT_GUIDE.md)
4. ✅ Test all features

---

**You're almost there!** Just push the new files and update Render settings. 🚀
