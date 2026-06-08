# HarvestIQ Tax Dashboard — Project Status

> Last Updated: June 8, 2026
> Version: 0.1.0
> Sprint: Pre-Development

---

## Current Completion Percentage

### Overall: 34.75%

`
¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦  34.75%
`

---

## Category Breakdown

| Category | Weight | Status | Completion | Bar |
|----------|--------|--------|------------|-----|
| UI Components | 15% | ? Complete | 100% | ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ |
| Business Logic | 15% | ? Mostly Complete | 85% | ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ |
| State Management | 10% | ? Appropriate | 70% | ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ |
| Data Layer | 15% | ? Not Started | 0% | ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ |
| API Layer | 15% | ? Not Started | 0% | ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ |
| Authentication | 10% | ? Not Started | 0% | ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ |
| Testing | 10% | ? Not Started | 0% | ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ |
| DevOps/CI | 10% | ? Not Started | 0% | ¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦ |

---

## Feature Status Dashboard

### ? Complete Features (17)

| # | Feature | Component | Status |
|---|---------|-----------|--------|
| 1 | Tax-loss harvesting calculation | src/hooks/useHarvestState.ts | ? |
| 2 | 30% flat tax savings | src/utils/calculations.ts | ? |
| 3 | Holdings table (desktop) | src/components/table/HoldingsTable.tsx | ? |
| 4 | Holdings table (mobile) | src/components/table/HoldingsTable.tsx | ? |
| 5 | Checkbox selection | src/components/ui/Checkbox.tsx | ? |
| 6 | Editable sell amounts | src/components/table/HoldingsTable.tsx | ? |
| 7 | Input validation | src/components/table/HoldingsTable.tsx | ? |
| 8 | Pre/Post comparison cards | src/components/cards/SummaryCards.tsx | ? |
| 9 | Savings banner | src/components/cards/SavingsBanner.tsx | ? |
| 10 | Loading skeletons | src/components/ui/Skeleton.tsx | ? |
| 11 | Error state with retry | src/app/page.tsx | ? |
| 12 | API failure simulation | src/app/page.tsx | ? |
| 13 | Auto-select losses | src/app/page.tsx | ? |
| 14 | Select All / Deselect All | src/hooks/useHarvestState.ts | ? |
| 15 | INR currency formatting | src/utils/formatters.ts | ? |
| 16 | Glassmorphism dark theme | src/app/globals.css | ? |
| 17 | Responsive design | All components | ? |

### ?? Incomplete Features (6)

| # | Feature | File | Issue |
|---|---------|------|-------|
| 1 | ormatPercentage | src/utils/formatters.ts:19-26 | Exported, never used |
| 2 | ormatCompactNumber | src/utils/formatters.ts:32-38 | Exported, never used |
| 3 | HarvestState type | src/types/index.ts:30-32 | Defined, never imported |
| 4 | Geist fonts | src/app/fonts/ | Files exist, not used |
| 5 | Next.js config | 
ext.config.mjs | Empty object |
| 6 | Tailwind content | 	ailwind.config.ts:5 | References non-existent path |

### ? Missing Features (23)

| # | Feature | Priority | Category |
|---|---------|----------|----------|
| 1 | User authentication | P0 | Auth |
| 2 | User registration | P0 | Auth |
| 3 | JWT token management | P0 | Auth |
| 4 | Password hashing | P0 | Auth |
| 5 | Database schema | P0 | Data |
| 6 | Prisma ORM setup | P0 | Data |
| 7 | User model | P0 | Data |
| 8 | Portfolio model | P0 | Data |
| 9 | Holdings model | P0 | Data |
| 10 | API route: /api/auth/* | P0 | API |
| 11 | API route: /api/portfolio | P1 | API |
| 12 | API route: /api/holdings | P1 | API |
| 13 | API route: /api/assets | P1 | API |
| 14 | Login page | P0 | UI |
| 15 | Register page | P0 | UI |
| 16 | Portfolio page | P1 | UI |
| 17 | Error boundary (error.tsx) | P1 | UI |
| 18 | Not found page (not-found.tsx) | P1 | UI |
| 19 | Unit tests | P1 | Testing |
| 20 | Integration tests | P1 | Testing |
| 21 | E2E tests | P2 | Testing |
| 22 | CI/CD pipeline | P1 | DevOps |
| 23 | Environment config | P1 | DevOps |

---

## Critical Blockers

| # | Blocker | Impact | Resolution |
|---|---------|--------|------------|
| 1 | No database | Cannot persist any data | Initialize Prisma + PostgreSQL |
| 2 | No authentication | Cannot secure user data | Implement JWT auth flow |
| 3 | No API routes | Frontend cannot communicate with backend | Create src/app/api/ structure |
| 4 | No .env file | No configuration management | Create .env.example |

---

## Development Health

| Metric | Value | Target |
|--------|-------|--------|
| Source Files | 19 | — |
| Total Lines | ~2,000 | — |
| Components | 7 | — |
| Hooks | 1 | — |
| Pages | 1 | — |
| Test Files | 0 | 50+ |
| Test Coverage | 0% | 80% |
| Lint Errors | 0 | 0 |
| TypeScript Errors | 0 | 0 |
| Dependencies | 7 runtime | — |
| Dev Dependencies | 8 | — |

---

## Technical Debt Summary

| # | Debt Item | Severity | Effort |
|---|-----------|----------|--------|
| 1 | Global mutable state in mock API | Medium | 2h |
| 2 | Unused utility functions | Low | 15m |
| 3 | Unused type definition | Low | 15m |
| 4 | Unused font files | Low | 15m |
| 5 | Empty Next.js config | Low | 30m |
| 6 | Invalid Tailwind path | Low | 5m |
| 7 | Missing .env.example | Medium | 30m |
| 8 | Missing LICENSE | Low | 5m |
| 9 | No error boundaries | High | 4h |
| 10 | No loading.tsx | Medium | 2h |

---

## Immediate Next Steps

### This Week (Week 1)

| # | Task | Priority | Owner | Est. |
|---|------|----------|-------|------|
| 1 | Create .env.example | P0 | Backend | 30m |
| 2 | Initialize Prisma + PostgreSQL | P0 | Backend | 4h |
| 3 | Create database schema | P0 | Backend | 6h |
| 4 | Add error.tsx to src/app/ | P1 | Frontend | 2h |
| 5 | Add 
ot-found.tsx to src/app/ | P1 | Frontend | 1h |
| 6 | Remove unused code | P2 | Frontend | 30m |
| 7 | Fix Tailwind content path | P2 | Frontend | 5m |
| 8 | Add LICENSE file | P2 | DevOps | 5m |

### Next Week (Week 2)

| # | Task | Priority | Owner | Est. |
|---|------|----------|-------|------|
| 1 | Set up Next.js API routes | P0 | Backend | 4h |
| 2 | Implement JWT authentication | P0 | Backend | 8h |
| 3 | Create user registration API | P0 | Backend | 4h |
| 4 | Create user login API | P0 | Backend | 4h |
| 5 | Add Zod validation schemas | P1 | Backend | 4h |
| 6 | Set up Jest configuration | P1 | Frontend | 2h |
| 7 | Write first unit tests | P1 | Frontend | 4h |
| 8 | Create GitHub Actions workflow | P1 | DevOps | 2h |

---

## Release Readiness

### v0.1.0 (Current) — Demo Release
- ? Single-page tax-loss harvesting demo
- ? Mock data with 9 crypto assets
- ? Interactive harvest simulation
- ? Responsive design
- ? Deployed to Vercel

### v0.2.0 (Target) — Backend Foundation
- [ ] PostgreSQL database with Prisma
- [ ] User authentication (JWT)
- [ ] API routes for holdings and gains
- [ ] Environment configuration
- [ ] Error boundaries

### v1.0.0 (Target) — Production Release
- [ ] Complete authentication flow
- [ ] Portfolio management
- [ ] Real-time price data (CoinGecko)
- [ ] Tax report generation
- [ ] 80% test coverage
- [ ] CI/CD pipeline
- [ ] Rate limiting
- [ ] Security audit
