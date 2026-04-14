---
name: uds-brand-guide
description: Apply ASU brand guidelines (colors, typography, voice, layout defaults) whenever design input is missing or incomplete. Ensures every UDS page is always on-brand.
---

# Skill: uds-brand-guide

Apply official ASU brand standards as design defaults when a user provides no, or insufficient,
design direction. Keeps every generated page on-brand without requiring a designer's input.

---

## When to use

This skill activates **automatically** inside `uds-page-builder` and `uds-reviewer`.
Use it directly when:

- The user provides only a text description with no color, font, or layout preferences
- The user provides only a URL or a short prompt (e.g. "build me a page for the CS department")
- Design input is provided but is ambiguous about colors, spacing, or tone
- A brand compliance review is requested ("does this look like an ASU page?")
- You are about to make a design decision with no explicit instruction

Trigger phrases: "make it look like ASU", "follow ASU branding", "use university colors",
"I don't have a design", "just use defaults", "brand review", "is this on-brand".

---

## Step 1: Read the reference and calibrate visual proportion

Before applying any brand defaults, do both of these:

**A. Read the reference file:**

```
skills/uds-brand-guide/references/asu-brand-guide.md
```

Pay special attention to **Section 0 (Visual Reference Sites)** — it contains the color proportion rules derived from real ASU production websites.

**B. Fetch at least one visual reference site** to calibrate the correct ASU look and feel:

```
https://yourfuture.asu.edu/      ← good general reference
https://engineering.asu.edu/     ← good for department/college pages
https://learningatscale.asu.edu/ ← good for research/academic pages
```

From the fetch, observe:
- How much of the page is white vs colored — white should dominate (~70–80%)
- Where maroon appears — headings, buttons, thin accents — never large backgrounds
- Where gold appears — highlights, one CTA strip max — never large backgrounds
- How image slots look when no photo is present — plain light gray box, not a color fill or icon

**Then apply those proportions** when making design decisions for the new page.

---

## Step 2: Identify what is missing

Scan the user's input and the current project (if editing an existing one) and note every
design dimension that is not specified:

| Dimension            | Questions to resolve via brand guide                              |
| -------------------- | ----------------------------------------------------------------- |
| Color palette        | Are primary + accent colors specified?                            |
| Button style         | Is a CTA button color/style requested?                            |
| Background colors    | Are section background colors specified?                          |
| Typography           | Are font, size, or heading hierarchy mentioned?                   |
| Logo                 | Is a custom logo provided or referenced?                          |
| Hero image           | Is a background image URL supplied?                               |
| CTA copy             | Is button/link text given?                                        |
| Section order        | Is a page structure or layout described?                          |
| Voice / tone         | Are instructions about writing style given?                       |
| Background patterns  | Are decorative patterns mentioned?                                |

For every **unchecked** dimension above, apply the corresponding default from
`references/asu-brand-guide.md` Section 5 (Design Defaults) and Section 6 (Decision Table).

---

## Step 3: Apply brand defaults

Fill in all missing design decisions using the brand guide. Document each substitution
so the user can override later if needed.

### Colors

Default color decisions (in order of preference):

1. Primary CTA → `btn-gold` (ASU Gold `#FFC627`)
2. Secondary CTA → `btn-maroon` (ASU Maroon `#8C1D40`)
3. Section backgrounds → alternate White (`white-bg`) / Light gray (`gray-faint-bg`)
4. Hero text → white (`text-white`)
5. Heading text → black on light backgrounds, white on dark backgrounds
6. Accent highlight → `highlight-gold`
7. Secondary colors (Green, Blue, Orange, etc.) → only add if Maroon or Gold also present

### Typography

1. Font → Arial (system font, already loaded via `unity-bootstrap-theme.css`)
2. Headings → Title Case; no ALL CAPS; no italics
3. Hero title → `<h1>`, white, left-aligned
4. Hero subtitle → `<p class="hero-subtitle">` — placed **before** `<h1>` in DOM
5. Section title → `<h2>`
6. Intro paragraph → `<p class="lead">`

### Logo

If no custom logo is provided:

```js
const ASU_FALLBACK_LOGO =
  "https://www.asu.edu/asuthemes/5.0/assets/asu_sunburst_logo_white.png";
```

Set both `logo.src` and `logo.mobileSrc` to this URL in `page-content.json`.

### CTA copy defaults

| Context              | Default text             |
| -------------------- | ------------------------ |
| Admissions page      | "Apply Now"              |
| Program/academic     | "Explore Programs"       |
| General info         | "Learn More"             |
| Contact/lead capture | "Request Information"    |
| Generic next step    | "Get Started"            |

### Page structure default

When no layout is described:

```
Header (ASUHeader)
  ↓
Hero (uds-hero-lg, maroon/gold CTA, white text, background image or placeholder)
  ↓
Feature section (3-up card grid or split layout, white-bg)
  ↓
Content or CTA strip (gray-faint-bg)
  ↓
Optional: Testimonial / Video / Accordion
  ↓
Footer (ASUFooter)
```

---

## Step 4: Check for brand violations

Before finalizing any implementation, verify the page is free from the known brand violations
listed in `references/asu-brand-guide.md` Section 7:

| Check                                              | What to fix                                      |
| -------------------------------------------------- | ------------------------------------------------ |
| ALL CAPS headings                                  | Change to Title Case or Sentence case            |
| Italic text in headings or body                    | Remove — not permitted in ASU brand              |
| Secondary color used without Maroon or Gold        | Add a Maroon or Gold element to the section      |
| `btn-primary` / `btn-secondary` Bootstrap defaults | Replace with `btn-gold` or `btn-maroon`          |
| Hero uses CSS `background-image`                   | Replace with `<img class="hero" src="...">`      |
| Background pattern class used without `.bg`        | Add `.bg` base class alongside pattern class     |
| Logo on busy/patterned background                  | Add solid color backdrop behind logo             |
| Deprecated `@asu/component-header` package         | Replace with `@asu/component-header-footer`      |
| Copy hardcoded in JSX                              | Move to `src/data/page-content.json`             |

---

## Step 5: Report brand decisions

When this skill contributes defaults to a page, include a **Brand Defaults Applied** section
in the output report:

```markdown
## Brand Defaults Applied

The following brand-guide defaults were used because no design input was provided:

| Design Dimension    | Value Applied                         | Source                          |
| ------------------- | ------------------------------------- | ------------------------------- |
| Primary CTA button  | `btn-gold` (ASU Gold #FFC627)         | ASU Brand Guide — Color         |
| Secondary button    | `btn-maroon` (ASU Maroon #8C1D40)     | ASU Brand Guide — Color         |
| Section 1 bg        | `white-bg`                            | ASU Brand Guide — Layout Default|
| Section 2 bg        | `gray-faint-bg`                       | ASU Brand Guide — Layout Default|
| Hero title          | White, left-aligned h1                | ASU Brand Guide — Typography    |
| Logo                | ASU Sunburst fallback CDN             | ASU Brand Guide — Logo          |
| Page font           | Arial (via unity-bootstrap-theme.css) | ASU Brand Guide — Typography    |
| CTA copy            | "Learn More"                          | ASU Brand Guide — CTA Defaults  |

To override any of these, update `src/data/page-content.json` and the relevant component.
```

---

## Integration with other skills

This skill is a **supporting reference** — it does not generate a project on its own.
It is called from within other skills:

| Skill              | When brand guide is consulted                                             |
| ------------------ | ------------------------------------------------------------------------- |
| `uds-page-builder` | Step 2 (extract design structure) — fills gaps in color, layout, copy     |
| `uds-reviewer`     | Step 3 (UDS compliance) — validates against brand violations list          |
| `uds-components`   | When choosing button variant, background class, or typography helper      |

To reference brand guide from another skill, read:

```
skills/uds-brand-guide/references/asu-brand-guide.md
```

---

## Quick lookup card

| I need...                        | Brand answer                                                    |
| -------------------------------- | --------------------------------------------------------------- |
| Page base color                  | White (`white-bg`) — 70–80% of page                            |
| Alternate section background     | Light gray (`gray-faint-bg`) — subtle, not a color shift        |
| Primary CTA button               | `btn-maroon` — ASU Maroon `#8C1D40` on white bg                |
| Secondary CTA button             | `btn-gold` — ASU Gold `#FFC627`                                 |
| Hero background                  | Full-width image with dark overlay — never solid color          |
| No image available               | Light gray placeholder div (`#e8e8e8`) — never solid maroon/gold or icons |
| Hero text color                  | White — `text-white`                                            |
| Heading color on white/gray bg   | Black — do not override with maroon or custom colors            |
| Maroon used on (only)            | Headings, primary buttons, thin accents, active nav links       |
| Gold used on (only)              | Secondary buttons, one CTA strip, text highlights (sparingly)   |
| Large maroon section background  | NEVER — maroon is an accent, not a section background           |
| Large gold section background    | One narrow CTA strip max per page — never multiple sections     |
| Page heading font                | Arial (system, via UDS theme) — do not import any other font    |
| Heading case                     | Title Case — never ALL CAPS                                     |
| Italics allowed?                 | No — not permitted in ASU brand                                 |
| Header logo (no custom provided) | `https://www.asu.edu/asuthemes/5.0/assets/asu_sunburst_logo_white.png` |
| Default CTA text                 | "Apply Now" / "Learn More" / "Request Information"              |
| Default page structure           | Header → Hero (image) → White section → Gray section → CTA strip → Footer |
| Writing style                    | AP Stylebook + ASU exceptions; direct, inclusive, active voice  |
| Can I use ASU Orange alone?      | No — secondary colors require Maroon or Gold also present       |
| Visual reference to calibrate    | Fetch https://yourfuture.asu.edu/ or https://engineering.asu.edu/ |
