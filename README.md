# TalentDash Backend


## Setup Instructions
1. Clone the repo: `git clone <url>`
2. Install dependencies: `npm install`
3. Copy env: create `.env` with `DATABASE_URL=your-neon-url`
4. Run migrations: `npx prisma migrate deploy`
5. Seed database: `npx prisma db seed`
6. Start dev server: `npm run dev`

## API Endpoints

### POST /api/ingest-salary
Ingests a new salary record. Validates all fields, normalizes company name, 
recomputes total_compensation server-side, checks for duplicates.

### GET /api/salaries
Returns paginated salary records with filters.
Query params: company, role, level, location, currency, sort, page, limit (max 100)

### GET /api/companies/:slug
Returns company details with median TC and level distribution.

### GET /api/compare?s1=ID&s2=ID
Compares two salary records and returns delta for each field.

## Architecture Decisions
- Used ISR with Cache-Control headers on company and salary endpoints
- Page-based pagination chosen over cursor for simplicity at MVP scale
- total_compensation always recomputed server-side — never trusted from client
- BigInt used for all salary fields to avoid floating point errors

## Environment Variables
DATABASE_URL=postgresql://...neon.tech/talentdash_db?sslmode=require