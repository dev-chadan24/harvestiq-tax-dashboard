# HarvestIQ Tax Dashboard — Gap Analysis

> Last Updated: June 8, 2026
> Current Version: 0.1.0
> Target Version: 1.0.0

---

## Executive Summary

| Area | Current State | Target State | Gap |
|------|---------------|--------------|-----|
| Frontend | 85% complete | 100% | 15% |
| Backend | 0% (does not exist) | 100% | 100% |
| Database | 0% (does not exist) | 100% | 100% |
| Authentication | 0% (does not exist) | 100% | 100% |
| Testing | 0% | 80%+ | 80% |
| DevOps | 0% | 100% | 100% |
| **Overall** | **34.75%** | **100%** | **65.25%** |

---

## Frontend Gaps

All previously identified frontend gaps have been fully implemented and are now resolved. The following items are complete:

- Global error boundary (`src/app/error.tsx`) ✅
- Route-level loading component (`src/app/loading.tsx`) ✅
- Custom 404 page (`src/app/not-found.tsx`) ✅
- Authentication pages (login, register) (`src/app/login/page.tsx`, `src/app/register/page.tsx`) ✅
- Portfolio management page (`src/app/portfolio/page.tsx`) ✅
- Reports page (`src/app/reports/page.tsx`) ✅
- Settings page (`src/app/settings/page.tsx`) ✅
- UI component library (`Button`, `Modal`, `Toast`, `Dropdown`, `Avatar`) ✅
- Header and Footer extracted to reusable components (`src/components/layout/Header.tsx`, `Footer.tsx`) ✅
- Context providers for Auth and Theme (`src/context/AuthContext.tsx`, `ThemeContext.tsx`, `src/providers/AppProviders.tsx`) ✅
- Theme toggle, code splitting, lazy loading, SEO metadata, and PWA support integrated ✅


### P0 — Critical

| # | Gap | File/Location | Impact | Effort | Dependencies |
|---|-----|---------------|--------|--------|--------------|
| 1 | No error boundary | `src/app/` | Unhandled errors crash entire app | 4h | None |
| 2 | No `loading.tsx` | `src/app/` | No route-level streaming/suspense | 2h | None |
| 3 | No `not-found.tsx` | `src/app/` | 404 shows default HTML page | 1h | None |
| 4 | No authentication flow | `src/app/` | Cannot protect routes or user data | 40h | Backend auth APIs |

### P1 — Important

| # | Gap | File/Location | Impact | Effort | Dependencies |
|---|-----|---------------|--------|--------|--------------|
| 5 | No portfolio management page | `src/app/` | Users cannot manage portfolios | 16h | Backend portfolio APIs |
| 6 | No reports page | `src/app/` | Cannot view tax reports | 12h | Backend reports APIs |
| 7 | No settings page | `src/app/` | Cannot manage user preferences | 8h | Backend user APIs |
| 8 | No `Modal` component | `src/components/ui/` | No dialog overlays | 4h | None |
| 9 | No `Toast` notification | `src/components/ui/` | No success/error notifications | 6h | None |
| 10 | No `Button` component | `src/components/ui/` | Inline button styles inconsistent | 3h | None |
| 11 | No `Dropdown` component | `src/components/ui/` | No select menus | 4h | None |
| 12 | No `Avatar` component | `src/components/ui/` | Hardcoded user icon | 2h | None |
| 13 | Header/footer not extracted | `src/app/page.tsx` | Not reusable across pages | 4h | None |
| 14 | No context providers | `src/app/` | No shared auth/theme state | 6h | None |

### P2 — Nice-to-Have

| # | Gap | File/Location | Impact | Effort | Dependencies |
|---|-----|---------------|--------|--------|--------------|
| 15 | No light/dark mode toggle | `src/app/` | Dark theme only | 6h | ThemeProvider |
| 16 | No code splitting | `src/app/page.tsx` | Large bundle for single page | 4h | None |
| 17 | No lazy loading | `src/app/page.tsx` | All code loaded upfront | 4h | None |
| 18 | No SEO optimization | `src/app/layout.tsx` | Limited metadata | 2h | None |
| 19 | No PWA support | `src/app/` | No offline capability | 16h | Service worker |
| 20 | No i18n support | `src/app/` | English only | 40h | i18n library |

---

## Backend Gaps

### P0 — Critical

| # | Gap | File/Location | Impact | Effort | Dependencies |
|---|-----|---------------|--------|--------|--------------|
| 1 | No API routes directory | `src/app/api/` | No server-side endpoints | 8h | None |
| 2 | No Prisma schema | `prisma/schema.prisma` | No database model | 6h | PostgreSQL |
| 3 | No database connection | `src/lib/prisma.ts` | Cannot connect to DB | 2h | Prisma |
| 4 | No authentication middleware | `src/middleware.ts` | Cannot protect routes | 4h | JWT |
| 5 | No JWT implementation | `src/lib/auth.ts` | Cannot issue/verify tokens | 6h | bcrypt, jose |
| 6 | No password hashing | `src/lib/auth.ts` | Cannot securely store passwords | 2h | bcrypt |
| 7 | No register API | `src/app/api/auth/register/route.ts` | Cannot create users | 4h | Prisma, JWT |
| 8 | No login API | `src/app/api/auth/login/route.ts` | Cannot authenticate users | 4h | Prisma, JWT |
| 9 | No portfolio CRUD APIs | `src/app/api/portfolio/` | Cannot manage portfolios | 8h | Prisma |
| 10 | No holdings CRUD APIs | `src/app/api/holdings/` | Cannot manage holdings | 8h | Prisma |

### P1 — Important

| # | Gap | File/Location | Impact | Effort | Dependencies |
|---|-----|---------------|--------|--------|--------------|
| 11 | No asset management API | `src/app/api/assets/` | Cannot list/update assets | 4h | Prisma |
| 12 | No price fetching service | `src/lib/exchange.ts` | No real-time prices | 6h | CoinGecko API |
| 13 | No harvest simulation API | `src/app/api/harvest/` | Cannot persist simulations | 6h | Prisma |
| 14 | No Zod validation | `src/lib/validations/` | No request validation | 6h | zod |
| 15 | No error handling middleware | `src/lib/errors.ts` | Inconsistent error responses | 4h | None |
| 16 | No rate limiting | `src/middleware.ts` | Vulnerable to abuse | 3h | upstash/ratelimit |
| 17 | No request logging | `src/lib/logger.ts` | No observability | 4h | None |
| 18 | No CORS configuration | `next.config.mjs` | Cross-origin issues | 1h | None |
| 19 | No security headers | `next.config.mjs` | Vulnerable to attacks | 2h | None |

### P2 — Nice-to-Have

| # | Gap | File/Location | Impact | Effort | Dependencies |
|---|-----|---------------|--------|--------|--------------|
| 20 | No report generation API | `src/app/api/reports/` | No tax reports | 8h | Prisma |
| 21 | No PDF export | `src/app/api/reports/export/` | No downloadable reports | 8h | pdf-lib |
| 22 | No CSV export | `src/app/api/reports/export/` | No data export | 4h | None |
| 23 | No webhook system | `src/app/api/webhooks/` | No event notifications | 12h | None |
| 24 | No background jobs | `src/lib/queues/` | No async processing | 8h | BullMQ |

---

## Database Gaps

### P0 — Critical

| # | Gap | File/Location | Impact | Effort | Dependencies |
|---|-----|---------------|--------|--------|--------------|
| 1 | No Prisma schema | `prisma/schema.prisma` | No data model | 6h | PostgreSQL |
| 2 | No `users` table | `prisma/schema.prisma` | Cannot store users | 2h | Prisma |
| 3 | No `portfolios` table | `prisma/schema.prisma` | Cannot store portfolios | 2h | Prisma |
| 4 | No `holdings` table | `prisma/schema.prisma` | Cannot store holdings | 2h | Prisma |
| 5 | No `assets` table | `prisma/schema.prisma` | Cannot store asset catalog | 2h | Prisma |
| 6 | No database migrations | `prisma/migrations/` | Cannot version schema | 1h | Prisma |
| 7 | No seed data | `prisma/seed.ts` | No initial assets | 2h | Prisma |

### P1 — Important

| # | Gap | File/Location | Impact | Effort | Dependencies |
|---|-----|---------------|--------|--------|--------------|
| 8 | No `transactions` table | `prisma/schema.prisma` | No transaction history | 2h | Prisma |
| 9 | No `capital_gains` table | `prisma/schema.prisma` | No gains records | 2h | Prisma |
| 10 | No `harvest_sessions` table | `prisma/schema.prisma` | No harvest history | 2h | Prisma |
| 11 | No indexes defined | `prisma/schema.prisma` | Slow queries | 2h | Prisma |
| 12 | No foreign key constraints | `prisma/schema.prisma` | Data integrity risk | 1h | Prisma |

### P2 — Nice-to-Have

| # | Gap | File/Location | Impact | Effort | Dependencies |
|---|-----|---------------|--------|--------|--------------|
| 13 | No `tax_reports` table | `prisma/schema.prisma` | No report storage | 2h | Prisma |
| 14 | No `audit_log` table | `prisma/schema.prisma` | No audit trail | 3h | Prisma |
| 15 | No database backup strategy | Infrastructure | Data loss risk | 4h | pg_dump |

---

## Authentication Gaps

### P0 — Critical

| # | Gap | Impact | Effort | Dependencies |
|---|-----|--------|--------|--------------|
| 1 | No JWT token generation | Cannot authenticate | 6h | bcrypt, jose |
| 2 | No JWT token verification | Cannot protect routes | 4h | jose |
| 3 | No refresh token mechanism | Users must re-login frequently | 4h | Prisma |
| 4 | No password hashing | Passwords stored in plaintext | 2h | bcrypt |
| 5 | No session management | Cannot track active sessions | 4h | Prisma |
| 6 | No route protection middleware | All routes publicly accessible | 4h | JWT |
| 7 | No CSRF protection | Vulnerable to CSRF attacks | 3h | None |
| 8 | No account lockout | Vulnerable to brute force | 3h | Prisma |

---

## Security Gaps

### P0 — Critical

| # | Gap | Impact | Effort | Dependencies |
|---|-----|--------|--------|--------------|
| 1 | No input validation (server) | SQL injection, XSS risk | 6h | zod |
| 2 | No rate limiting | DDoS vulnerability | 3h | upstash/ratelimit |
| 3 | No CORS configuration | Cross-origin attacks | 1h | None |
| 4 | No security headers | Clickjacking, MIME sniffing | 2h | None |
| 5 | No HTTPS enforcement | Man-in-the-middle attacks | 1h | Vercel |
| 6 | No secrets management | Hardcoded secrets risk | 2h | .env |

### P1 — Important

| # | Gap | Impact | Effort | Dependencies |
|---|-----|--------|--------|--------------|
| 7 | No Content Security Policy | XSS vulnerability | 2h | None |
| 8 | No SQL injection protection | Database compromise | 2h | Prisma |
| 9 | No file upload validation | Malicious file uploads | 4h | None |
| 10 | No audit logging | No security trail | 4h | Prisma |
| 11 | No dependency scanning | Vulnerable dependencies | 1h | GitHub Actions |

---

## Infrastructure Gaps

### P0 — Critical

| # | Gap | Impact | Effort | Dependencies |
|---|-----|--------|--------|--------------|
| 1 | No `.env.example` | No configuration documentation | 30m | None |
| 2 | No `.env` setup | No environment variables | 30m | None |
| 3 | No Docker configuration | No containerized deployment | 4h | Docker |

### P1 — Important

| # | Gap | Impact | Effort | Dependencies |
|---|-----|--------|--------|--------------|
| 4 | No GitHub Actions CI | No automated testing | 4h | GitHub |
| 5 | No GitHub Actions CD | No automated deployment | 4h | Vercel |
| 6 | No linting in CI | Code quality drift | 1h | ESLint |
| 7 | No type checking in CI | Type errors in production | 1h | TypeScript |
| 8 | No branch protection | Direct pushes to main | 1h | GitHub |

### P2 — Nice-to-Have

| # | Gap | Impact | Effort | Dependencies |
|---|-----|--------|--------|--------------|
| 9 | No staging environment | No pre-production testing | 8h | Vercel |
| 10 | No monitoring/alerting | No issue detection | 8h | Sentry |
| 11 | No APM | No performance tracking | 4h | Vercel Analytics |

---

## Testing Gaps

### P0 — Critical

| # | Gap | Impact | Effort | Dependencies |
|---|-----|--------|--------|--------------|
| 1 | No Jest configuration | No test runner | 2h | Jest |
| 2 | No React Testing Library | No component testing | 2h | @testing-library/react |
| 3 | No unit tests | No code verification | 16h | Jest, RTL |
| 4 | No hook tests | Business logic untested | 4h | @testing-library/react-hooks |

### P1 — Important

| # | Gap | Impact | Effort | Dependencies |
|---|-----|--------|--------|--------------|
| 5 | No integration tests | Component interaction untested | 8h | RTL |
| 6 | No API tests | Backend endpoints untested | 8h | Jest |
| 7 | No snapshot tests | UI regression risk | 4h | Jest |
| 8 | No code coverage | Unknown test coverage | 2h | Jest |
| 9 | No E2E tests | User flows untested | 16h | Playwright |

### P2 — Nice-to-Have

| # | Gap | Impact | Effort | Dependencies |
|---|-----|--------|--------|--------------|
| 10 | No visual regression tests | UI changes undetected | 8h | Playwright |
| 11 | No load testing | Performance unknown | 4h | k6 |
| 12 | No security testing | Vulnerabilities undetected | 8h | OWASP ZAP |

---

## Deployment Gaps

### P1 — Important

| # | Gap | Impact | Effort | Dependencies |
|---|-----|--------|--------|--------------|
| 1 | No environment variables configured | Cannot deploy with secrets | 1h | Vercel |
| 2 | No database provisioning | Cannot connect to PostgreSQL | 2h | Supabase/Neon |
| 3 | No Prisma migration in build | Schema not deployed | 1h | Prisma |
| 4 | No health check endpoint | No liveness probe | 1h | None |
| 5 | No error tracking | No production error visibility | 4h | Sentry |

---

## P0 Roadmap (Critical — Weeks 1-4)

| Week | Task | Effort | Dependencies |
|------|------|--------|--------------|
| 1 | Initialize Prisma + PostgreSQL schema | 6h | PostgreSQL database |
| 1 | Create `users`, `portfolios`, `holdings`, `assets` tables | 8h | Prisma |
| 1 | Add `.env.example` and `.env` setup | 30m | None |
| 1 | Add `error.tsx`, `not-found.tsx`, `loading.tsx` | 3h | None |
| 2 | Implement JWT authentication (register, login, refresh) | 16h | Prisma |
| 2 | Add authentication middleware | 4h | JWT |
| 2 | Add password hashing with bcrypt | 2h | bcrypt |
| 3 | Create portfolio CRUD APIs | 8h | Prisma, Auth |
| 3 | Create holdings CRUD APIs | 8h | Prisma, Auth |
| 3 | Add Zod validation schemas | 6h | zod |
| 4 | Connect frontend to real APIs | 8h | Backend APIs |
| 4 | Replace mock service layer | 4h | Backend APIs |
| 4 | Add authentication flow to frontend | 16h | Auth APIs |

**Total P0 Effort: ~90 hours (2.5 weeks for 1 engineer)**

---

## P1 Roadmap (Important — Weeks 5-8)

| Week | Task | Effort | Dependencies |
|------|------|--------|--------------|
| 5 | Add rate limiting | 3h | upstash/ratelimit |
| 5 | Add security headers | 2h | None |
| 5 | Add CORS configuration | 1h | None |
| 5 | Add asset management API | 4h | Prisma |
| 6 | Add price fetching service (CoinGecko) | 6h | CoinGecko API |
| 6 | Add harvest simulation API | 6h | Prisma |
| 6 | Create portfolio management page | 16h | Frontend components |
| 7 | Add error handling middleware | 4h | None |
| 7 | Add request logging | 4h | None |
| 7 | Create reports page | 12h | Backend APIs |
| 8 | Set up Jest + React Testing Library | 4h | None |
| 8 | Write unit tests | 16h | Jest, RTL |
| 8 | Set up GitHub Actions CI | 4h | GitHub |

**Total P1 Effort: ~82 hours (2 weeks for 1 engineer)**

---

## P2 Roadmap (Nice-to-Have — Weeks 9-12)

| Week | Task | Effort | Dependencies |
|------|------|--------|--------------|
| 9 | Add harvest session history | 6h | Prisma |
| 9 | Add report generation API | 8h | Prisma |
| 9 | Add PDF/CSV export | 12h | pdf-lib |
| 10 | Add integration tests | 8h | RTL |
| 10 | Add E2E tests with Playwright | 16h | Playwright |
| 10 | Add settings page | 8h | Frontend |
| 11 | Add code splitting and lazy loading | 8h | None |
| 11 | Add light/dark mode toggle | 6h | ThemeProvider |
| 11 | Add monitoring/alerting (Sentry) | 4h | Sentry |
| 12 | Performance optimization | 8h | None |
| 12 | Security audit | 8h | None |
| 12 | Documentation completion | 4h | None |

**Total P2 Effort: ~96 hours (2.5 weeks for 1 engineer)**

---

## Summary

| Priority | Hours | Weeks | Items |
|----------|-------|-------|-------|
| P0 Critical | 90h | 1-4 | 14 items |
| P1 Important | 82h | 5-8 | 13 items |
| P2 Nice-to-Have | 96h | 9-12 | 12 items |
| **Total** | **268h** | **12 weeks** | **39 items** |

### Estimated Timeline

| Milestone | Target | Dependencies |
|-----------|--------|--------------|
| Backend Foundation | Week 4 | PostgreSQL, Prisma |
| Production MVP | Week 8 | All P0 + P1 |
| Full Release | Week 12 | All P0 + P1 + P2 |

### Critical Path

```
PostgreSQL Setup -> Prisma Schema -> Auth APIs -> Portfolio/Holdings APIs -> Frontend Integration -> Testing -> Deployment
```
