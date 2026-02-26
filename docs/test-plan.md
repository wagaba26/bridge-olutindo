# Bridge QA Test Plan (Mobile-First)

## Objective
Validate user flow clarity, form logic, auth behavior, and cross-route consistency with priority on 320-430px mobile screens.

## Test matrix

### 1) Core navigation and content
- Verify all public routes render and keep IA intact.
- Confirm header actions adapt by auth state (guest vs signed-in).
- Check footer legal/utility links (`/faq`, `/privacy`, `/terms`) load correctly.

### 2) Intake flow logic
- Open `/intake?focus=learn`, `/intake?focus=study`, `/intake?focus=partners`.
- Confirm selected focus updates helper text, message placeholder, and next-step panel.
- Confirm conditional fields appear by focus:
  - `learn`: preferred start, payment plan
  - `study`: target intake, education status
  - `partners`: organization, partnership model
- Submit each focus path and verify lead record stores matching metadata.

### 3) JLCAT-specific funnel
- Verify `/learn` JLCAT CTA goes to `/learn/jlcat` (not general intake).
- Submit JLCAT form and verify metadata includes entry mode, payment plan, and schedule preferences.

### 4) Consultation booking
- Verify desk selector updates availability source and summary panel.
- Verify month/day picker behavior and slot selection behavior.
- Verify free consultation flag is persisted in metadata.
- If Google Calendar env is configured, verify live busy slot filtering and event creation.
- If not configured, verify fallback slots still allow form submission.

### 5) Authentication and account UX
- Verify `/login` redirects authenticated users to `/dashboard`.
- Verify `/signup` redirects authenticated users to `/dashboard`.
- Verify forgot-password flow:
  - `/forgot-password` sends reset email
  - `/reset-password` updates password
- Verify resend confirmation only appears when confirmation-required state is detected.

### 6) Staff progress flow
- Verify `/api/progress` blocks non-authenticated users (401).
- Verify `/api/progress` blocks non-staff roles (403).
- Verify admin/teacher submission inserts attendance + teacher comment.
- Verify summary upsert updates `learner_progress_summaries` score fields.

### 7) Mobile-first UX checks (320-430)
- No clipped CTAs in header/auth pages.
- Form labels and helper text readable without zoom.
- Tap targets >= 44px for buttons/selects.
- Sticky mobile CTAs do not overlap critical controls.

### 8) Security checks (baseline)
- Verify security headers present from `next.config.ts`.
- Confirm service role key never appears in client bundle.
- Confirm privileged routes enforce role checks.

## Commands used for automated checks
- `npm run lint`
- `npm run build`
