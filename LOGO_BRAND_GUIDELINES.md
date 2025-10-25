# HomeKeeper Logo & Brand Guidelines

## 📋 Overview

This document contains the complete brand guidelines for **HomeKeeper**, including logo usage, color palette, typography, and implementation details.

---

## 🎨 Logo Variations

### 1. **Full Logo** (Icon + Text)
- **File**: `/public/logos/homekeeper-logo.svg`
- **Usage**: Headers, landing pages, marketing materials
- **Minimum Width**: 120px
- **Background**: Light backgrounds only

### 2. **Light Logo** (For Dark Backgrounds)
- **File**: `/public/logos/homekeeper-logo-light.svg`
- **Usage**: Dark backgrounds, footers, dark mode interfaces
- **Minimum Width**: 120px
- **Background**: Dark backgrounds (#1F2937 or darker)

### 3. **Icon Only** (Square)
- **File**: `/public/logos/homekeeper-icon.svg`
- **Usage**: Favicon, app shortcuts, small spaces
- **Dimensions**: 50x50px (scalable)
- **Background**: Works on any background

### 4. **Social Media Icon**
- **File**: `/public/logos/homekeeper-icon-square.svg`
- **Usage**: Social media profiles, app stores, large square formats
- **Dimensions**: 512x512px (scalable)
- **Format**: SVG (converts to PNG for platforms)

---

## 🎨 Color Palette

### Primary Colors

**Blue**
- Primary: `#3B82F6` (rgb(59, 130, 246))
- Light: `#60A5FA` (rgb(96, 165, 250))
- Dark: `#2563EB` (rgb(37, 99, 235))
- Usage: Main brand color, CTAs, links

**Green**
- Primary: `#10B981` (rgb(16, 185, 129))
- Light: `#34D399` (rgb(52, 211, 153))
- Dark: `#059669` (rgb(5, 150, 105))
- Usage: Success states, secondary accents

### Gradient
```css
background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%);
```

### Neutral Colors

**Gray Scale**
- Gray 900: `#1F2937` (Headers, dark text)
- Gray 700: `#374151` (Body text)
- Gray 600: `#4B5563` (Secondary text)
- Gray 400: `#9CA3AF` (Muted text)
- Gray 200: `#E5E7EB` (Borders)
- Gray 50: `#F9FAFB` (Backgrounds)

**White**: `#FFFFFF`
**Black**: `#000000`

### Accent Colors

**Yellow/Gold** (Badges, highlights)
- `#FBBF24` (rgb(251, 191, 36))

**Purple** (Premium features)
- `#8B5CF6` (rgb(139, 92, 246))

---

## ✍️ Typography

### Font Family
**Primary**: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

### Font Weights
- **Regular**: 400 (Body text)
- **Medium**: 500 (Subheadings)
- **Semi-bold**: 600 (Buttons)
- **Bold**: 700 (Headers, emphasis)

### Font Sizes (Design System)
```css
/* Headers */
h1: 3rem (48px) - 4.5rem (72px) /* Hero titles */
h2: 2.5rem (40px) - 3rem (48px) /* Section headers */
h3: 1.5rem (24px) - 2rem (32px) /* Card titles */

/* Body */
text-xl: 1.25rem (20px) /* Large text */
text-base: 1rem (16px) /* Default body */
text-sm: 0.875rem (14px) /* Small text */
text-xs: 0.75rem (12px) /* Fine print */
```

---

## 🖼️ Logo Usage Rules

### ✅ DO's
- Use the Logo component from `/components/Logo.tsx`
- Maintain aspect ratio at all times
- Provide adequate clear space (minimum: logo height × 0.5)
- Use on appropriate backgrounds (light logo on dark, dark logo on light)
- Scale proportionally

### ❌ DON'Ts
- Never distort or stretch the logo
- Don't change the colors manually (use theme prop)
- Don't add effects (drop shadows, outlines, etc.)
- Don't rotate the logo
- Never place on busy backgrounds without contrast
- Don't recreate the logo - always use official files

### Minimum Sizes
- **Full Logo**: 120px width minimum
- **Icon Only**: 16px × 16px minimum
- **Favicon**: 32px × 32px recommended

### Clear Space
Maintain clear space around the logo equal to the height of the icon portion.

---

## 💻 Implementation

### React Component Usage

```tsx
import { Logo } from './components/Logo';

// Full logo (light background)
<Logo variant="full" size="md" theme="light" />

// Icon only
<Logo variant="icon" size="lg" />

// Dark theme (for footers/dark sections)
<Logo variant="full" size="md" theme="dark" />

// Clickable logo
<Logo 
  variant="full" 
  size="md" 
  clickable 
  onClick={() => navigate('/')} 
/>

// Loading state
<AnimatedLogo size="lg" />
```

### Size Props
- `sm`: Small (height: 2rem / 32px)
- `md`: Medium (height: 2.5rem / 40px)
- `lg`: Large (height: 3rem / 48px)
- `xl`: Extra Large (height: 4rem / 64px)

### Theme Props
- `light`: For light backgrounds (default)
- `dark`: For dark backgrounds

### Variant Props
- `full`: Icon + Text
- `icon`: Icon only
- `text`: Text only

---

## 🌐 Favicon & App Icons

### Browser Favicon
- **Format**: SVG (with PNG fallback)
- **File**: `/public/logos/homekeeper-icon.svg`
- **Implementation**: Automatically added via SEOHead component

### Apple Touch Icon
- **File**: `/public/logos/homekeeper-icon-square.svg`
- **Size**: 180×180px recommended
- **Implementation**: Automatically added via SEOHead component

### PWA/App Icons
Use `/public/logos/homekeeper-icon-square.svg` for:
- Android Chrome (512×512px)
- iOS App Icon (1024×1024px)
- Windows Tile (270×270px)

---

## 📱 Social Media Specifications

### Profile Pictures
- **Twitter/X**: 400×400px (use icon-square.svg)
- **Facebook**: 170×170px (use icon-square.svg)
- **LinkedIn**: 300×300px (use icon-square.svg)
- **Instagram**: 320×320px (use icon-square.svg)

### Open Graph Images
- **Size**: 1200×630px
- **Safe Zone**: Keep logo and text within 1200×600px
- **Format**: PNG or JPEG
- **File Size**: <1MB recommended

---

## 🎯 Brand Voice & Messaging

### Tone
- **Friendly**: Approachable and helpful
- **Professional**: Trustworthy and reliable
- **Modern**: Tech-savvy and efficient
- **Empowering**: Puts user in control

### Taglines
- "Smart Home Inventory & Maintenance Tracker"
- "Manage Your Home, Effortlessly"
- "Your Complete Smart Home Management Solution"

### Key Messages
1. Never lose a warranty again
2. Track everything in one place
3. Automated reminders that actually work
4. Insurance-ready inventory reports
5. Save money with proactive maintenance

---

## 📊 Logo Files Location

```
/public/logos/
├── homekeeper-logo.svg           # Full logo (light theme)
├── homekeeper-logo-light.svg     # Full logo (dark theme)
├── homekeeper-icon.svg           # Icon only (50×50)
└── homekeeper-icon-square.svg    # Square icon (512×512)
```

```
/components/
└── Logo.tsx                      # React component
```

---

## 🔗 Additional Resources

### Contact
- **Support**: support@homemaker.co.site
- **Brand Inquiries**: support@homemaker.co.site

### External Links
- Website: https://www.homemaker.co.site
- Twitter: @HomeKeeperApp
- LinkedIn: linkedin.com/company/homekeeper

---

## ✨ Accessibility

### Alt Text
Always include descriptive alt text:
```tsx
alt="HomeKeeper - Smart Home Inventory & Maintenance Tracker"
```

### Contrast Ratios
- Logo on white background: ✅ WCAG AAA
- Logo on dark backgrounds (use light variant): ✅ WCAG AAA
- Minimum contrast ratio: 4.5:1

### Hover States
- Logo should have `hover:scale-105` transition when clickable
- Maintain 200ms smooth transition duration

---

## 📝 Version History

- **v1.0** (Oct 2025) - Initial brand guidelines
  - Created primary logo variations
  - Established color palette
  - Defined typography system
  - Implemented Logo component

---

## 📄 License & Usage

© 2025 HomeKeeper. All rights reserved.

The HomeKeeper logo, brand name, and visual identity are proprietary assets. 
Unauthorized use is prohibited without written permission.

For licensing inquiries, contact: support@homemaker.co.site

---

**Last Updated**: October 24, 2025
**Document Version**: 1.0
**Maintained By**: HomeKeeper Brand Team
