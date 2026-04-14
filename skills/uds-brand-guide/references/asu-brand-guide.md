# ASU Brand Guide Reference

Source: https://brandguide.asu.edu
Last fetched: 2026-03-23

Use this reference whenever design input is missing, ambiguous, or under-specified.
These are the **official defaults** for all ASU web properties.

---

## 0. Visual Reference Sites

These are real ASU production websites. **Before designing any page, study how these sites look** to understand the correct visual proportion and feel of ASU web properties.

| Site | URL | What to learn from it |
|------|-----|----------------------|
| Your Future ASU | https://yourfuture.asu.edu/ | Light-dominant layout, hero with video/image overlay, gold highlights, white content sections |
| ASU Engineering | https://engineering.asu.edu/ | Color proportion (70% white/gray, 15-20% maroon+gold), card layouts, section separation |
| Learning at Scale | https://learningatscale.asu.edu/ | Academic/research page tone, minimal color, content-forward design |

### How to use these references

- **DO** fetch one or more of these URLs before designing to calibrate your color proportion and section feel
- **DO** study: how much of the page is white vs colored, where maroon appears, where gold appears, how sections are separated
- **DO NOT** copy their content, headings, navigation links, or section structure
- **DO NOT** reproduce their specific layout order — design an original page

### Key visual proportion rules observed across all three sites

**Color proportion (strictly follow this):**

| Color role | Approximate page coverage | Where it appears |
|---|---|---|
| White / light gray | ~70–80% | All content section backgrounds, card backgrounds, page base |
| Maroon `#8C1D40` | ~10–15% | Headings, primary button fills, thin accent borders, hero overlay tint |
| Gold `#FFC627` | ~5–10% | CTA accent bars, secondary buttons, text highlights, thin dividers |
| Dark gray / black | ~5% | Body text, footer background |
| Images | Dominant in hero, cards | Hero always has a real or placeholder image — never a solid color fill |

**The single most important rule: white and light gray dominate. Maroon and gold are accents, not backgrounds.**

### What real ASU sections look like

| Section type | Background | Color usage |
|---|---|---|
| Header/nav | White (with maroon accents on active links) | Maroon for active states only |
| Hero | Full-width image with dark overlay | White text on top; gold or maroon CTA buttons |
| Content section 1 | White | Black headings, maroon on key links/labels |
| Content section 2 | Light gray (`#fafafa` or `#f0f0f0`) | Same as above — subtle separation from white |
| CTA strip | Gold background OR white with maroon button | Never maroon as a full-width background |
| Stats/numbers | White or very light gray | Maroon for the numbers, black for labels |
| Accordion/FAQ | White | Gold left border on open item |
| Footer | Dark gray / charcoal (`#191919`) | White text |

### What to do when no image is provided

Real ASU sites rely on **photographs** for visual weight. When no image is available:
- Use a **light gray placeholder div** (`background-color: #e8e8e8`, fixed height) — clearly marked `<!-- REPLACE WITH ACTUAL IMAGE -->`
- **Never** fill an image slot with a solid maroon or gold block
- **Never** fill an image slot with a large icon
- A plain gray box communicates "image goes here" without breaking the brand

---

## 1. Colors

### Primary Colors (always available — use these first)

| Name          | Hex       | RGB           | Usage                                                        |
| ------------- | --------- | ------------- | ------------------------------------------------------------ |
| ASU Maroon    | `#8C1D40` | 140, 29, 64   | First choice for color elements; backgrounds, CTAs, accents  |
| ASU Gold      | `#FFC627` | 255, 198, 39  | First choice for color elements; backgrounds, CTAs, accents  |
| ASU Rich Black| `#000000` | 0, 0, 0       | Body text, headings on light backgrounds                     |
| ASU White     | `#FFFFFF` | 255, 255, 255 | Page backgrounds, text on dark backgrounds                   |

### Secondary Colors (accent only — must appear alongside Maroon or Gold)

| Name           | Hex       | RGB           | Pantone     |
| -------------- | --------- | ------------- | ----------- |
| ASU Green      | `#78BE20` | 120, 190, 32  | Pantone 368 C |
| ASU Blue       | `#00A3E0` | 0, 163, 224   | Pantone 299 C |
| ASU Orange     | `#FF7F32` | 255, 127, 50  | Pantone 1575 C |
| ASU Gray       | `#747474` | 116, 116, 116 | Pantone 424 C |
| ASU Copper     | `#AF674B` | 175, 103, 75  | Pantone 7522 C |
| ASU Turquoise  | `#4AB7C4` | 74, 183, 196  | Pantone 2227 C |
| ASU Pink       | `#E74973` | 231, 73, 115  | Pantone 205 C |

**Secondary color rule:** Secondary colors are accents only and **may not appear without ASU Maroon or ASU Gold** also present in the design.

### Grayscale (UI / accessibility)

7-step scale from `#191919` (Gray 1 — near-black) to `#FAFAFA` (Gray 7 — near-white).
Use for borders, dividers, disabled states, and subtle backgrounds.

### UDS CSS Token Mapping

| Brand Color      | UDS CSS token / class |
| ---------------- | --------------------- |
| Maroon `#8C1D40` | `maroon` (bg: `maroon-bg`) |
| Gold `#FFC627`   | `gold` (bg: `gold-bg`) |
| Black `#000000`  | `black` (bg: `black-bg`) |
| White `#FFFFFF`  | `white` (bg: `white-bg`) |
| Gray medium      | `gray` (bg: `gray-dark-bg`, `gray-light-bg`, `gray-faint-bg`) |

---

## 2. Typography

### Fonts

| Context         | Font                  | Fallback stack                                                          |
| --------------- | --------------------- | ----------------------------------------------------------------------- |
| Web headings    | **Arial** (system)    | `Arial, Helvetica, "Nimbus Sans L", "Liberation Sans", FreeSans, sans-serif` |
| Web body        | **Arial** (system)    | same as above                                                           |
| Print headings  | Neue Haas Grotesk Display | Available via Adobe Creative Cloud (Adobe Fonts)                  |
| Print body      | Neue Haas Grotesk Text    | Available via Adobe Creative Cloud (Adobe Fonts)                  |
| Icons (web)     | Font Awesome Free     | `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css` |
| Icons (custom)  | ASU Awesome           | Available to ASU staff                                                  |

> **Web rule:** Arial is the primary web font — no additional license required. UDS components inherit this via `unity-bootstrap-theme.css`.

### Typography Rules

| Rule                  | Value / Guidance                                          |
| --------------------- | --------------------------------------------------------- |
| Heading case          | Title Case or Sentence case — **never ALL CAPS**          |
| Heading alignment     | Left-aligned preferred for readability                    |
| Italics               | **Not permitted** in headings; not permitted in body copy under any circumstance |
| Heading colors        | Black on white, White on dark backgrounds, ASU Gold, or ASU Maroon |
| Body size (print)     | 8pt on 12pt leading; range 7.5–12pt                       |
| Body size (web)       | 16px base (Bootstrap default, preserved by UDS)           |
| Column width (web)    | Max 700px for readable line length                        |
| Drop shadows          | Not preferred; only subtle effects if needed for legibility |

### Heading Hierarchy Defaults

When no hierarchy is specified in the brief:

| Level | Usage                               | UDS class suggestion        |
| ----- | ----------------------------------- | --------------------------- |
| `h1`  | Page/hero title — one per page      | (default or `display-1`)    |
| `h2`  | Section titles                      | (default)                   |
| `h3`  | Card titles, subsection headers     | (default)                   |
| `h4`  | Supporting labels                   | (default)                   |

---

## 3. Logo

### Primary Logo

- **ASU Sunburst Logo** — introduced 1995, replaces all prior ASU logos
- Available as white-on-maroon, white-on-black, and full-color variants
- ASU fallback CDN URL (always available, no auth required):
  `https://www.asu.edu/asuthemes/5.0/assets/asu_sunburst_logo_white.png`

### Logo Usage Rules

| Rule                              | Guidance                                                    |
| --------------------------------- | ----------------------------------------------------------- |
| Clear space                       | Maintain clear space around the logo equal to the logo height |
| Minimum size                      | Never smaller than legible — check on mobile (`mobileSrc` required) |
| Background                        | Use white logo on maroon/dark; use maroon/full-color on white/light |
| Co-branding                       | Unit sub-logos must follow endorsed logo lockup guidelines  |
| University Seal                   | Formal contexts only — requires Office of the President approval |
| Prohibited                        | Do not distort, recolor, add effects, or place on busy backgrounds |

### Tagline

**"Learn to Thrive"** — ASU's official mission tagline. Use when relevant to the page context (admissions, about pages, mission statements).

---

## 4. Voice and Content

### Writing Style

- Based on **The Associated Press (AP) Stylebook** with ASU-specific exceptions
- "Designed to be inclusive and useful" — write for a broad, diverse audience
- When AP Stylebook doesn't cover a case, consult **Merriam-Webster dictionary**

### Tone

| Attribute      | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| Inclusive      | Speak to everyone — prospective students, faculty, the public       |
| Direct         | Short sentences, active voice                                       |
| Accessible     | Avoid jargon; write for a general reader                            |
| Purposeful     | Every headline and CTA should have a clear, specific intent         |

### Key Rules

| Rule                        | Guidance                                                          |
| --------------------------- | ----------------------------------------------------------------- |
| Capitalization              | Title case for proper nouns and headings; sentence case for body  |
| Numbers                     | Spell out one–nine; numerals for 10+                              |
| Dates                       | Month Day, Year format (e.g., March 23, 2026)                     |
| Abbreviations               | Spell out first use, then abbreviate (e.g., Arizona State University (ASU)) |
| Inclusive language          | Follow ASU inclusive language guidelines                          |
| SEO / social exceptions     | May deviate from AP style when platform conventions require it    |
| Hardcoded strings in JSX    | Avoid — put all copy in `src/data/page-content.json`              |

### CTA Copy Defaults

When no CTA text is specified in the brief:

| Context                    | Default CTA copy                |
| -------------------------- | ------------------------------- |
| Primary page CTA           | "Apply Now"                     |
| Learn more                 | "Learn More"                    |
| Explore programs           | "Explore Programs"              |
| Contact / Request info     | "Request Information"           |
| General next step          | "Get Started"                   |

---

## 5. Design Defaults (apply when brief is under-specified)

When a user provides minimal information (no colors, no layout, no images), apply these defaults so the page is always on-brand:

### Layout Defaults

| Element          | Default                                           |
| ---------------- | ------------------------------------------------- |
| Page structure   | Header → Hero → 2–3 content sections → Footer     |
| Hero size        | `uds-hero-lg` for primary landing pages           |
| Hero overlay     | Include `<div class="hero-overlay"></div>` always |
| Hero background  | Use `<img class="hero" src="...">` — never CSS `background-image` |
| Section padding  | `py-5` (Bootstrap) or `uds-section-padding`       |

### Color Defaults

**Rule: white and light gray are the dominant page colors. Maroon and gold are accents only.**

| Element                  | Default                                                               |
| ------------------------ | --------------------------------------------------------------------- |
| Page base                | White (`white-bg`) — this is most of the page                        |
| Primary CTA button       | `btn-maroon` (ASU Maroon `#8C1D40`) — maroon on white reads cleanly  |
| Secondary CTA button     | `btn-gold` (ASU Gold `#FFC627`) — gold as secondary accent            |
| Hero text color          | White (`text-white`) on dark image overlay                            |
| Hero background          | Full-width image with dark overlay — never a solid color fill         |
| Section 1 background     | White (`white-bg`)                                                    |
| Section 2 background     | Light gray (`gray-faint-bg`) — subtle separation, not a color shift   |
| Section 3 background     | White (`white-bg`)                                                    |
| Section 4 background     | Light gray (`gray-faint-bg`)                                          |
| CTA strip background     | Gold (`gold-bg`) with maroon button — OR white with maroon button     |
| Stats section background | White or light gray — maroon for the numbers, black for labels        |
| Footer background        | Dark (`gray-dark-bg` or `black-bg`) with white text                  |
| Accent / highlight text  | `highlight-gold` or `highlight-black` — sparingly on key words only   |
| Heading color            | Black (`#000`) on white/gray sections; white on dark/image sections   |
| Body text color          | Black / dark gray — inherited from UDS theme, do not override         |

**Never use maroon as a large section background** (except hero overlay tint, which sits under an image).
**Never use gold as a large section background** except for a narrow CTA strip (one section max per page).

### Typography Defaults

| Element          | Default                                            |
| ---------------- | -------------------------------------------------- |
| Hero title       | `<h1>` — white, left-aligned                       |
| Hero subtitle    | `<p class="hero-subtitle">` — white, above h1 in DOM |
| Section title    | `<h2>` — black on light bg, or white on dark bg    |
| Body paragraph   | `<p class="lead">` for intro paragraphs; `<p>` otherwise |
| Font             | Arial (inherited from `unity-bootstrap-theme.css`) |

### Image Defaults

| Situation                    | Default                                                        |
| ---------------------------- | -------------------------------------------------------------- |
| No hero image provided       | Use SVG placeholder and note `REPLACE_WITH_ACTUAL_IMAGE_URL`   |
| No card image provided       | Use SVG placeholder: `data:image/svg+xml,...`                  |
| Logo not provided            | Use ASU fallback: `https://www.asu.edu/asuthemes/5.0/assets/asu_sunburst_logo_white.png` |
| Background pattern needed    | `network-white` on light sections; `network-black` on dark sections |

---

## 6. Decision Table — What to Use When Input Is Missing

| Input missing                  | Brand-guide default to apply                                              |
| ------------------------------ | ------------------------------------------------------------------------- |
| No colors specified            | Maroon + Gold as primary; white and light-gray section backgrounds        |
| No font specified              | Arial (system) — already provided by UDS theme                            |
| No CTA copy                    | "Apply Now" (admissions) / "Learn More" (content) / "Request Information" (contact) |
| No logo                        | ASU Sunburst fallback CDN URL                                             |
| No hero image                  | SVG placeholder, mark for replacement                                     |
| No background pattern          | Plain white or `gray-faint-bg` — avoid busy patterns unless in brief      |
| No heading text                | Use generic but meaningful placeholders: "Discover Your Path", "Why ASU?" |
| No section order given         | Hero → Feature cards → CTA strip → Footer                                 |
| No tone guidance               | Direct, inclusive, active voice; AP Style; Title Case for headings        |
| No icon style                  | Font Awesome Free (`fa-solid` prefix); `aria-hidden="true"` on decorative icons |

---

## 7. What NOT to Do (Brand Violations)

| Violation                          | Correct approach                                               |
| ---------------------------------- | -------------------------------------------------------------- |
| Using ALL CAPS in headings         | Use Title Case or Sentence case                                |
| Using italics anywhere             | Remove — italics are not permitted in ASU brand                |
| Using secondary colors without Maroon/Gold | Add Maroon or Gold alongside any secondary color use   |
| Using `btn-primary` / `btn-secondary` (Bootstrap defaults) | Use `btn-gold` or `btn-maroon`          |
| Using CSS `background-image` for hero | Use `<img class="hero" src="...">` inside `uds-hero-*`      |
| Using only `network-white` class (no `.bg`) | Always pair pattern class with `.bg` base class       |
| Placing logo on a busy/patterned background | Use a solid maroon, black, or white background behind logo |
| Recoloring the ASU sunburst logo   | Use the official color variants only                           |
| Using `@asu/component-header` (deprecated) | Use `@asu/component-header-footer` combined package     |
| Hardcoding copy in JSX             | All copy belongs in `src/data/page-content.json`               |
