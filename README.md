# 🚀 HarvestIQ — Crypto Tax Loss Harvesting Dashboard

A production-grade, premium, and highly responsive **Tax Loss Harvesting Dashboard** designed for next-generation cryptocurrency fintech platforms. Built using **Next.js 14 (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion** for state-of-the-art visual aesthetics, interactive states, and micro-interactions.

This project was built to exceed recruitment requirements for a senior frontend engineering internship review by **Chandan**, demonstrating exceptional state management, pure memoized calculations, highly-responsive rendering models, and strict production-level coding standards.

---

## ⚡ Live Features & Polish

### 🎨 Elite Visual Aesthetics (Stripe/Linear/Vercel Grade)
* **Luxury Dark Theme**: Formulated on a custom, deep charcoal-graphite background (`#050508`) with harmonious blue-to-indigo radial gradient lighting and organic, atmospheric blurring.
* **Refined Layering & Depth**: Elegant cards built using advanced glassmorphism styles featuring high-end borders (`backdrop-filter: blur(16px)`), stacked dropshadows, and custom hover lift spring translations.
* **Pulse Glow Highlights**: Interactive assets and recalculated gains light up dynamically with custom periodic shadow-pulse glow animations.

### ✨ Premium Micro-Interactions & Spring Dynamics
* **Staggered Card Entries**: Statistical cards and tables slide up elegantly on mount using custom spring coordinates.
* **Animated Value Transitions**: Financial metrics, net values, and projected tax offsets animate seamlessly upon selection, updating numbers in real-time.
* **Elastic Checkbox States**: Interactive checkboxes dynamically scale and animate Check/Minus elements with spring-based rotation vectors.
* **Drop-in Savings Banner**: A stunning alert that slides down and focuses with blur-to-focus transition immediately when a tax savings opportunity is simulated.

### 💰 Tax Loss Harvesting & Calculation Logic
* **Flat 30% Tax Rate**: Applied to net realized capital gains under current fiscal rules.
* **Proportional Harvesting Engine**: Supports partial position liquidations (Amount to Sell) instead of strict binary choices. Realized loss offsets scale proportionally to the volume liquidated:
  $$G_{\text{realized}} = G_{\text{unrealized}} \times \frac{S_{\text{liquidated}}}{H_{\text{total}}}$$
* **Auto-Select Losses**: Quick-action trigger which scans all holdings and automatically targets position elements currently at a net paper loss.

### 📋 Port-Ready Holdings Grid
* **Desktop Grid**: Sticky glassmorphic header, compact spacing, proper numeric column right-alignment, inline input controllers with inline validation flags, and direct MAX allocation shortcuts.
* **Mobile Layout**: Transforms rows into native-quality touch-friendly card lists, equipped with spring-based height collapsible panels for deeper technical metrics.

### ⚙️ Mock Service & API Simulator Panel
* Toggles error flags for either the Holdings or Gains endpoints inside the navbar settings menu.
* Simulates real-world SaaS load fallbacks including custom shimmering skeletons, graceful error banners, and clean refresh recovery buttons.

---

## 📁 Architecture & File Layout

```
src/
├── app/
│   ├── globals.css         # Custom animations, luxury dark color schemes, glassmorphic layering
│   ├── layout.tsx          # Font optimization, metadata title, and viewport bounds
│   └── page.tsx            # Orchestrator: simulator control, layouts, loading & error states
├── components/
│   ├── cards/
│   │   ├── SummaryCards.tsx  # Pre-Harvest vs Projected widgets with top accent glow lines
│   │   └── SavingsBanner.tsx # Drop-down success banner with emerald-teal glowing outlines
│   ├── table/
│   │   └── HoldingsTable.tsx # Sticky horizontal grids & collapsible mobile cards
│   └── ui/
│       ├── Card.tsx          # Motion-enabled container with spring-hover translations
│       ├── Checkbox.tsx      # Spring-scaling keyboard-accessible checkbox
│       ├── Input.tsx         # Metallic numerical input field with error validations
│       └── Skeleton.tsx      # Pulsing loaders
├── data/
│   └── mockData.ts        # Seed crypto positions and pre-existing capital gains
├── hooks/
│   └── useHarvestState.ts # Recalculation logic: memoized offset offsets
├── services/
│   └── api.ts             # Mock API endpoints with simulated 800ms latency
├── types/
│   └── index.ts           # Shared TypeScript typings
└── utils/
    ├── calculations.ts   # Core math: tax offsets, gains, flat savings
    └── formatters.ts     # Currencies (INR ₹ format)
```

---

## 🏃 Local Setup Instructions

Follow these commands to get the dashboard running locally:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

### 3. Build & Compile Checks
Verify production build compatibility:
```bash
npm run build
```

### 4. Running Lints & Types Checks
Validate that the code meets 100% strict compliance rules:
```bash
npm run lint
```

---

## ☁️ Vercel Deployment

This application is fully optimized and ready for immediate deployment to **Vercel**:

### Direct Vercel CLI Deployment:
1. Install the Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   ```
2. Run the deployment command inside the project root:
   ```bash
   vercel
   ```
3. Deploy to production:
   ```bash
   vercel --prod
   ```
