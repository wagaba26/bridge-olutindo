# Security Review - Phase 1

Date: 2026-02-08

## Executive summary
Bridge has moved to a safer baseline with request validation, origin checks, rate limiting, role checks for staff routes, and hardened headers.

Current risk posture: **Moderate** (good app-level controls, but production hardening still required at infra and data-policy layers).

## Issues found and actions taken

### 1) Open redirect risk in auth callback
- **Risk:** External redirect vector via unvalidated `next` query param.
- **Fix applied:** `next` now only allows safe relative paths.
- **File:** `app/auth/callback/route.ts`

### 2) Leads access exposed to non-admin users
- **Risk:** Any authenticated user could potentially reach leads view and see PII.
- **Fix applied:** Added admin-only guard and redirect for non-admin users.
- **Files:**
  - `app/dashboard/leads/page.tsx`
  - `app/dashboard/layout.tsx` (hide Leads nav except admin)

### 3) Missing API validation and abuse controls
- **Risk:** malformed payloads, endpoint abuse/spam.
- **Fix applied:** Added `zod` validation + origin checks + per-route rate limits.
- **Files:**
  - `lib/api-security.ts`
  - `app/api/intake/route.ts`
  - `app/api/contact/route.ts`
  - `app/api/partners/route.ts`
  - `app/api/consultations/route.ts`
  - `app/api/consultations/availability/route.ts`
  - `app/api/auth/resend/route.ts`
  - `app/api/progress/route.ts`

### 4) Staff action traceability
- **Risk:** lack of audit trail for admin/teacher data changes.
- **Fix applied:** Added optional insert to `staff_action_logs`.
- **File:** `app/api/progress/route.ts`

## Remaining risks (next phase)

### High priority
1. Replace in-memory rate limiting with distributed store (Redis/Upstash) for multi-instance consistency.
2. Enforce strict Supabase RLS for all sensitive tables in production (verify policies and grant scopes).
3. Add structured server-side logging + alerting for failed auth and repeated 4xx/429/5xx patterns.

### Medium priority
1. Add anti-automation protections (honeypot + bot scoring/CAPTCHA) on public forms.
2. Add web application firewall rules (e.g., Vercel edge firewall or upstream WAF).
3. Add dedicated admin MFA requirement and break-glass recovery process.

### Low priority
1. Add CSP with nonce/report-only rollout before enforce mode.
2. Add dependency scanning gate in CI.

## Infrastructure checklist for production
1. Set env secrets only server-side (`SUPABASE_SERVICE_ROLE_KEY`, Google service key).
2. Apply latest `supabase/schema.sql` and verify RLS behavior with non-admin test users.
3. Configure HTTPS-only deployment and verify HSTS behavior in production domain.
4. Configure secure backups and retention policy for lead/progress tables.

## Validation run
- `npm run lint` passed
- `npm run build` passed
