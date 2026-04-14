# UDS Section Wrapper Patterns

> **Reference for `uds-page-builder` and `uds-components` skills.**
> Documents non-obvious UDS component behaviours that affect how
> section wrappers must be built. These are the gotchas that cause
> silent failures or SSR crashes if skipped.

---

## 1. ASUHeader — navTree shape transform (CRITICAL)

**Problem:** Content JSON stores nav as flat `{ text, href }` objects.
`ASUHeader` requires a deeply nested `htmlLink` shape.

**Required DS shape:**

```ts
{
  isActive: boolean,
  htmlLink: { text: string, uri: string, target: string },
  children: [{
    hasBorderTop: boolean,
    htmlLink: { text: string, uri: string, target: string }
  }]
}
```

**Pattern:** Always transform in the component — never in content JSON.

```jsx
const dsNavItems = (props.navItems || []).map((item) => ({
  isActive: false,
  htmlLink: { text: item.text, uri: item.href, target: item.target || "_self" },
  children: (item.children || []).map((child) => ({
    hasBorderTop: false,
    htmlLink: {
      text: child.text,
      uri: child.href,
      target: child.target || "_self",
    },
  })),
}));
```

**If you skip this:** SSR crash — `Cannot read properties of undefined (reading 'uri')`.

---

## 2. ASUHeader — logo requires mobileSrc

**Problem:** `logo` prop requires both `src` and `mobileSrc`. If `mobileSrc` is
omitted, header renders a broken image on mobile viewports.

**Always provide:**

```jsx
logo={{
  alt: 'ASU Logo',
  src: 'https://www.asu.edu/asuthemes/5.0/assets/asu_sunburst_logo_white.png',
  href: '/',
  mobileSrc: 'https://www.asu.edu/asuthemes/5.0/assets/asu_sunburst_logo_white.png',
}}
```

---

## 3. ASUHeader and ASUFooter — must use `client:only="react"` NOT `client:load`

**Problem:** Both `ASUHeader` and `ASUFooter` access browser globals (`document`/`window`)
at module load time — not inside lifecycle methods. This means even `client:load`
(which does SSR first) causes a build crash.

**Symptom:** `document is not defined` or `window is not defined` during `npm run build`.

**Fix:**

```astro
<!-- ✅ Correct -->
<Header client:only="react" />
<Footer client:only="react" />

<!-- ❌ Wrong — SSR crash -->
<Header client:load />
<Footer />
```

`client:only="react"` skips SSR entirely — the component renders only in the browser.

---

## 4. Hero (unity-react-core) — buttons need `href` and correct color names

**Problem:** `Hero` buttons without `href` render visually but are completely non-functional.
Using Bootstrap color names (`'primary'`, `'secondary'`) silently falls back to unstyled button.

**Build mode (user-provided design):**

```jsx
buttons={[
  { color: 'maroon', size: 'default', label: 'Primary CTA', href: '/apply' },
  { color: 'gold', size: 'default', label: 'Secondary CTA', href: '/learn-more' },
]}
```

**Campaign landing page mode — SINGLE CTA ONLY (scroll to RFI):**

```jsx
// ✅ Campaign mode: one button, anchors to #rfi, never navigates away
buttons={[
  { color: 'maroon', size: 'default', label: 'Request Information', href: '#rfi' },
]}

// ❌ Never in campaign mode — secondary CTA navigates user away from page
buttons={[
  { color: 'maroon', size: 'default', label: 'Apply Now', href: '/apply' },
  { color: 'gold', size: 'default', label: 'Learn More', href: '/programs' },  // ❌
]}
```

**Import — use `@asu/unity-react-core` (NOT the deprecated `@asu/components-core`):**

```jsx
// ✅ Correct
import { Hero } from "@asu/unity-react-core";

// ✅ Also valid — individual ESM bundle from unity-react-core
import { Hero } from "@asu/unity-react-core/dist/esm/components/Hero.es.js";

// ❌ Deprecated — do not use for new projects
import { Hero } from "@asu/components-core/dist/esm/components/Hero";
import { Hero } from "@asu/components-core";
```

---

## 5. Card (unity-react-core) — icon requires FontAwesome loaded globally

> Import `Card` from `@asu/unity-react-core` — NOT from `@asu/components-core` (deprecated).

**Problem:** Icon cards use FontAwesome arrays like `['fas', 'newspaper']`.
If FontAwesome is not loaded in `layout.astro`, icon renders as an empty box.

**Ensure layout.astro includes:**

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
/>
```

**Icon prop format:**

```jsx
icon={['fas', 'newspaper']}   // ✅ Correct — array of two strings
icon="newspaper"               // ❌ Wrong — string silently ignored
```

---

## 6. Carousel (unity-react-core) — `cards` array must match exact shape

> ⛔ `@asu/component-carousel` is **DEPRECATED and REMOVED**. Import `Carousel` from `@asu/unity-react-core` instead.
> Use `client:only="react"` (NOT `client:load`) — Carousel is now in unity-react-core which accesses `document` at module load.

**Required card shape:**

```ts
{
  type: 'default',           // required
  image: string,             // URL — use placeholder if no image
  imageAltText: string,      // required
  title: string,
  body: string,
  buttons: [{
    color: 'maroon' | 'gold',
    size: 'default' | 'small',
    label: string,
    href: string             // required — omit causes broken button
  }]
}
```

**SVG placeholder:**

```js
const IMG_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect width='400' height='225' fill='%23e8e8e8'/%3E%3C/svg%3E";
```

---

## 7. Accordion (unity-react-core) — cards are 1-based, body is HTML string

> Import `Accordion` from `@asu/unity-react-core` — NOT from `@asu/components-core` (deprecated).

**`openedCard` is 1-indexed.** Passing `0` leaves all cards closed.

```jsx
<Accordion
  cards={[
    { content: { header: "Question 1", body: "<p>Answer text</p>" } },
  ]}
  openedCard={1} // ✅ 1-based
/>
```

**Body must be HTML string:**

```js
body: "<p>The answer goes here.</p>"; // ✅
body: "The answer goes here.";        // ❌ no paragraph spacing
```

---

## 8. EventList — feed URL must return correct ASU events format

**For development/demo, use:**

```
https://events.asu.edu/?format=json
```

**Do not invent a feed URL.** If user doesn't have one yet, render a placeholder
section and note in the review report that the feed URL is pending.

---

## 9. News — CardListlNews has a typo in the export name

The export is `CardListlNews` (lowercase `l` before `News`) — this is the actual published name.

```jsx
// ✅ Correct — note the lowercase 'l'
import { CardListlNews } from "@asu/component-news";

// ❌ Wrong — will throw "CardListNews is not exported"
import { CardListNews } from "@asu/component-news";
```

---

## 10. CSS — correct file locations (CRITICAL — updated v1.21.0)

**Use `@asu/component-header-footer` (combined)** — `@asu/component-header` and `@asu/component-footer` are deprecated.

**CSS path change in unity-bootstrap-theme v1.21.0:** Files moved from `dist/css/` to `dist/` root.
The combined `unity-bootstrap-header-footer.css` is now split into separate files.

**New CSS files (in `dist/` root — NOT `dist/css/`):**

```
node_modules/@asu/unity-bootstrap-theme/dist/unity-bootstrap-theme.css
node_modules/@asu/unity-bootstrap-theme/dist/unity-bootstrap-theme.bundle.css
node_modules/@asu/unity-bootstrap-theme/dist/unity-bootstrap-header.css
node_modules/@asu/unity-bootstrap-theme/dist/unity-bootstrap-footer.css
```

**Correct `layout.astro` links (v1.21.0+):**

```html
<link rel="stylesheet" href="/css/unity-bootstrap-theme.css" />
<link rel="stylesheet" href="/css/unity-bootstrap-header.css" />
<link rel="stylesheet" href="/css/unity-bootstrap-footer.css" />
```

**In React component files — use package import (cleaner):**

```jsx
import "@asu/unity-bootstrap-theme";
```

**Correct postinstall (Windows-compatible, v1.21.0 paths):**

```json
"postinstall": "node -e \"const fs=require('fs');fs.mkdirSync('public/css',{recursive:true});fs.mkdirSync('public/js',{recursive:true});['unity-bootstrap-theme.css','unity-bootstrap-theme.bundle.css','unity-bootstrap-header.css','unity-bootstrap-footer.css'].forEach(f=>{fs.copyFileSync('node_modules/@asu/unity-bootstrap-theme/dist/'+f,'public/css/'+f);});fs.copyFileSync('node_modules/@asu/unity-bootstrap-theme/dist/js/bootstrap.bundle.min.js','public/js/bootstrap.bundle.min.js');\""
```

**Outdated references — do NOT use:**
- ~~`dist/css/unity-bootstrap-header-footer.css`~~ ❌ (old combined file, no longer exists)
- ~~`dist/css/unity-bootstrap-theme.css`~~ ❌ (old path — `dist/css/` prefix removed)
- ~~`@asu/component-header` CSS~~ ❌ (package deprecated)
- ~~`@asu/component-footer` CSS~~ ❌ (package deprecated)

---

## 11. Content JSON location — use `src/data/`, NOT `src/content/`

**Problem:** Astro 4 reserves the `src/content/` directory for content collections.
Placing arbitrary JSON there triggers warnings and can cause routing conflicts.

**Correct location:** `src/data/page-content.json`

```astro
---
// ✅ Correct
import content from '../data/page-content.json';

// ❌ Wrong — Astro content collections warning
import content from '../content/page-content.json';
---
```

---

## 12. `client:only` on interactive components in Astro

**Quick reference:**

| Component              | Directive             | Reason                              |
| ---------------------- | --------------------- | ----------------------------------- |
| `ASUHeader`            | `client:only="react"` | `document` at module load — crash   |
| `ASUFooter`            | `client:only="react"` | `window` during render — crash      |
| `Carousel`             | `client:only="react"` | Now in `unity-react-core` — `document` at module load |
| `ImageCarousel`        | `client:only="react"` | Now in `unity-react-core` — `document` at module load |
| `Hero`                 | `client:only="react"` | From `unity-react-core` — `document` at module load   |
| `Card`                 | `client:only="react"` | From `unity-react-core` — `document` at module load   |
| `Accordion`            | `client:only="react"` | From `unity-react-core` — `document` at module load   |
| `Testimonial`          | `client:only="react"` | From `unity-react-core` — `document` at module load   |
| `Video`                | `client:only="react"` | From `unity-react-core` — `document` at module load   |
| `Pagination`           | `client:only="react"` | From `unity-react-core` — `document` at module load   |
| `CardCarouselNews`     | `client:load`         | Client-side data fetch              |
| `CardGridNews`         | `client:load`         | Client-side data fetch              |
| `EventList`            | `client:load`         | Client-side data fetch              |
| `DegreeList`           | `client:load`         | Full SPA                            |
| `AsuRfi` / `RFISection`| `client:only="react"` | Accesses `document` at module load — SSR crash with `client:load` |
| `WebDirectoryComponent`| `client:load`         | Full SPA                            |

> **Rule:** ANY component from `@asu/unity-react-core` must use `client:only="react"`. This package accesses `document` at module load time, which causes SSR crash with `client:load`.

---

## 13. Hero CSS — background MUST be `<img class="hero">`, NOT a div with background-image (CRITICAL)

**Problem:** Using `<div class="hero" style="background-image: url(...)">` produces a blank hero.
The UDS CSS only targets `img.hero`:

```css
/* Actual CSS rule in unity-bootstrap-theme.css */
div[class^=uds-hero] img.hero {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%; object-fit: cover;
}
```

A `<div>` with `background-image` is not targeted by this rule and renders with zero height.

**Also:** The `.content` wrapper div is `display:none` for `uds-hero-md` and `uds-hero-lg`.
Text (`h1`, `.hero-subtitle`, `.btn-row`) must be **direct children** of `uds-hero-*`.
Subtitle comes **before** h1 in DOM order (grid assigns subtitle to row 2, h1 to row 3).

**✅ Correct structure:**

```html
<div class="uds-hero-lg">
  <img class="hero" src="/image.jpg" alt="..." fetchpriority="high" decoding="async" />
  <div class="hero-overlay"></div>
  <p class="hero-subtitle text-white"><span>Subtitle text</span></p>
  <h1 class="text-white"><span>Page Title</span></h1>
</div>
```

**❌ Wrong (was in old reference — do not use):**

```html
<div class="uds-hero-lg">
  <div class="hero" style="background-image: url(...)">   <!-- ❌ ignored by CSS -->
    <div class="hero-overlay"></div>
  </div>
  <div class="content container-xl">                     <!-- ❌ display:none for lg -->
    <div class="row"><div class="col-lg-8">
      <h1>Title</h1>
    </div></div>
  </div>
</div>
```

**Min-heights:** `uds-hero-sm` = 16rem · `uds-hero-md` = 21rem · `uds-hero-lg` = 32rem

---

## 14. Background patterns require BOTH `.bg` AND the pattern class (CRITICAL)

**Problem:** Using `class="network-white"` alone renders nothing.
The CSS rule requires both classes on the same element: `.bg.network-white { background-image: url(...) }`.

**`.bg` base class** (from CSS): `background: transparent repeat padding-box; opacity: 1` — no `position:absolute`.

**✅ Correct — pattern as an overlay div inside the section:**

```html
<section style="background-color: #e8e8e8; position: relative;">
  <!-- pattern overlay: needs .bg + pattern-class, plus manual absolute positioning -->
  <div class="bg network-white"
       style="position:absolute;top:0;left:0;width:100%;height:100%;
              pointer-events:none;background-repeat:repeat;background-size:auto;opacity:0.6;">
  </div>
  <!-- content sits above the overlay -->
  <div class="container py-5" style="position:relative;z-index:1;">
    ...
  </div>
</section>
```

**❌ Wrong — pattern class alone:**

```html
<section class="gray-dark-bg network-white">...</section>   <!-- ❌ network-white alone does nothing -->
<section class="network-white">...</section>                 <!-- ❌ same problem -->
```

This applies to ALL pattern classes: `morse-code-white/black`, `network-white/black`, `topo-white/black`,
`semiconductor-light/dark`, `plus-light/dark`, `arrows-light/dark`.

---

## 15. AsuRfi — required props and client directive (CRITICAL)

**Problem:** `@asu/app-rfi` accesses `document` at module load — same as `unity-react-core`.
Using `client:load` causes SSR crash. The form also silently renders blank if key props are missing.

**Always use `client:only="react"`:**

```astro
<!-- ✅ Correct -->
<RFISection client:only="react" ... />

<!-- ❌ Wrong — SSR crash: "document is not defined" -->
<RFISection client:load ... />
```

**All key props must be passed — form renders blank without them:**

```astro
<RFISection
  client:only="react"
  campus={content.rfi.campus}
  studentType={content.rfi.studentType}
  variant={content.rfi.variant}
  country={content.rfi.country}
  stateProvince={content.rfi.stateProvince}
  successMsg={content.rfi.successMsg}
  test={content.rfi.test}
  submissionUrl={content.rfi.submissionUrl}
/>
```

**Required `page-content.json` shape:**

```json
"rfi": {
  "campus": "NOPREF",
  "studentType": "undergrad",
  "variant": "rfiVariant1",
  "country": "US",
  "stateProvince": "Arizona",
  "successMsg": "Thank you! We'll be in touch soon.",
  "test": true,
  "submissionUrl": "https://httpbin.org/post"
}
```

> `submissionUrl` defaults to `https://httpbin.org/post` for safe dev testing.
> Set `test: false` and replace with real ASU endpoint in production.

**Minimum props that cause blank render if omitted:** `submissionUrl`, `campus`, `studentType`, `variant`.

---

---

## 16. Campaign Landing Page Mode — Single-CTA and RFI placement

> These rules apply ONLY in campaign mode (Step 0 Mode B in SKILL.md). They do NOT apply when the user provides screenshots or section descriptions.

### What is campaign mode?

The user provides a keyword or topic only — no screenshots, no section list. The skill generates the entire page from the keyword. Examples: "AI engineering degrees", "online MBA program", "nursing accelerated BSN".

### Single-CTA rule

Every interactive element that would otherwise link away from the page must either be removed or converted to a scroll-to-RFI anchor.

```jsx
// ✅ The only permitted external-feeling action — scrolls to the RFI form on the same page
<a href="#rfi" className="btn btn-maroon">Request Information</a>

// ❌ Prohibited in campaign mode — navigates user away
<a href="/programs">View All Programs</a>
<a href="/apply">Apply Now</a>       // unless this links to an anchor on the same page
<a href="https://...">Learn More</a>
```

**This applies to:**
- Hero buttons
- Card buttons (HorizontalCards, ImageBasedCardAndHover)
- Carousel card buttons
- Section CTAs / banner buttons
- Any standalone Button.jsx usage

### RFI form placement

The `app-rfi.jsx` component (wrapper around `@asu/app-rfi`) must always be rendered as the last content section before the footer. It must have `id="rfi"` so anchor links work.

```astro
<!-- ✅ Campaign mode RFI section -->
<section id="rfi" className="bg-maroon py-5">
  <div class="container">
    <h2 class="text-white text-center mb-4">{content.rfi.sectionHeading}</h2>
    <RFISection
      client:only="react"
      campus={content.rfi.campus}
      studentType={content.rfi.studentType}
      variant={content.rfi.variant}
      country={content.rfi.country}
      stateProvince={content.rfi.stateProvince}
      successMsg={content.rfi.successMsg}
      test={content.rfi.test}
      submissionUrl={content.rfi.submissionUrl}
    />
  </div>
</section>
```

Add `rfi.sectionHeading` to `page-content.json` with keyword-aligned copy, e.g.:
`"sectionHeading": "Start Your AI Engineering Journey — Request Information Today"`

### Nav items — in-page anchors only

```json
"items": [
  { "text": "About", "href": "#about", "children": [] },
  { "text": "Programs", "href": "#programs", "children": [] },
  { "text": "Outcomes", "href": "#outcomes", "children": [] },
  { "text": "Request Info", "href": "#rfi", "children": [] }
]
```

### Programs / degrees — inline rendering, no external links

If programs need to be listed, render them inline with UDS components. Never add a "See all programs" link.

```jsx
// ✅ Inline card grid — programs rendered on the page
<HorizontalCards
  cards={content.programs.map(p => ({
    title: p.name,
    body: p.description,    // 1-2 sentence differentiator
    buttons: [{ color: 'maroon', label: 'Request Information', href: '#rfi' }]
  }))}
/>

// ❌ External link to program catalog
<a href="https://degrees.asu.edu/...">See All Programs</a>
```

---

## Universal conventions

- **Content JSON:** All text, URLs, and image sources live in `src/data/page-content.json`.
- **SVG fallback:** All image props default to inline SVG placeholder — never empty string.
- **CSS import in every component:** Add `import "@asu/unity-bootstrap-theme";` at top of every React component file (v1.21.0+ package import). Alternatively: `import "../../node_modules/@asu/unity-bootstrap-theme/dist/unity-bootstrap-theme.css"` (note: path is `dist/`, not `dist/css/`).
- **Section ID:** Every section wrapper accepts an `id` from content JSON and binds it to the root element for smooth-scroll anchoring.
