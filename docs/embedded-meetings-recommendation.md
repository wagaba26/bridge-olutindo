# Embedded Class Meetings Recommendation

## Recommendation
Use `Daily.co` as the primary embedded classroom provider.

## Why
- Reliable iframe embedding for camera/mic sessions.
- Better UX for in-dashboard classes than external redirects.
- Easier real-time controls and room management than custom Zoom/Meet embedding.

## Zoom / Google Meet note
- They are excellent for standard calls but are typically less straightforward for iframe-first embedding flows.
- If you must use them, plan for SDK integration or external tab fallback.

## Current app configuration
The dashboard uses `components/dashboard/class-meeting-room.tsx` and supports:
- `NEXT_PUBLIC_CLASS_MEETING_PROVIDER=jitsi|daily|zoom|google_meet|custom`
- `NEXT_PUBLIC_CLASS_MEETING_URL` (optional custom URL, supports `{room}` token)
- `NEXT_PUBLIC_DAILY_DOMAIN` (for Daily room URLs)
- `NEXT_PUBLIC_JITSI_BASE_URL` (defaults to `https://meet.jit.si`)

## Suggested production setup
1. Start with `jitsi` for immediate launch testing.
2. Migrate to `daily` for stable embedded classroom UX and controls.
3. Keep Zoom/Meet as optional fallback links for special sessions.
