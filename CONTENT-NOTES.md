# Content notes — items carried over from the WordPress build

Everything below was found on the source site
(`landmarksurvey.wpenginepowered.com`) and needs a decision from Landmark
Surveys before launch. Nothing here has been invented — where content was
missing it has been left out or clearly scoped, not filled in.

## Blocking — placeholder content that must not go live

| Item | Where it was | What this build does |
|---|---|---|
| **Lorem ipsum testimonial** attributed to "Tamara Jones" | Projects page | Removed. Needs a real client testimonial, with permission to publish. |
| **Empty Privacy Policy** — the page had a heading and no body | `/privacy-policy` | Replaced with a policy describing only what *this website* does (enquiry form, no tracking cookies, OpenStreetMap embed). **Not a full organisational privacy policy** — Landmark Surveys should supply their own, reviewed version. |
| **Broken privacy link** — footer pointed at `/_wp_link_placeholder` | Footer | Fixed, links to `/privacy-policy`. |
| **Demo social links** — `instagram.com`, `pinterest.de`, `facebook.com/yootheme`, and YOOtheme's own YouTube channel | Footer | Removed. Add real profiles (LinkedIn is likely more relevant than Pinterest for B2B). |
| **"Hello world!" default WordPress post**, live with comments open at `/?p=1` | — | Not carried over. |

## Brand assets the WordPress build wasn't using

- `contour-texture.svg` (was `LMS-Logo-08-2.svg`) is **not a logo** — it is a
  topographic contour-map pattern, clearly made as a brand texture. The
  WordPress build treated it as a decorative logo shape in the hero. It now
  backs the dark sections across the site.
- The logo files ship in two colourways. `logo.svg` is the **white** wordmark,
  `logo-navy.svg` the dark one. The WordPress header was serving the dark
  wordmark over a navy hero.
- The official navy is **`#243973`** (from the mark) — the WordPress theme was
  built on `#1c3775`, a noticeably different blue. Worth confirming against any
  print/brand guidelines the client holds.

## ⚠ The homepage hero is a watermarked stock comp

`home-hero.jpg` — the source file was
`stock-photo-surveyor-engineer-worker-making-measuring-with-the-odolite-on-road-works-survey-engineer-in-1969288615.jpg`
— **carries visible Shutterstock watermarks**: the wordmark and the
rounded-square glyph tile across the sky. The trailing digits are a
Shutterstock asset ID.

This is an unlicensed preview image being used as the hero of the live site.
It needs to be licensed or replaced before launch, and it is worth asking
whether the rest of the library was licensed.

## The photography does not match the projects

Having actually looked at all 22 images, the stock chosen by the original build
bears no relation to the work it illustrates:

| Used for | Actually shows |
|---|---|
| Canberra Light Rail | a ploughed field at sunset |
| Well Station Drive duplication | a drone flying over water |
| CIT Woden utility investigation | an aerial view of a suburb |
| ANZAC Hall | workers on a concrete slab |
| "Utility locating" service | a man holding rolled plans in woodland |
| "Our tools" | a drone controller in a cornfield |

Alt text now describes only what is visible in each photograph and never
implies it depicts the project, the location or the company. This is the
strongest argument for getting real site photography.

## Copy policy

**Every word of body copy on the site is the client's own**, and no page states
a fact the source site doesn't state. The only text not lifted from the
original build is:

- **Page `<title>` tags.** The source titled every page "Land Surveying
  Specialists", so the business name never appeared in search results.
- **`<meta name="description">` tags** — each one is now a sentence taken from
  that page's own copy, not a written-for-SEO paraphrase.
- **Image `alt` text**, which the source omitted entirely. Each describes only
  what is visible in the photograph.
- **"Since 2003"** on Work with us, where the source said "For 30 years" and
  contradicted the About page.
- **The privacy policy holding page** — the source page is empty. It now says
  only that the policy is available on request, plus factual statements about
  what this website technically does. It is `noindex` until a real policy
  arrives.

Removed in later passes, and **not to be reinstated without the client
supplying them**:

- per-project localities and discipline tags
- a stats strip (07 in the team, 5+ yrs tenure)
- a history timeline with authored milestone headings
- a "Where we work" sectors section
- supporting lines under the five Work with us bullets
- section eyebrow labels ("What we do", "Case study 01", "Service 01", …)
- a privacy policy describing how enquiry data is used, retained and disclosed
- "A member of the team will be in touch shortly" on the form confirmation —
  a response-time promise only the client can make
- structured-data `image` pointing at stock photography as if it represented
  the business

`SITE_URL` in `lib/site.ts` assumes the www host and is overridable with
`NEXT_PUBLIC_SITE_URL` — confirm www vs apex before the production build,
since it feeds canonicals, Open Graph, the sitemap and robots.txt.

## Imagery

- **All photography is stock.** Filenames on the source site give it away
  (`stock-photo-surveyor-...`, various `-unsplash` files). Real photos from the
  Light Rail, CIT Woden and ANZAC Hall jobs would be a significant credibility
  upgrade.
- **Every project page used the same YOOtheme demo hero**
  (`elephant-office-hero.jpg`) and the same four images. Each project now uses
  its own card image instead, but these are still stock.
- **All seven team headshots were the same stock avatar**
  (`diverse-profile-icons-representing-people-1.jpg`). Repeating one face seven
  times reads as unfinished, so the roster now uses monogram tiles (BC, SH, WS…)
  which look deliberate. Real headshots drop straight into the same square —
  the placeholder file has been deleted.
- **The three About-page icons were leftovers from an accountancy template**
  (`services-05-audit-and-assurance.svg`, `services-01-tax-planning.svg`,
  `services-06-consulting.svg`). Replaced with purpose-drawn SVG marks.
- One source image (`tiler-working-renovation-apartment.jpg`, used on the
  homepage) was **7900×5267 and 29 MB**. The whole library is now capped at
  2000px with WebP siblings — 40 MB down to 6.3 MB. Re-run with
  `node scripts/optimise-images.mjs` after adding new photos.

## Copy that contradicts itself

- **"For 30 years"** (Work with us) vs **"established in 2003"** and *"After
  almost 20 years… Sam and Ben took over in 2021"* (About). This build says
  **"Since 2003"** on Work with us — confirm that is what they want.
- Footer read **©2025**; now generated from the current year.
- Source `<title>` on every page was *"Land Surveying Specialists"* — the
  business name never appeared in search results. Titles now lead with
  **Landmark Surveys**.

## Thin content

Three of the five project pages are close to empty on the source site. Where
there is no feature list, this build shows a short "further detail available on
request" line rather than padding it out:

- **One City Hill (2019–2024)** — client name only, no description at all.
- **Well Station Drive (2022)** — "Potholing and UGSD." and a client name.
- **ANZAC Hall (2022–2024)** — one sentence, no feature list.

Only **Canberra Light Rail** and **CIT Woden** read as real case studies.

Also worth confirming: the Well Station Drive client is listed as
**"ComplexCo"**, which sits oddly beside ARUP, Canberra Metro and the AWM.

## Still to supply

- Business hours and ABN for the contact page (neither was on the source site).
- Real social profiles.
- A careers application route — Work with us has no form or CV upload, it just
  points at the general enquiry form.
