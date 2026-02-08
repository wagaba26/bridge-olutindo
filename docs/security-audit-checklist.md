# Security Audit Checklist

## Implemented in code
- API origin checks for form endpoints (`validateOrigin`).
- In-memory rate limiting for key routes:
  - `/api/intake`
  - `/api/contact`
  - `/api/partners`
  - `/api/consultations`
  - `/api/consultations/availability`
  - `/api/auth/resend`
  - `/api/progress`
- Schema validation using `zod` for the above endpoints.
- Staff-only progress updates via role gate (`admin`, `teacher`).
- Optional staff audit log write support (`staff_action_logs`).
- Global security response headers in `next.config.ts`.

## Required production checks
1. Apply `supabase/schema.sql` updates in production.
2. Verify RLS policies are enabled and effective.
3. Ensure service role key exists only in server env and is never exposed in client bundle.
4. Set strong auth provider settings in Supabase:
   - Email confirmation enabled
   - Secure password policy
   - MFA recommendation for admin accounts
5. Confirm desk calendar IDs map correctly and service account has only required calendar access.
6. Configure Upstash Redis env vars so rate limiting works across multiple server instances.

## Post-deploy validation
- Trigger a 429 by repeated calls to one form API from same IP.
- Send malformed payloads to each API endpoint and confirm 400 responses.
- Verify non-staff user cannot POST to `/api/progress`.
- Verify admin/teacher can submit progress and summary updates persist.
- Verify `SECURITY_ALERT_WEBHOOK_URL` receives high-severity and burst alerts.
