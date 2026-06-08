# HarvestIQ Tax Dashboard — Frontend Component Map

> Last Updated: June 8, 2026
> Framework: Next.js 14 (App Router)

---

## Complete Component Tree

```
src/
├── app/
│   ├── layout.tsx                    [ROOT LAYOUT]
│   │   ├── <html>
│   │   │   ├── Plus_Jakarta_Sans font
│   │   │   └── <body>
│   │   │       └── {children}
│   │   │
│   │   └── <Dashboard />             [PAGE]
│   │       ├── <header>
│   │       │   ├── Logo ("H" + "HarvestIQ")
│   │       │   ├── Tax Year Badge
│   │       │   ├── Settings Button
│   │       │   └── User Avatar ("Chandan")
│   │       │
│   │       ├── <main>
│   │       │   ├── API Simulator Panel (conditional)
│   │       │   ├── Hero Section
│   │       │   │   ├── Title
│   │       │   │   ├── Description
│   │       │   │   ├── Auto-Select Losses Button
│   │       │   │   └── Sync Data Button
│   │       │   │
│   │       │   ├── Error State (conditional)
│   │       │   │   ├── AlertTriangle Icon
│   │       │   │   ├── Error Message
│   │       │   │   └── Retry Button
│   │       │   │
│   │       │   ├── Loading Skeletons (conditional)
│   │       │   │   ├── Card Skeletons x2
│   │       │   │   └── Table Skeleton
│   │       │   │
│   │       │   └── Dashboard Content (conditional)
│   │       │       ├── <SavingsBanner />
│   │       │       ├── <SummaryCards />
│   │       │       ├── Selection Stats (conditional)
│   │       │       └── <HoldingsTable />
│   │       │
│   │       └── <footer>
│   │           ├── "HarvestIQ Ledger System"
│   │           └── "Crafted with Heart using Next.js 14"
│   │
│   └── globals.css
│
├── components/
│   ├── ui/
│   │   ├── Card.tsx                   [REUSABLE]
│   │   ├── Checkbox.tsx               [REUSABLE]
│   │   ├── Input.tsx                  [REUSABLE]
│   │   └── Skeleton.tsx               [REUSABLE]
│   │
│   ├── cards/
│   │   ├── SummaryCards.tsx           [FEATURE]
│   │   └── SavingsBanner.tsx          [FEATURE]
│   │
│   └── table/
│       └── HoldingsTable.tsx          [FEATURE]
│
├── hooks/
│   └── useHarvestState.ts            [CUSTOM HOOK]
│
├── services/
│   └── api.ts                        [API LAYER]
│
├── data/
│   └── mockData.ts                   [STATIC DATA]
│
├── types/
│   └── index.ts                      [TYPE DEFINITIONS]
│
└── utils/
    ├── calculations.ts               [PURE FUNCTIONS]
    └── formatters.ts                  [PURE FUNCTIONS]
```

---

## App Structure

| Layer | File | Responsibility |
|-------|------|----------------|
| Root Layout | `src/app/layout.tsx` | HTML shell, font, metadata, dark theme |
| Page | `src/app/page.tsx` | Data fetching, state orchestration, layout |
| Feature | `src/components/cards/SummaryCards.tsx` | Pre/Post harvest comparison |
| Feature | `src/components/cards/SavingsBanner.tsx` | Tax savings display |
| Feature | `src/components/table/HoldingsTable.tsx` | Holdings management |
| UI | `src/components/ui/Card.tsx` | Animated glassmorphism wrapper |
| UI | `src/components/ui/Checkbox.tsx` | Selection control |
| UI | `src/components/ui/Input.tsx` | Data entry |
| UI | `src/components/ui/Skeleton.tsx` | Loading state |
| Hook | `src/hooks/useHarvestState.ts` | Business logic |
| Service | `src/services/api.ts` | API abstraction |
| Types | `src/types/index.ts` | Interface definitions |
| Utils | `src/utils/calculations.ts` | Math functions |
| Utils | `src/utils/formatters.ts` | Display formatting |
| Data | `src/data/mockData.ts` | Mock data |

---

## Component Relationships

### Import Graph

```
page.tsx
├── types/index.ts          (CryptoAsset, CapitalGainsData)
├── services/api.ts          (fetchHoldings, fetchCapitalGains, setHoldingsApiFailure, setGainsApiFailure)
├── hooks/useHarvestState.ts (useHarvestState)
├── components/cards/SummaryCards.tsx
│   ├── types/index.ts
│   ├── utils/formatters.ts
│   ├── components/ui/Card.tsx
│   └── framer-motion
├── components/cards/SavingsBanner.tsx
│   ├── utils/formatters.ts
│   └── framer-motion
├── components/table/HoldingsTable.tsx
│   ├── types/index.ts
│   ├── utils/formatters.ts
│   ├── components/ui/Checkbox.tsx
│   ├── components/ui/Input.tsx
│   ├── components/ui/Card.tsx
│   └── framer-motion
├── components/ui/Skeleton.tsx
├── utils/formatters.ts
└── framer-motion

hooks/useHarvestState.ts
├── types/index.ts          (CryptoAsset, CapitalGainsData, SelectedHolding)
└── utils/calculations.ts   (calculateNetGain, calculateRealisedGains, calculateHarvestSavings)

services/api.ts
├── types/index.ts          (CryptoAsset, CapitalGainsData)
└── data/mockData.ts        (mockCryptoAssets, initialCapitalGains)

components/ui/Card.tsx
├── clsx
├── tailwind-merge
└── framer-motion

components/ui/Checkbox.tsx
├── clsx
├── tailwind-merge
├── lucide-react
└── framer-motion

components/ui/Input.tsx
├── clsx
└── tailwind-merge

components/ui/Skeleton.tsx
├── clsx
└── tailwind-merge
```

---

## Data Flow Diagram

```
page.tsx (State Owner)
  State: assets, preGains, isLoading, error, simHoldingsError, simGainsError, showSimControls
  Hook Return: selectedHoldings, afterGains, taxSavings, isAllSelected, isSomeSelected,
               toggleSelect, updateAmountToSell, toggleSelectAll, reset
      |
      +---> SavingsBanner (savings, offsetAmount)
      +---> SummaryCards (preGains, afterGains, isHarvestingActive)
      |         +---> Card (ui)
      +---> HoldingsTable (assets, selectedHoldings, isAllSelected, isSomeSelected,
      |         |         onToggleSelect, onToggleSelectAll, onUpdateAmountToSell)
      |         +---> Checkbox (ui)
      |         +---> Input (ui)
      |         +---> Card (ui, mobile)
      +---> Selection Stats (inline)

Data Flow Direction:
  Page -> Props -> Components (unidirectional)
  Components -> Callbacks -> Page (events up)
  Hook -> Computed Values -> Page -> Props -> Components
```

---

## Hook Dependencies

### useHarvestState Hook

**Input:**
| Parameter | Type | Source |
|-----------|------|--------|
| `initialAssets` | `CryptoAsset[]` | `page.tsx` state (from `fetchHoldings()`) |
| `preGains` | `CapitalGainsData` | `page.tsx` state (from `fetchCapitalGains()`) |

**Output:**
| Return Value | Type | Computation |
|--------------|------|-------------|
| `selectedHoldings` | `Record<string, SelectedHolding>` | `useState` |
| `afterGains` | `CapitalGainsData` | `useMemo` - proportional gain/loss calculation |
| `taxSavings` | `number` | `useMemo` - 30% flat tax difference |
| `isAllSelected` | `boolean` | `useMemo` - all assets selected check |
| `isSomeSelected` | `boolean` | `useMemo` - partial selection check |
| `toggleSelect` | `(asset: CryptoAsset) => void` | `useCallback` |
| `updateAmountToSell` | `(id, amount, total) => void` | `useCallback` |
| `toggleSelectAll` | `(assets: CryptoAsset[]) => void` | `useCallback` |
| `reset` | `() => void` | `useCallback` |

**Internal Dependencies:**
- `calculateNetGain(profits, losses)` from `src/utils/calculations.ts`
- `calculateRealisedGains(stcgNet, ltcgNet)` from `src/utils/calculations.ts`
- `calculateHarvestSavings(pre, post, rate)` from `src/utils/calculations.ts`

---

## Utility Dependencies

### src/utils/calculations.ts

| Function | Used By | Purpose |
|----------|---------|---------|
| `calculateNetGain` | `useHarvestState.ts:101,102` | Profits - Losses |
| `calculateRealisedGains` | `useHarvestState.ts:103` | STCG Net + LTCG Net |
| `calculateHarvestSavings` | `useHarvestState.ts:122` | Tax savings at 30% rate |

### src/utils/formatters.ts

| Function | Used By | Purpose |
|----------|---------|---------|
| `formatCurrency` | `SummaryCards.tsx`, `SavingsBanner.tsx`, `HoldingsTable.tsx`, `page.tsx` | INR formatting |
| `formatPercentage` | **NOWHERE** | Unused |
| `formatCompactNumber` | **NOWHERE** | Unused |

---

## Missing Components

| # | Component | Purpose | Priority |
|---|-----------|---------|----------|
| 1 | `AuthForm` | Login/Register form | P0 |
| 2 | `AuthProvider` | Context for auth state | P0 |
| 3 | `ProtectedRoute` | Route guard | P0 |
| 4 | `PortfolioCard` | Portfolio summary | P1 |
| 5 | `PortfolioList` | Portfolio listing | P1 |
| 6 | `ReportCard` | Tax report display | P2 |
| 7 | `ReportList` | Report listing | P2 |
| 8 | `SettingsForm` | User settings | P2 |
| 9 | `Modal` | Dialog overlay | P1 |
| 10 | `Toast` | Notification system | P1 |
| 11 | `Dropdown` | Select menu | P1 |
| 12 | `Avatar` | User avatar | P1 |
| 13 | `Spinner` | Loading indicator | P1 |
| 14 | `ErrorBoundary` | React error boundary | P1 |
| 15 | `NotFound` | 404 page | P1 |

---

## Refactoring Opportunities

| # | Opportunity | File | Impact | Effort |
|---|-------------|------|--------|--------|
| 1 | Extract `AssetLogo` to shared component | `src/components/table/HoldingsTable.tsx:122-133` | Reusability | 30m |
| 2 | Extract `renderGainLossBadge` to shared component | `src/components/table/HoldingsTable.tsx:99-120` | Reusability | 30m |
| 3 | Extract `renderGainsSection` to shared component | `src/components/cards/SummaryCards.tsx:20-83` | Reusability | 30m |
| 4 | Create `useApi` hook for fetch/error/loading pattern | `src/app/page.tsx:44-68` | DRY | 2h |
| 5 | Move validation logic to separate module | `src/components/table/HoldingsTable.tsx:54-97` | Separation | 1h |
| 6 | Create constants file for magic numbers | Multiple files | Maintainability | 1h |

---

## Reusable Component Candidates

| Component | Current Location | Reuse Potential |
|-----------|------------------|-----------------|
| `Card` | `src/components/ui/Card.tsx` | High - already generic |
| `Checkbox` | `src/components/ui/Checkbox.tsx` | High - already generic |
| `Input` | `src/components/ui/Input.tsx` | High - already generic |
| `Skeleton` | `src/components/ui/Skeleton.tsx` | High - already generic |
| `AssetLogo` | `src/components/table/HoldingsTable.tsx:122-133` | Medium - extract to ui/ |
| `GainLossBadge` | `src/components/table/HoldingsTable.tsx:99-120` | Medium - extract to ui/ |
| `GainsSection` | `src/components/cards/SummaryCards.tsx:20-83` | Medium - extract to cards/ |

---

## Future Component Architecture

```
src/
├── components/
│   ├── ui/
│   │   ├── Card.tsx                    EXISTS
│   │   ├── Checkbox.tsx                EXISTS
│   │   ├── Input.tsx                   EXISTS
│   │   ├── Skeleton.tsx                EXISTS
│   │   ├── Button.tsx                  NEW
│   │   ├── Modal.tsx                   NEW
│   │   ├── Dropdown.tsx                NEW
│   │   ├── Avatar.tsx                  NEW
│   │   ├── Spinner.tsx                 NEW
│   │   ├── Toast.tsx                   NEW
│   │   └── ErrorBoundary.tsx           NEW
│   │
│   ├── layout/
│   │   ├── Header.tsx                  Extract from page.tsx
│   │   ├── Footer.tsx                  Extract from page.tsx
│   │   ├── Sidebar.tsx                 NEW
│   │   └── ProtectedLayout.tsx         NEW
│   │
│   ├── auth/
│   │   ├── LoginForm.tsx               NEW
│   │   ├── RegisterForm.tsx            NEW
│   │   └── AuthProvider.tsx            NEW
│   │
│   ├── cards/
│   │   ├── SummaryCards.tsx            EXISTS
│   │   ├── SavingsBanner.tsx           EXISTS
│   │   ├── PortfolioCard.tsx           NEW
│   │   └── ReportCard.tsx              NEW
│   │
│   ├── table/
│   │   ├── HoldingsTable.tsx           EXISTS
│   │   └── TransactionsTable.tsx       NEW
│   │
│   └── charts/
│       ├── GainLossChart.tsx           NEW
│       └── PortfolioChart.tsx          NEW
│
├── hooks/
│   ├── useHarvestState.ts              EXISTS
│   ├── useAuth.ts                      NEW
│   ├── usePortfolio.ts                 NEW
│   └── useApi.ts                       NEW
│
├── providers/
│   ├── AuthProvider.tsx                NEW
│   ├── ThemeProvider.tsx               NEW
│   └── ToastProvider.tsx               NEW
│
└── context/
    ├── AuthContext.tsx                  NEW
    └── ToastContext.tsx                 NEW
```
