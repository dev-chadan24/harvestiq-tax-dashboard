# HarvestIQ Tax Dashboard — Backend API Map

> Last Updated: June 8, 2026
> Backend Stack: Next.js API Routes + PostgreSQL + Prisma

---

## Existing Mock APIs

### fetchHoldings()

| Property | Value |
|----------|-------|
| File | `src/services/api.ts:22-33` |
| Type | Mock (no real HTTP) |
| Latency | 800ms simulated |
| Returns | `CryptoAsset[]` |
| Failure Simulation | `setHoldingsApiFailure(true)` |

### fetchCapitalGains()

| Property | Value |
|----------|-------|
| File | `src/services/api.ts:38-48` |
| Type | Mock (no real HTTP) |
| Latency | 800ms simulated |
| Returns | `CapitalGainsData` |
| Failure Simulation | `setGainsApiFailure(true)` |

---

## Required Production APIs

### Base URL

```
Development: http://localhost:3000/api
Production:  https://harvest-tax-dashboard.vercel.app/api
```

### Common Response Format

```json
// Success Response
{
  "success": true,
  "data": T,
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": { "email": ["Email is required"] }
  }
}
```

---

## Authentication APIs

### POST /api/auth/register

| Property | Value |
|----------|-------|
| Purpose | Register a new user |
| Authentication Required | No |
| Rate Limit | 5 requests per minute |

**Request Schema:**
```json
{
  "email": "string (required, valid email)",
  "password": "string (required, min 8 chars, uppercase + number)",
  "name": "string (required, 2-100 chars)"
}
```

**Response Schema (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "string",
      "name": "string",
      "createdAt": "ISO-8601"
    },
    "accessToken": "string (JWT)",
    "refreshToken": "string (JWT)"
  }
}
```

**Error Responses:**
| Code | Message |
|------|---------|
| 400 | Validation failed |
| 409 | Email already exists |
| 500 | Internal server error |

---

### POST /api/auth/login

| Property | Value |
|----------|-------|
| Purpose | Authenticate user and issue tokens |
| Authentication Required | No |
| Rate Limit | 10 requests per minute |

**Request Schema:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response Schema (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "string",
      "name": "string"
    },
    "accessToken": "string (JWT, 15min expiry)",
    "refreshToken": "string (JWT, 7d expiry)"
  }
}
```

**Error Responses:**
| Code | Message |
|------|---------|
| 400 | Validation failed |
| 401 | Invalid credentials |
| 429 | Too many attempts |
| 500 | Internal server error |

---

### POST /api/auth/refresh

| Property | Value |
|----------|-------|
| Purpose | Refresh expired access token |
| Authentication Required | Yes (refresh token) |

**Request Schema:**
```json
{
  "refreshToken": "string (required)"
}
```

**Response Schema (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "string (JWT)",
    "refreshToken": "string (JWT)"
  }
}
```

**Error Responses:**
| Code | Message |
|------|---------|
| 401 | Invalid or expired refresh token |
| 500 | Internal server error |

---

### GET /api/auth/me

| Property | Value |
|----------|-------|
| Purpose | Get current authenticated user |
| Authentication Required | Yes (access token) |

**Response Schema (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "string",
    "name": "string",
    "createdAt": "ISO-8601"
  }
}
```

---

## Portfolio APIs

### GET /api/portfolio

| Property | Value |
|----------|-------|
| Purpose | List user's portfolios |
| Authentication Required | Yes |

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 10 | Items per page |

**Response Schema (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "description": "string | null",
      "createdAt": "ISO-8601",
      "updatedAt": "ISO-8601",
      "_count": { "holdings": "number" }
    }
  ],
  "meta": { "page": 1, "limit": 10, "total": 2, "totalPages": 1 }
}
```

---

### POST /api/portfolio

| Property | Value |
|----------|-------|
| Purpose | Create a new portfolio |
| Authentication Required | Yes |

**Request Schema:**
```json
{
  "name": "string (required, 1-100 chars)",
  "description": "string (optional, max 500 chars)"
}
```

**Response Schema (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "string",
    "description": "string | null",
    "createdAt": "ISO-8601"
  }
}
```

---

### PUT /api/portfolio/:id

| Property | Value |
|----------|-------|
| Purpose | Update portfolio |
| Authentication Required | Yes |
| Ownership Required | Yes |

**Request Schema:**
```json
{
  "name": "string (optional, 1-100 chars)",
  "description": "string (optional, max 500 chars)"
}
```

**Error Responses:**
| Code | Message |
|------|---------|
| 404 | Portfolio not found |
| 403 | Not authorized |

---

### DELETE /api/portfolio/:id

| Property | Value |
|----------|-------|
| Purpose | Delete portfolio and all holdings |
| Authentication Required | Yes |
| Ownership Required | Yes |

**Response Schema (200):**
```json
{
  "success": true,
  "data": null,
  "message": "Portfolio deleted successfully"
}
```

---

## Holdings APIs

### GET /api/portfolio/:portfolioId/holdings

| Property | Value |
|----------|-------|
| Purpose | List holdings in a portfolio |
| Authentication Required | Yes |
| Ownership Required | Yes |

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| sortBy | string | "createdAt" | Sort field |
| order | string | "desc" | Sort order (asc/desc) |
| assetId | string | - | Filter by asset |

**Response Schema (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "assetId": "string",
      "amount": "number",
      "avgBuyPrice": "number",
      "currentPrice": "number",
      "stcgGain": "number",
      "ltcgGain": "number",
      "asset": {
        "id": "string",
        "name": "string",
        "symbol": "string",
        "logoColor": "string"
      },
      "createdAt": "ISO-8601",
      "updatedAt": "ISO-8601"
    }
  ]
}
```

---

### POST /api/portfolio/:portfolioId/holdings

| Property | Value |
|----------|-------|
| Purpose | Add a holding to portfolio |
| Authentication Required | Yes |
| Ownership Required | Yes |

**Request Schema:**
```json
{
  "assetId": "string (required)",
  "amount": "number (required, > 0)",
  "avgBuyPrice": "number (required, > 0)"
}
```

**Error Responses:**
| Code | Message |
|------|---------|
| 400 | Validation failed |
| 404 | Portfolio not found |
| 409 | Holding for this asset already exists |

---

### PUT /api/holdings/:id

| Property | Value |
|----------|-------|
| Purpose | Update holding amount |
| Authentication Required | Yes |
| Ownership Required | Yes |

**Request Schema:**
```json
{
  "amount": "number (optional, > 0)",
  "avgBuyPrice": "number (optional, > 0)"
}
```

---

### DELETE /api/holdings/:id

| Property | Value |
|----------|-------|
| Purpose | Remove holding from portfolio |
| Authentication Required | Yes |
| Ownership Required | Yes |

**Response Schema (200):**
```json
{
  "success": true,
  "data": null,
  "message": "Holding removed successfully"
}
```

---

## Asset APIs

### GET /api/assets

| Property | Value |
|----------|-------|
| Purpose | List all supported crypto assets |
| Authentication Required | Yes |
| Cache | 5 minutes |

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| search | string | - | Search by name or symbol |
| page | number | 1 | Page number |
| limit | number | 50 | Items per page |

**Response Schema (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "symbol": "string",
      "logoColor": "string",
      "currentPrice": "number",
      "priceChange24h": "number",
      "priceChangePercentage24h": "number"
    }
  ]
}
```

---

## Harvest APIs

### POST /api/harvest/simulate

| Property | Value |
|----------|-------|
| Purpose | Run tax-loss harvesting simulation |
| Authentication Required | Yes |

**Request Schema:**
```json
{
  "portfolioId": "uuid (required)",
  "selections": [
    {
      "holdingId": "uuid (required)",
      "amountToSell": "number (required, > 0)"
    }
  ],
  "taxRate": "number (optional, default 0.30)"
}
```

**Response Schema (200):**
```json
{
  "success": true,
  "data": {
    "preHarvest": {
      "shortTerm": { "profits": "number", "losses": "number", "netGain": "number" },
      "longTerm": { "profits": "number", "losses": "number", "netGain": "number" },
      "realisedGains": "number",
      "estimatedTax": "number"
    },
    "postHarvest": {
      "shortTerm": { "profits": "number", "losses": "number", "netGain": "number" },
      "longTerm": { "profits": "number", "losses": "number", "netGain": "number" },
      "realisedGains": "number",
      "estimatedTax": "number"
    },
    "taxSavings": "number",
    "totalHarvestedLoss": "number"
  }
}
```

---

### GET /api/harvest/history

| Property | Value |
|----------|-------|
| Purpose | Get harvest simulation history |
| Authentication Required | Yes |

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| portfolioId | uuid | - | Filter by portfolio |
| page | number | 1 | Page number |
| limit | number | 20 | Items per page |

---

## Exchange APIs

### GET /api/exchange/prices

| Property | Value |
|----------|-------|
| Purpose | Get current prices from CoinGecko |
| Authentication Required | Yes |
| Cache | 60 seconds |

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| ids | string | - | Comma-separated asset IDs |
| vs_currency | string | "inr" | Target currency |

**Response Schema (200):**
```json
{
  "success": true,
  "data": {
    "bitcoin": { "inr": "number", "inr_24h_change": "number" },
    "ethereum": { "inr": "number", "inr_24h_change": "number" }
  },
  "source": "coingecko",
  "cachedAt": "ISO-8601"
}
```

---

## Reports APIs

### GET /api/reports

| Property | Value |
|----------|-------|
| Purpose | Generate tax report |
| Authentication Required | Yes |

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| portfolioId | uuid | - | Portfolio to report on |
| financialYear | string | - | e.g., "2026-27" |

**Response Schema (200):**
```json
{
  "success": true,
  "data": {
    "financialYear": "string",
    "portfolioId": "uuid",
    "summary": {
      "totalRealisedGains": "number",
      "totalSTCG": "number",
      "totalLTCG": "number",
      "totalTaxLiability": "number",
      "totalHarvestSavings": "number",
      "netTaxAfterHarvest": "number"
    },
    "transactions": "array",
    "harvestSessions": "array",
    "generatedAt": "ISO-8601"
  }
}
```

---

### GET /api/reports/export

| Property | Value |
|----------|-------|
| Purpose | Export tax report as PDF/CSV |
| Authentication Required | Yes |

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| reportId | uuid | - | Report to export |
| format | string | "pdf" | Export format (pdf/csv) |

**Response:** Binary file download (PDF or CSV)

---

## API Route Structure

```
src/app/api/
├── auth/
│   ├── register/route.ts          POST /api/auth/register
│   ├── login/route.ts             POST /api/auth/login
│   ├── refresh/route.ts           POST /api/auth/refresh
│   └── me/route.ts                GET /api/auth/me
│
├── portfolio/
│   ├── route.ts                   GET, POST /api/portfolio
│   └── [id]/
│       ├── route.ts               GET, PUT, DELETE /api/portfolio/:id
│       └── holdings/route.ts      GET, POST /api/portfolio/:id/holdings
│
├── holdings/
│   └── [id]/route.ts              PUT, DELETE /api/holdings/:id
│
├── assets/route.ts                GET /api/assets
│
├── harvest/
│   ├── simulate/route.ts          POST /api/harvest/simulate
│   └── history/route.ts           GET /api/harvest/history
│
├── exchange/
│   ├── prices/route.ts            GET /api/exchange/prices
│   └── history/route.ts           GET /api/exchange/history
│
└── reports/
    ├── route.ts                   GET /api/reports
    └── export/route.ts            GET /api/reports/export
```
