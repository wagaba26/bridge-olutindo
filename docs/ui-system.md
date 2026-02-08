# Bridge Olutindo UI/UX Plan

## Product direction
- Keep existing route structure and content intent, but rebuild page scaffolding with a mobile-first hierarchy.
- Make mobile the default canvas (320-430px), then scale to md (768), lg (1024), and xl (1280).
- Use premium but restrained visuals: clean panels, stronger spacing rhythm, subtle shadows, and clear CTA zones.
- Prioritize conversion-critical interactions (navigation, jobs search/filter, partner contact forms, sticky CTA on mobile).

## Core components
- Header
- MobileDrawer
- ServicePanel
- PillarCardsCarousel
- CategoryTiles
- Card
- Badge
- Button
- Input
- Select
- Tabs
- Accordion
- BottomSheet (sheet side bottom)
- StickyCTA
- Footer
- LogoStrip
- JobCard

## Layout and interaction rules
- 8pt spacing scale: 4, 8, 12, 16, 24, 32, 40, 48, 64.
- Tap targets at least 44px on mobile.
- Form controls default to 44px+ height.
- Consistent focus-visible rings and contrast-safe color pairings.
- Mobile bottom sheets for dense filter controls.

## Tokens

### Breakpoints
- base: 320-430
- md: 768
- lg: 1024
- xl: 1280

### Typography (mobile-first)
- h1: 32 / 1.1
- h2: 26 / 1.18
- h3: 20 / 1.25
- body: 16 / 1.7
- caption: 12-13

### Colors
- `--primary`: #16517f
- `--primary-foreground`: #f8fafc
- `--background`: #f7f8fa
- `--foreground`: #101828
- `--muted`: #eef2f6
- `--muted-foreground`: #475467
- `--border`: #d5dce6
- `--color-success`: #2d8056
- `--color-warn`: #c28a2a
