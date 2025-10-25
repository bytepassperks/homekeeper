# 📸 How to Add Your HomeKeeper Screenshots to the Demo

## ✅ Current Status

The demo page now shows **Unsplash placeholder images** that are working correctly. 

To replace them with your **actual HomeKeeper screenshots**, follow these steps:

---

## 🎯 Option 1: Upload Screenshots to Your Project (Recommended)

### Step 1: Create a Screenshots Folder

In your project root, create a folder for your screenshots:

```bash
mkdir -p public/screenshots
```

### Step 2: Save Your 9 Screenshots

Save the 9 screenshots you showed me with these exact names:

1. `hero.png` - Landing page with moving boxes
2. `signup.png` - Signup modal
3. `add-item.png` - Add item modal
4. `dashboard.png` - Dashboard with stats
5. `warranty.png` - Warranty management page
6. `calendar.png` - Calendar view
7. `webhooks.png` - Webhook configuration
8. `gamification.png` - Badges page
9. `item-detail.png` - LG Refrigerator detail

Place them in `public/screenshots/` folder.

### Step 3: Update DemoPage.tsx

Open `/components/DemoPage.tsx` and replace the image URLs in the `demoSteps` array:

```tsx
const demoSteps = [
  {
    title: 'Welcome to HomeKeeper',
    description: 'Your comprehensive smart home inventory and maintenance tracking solution',
    image: '/screenshots/hero.png',  // ← Change this
    icon: Home,
    duration: 5,
    highlights: [...]
  },
  {
    title: 'Create Your Account',
    description: 'Sign up in seconds and start managing your home inventory',
    image: '/screenshots/signup.png',  // ← Change this
    icon: FileText,
    duration: 5,
    highlights: [...]
  },
  {
    title: 'Add Your First Item',
    description: 'Add appliances, electronics, furniture, and more to your inventory',
    image: '/screenshots/add-item.png',  // ← Change this
    icon: FileText,
    duration: 8,
    highlights: [...]
  },
  {
    title: 'Dashboard Overview',
    description: 'See all your home inventory data at a glance',
    image: '/screenshots/dashboard.png',  // ← Change this
    icon: Home,
    duration: 7,
    highlights: [...]
  },
  {
    title: 'Warranty Tracking',
    description: 'Never lose a warranty again with automated alerts',
    image: '/screenshots/warranty.png',  // ← Change this
    icon: Shield,
    duration: 7,
    highlights: [...]
  },
  {
    title: 'Maintenance Calendar',
    description: 'Schedule and track maintenance for all your items',
    image: '/screenshots/calendar.png',  // ← Change this
    icon: Calendar,
    duration: 7,
    highlights: [...]
  },
  {
    title: 'Smart Notifications & Webhooks',
    description: 'Automate alerts with email, SMS, and powerful webhook integrations',
    image: '/screenshots/webhooks.png',  // ← Change this
    icon: Bell,
    duration: 6,
    highlights: [...]
  },
  {
    title: 'Gamification & Rewards',
    description: 'Earn points, unlock badges, and level up as you manage your home',
    image: '/screenshots/gamification.png',  // ← Change this
    icon: Trophy,
    duration: 7,
    highlights: [...]
  },
  {
    title: 'Complete Item Management',
    description: 'Track every detail with warranty info, maintenance schedules, and photos',
    image: '/screenshots/item-detail.png',  // ← Change this
    icon: Download,
    duration: 5,
    highlights: [...]
  },
  {
    title: 'Ready to Get Started?',
    description: 'Join thousands of homeowners managing their homes smarter',
    image: '/screenshots/hero.png',  // ← Reuse hero image
    icon: Zap,
    duration: 5,
    highlights: [...]
  }
];
```

### Step 4: Push to GitHub

```bash
git add .
git commit -m "Add actual HomeKeeper screenshots to demo page"
git push origin main
```

Render will automatically redeploy with your screenshots!

---

## 🎯 Option 2: Use a Screenshot Service (Alternative)

If you want to host the screenshots externally:

1. Upload your 9 screenshots to **Imgur**, **Cloudinary**, or **any image hosting service**
2. Get the direct image URLs
3. Replace the Unsplash URLs in `DemoPage.tsx` with your hosted URLs

---

## 📋 Screenshot Naming Reference

| Step | File Name | Description |
|------|-----------|-------------|
| 1 | `hero.png` | Landing page with moving boxes room |
| 2 | `signup.png` | Signup modal with form fields |
| 3 | `add-item.png` | "Add New Item" modal |
| 4 | `dashboard.png` | Dashboard with stats and gamification |
| 5 | `warranty.png` | Warranty management page |
| 6 | `calendar.png` | Calendar view with tasks |
| 7 | `webhooks.png` | Webhook configuration (warranty alert, find replacement, annual report) |
| 8 | `gamification.png` | Badges page showing Level 5 and achievements |
| 9 | `item-detail.png` | LG Refrigerator detail page |
| 10 | `hero.png` | (Reuse hero image) |

---

## 🚀 Quick Copy-Paste Commands

### Create Folder and Add Screenshots:

```bash
# Create folder
mkdir -p public/screenshots

# Now manually copy your 9 PNG files into public/screenshots/
# Name them: hero.png, signup.png, add-item.png, dashboard.png, 
# warranty.png, calendar.png, webhooks.png, gamification.png, item-detail.png
```

### After adding files:

```bash
git add public/screenshots/
git commit -m "Add HomeKeeper demo screenshots"
git push origin main
```

---

## ✅ Benefits of Using Your Actual Screenshots

- **Authentic** - Shows real HomeKeeper features
- **Professional** - Demonstrates actual UI/UX quality
- **Accurate** - Users see exactly what they'll get
- **SEO** - Better engagement with real product images

---

## 🎨 Image Optimization Tips

For best performance:

1. **Resize** to 1920x1080 (Full HD) max
2. **Compress** using TinyPNG or similar
3. **Format**: PNG for UI screenshots (preserves text clarity)
4. **Size**: Keep under 500KB each

---

## 💡 Current Placeholder Images

The demo is currently using these Unsplash images:
- Modern home interior
- Computer screen with signup form
- Kitchen appliances
- Dashboard analytics
- Warranty documents
- Calendar planner
- Smartphone notifications
- Trophy awards
- Modern refrigerator

These work fine, but **your actual screenshots will be much better**!

---

## 🔍 To Verify It's Working

After pushing to GitHub and Render redeploys:

1. Go to: https://homekeeper-jfu0.onrender.com
2. Click "View Demo" 
3. You should see your actual HomeKeeper screenshots
4. Click Play to auto-advance through them

---

**Let me know once you've added the screenshots and I can help verify they're displaying correctly!**
