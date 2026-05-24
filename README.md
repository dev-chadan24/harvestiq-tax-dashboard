<a id="readme-top"></a>

<div align="center">

[![Stars][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<br />

<div align="center">

# HarvestIQ — Tax Loss Harvesting Dashboard

A production-grade cryptocurrency tax-loss harvesting dashboard built with Next.js, TypeScript, and Tailwind CSS.

Designed to simulate real-world portfolio management workflows with real-time tax calculations, dynamic harvesting strategies, and a premium fintech-inspired user experience.

### [Live Demo](https://harvest-tax-dashboard.vercel.app/) • [Source Code](https://github.com/dev-chadan24/harvestiq-tax-dashboard)

</div>

---

## Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture Flow](#architecture-flow)
- [Technical Highlights](#technical-highlights)
- [Engineering Challenges](#engineering-challenges)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Skills Demonstrated](#skills-demonstrated)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

---

## About The Project

HarvestIQ is an interactive tax-loss harvesting dashboard that helps users visualize how strategic asset sales can reduce taxable gains within a cryptocurrency portfolio.

The application provides real-time calculations for capital gains, losses, and estimated tax savings while allowing users to simulate harvesting scenarios through editable portfolio positions.

Built as a frontend-focused fintech application, the project emphasizes scalable architecture, responsive design, state management, and production-style user experience patterns.

### Why HarvestIQ?

- Simplifies complex crypto tax calculations
- Demonstrates real-world financial dashboard workflows
- Provides instant feedback through live calculations
- Showcases scalable frontend architecture
- Delivers a premium fintech user experience

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Key Features

### 📊 Real-Time Tax Calculations

Instantly recalculate gains, losses, and estimated tax savings based on user actions.

### 📈 Capital Gains Tracking

Separate short-term and long-term gains for better financial visibility.

### ⚡ Dynamic Harvesting Simulation

View portfolio outcomes immediately as positions are selected or adjusted.

### ✏️ Editable Sell Amounts

Simulate partial or complete asset liquidation scenarios.

### 🎨 Premium Fintech Interface

Modern dark-theme dashboard inspired by professional financial platforms.

### 🎭 Smooth User Experience

Micro-interactions and animations powered by Framer Motion.

### 📱 Fully Responsive Design

Optimized for desktop, tablet, and mobile devices.

### 🔌 Mock API Integration

Includes realistic loading, success, and error states for production-style behavior.

### ✅ Bulk Asset Selection

Support for individual and multi-asset harvesting strategies.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### UI & Experience

- Framer Motion
- Lucide React Icons

### Development Tools

- ESLint
- npm
- Vercel

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Architecture Flow

```text
User Interaction
       │
       ▼
Asset Selection
       │
       ▼
Harvest Calculation Engine
       │
       ▼
Tax Savings Computation
       │
       ▼
Dashboard State Update
       │
       ▼
Real-Time UI Rendering
```

### Workflow

1. User selects one or more portfolio holdings.
2. Sell quantities are adjusted dynamically.
3. Harvesting calculations run instantly.
4. Capital gains and losses are recalculated.
5. Estimated tax savings are updated.
6. Dashboard metrics refresh in real time.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Technical Highlights

- Built using Next.js App Router architecture
- Fully typed with TypeScript
- Custom React hooks for business logic management
- Reusable component-based design system
- Derived state calculations for real-time updates
- Responsive mobile-first implementation
- Loading, empty, and error state handling
- Mock service layer for future backend integration
- Clean and scalable project structure
- Smooth animations with optimized rendering

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Engineering Challenges

### Real-Time Financial Calculations

Maintaining accurate tax-loss harvesting calculations while users continuously modify sell amounts and selected holdings.

### State Synchronization

Keeping portfolio tables, summary cards, savings indicators, and tax calculations synchronized without unnecessary complexity.

### Production-Style User Experience

Designing realistic loading states, error handling mechanisms, and responsive layouts to emulate enterprise-grade fintech products.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Getting Started

### Prerequisites

Ensure Node.js is installed on your machine.

Verify installation:

```bash
node -v
npm -v
```

### Installation

Clone the repository:

```bash
git clone https://github.com/dev-chadan24/harvestiq-tax-dashboard.git
```

Move into the project directory:

```bash
cd harvestiq-tax-dashboard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Run lint checks:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Usage

### Portfolio Analysis

Review portfolio holdings and capital gains information before harvesting actions.

### Asset Selection

Select individual holdings or multiple positions simultaneously.

### Harvesting Simulation

Adjust sell amounts and instantly observe changes to gains, losses, and tax obligations.

### Savings Tracking

Monitor estimated tax savings generated by harvesting strategies.

### Error Testing

Simulate API failures and loading states through the built-in development controls.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Project Structure

```text
harvestiq-tax-dashboard/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── cards/
│   │   ├── table/
│   │   └── ui/
│   ├── data/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── utils/
├── package.json
├── tsconfig.json
└── README.md
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Future Enhancements

- User authentication
- Portfolio persistence
- Exchange API integrations
- Historical tax reports
- PDF export functionality
- Multi-country tax support
- Portfolio analytics dashboard
- AI-assisted harvesting recommendations

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Skills Demonstrated

### Frontend Engineering

- React.js
- Next.js
- TypeScript
- Tailwind CSS

### Software Development

- State Management
- Component Architecture
- Business Logic Design
- Data Transformation
- API Integration Patterns

### UI/UX Development

- Responsive Design
- User Experience Design
- Accessibility Awareness
- Animation & Interaction Design

### Professional Practices

- Clean Code Organization
- Scalable Folder Structures
- Type Safety
- Error Handling
- Performance Optimization

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Roadmap

- [x] Portfolio Dashboard
- [x] Harvesting Simulation Engine
- [x] Real-Time Tax Calculations
- [x] Dynamic Asset Selection
- [x] Responsive UI
- [x] Mock API Layer
- [ ] Exchange Integrations
- [ ] Authentication System
- [ ] Export Reports
- [ ] Advanced Analytics

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## License

This project is licensed under the MIT License.

See the LICENSE file for details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Contact

**Chandan Mahapatra**

GitHub: https://github.com/dev-chadan24

LinkedIn: https://linkedin.com/in/chandan-mahapatra

Project Repository:

https://github.com/dev-chadan24/harvestiq-tax-dashboard

Live Demo:

https://harvest-tax-dashboard.vercel.app/

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- BADGES -->

[stars-shield]: https://img.shields.io/github/stars/dev-chadan24/harvestiq-tax-dashboard?style=for-the-badge
[stars-url]: https://github.com/dev-chadan24/harvestiq-tax-dashboard/stargazers

[issues-shield]: https://img.shields.io/github/issues/dev-chadan24/harvestiq-tax-dashboard?style=for-the-badge
[issues-url]: https://github.com/dev-chadan24/harvestiq-tax-dashboard/issues

[license-shield]: https://img.shields.io/github/license/dev-chadan24/harvestiq-tax-dashboard?style=for-the-badge
[license-url]: https://github.com/dev-chadan24/harvestiq-tax-dashboard/blob/main/LICENSE

[linkedin-shield]: https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin
[linkedin-url]: https://linkedin.com/in/chandan-mahapatra
