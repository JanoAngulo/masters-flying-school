---
target: site, welcoming direction
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 2
target_identity: "file:D:\\Users\\Documents\\.Website Portfolio\\Masters Flying School\\app\\pages\\index.vue"
target_fingerprint: "sha256:05e7fb5258a9aa3794db008a885bf29780c1560681a6e6dc38a334606f66346e"
target_path: "D:\\Users\\Documents\\.Website Portfolio\\Masters Flying School\\app\\pages\\index.vue"
timestamp: 2026-10-23T09-48-21Z
slug: app-pages-index-vue
---
Method: dual-agent (A: design review · B: detector + browser) plus a motion survey (emil find-animation-opportunities)

Focus: client wants the site happier and more welcoming; the red, white and black palette stays.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Good form states and nav state |
| 2 | Match System / Real World | 4 | TermTips explain the jargon in plain language |
| 3 | User Control and Freedom | 3 | |
| 4 | Consistency and Standards | 3 | |
| 5 | Error Prevention | 3 | |
| 6 | Recognition Rather Than Recall | 3 | |
| 7 | Flexibility and Efficiency | n/a | Marketing surface |
| 8 | Aesthetic and Minimalist Design | 2 | Home is 7.8k px on desktop and 11.8k px on mobile; ATOC and 1994 repeat 3 times |
| 9 | Error Recovery | 3 | |
| 10 | Help and Documentation | n/a | Marketing surface |
| **Total** | | **24/32** | **Good (75%)** |

## Design Specificity Verdict

The site is authored, not generic: the Runway 17 threshold, the cheatline, the CAAP route, alumni bars by airline, tail numbers and TermTips all belong to this school. The tone is the generic part: it reads like a records office, not a flying club.

The detector flagged 7 side-tab issues on fleet.vue. All are false positives (bar-chart segment dividers). In the browser it flagged tight-leading on the footer motto, line length over 80 characters on 11 paragraphs on /courses and /students, and the repeating-stripes runway motif, which is intentional.

## Priority Issues

1. [P0] The first screen shows machines, not people. The hero is two parked Cessnas under an overcast sky. crew-runway.webp (red-suited crew on the runway 17 threshold at sunset) is the warmest, most on-brand photo, and it sits in section 10 of 11. Fix: make it the hero (or pair it with the Cessna), move the Cessna shot to the Plaridel section, and swap the shadowed student-cockpit photo for a smiling one. Command: layout.
2. [P0] The order puts paperwork before joy: stats band, then the certificates ledger, then the medical-exam path come before any emotion, and the first-solo story is second to last. Fix: move "The day you fly alone" right after the entry points and fold the credentials into a compact strip. Command: layout.
3. [P1] The voice sounds like compliance: "Certified to train you, and the people who check", "Safety before anything else" (about), "walk in with bowed heads" (students), and "Send an inquiry" five or more times. Fix: same facts in a warmer voice, and vary the CTAs ("Visit the hangar", "Ask us anything"). Command: clarify.
4. [P1] The ledger look: 12 black 2px top rules, black outline buttons, 6 of 7 route dots black, black alumni bars, 0px radius on 11 of 13 images, and only two neutral surfaces. Fix: red accent ticks or soft apron cards, red secondary buttons with a tint hover, red route dots and alumni bars, rounded people photos, and red-tint or cream surfaces for the warm sections. Command: colorize.
5. [P2] The type reads like a stencil: Barlow Condensed 700 at .95 leading, with light gray body text. Fix: h2s at 600 weight with 1.0 to 1.05 leading, body text in ink, and lines capped at about 70 characters. Command: typeset.
6. [P2] Missing warmth moments in motion. Fix: a first-solo "splash" ring when the route reaches waypoint 3, the same ring on a sent inquiry, a fade-in for lazy images, press feedback on cards, and the hero's two lines arriving as a call and response. Command: animate or delight.

## Persona Red Flags

- **Jordan (first-timer):** sees no face on the first screen. The next screens say "certified", "the people who check" and "medical exam". The bucket-of-water story is about 9,000 px down on mobile.
- **Casey (mobile):** home is 11.8k px long and the credentials repeat. On /contact the form sits under two maps, and the Plaridel map renders blank.
- **Parent/sponsor:** well served on legitimacy, but there are no instructor faces (ask the school for photos), the lodging photo is dim, and the 7-digit Pasay number looks outdated.

## Minor Observations

- The logo JPG has a gray gradient band; ask for a transparent logo.
- A stray dot shows on the /students route at 1440 px.
- The /fleet runway chart uses the blue-black tarmac token.
- The footer is mostly addresses and has no warm closing line.

## Questions to Consider

- What if the first face a visitor sees is a batchmate holding a bucket of water?
- Does home need credentials three times, or once, done with pride?
