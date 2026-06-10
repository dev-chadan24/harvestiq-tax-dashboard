# Changelog

## Phase 1: Database Schema & Authentication
**Date**: 2026-06-09

### Architectural Decisions
- **Prisma + PostgreSQL (Neon)**: Chosen for a robust, strongly-typed serverless database layer. The schema is built to accommodate multiple portfolios per user (with individual base currencies), a tax profile model for overriding default brackets, and Stripe monetization fields (ready to be gated later).
- **NextAuth.js v5**: Integrated with the Prisma adapter to support seamless Google OAuth and Magic Link authentication, configured to meet the platform's requirements securely.
- **Zod Validation**: A base setup was initialized (e.g., `portfolio.schema.ts`) to ensure all API routes will strictly validate their inputs, removing raw `req.body` access as requested.

### Additions
- Created `prisma/schema.prisma` with `User`, `Account`, `Session`, `TaxProfile`, `Portfolio`, `Holding`, and `Harvest` models.
- Configured a Singleton Prisma client at `src/lib/db/prisma.ts`.
- Added NextAuth setup in `src/lib/auth.ts` and Next.js route handler in `src/app/api/auth/[...nextauth]/route.ts`.
- Defined `.env.example` and `.env.local` templates covering Database, NextAuth, Google OAuth, Email SMTP, and Redis configurations.
- Added `zod` schema for Portfolio inputs at `src/lib/validations/portfolio.schema.ts`.
- Created this `ChangeByAkash.md` log file.
