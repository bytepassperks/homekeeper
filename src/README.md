# HomeKeeper 🏠

A comprehensive smart home inventory and maintenance tracking application with gamification, SEO optimization, and professional design.

![HomeKeeper](https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop)

## Features

### Core Functionality
- 📦 **Smart Inventory Management** - Track all home items with photos, warranties, and receipts
- 🔔 **Warranty Alerts** - Never miss warranty expiration dates
- 📅 **Maintenance Calendar** - Schedule and track home maintenance tasks
- 🔗 **Make.com Integration** - Connect to 1000+ apps via webhooks
- 🔐 **Secure Authentication** - Powered by Supabase Auth

### Gamification
- 🎯 **Points & Badges** - Earn rewards for maintaining your home
- 🏆 **Levels & Rankings** - Compete in city leaderboards
- 📊 **Weekly Challenges** - Complete tasks for bonus points
- 🎊 **Celebration Effects** - Confetti animations for achievements
- 📈 **Live Activity Feed** - See real-time updates from other users

### SEO & Marketing
- 🔍 **Full SEO Optimization** - Meta tags, structured data, sitemaps
- 📝 **Blog System** - 6 SEO-optimized articles
- 💰 **Pricing Page** - Transparent pricing tiers
- ❓ **FAQ System** - Comprehensive help resources
- 📱 **Social Sharing** - Built-in sharing capabilities

### Legal & Compliance
- 📜 Privacy Policy, Terms of Service, Cookie Policy, Refund Policy
- 🍪 Cookie Consent Banner
- ✉️ GDPR Compliance Features

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Supabase (Database, Auth, Storage)
- **Deployment**: Render
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Motion (Framer Motion)

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Supabase account
- (Optional) Make.com account for webhooks

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/homekeeper.git
cd homekeeper
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Environment Variables

Get these from your [Supabase Dashboard](https://app.supabase.com) → Settings → API:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key |

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions on deploying to Render.

Quick steps:
1. Push to GitHub
2. Connect GitHub repo to Render
3. Add environment variables
4. Deploy!

## Project Structure

```
homekeeper/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Feature components
├── utils/              # Utility functions
│   └── supabase/       # Supabase client config
├── types/              # TypeScript type definitions
├── styles/             # Global styles and CSS
├── public/             # Static assets
│   ├── logos/          # Brand assets
│   ├── sitemap.xml     # SEO sitemap
│   └── robots.txt      # SEO robots file
└── App.tsx             # Main application component
```

## Key Components

- **Dashboard** - Main user dashboard with analytics
- **ItemCatalog** - Browse and manage inventory items
- **MaintenanceCalendar** - Schedule maintenance tasks
- **WarrantyManagement** - Track warranties and expirations
- **GamificationPanel** - Points, badges, and leaderboards
- **LiveActivityFeed** - Real-time user activity
- **SEOHead** - Dynamic meta tags for SEO

## Branding

HomeKeeper features a professional logo system with multiple variations. See [LOGO_BRAND_GUIDELINES.md](./LOGO_BRAND_GUIDELINES.md) for usage guidelines.

Download logo assets from the [Brand Assets page](https://www.homemaker.co.site/brand-assets).

## SEO Features

- Dynamic meta tags for all pages
- XML sitemap at `/sitemap.xml`
- Structured data (Schema.org)
- Social media sharing tags
- Blog system with SEO-optimized content
- Breadcrumb navigation

See [SEO_IMPLEMENTATION.md](./SEO_IMPLEMENTATION.md) for details.

## Contributing

This is a private project. For questions or support, contact support@homemaker.co.site

## License

Proprietary - All rights reserved

## Support

- **Website**: https://www.homemaker.co.site
- **Email**: support@homemaker.co.site
- **Documentation**: See markdown files in the repository

---

Built with ❤️ for homeowners who care about their investment
