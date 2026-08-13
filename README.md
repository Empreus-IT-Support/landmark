# Landmark Surveys

Next.js rebuild of the Landmark Surveys website, replacing the WordPress /
YOOtheme build at `landmarksurvey.wpenginepowered.com`.

Next.js 16 · React 19 · Tailwind CSS v4 · TypeScript · Resend

## Running

```bash
npm install
npm run dev
```

Runs on <http://localhost:3000>.

```bash
npm run build   # production build
npm start       # serve the production build
```

## Environment

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`. Without it the
contact form returns a "not configured" message rather than failing silently.
`CONTACT_FROM_EMAIL` must be on a domain verified in Resend.

## Routes

| Route | Notes |
|---|---|
| `/` | Home |
| `/services` | Construction surveying, utility locating, registration, tools |
| `/projects` | Project index |
| `/projects/[slug]` | 5 statically generated project pages |
| `/about` | History, mission, vision, team |
| `/work-with-us` | Careers |
| `/contact` | Enquiry form + OpenStreetMap embed |
| `/privacy-policy` | See CONTENT-NOTES.md |
| `/api/contact` | Form handler (Resend) |

`sitemap.xml`, `robots.txt` and a real 404 are generated automatically.

## Design system

Derived from the **official logo artwork**, not the old WordPress theme. The
theme was using `#1c3775`, which is a different navy to the one the logo is
actually drawn in.

| Token | Value | Source |
|---|---|---|
| `navy` | `#243973` | the tripod mark in `logo-mark.svg` |
| `navy-deep` | `#16224a` | layering shade |
| `navy-dark` | `#0e1731` | hero / header ground |
| `ink` | `#111822` | the "Landmark" wordmark |
| `ink-soft` | `#3d4657` | body copy |
| `accent` | `#ff8a3d` | carried over, used sparingly |
| `paper` | `#f6f6f4` | light sections |
| Display font | Space Grotesk | squared terminals, sits with the angular mark |
| Body font | Inter | neutral, high legibility |
| Mono font | IBM Plex Mono | survey-register detail: indices, localities, labels |
| Container | 1200px | |

Type is pitched technical rather than corporate. The mono face does real work —
it carries the numbering, localities and field labels that make the site read
like a survey register. Utilities: `.eyebrow`, `.field-label`, `.field-value`,
`.index-numeral`.

Three devices carry the brand through the pages:

- **The mark** (`components/Mark.tsx`) — the tripod / converging road, inlined
  so it takes `currentColor`. Used oversized and cropped as a watermark rather
  than repeated as a small logo.
- **The contour texture** (`components/Contour.tsx`) — the topographic pattern
  from the brand assets, which the WordPress build never used at all. It backs
  every dark section.
- **The converging rule** (`.rule-converge`) — a tapered rule under section
  headings, echoing the mark's vanishing point. `.edge-cut-top` /
  `.edge-cut-bottom` cut sections at the same angle as the mark's legs.

### Depth and motion

The WordPress build got its density from full-bleed image bands butting
straight up against padded sections and background photographs anchored
top-right — its `uk-section-overlap` classes carried no CSS of their own. The
same devices are rebuilt here:

- `components/Hero.tsx` — full-viewport home hero at `100svh` (not `vh`, so
  mobile browser chrome can't push the scroll cue off screen), layered
  photograph → two gradients → drifting contour → cropped mark → content.
- `components/ImageBand.tsx` — flush/overlapping tall image rows.
- The About section carries a background photograph anchored top-right on large
  screens, faded out with a gradient.

Motion is all class-driven and defined at the bottom of `globals.css`:

| Class | Effect |
|---|---|
| `.hero-in > *` | staggered entrance on load |
| `.ken-burns` | 26s slow zoom on hero photography |
| `.contour-drift` | 90s creep across the contour texture |
| `.scroll-cue` | bobbing scroll indicator |
| `.reveal-init` / `.reveal-in` | scroll-in fade-up, driven by `ScrollReveal.tsx` |
| `[data-stagger] > *` | children cascade behind their section |

Tag a section with `data-reveal` to opt it into the scroll animation, and a
grid inside it with `data-stagger` to cascade its children.

`ScrollReveal` **fails open**: it only hides content after confirming
`IntersectionObserver` exists *and* the document is visible, so a background
tab or prerender can never strand a section at opacity 0. Everything is
disabled under `prefers-reduced-motion: reduce`.

### Colour contrast

Two rules, both of which are easy to break by eye and were broken twice during
this build:

1. **The accent comes in two weights.** `accent` (#ff8a3d) is for dark grounds
   only — 4.69:1 on navy, 7.6:1 on ink, but **2.35:1 on white**. Use
   `accent-deep` (#c2410c) on light grounds: 5.18:1 on white, 4.79:1 on paper.
2. **Never fade small text with an opacity modifier.** `text-ink-soft/50` looks
   right and lands at 2.2:1. Use `text-muted` (#5b6472) — 5.98:1 on white,
   5.53:1 on paper. On dark grounds keep white at `/65` or above.

Verified with a canvas-based contrast sweep across every page, at rest and with
every link hovered. Note that Tailwind v4 emits `oklab()` colours, so any
contrast tooling must resolve colours through the browser rather than
regex-parsing `getComputedStyle`.

## Images

`public/images/` holds the assets pulled from the WordPress media library,
renamed by purpose. They have been capped at 2000px wide with WebP siblings —
the source library was 40 MB, including one 29 MB JPEG. After adding new
photography:

```bash
node scripts/optimise-images.mjs
```

## What changed from the WordPress site

Fixed in this build: clean URLs instead of `?page_id=N`, one `<h1>` per page
(project pages had none, Contact had three), alt text on every image, page
titles that include the business name, meta descriptions and Open Graph tags,
an XML sitemap, a real 404 instead of the homepage returning HTTP 200, a
working map instead of a consent-blocked 600px gap, keyboard focus styles, and
`lang="en-AU"`.

Content decisions still outstanding are listed in **CONTENT-NOTES.md** — read
that before launch.
