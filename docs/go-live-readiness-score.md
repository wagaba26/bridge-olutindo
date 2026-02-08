# Go-Live Readiness Score

Date: 2026-02-08

## Overall score
**82 / 100** (Good pre-production baseline)

## Breakdown

### 1) Application security controls - 23 / 25
- ✅ Input validation on major APIs (`zod`)
- ✅ Origin checks and honeypot on public forms
- ✅ Rate limiting on abuse-prone routes
- ⚠️ Distributed limiter depends on Upstash env setup in production

### 2) Auth and access control - 20 / 25
- ✅ Auth required for dashboard routes
- ✅ Admin-only access for leads/security views
- ✅ Teacher/admin role checks for progress updates
- ⚠️ Admin MFA enforcement still requires Supabase dashboard policy setup

### 3) Data and RLS model - 17 / 20
- ✅ RLS policies included for core and new operational tables
- ✅ Audit-style tables prepared (`staff_action_logs`, `security_events`)
- ⚠️ Requires production migration and policy verification by role accounts

### 4) Monitoring and incident visibility - 12 / 15
- ✅ Security event logging pipeline added
- ✅ CSP report-only endpoint and dashboard visibility
- ⚠️ External alerting (Slack/Email) not yet integrated

### 5) Deployment resilience - 10 / 15
- ✅ Deployment runbook documented
- ✅ Build and lint stable
- ⚠️ No CI security gates yet (dependency audit/SAST on PR)

## Critical pre-launch checklist
1. Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
2. Set Google calendar service env vars and desk calendar IDs.
3. Apply latest `supabase/schema.sql` to production.
4. Validate RLS with real `admin`, `teacher`, and learner accounts.
5. Enable MFA for admin users in Supabase Auth settings.

## First-week post-launch checks
1. Review `/dashboard/security` daily for blocked requests and cross-site attempts.
2. Verify no unusual spikes in `rate_limit_blocked` events.
3. Confirm consultation bookings create calendar events and lead records.
4. Confirm staff progress updates produce summary score updates as expected.
