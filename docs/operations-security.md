# Operations and Security Notes

## Required environment variables

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; never expose to client)

### Google Calendar (free integration via service account)
- `GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- `GOOGLE_CALENDAR_ID_LANGUAGE`
- `GOOGLE_CALENDAR_ID_JOBS`
- `GOOGLE_CALENDAR_ID_STUDY`
- `GOOGLE_CALENDAR_ID_PARTNERS`
- `GOOGLE_CALENDAR_ID_BUSINESS`

### Optional distributed rate limiting (recommended)
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

### Optional security alerting webhook
- `SECURITY_ALERT_WEBHOOK_URL` (Slack/Teams compatible incoming webhook)

## Google Calendar setup
1. Create a Google Cloud service account.
2. Enable Google Calendar API in that project.
3. Share each desk calendar with the service account email (Editor role).
4. Add the calendar IDs and service account credentials to env variables.
5. Verify `/consultation` shows "Live availability from Google Calendar".

## Progress automation tables
The following tables are expected:
- `learner_progress_updates`
  - `learner_email`, `attendance_status`, `class_date`, `teacher_comment`, `submitted_by`, `submitted_by_role`
- `learner_progress_summaries`
  - `learner_email` (unique), `attendance_rate`, `feedback_score`, `progress_score`, `last_class_date`, `updated_at`

## Security baseline currently in code
- Auth-gated staff write endpoint for progress updates (`/api/progress`) with role checks (`admin`, `teacher`).
- Security headers configured in `next.config.ts`.
- Service-role fallback logic isolated in server utilities only.
- No service credentials shipped to client bundle.

## Recommended next hardening
1. Add request-rate limiting on public form APIs (`/api/intake`, `/api/contact`, `/api/partners`, `/api/consultations`).
2. Add CSRF protection for critical POST routes.
3. Add server-side schema validation for all API payloads.
4. Add audit log table for admin/teacher actions.
5. Enforce strict RLS policies for all user-facing tables.
