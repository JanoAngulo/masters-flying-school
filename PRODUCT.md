# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Migrating from static HTML + Tailwind Play CDN to Nuxt (static generation for SEO, shared layout/header/footer components, compiled Tailwind). Current static pages are the content source of truth during migration.

## Users

All four audiences matter; pages must serve each without burying the others.

- **Aspiring pilots in the Philippines.** Late teens to 20s, comparing flight schools, often on mobile. Job: decide which school and which course to start with, and how to begin.
- **Parents and sponsors.** Usually paying tuition. Job: judge whether the school is legitimate, safe, and leads to real airline jobs.
- **Licensed pilots.** PPL/CPL holders shopping for add-on ratings (instrument, multi-engine, flight instructor). Job: find requirements, aircraft, and simulator access fast.
- **Foreign students.** Past graduates came from Saudi Arabia, Nepal, Bangladesh and India. Job: confirm the school can accept them, plus visa, lodging and logistics.

## Product Purpose

Marketing and information site for Masters Flying School, a CAAP-certified airplane and helicopter flight school. Success is a qualified inquiry: a visitor who understands which course fits them and contacts the school (inquiry form, phone, or email). Fees and schedules are quoted on request, so the site's job is to earn that contact, not to close a sale.

Project status: a **pitch** built to present to the school. It may go live if the school adopts it. Every fact must stay true to the real school.

## Positioning

From existing site copy (verify with the school before launch):

- Trains at Plaridel Airport (RPUX), Bulacan: the training airfield closest to Metro Manila, with a CAAP-staffed control tower, so students practice radio calls with a real tower from early lessons.
- Founded 1994. Hangar on the field with classroom and briefing room; student lodging near the airport.
- Both airplanes and helicopters under one school, with CAAP-certified fixed-wing and helicopter simulators.
- In-house CAAP-approved maintenance organization (AMO No. 113-12).
- Affiliated with PAF Air Reserve Command as the 2201st Reserve Pilot Training Squadron.
- Named graduates flying for Cebu Pacific, PAL Express, AirAsia, SEAIR, Philippine Airlines, Airphil Express, and as CAAP check pilots.

## Operating Context

- Two locations: ground school / main office in Pasay City (2317 Nissan Car Lease Bldg., Aurora Blvd.), flight training at the Plaridel hangar.
- Training path is set by CAAP: student pilot authority (third-class medical, NBI clearance) → ground school → first solo → PPL (40 hrs) → CPL (150 hrs) → instrument rating → multi-engine and instructor ratings.
- Courses: PPL, CPL, private and commercial helicopter pilot, instrument rating, multi-engine, flight instructor (CFI, CFII).
- Fleet: Cessna 150, 152, 172; Piper Aztec (multi-engine); Schweizer 269 and 300CB helicopters.
- Student rituals: first solo ends with a bucket of water from batchmates.
- Contact channels: (02) 851-7042 (Pasay), (044) 794-2865 (Plaridel), info@mastersflyingschool.com, Facebook page.

## Capabilities and Constraints

- No online enrollment or payment. Fees and class schedules are quoted on request.
- Inquiry form currently hands off via `mailto:`. A real form endpoint is undecided.
- Foreign applicants need Bureau of Immigration paperwork; the school is authorized to accept them.
- Terminology follows CAAP usage: PPL, CPL, PHPL, CHPL, CFI, CFII, ATOC, AMO.
- Undecided: hosting/deploy target, form backend, whether the school will supply new photography or video.

## Brand Commitments

- Name: Masters Flying School. Existing logo at `assets/img/logo.jpg` (red bird mark, navy "Flying School" logotype).
- Fleet livery is red and white. These are real brand assets, not choices to revisit in a pitch.
- School motto, used in the footer: "Fly and you will catch the wind; dream and you shall reach your goal."
- Student life guide line: "Another eagle is born and is set conquering the sky."

## Evidence on Hand

- Photography of the real fleet, students, hangar, classroom, simulators, lodging and Pasay office in `assets/img/` (WebP).
- Four YouTube training videos (fixed-wing flight, helicopter flight, both simulators).
- Certificate numbers: CAAP ATOC No. 94-02, TESDA RCGN V-0023, Bureau of Immigration AAFS RBR No. 2000, AMO No. 113-12.
- Alumni roll with airline counts (students page).
- **Absent, must not be fabricated:** tuition figures, pass rates, student testimonials or reviews, placement percentages, accident/safety statistics, instructor bios beyond what the school supplies.

## Product Principles

1. **Credibility before persuasion.** Parents and sponsors decide on legitimacy; certificates, real numbers and named graduates come before slogans.
2. **Every claim is checkable.** Use only facts the school can back up. Do not imply the school's history predates 1994.
3. **Show the path, not just the product.** Visitors need to see where they start and what comes next under CAAP rules.
4. **One school, four entry points.** Beginners, payers, licensed pilots and foreign students each find their answer within a couple of clicks.
5. **Inquiry is the finish line.** Every page ends with a clear way to contact the right location.

## Accessibility & Inclusion

Target WCAG 2.2 AA. Many visitors browse on mid-range Android phones over mobile data, so performance is part of accessibility. Plain-language explanations for aviation terms are part of the product (beginners and parents do not know the jargon). English-language site; foreign applicants may be non-native English readers.
