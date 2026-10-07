---
target: landing page
total_score: 29
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:D:\\Users\\Documents\\.Website Portfolio\\Masters Flying School\\app\\pages\\index.vue"
target_fingerprint: "sha256:23c6f8017c242c30180607877fd2a13ab87022caa50de70c36ec3cf97554f311"
target_path: "D:\\Users\\Documents\\.Website Portfolio\\Masters Flying School\\app\\pages\\index.vue"
timestamp: 2026-10-07T05-41-46Z
slug: app-pages-index-vue
closed: true
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score: 29/40 (Good)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | System status | 3 | Video play gives no loading feedback (index.vue:276) |
| 2 | Real world match | 3 | "17" and "ATOC 94-02" lead the band unexplained (:43, :46) |
| 3 | User control | 3 | Mobile menu has no focus trap/backdrop (SiteHeader.vue:79-91) |
| 4 | Consistency | 3 | "Schweizer 300 CB" vs "300CB" (:258-259) |
| 5 | Error prevention | 3 | Promises certificate scans that don't exist (:77); retired 7-digit Pasay number x5 |
| 6 | Recognition | 3 | CFI/CFII, AMO, pre-solo exam lack tips |
| 7 | Flexibility | 3 | Audience cards deep-link; sticky call/inquire |
| 8 | Aesthetic/minimalist | 2 | 11 equal-weight sections, ~13,000px mobile; homepage re-does Fleet/About/Students |
| 9 | Error recovery | 3 | Little to judge; video fallback ok |
| 10 | Help | 3 | Term tips good; coverage stops after route |

## Specificity
Content specific (Plaridel H1, runway-17 piano keys, real tail numbers, bucket-of-water ritual, alumni counts reconcile). Structure is a stock stack of 11 sections. Hero (parked Cessna) most generic. Best identity assets (17 mark, class-runway-17 photo hidden below lg :294, solo ritual) are decoration, not the idea.

Detector: CLI 0 findings across index/layout/header/footer/TermTip. Overlay 4 at both viewports, all false positives (gray-on-color 7.8:1 passes; tight-leading on 30px display quote; repeating-stripes = intentional runway motif).

## Priority issues
- [P1] Page promises certificate scans that don't exist (:77). Fix: replace with "verify with CAAP" link. /impeccable clarify
- [P1] "Certified by CAAP since 1994" anachronistic: CAAP created 2008 (RA 9497) (:26, meta :4). Fix: "Founded 1994. CAAP-certified ATO, ATOC No. 94-02." /impeccable clarify
- [P1/P2] "Graduates fly for 6 airlines" present tense; roll dated 1998-2011, several carriers defunct (:48). Fix: "have flown for". /impeccable clarify
- [P2] Close overloads choices (~6 channels + overseas numbers), no what-happens-next reassurance; page too long (fleet grid ~2,100px mobile). /impeccable distill + layout
- [P2] Runway "17" unlabeled in stat row (:41-44). Caption it or pair with class-runway-17 photo as hero/solo image. /impeccable bolder
- [P3] Unbacked "reach license sooner" (:362); blurry third-party YouTube poster (:277); logo jpg in grey box; no srcset (hero soft on 2x). /impeccable polish, optimize

## Persona red flags
Jordan: 17/ATOC unexplained; two "Start here" chips no guidance; no training duration range.
Riley: scans dead end; CAAP date; 6 vs 7 rows; menu focus escape; retired phone format.
Casey: 13k px scroll; no bottom CTA; third-party video poster.
Parent: scans promise fails; CAAP date; newest proof 2011; no post-inquiry expectations; no instructors despite card promising them.

## Minor
Legacy-only facts to verify (1935, WWII, only airport in Bulacan, Army batches, nine subjects); "at dusk" alt on daylight photo (:197); 20 solo PPL hours worth confirming; TermTip buttons 36x44 (pass 2.5.8).
