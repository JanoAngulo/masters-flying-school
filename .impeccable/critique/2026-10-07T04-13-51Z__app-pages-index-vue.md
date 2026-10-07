---
target: homepage
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:D:\\Users\\Documents\\.Website Portfolio\\Masters Flying School\\app\\pages\\index.vue"
target_fingerprint: "sha256:de1ae0954a878fd5029006b3fc539dfff8291055e82a5bcd2eec1863529b6fa9"
target_path: "D:\\Users\\Documents\\.Website Portfolio\\Masters Flying School\\app\\pages\\index.vue"
timestamp: 2026-10-07T04-13-51Z
slug: app-pages-index-vue
closed: true
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Course rows give no link affordance (index.vue:138-154) |
| 2 | Match System / Real World | 2 | NBI, ATOC, PAF-ARCEN, PHPL, CFII, AMO, dual, checkride unexplained; 0 term tips on homepage |
| 3 | User Control and Freedom | 3 | No traps; Esc closes menu; opt-in video |
| 4 | Consistency and Standards | 3 | One destination, two labels; course rows only links without affordance |
| 5 | Error Prevention | 3 | Prereq tags good; phone number possibly stale |
| 6 | Recognition Rather Than Recall | 2 | No inquiry/call control on mobile after hero; "Needs PHPL" unexpanded |
| 7 | Flexibility and Efficiency | 3 | Deep links good; ratings buried in section 4 |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained; 10 equal-weight sections, ~14 mobile screens |
| 9 | Error Recovery | 3 | Little to fail; video thumb falls back to dark box |
| 10 | Help and Documentation | 2 | No plain-language help on homepage; fees-on-request only at :345 |
| Total | | 27/40 | Acceptable |

## Design Specificity Verdict
Content and surface detailing specific (runway piano keys, Barlow Condensed signage, livery photos, first-solo bucket step, cert numbers, alumni by airline). Skeleton is stock service landing sequence; identity is decoration, not IA/interaction. Missed: helicopter track in path, tower not shown, simulators absent, no bucket photo.
Detector: source scan clean. Rendered scan 10 findings: gray-on-color x2 (FP, 7.83:1), tight-leading x1 (FP, display quote SiteFooter.vue:10), repeating-stripes x1 (intentional identity motif), image-hover-transform x6 (real, fleet cards index.vue:191-226, minor). Static .vue scan missed hover zoom (tool gap). All text passes AA (min 5.39:1); 52 interactive elements named; clean heading outline; no overflow at 390.

## Priority Issues
1. [P1] Mobile loses inquiry: header CTA hidden <640px (SiteHeader.vue:68), call only in menu (:84); next CTA ~10,500px down. Fix: compact Inquire/call in mobile header + mid-page nudge after alumni. /impeccable adapt
2. [P1] Foreign students and licensed pilots lack entry: BI credential (index.vue:67) unlinked; Nepal links to alumni not /students#foreign-students; ratings in section 4; no simulators. Fix: four-way audience router after runway band; link BI to visa guide. /impeccable layout
3. [P1, verify] Phone (02) 851-7042 likely pre-2019 7-digit format, now probably (02) 8851-7042; 5 locations; matches PRODUCT.md so source fact may be stale. Fix: confirm, update PRODUCT.md, add +63 format, email in close. /impeccable harden
4. [P2] Jargon without help: NBI, ATOC, PAF-ARCEN, dual, checkride, PHPL, CFI/CFII, AMO; data-tip system loaded but 0 tips on index. Fix: tip first occurrence, expand PHPL. /impeccable clarify
5. [P2] Runway band = trivia (17/35, 900x30m); first solo at ~65%; blurry hqdefault poster (index.vue:318); flat ending. Fix: band holds decision facts; maxresdefault/real photo; move peak near close. /impeccable distill, /impeccable polish

## Persona Red Flags
Jordan: NBI unexplained; PHPL unexpanded; path vs course list unmapped; age/education/duration/fees absent.
Riley: dashed route overshoots step 7 (index.vue:81); helicopter track missing; "Captains" claim needs check; Airphil Express defunct, no years.
Casey: 14 screens; hero CTA at 843/844px; no header CTA; ~190KB JS; mailto form.
Parent: dated 179x91 JPEG logo; no instructors/supervision/lodging; only AMO safety-adjacent.
Foreign student: BI not linked; local phone format; no email in close; idiom at :239.

## Minor Observations
Flat H2 hierarchy; 930px-only rasters (add srcset); footer Fleet/About under 44px wide; hero opacity:0 settle; faint "Start here" tags; /courses line length 86-100ch.

## Questions to Consider
- What does a parent learn from the runway band?
- Real first-solo bucket photo available?
- What if each audience got its own first screen of answers?
- mailto: finish line or cliff for a phone user in Kathmandu?
