# HarvestIQ — Tax Loss Harvesting Dashboard

A modern and responsive Tax Loss Harvesting Dashboard built using Next.js, TypeScript, Tailwind CSS, and Framer Motion.

This project simulates a crypto portfolio tax harvesting workflow where users can select holdings, adjust sell amounts, and view real-time capital gains updates along with estimated tax savings.

## Live Demo

https://harvest-tax-dashboard.vercel.app/

## Features

- Real-time tax loss harvesting calculations
- Short-term and long-term capital gains tracking
- Dynamic “After Harvesting” updates
- Editable amount-to-sell inputs
- Responsive dashboard UI
- Premium fintech-inspired dark theme
- Smooth animations and micro-interactions
- Mock API integration with loading and error states
- Mobile-friendly holdings table
- Select all / individual asset harvesting support

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

## Project Structure

```bash
src/
├── app/
├── components/
├── hooks/
├── services/
├── utils/
├── data/
└── types/

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
