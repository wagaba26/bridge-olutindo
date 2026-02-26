# Design Crawl Report

Generated: 2026-02-21

## Objective
Reduce visual clutter, lower cognitive load, and restore clear information hierarchy across desktop and mobile.

## Global Decisions
- Header: keep only `Learn`, `Study`, `Partners`, `Resources` in primary navigation.
- Header: remove extra top-level utility links from desktop header body (`About`, `Contact`).
- Homepage section budget: reduce to 5 primary blocks.
- Hero budget (mobile and desktop): 1 message, 2 CTAs, 1 supporting visual.
- Keep secondary information in dedicated pages, not stacked on homepage.

## Page-by-Page Crawl

### `/`
- Keep: hero, pathways, one method infographic, resources preview, final CTA.
- Remove/merge: duplicate loop/process/architecture blocks that repeated the same message.
- Result: major density reduction and cleaner first-scroll sequence.

### `/learn`
- Keep: level tabs and featured program.
- Merge next pass: reduce repeated CTA cards into one primary action cluster.

### `/study`
- Keep: pathway cards and scholarship/life prep summary.
- Merge next pass: consolidate repeated explanatory cards into one structured checklist.

### `/partners`
- Keep: partner proposition and partner form.
- Next pass: reduce repeated trust/feature cards to one evidence strip.

### `/blog`
- Keep: featured article + concise latest list.
- Next pass: tighten sidebar density and improve scan rhythm on mobile.

### `/contact`
- Keep: routed desk form.
- Next pass: simplify helper copy and remove non-essential card verbosity.

### `/intake`
- Keep: structured form and route-aware fields.
- Next pass: simplify descriptive text and prioritize decision prompts.

### `/dashboard/*`
- Keep: learning state, skill progress, live updates.
- Next pass: collapse non-critical cards behind tabs on smaller screens.

## Image System Plan

## Current issue
Images are contextually inconsistent and visually mixed, causing a fragmented premium feel.

## Fix strategy
1. Define one visual direction for all public pages:
- real learning environments,
- advisory/planning scenes,
- campus or study transitions,
- no abstract unrelated stock scenes.

2. Normalize image specs:
- Hero: 16:9 desktop, crop-safe 4:5 mobile focus.
- Feature cards: 4:3.
- Resource banners: 16:9.

3. Enforce image quality checklist before use:
- subject matches section meaning,
- consistent warmth/contrast,
- no over-saturated outliers,
- clear focal point for mobile crops.

4. Build image inventory doc in next pass:
- source,
- intended section,
- alt text,
- crop notes.

## Execution Plan (Next)
1. Pass 2: Learn, Study, Partners density compression. (Completed)
2. Pass 3: Contact and Intake copy simplification + form UX cleanup.
3. Pass 4: image library replacement and consistency pass.
4. Pass 5: mobile spacing and readability QA sweep.

## Pass 2 Results
- Learn page reduced to three major content blocks after hero (program snapshot, level tabs, level-fit cards).
- Study page reduced to two major content blocks after hero (pathway cards, planning checklist).
- Partners page reduced to two major content blocks after hero (collaboration model, partner form).
- Removed repeated explanatory sections that duplicated the same value proposition.

## Validation Checklist
- Max 6 homepage sections.
- Max 2 CTAs in hero.
- Primary nav has 4 items only.
- No duplicated section themes on the same page.
- All hero images have meaningful alt text and crop-safe composition.
