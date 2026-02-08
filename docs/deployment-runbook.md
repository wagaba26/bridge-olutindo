# Deployment Runbook (Vercel + Supabase + Google Calendar)

## 1) Environment setup

### Required
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only)

### Google Calendar (optional but recommended)
- `GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- `GOOGLE_CALENDAR_ID_LANGUAGE`
- `GOOGLE_CALENDAR_ID_JOBS`
- `GOOGLE_CALENDAR_ID_STUDY`
- `GOOGLE_CALENDAR_ID_PARTNERS`
- `GOOGLE_CALENDAR_ID_BUSINESS`

### Distributed rate limiting (recommended)
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

### Security alerting (recommended)
- `SECURITY_ALERT_WEBHOOK_URL`

## 2) Supabase database migration
1. Apply `supabase/schema.sql` to production project.
2. Verify tables exist:
   - `profiles`, `leads`, `applications`, `programs`
   - `learner_progress_updates`, `learner_progress_summaries`, `staff_action_logs`, `security_events`
3. Verify RLS policies are active and enforce intended role boundaries.

## 3) Role governance
1. Assign `primary_role` in user metadata for staff users (`admin`, `teacher`).
2. Require MFA for admin users in Supabase Auth settings.
3. Confirm only admin can access `/dashboard/leads`.

## 4) Google Calendar integration setup
1. Enable Google Calendar API in GCP.
2. Create service account and generate key.
3. Share each desk calendar with service account email (Editor).
4. Set calendar IDs in env variables.
5. Validate `/consultation` shows live availability status.

## 5) Pre-deploy checks
- `npm run lint`
- `npm run build`
- Smoke test critical flows:
  - Intake submit
  - Partner submit
  - Consultation booking
  - Login/signup/password reset
  - Staff progress submission

## 6) Post-deploy checks
1. Verify security headers in browser network response.
2. Verify CSP report route receives reports (`/api/security/csp-report`).
3. Confirm rate limiting triggers with repeated requests.
4. Confirm security/audit records are written where configured.
5. Trigger a controlled high-severity event in staging and verify webhook alert delivery.

## 7) Rollback plan
1. Revert Vercel deployment to previous stable build.
2. Keep schema backward-compatible; avoid destructive migrations.
3. Disable optional integrations (Google/Upstash env vars) if misconfigured; app falls back safely.
