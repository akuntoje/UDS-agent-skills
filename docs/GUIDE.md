# UDS Skills Toolkit — Full Guide

Complete reference for setup, usage, component examples, known pitfalls, and maintenance.

---

## Prerequisites

### GitHub NPM Token
UDS packages are hosted on GitHub Packages and require authentication.

Get a token at **GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)** with `read:packages` scope.

You provide this token when running the `uds-page-builder` skill. It is written to `.npmrc` in the generated project and is never logged or echoed.

### Playwright (for visual verification)
Used by `uds-page-builder` and `uds-reviewer` to take screenshots after building.

```bash
npx playwright install chromium
```

---

## How to use the skills

Point your AI assistant at this repo and describe your task. The assistant reads the `SKILL.md` file in the relevant skill folder and follows the step-by-step instructions to produce code.

**Example prompts:**

| Task | What to say |
|------|-------------|
| Build a new page | *"Build a UDS landing page for SafeInsights with a hero, content section, and footer"* |
| Build from a design | *"Create a landing page matching these screenshots"* (attach images) |
| Add a component | *"Add a news feed section to my existing UDS project"* |
| Validate the page | *"Review my UDS page for compliance and build errors"* |

---

## Skills reference

### `uds-page-builder` — Build a landing page

Scaffolds a complete Astro + React project from a plain text description or screenshot/image mockup.

**What it generates:**
```
project-name/
├── .npmrc                        # GitHub token (gitignored)
├── package.json                  # Dependencies + postinstall
├── astro.config.mjs
├── scripts/
│   └── copy-css.cjs              # Copies CSS to public/ after install
├── src/
│   ├── layouts/Layout.astro      # HTML shell, CSS links, Bootstrap JS
│   ├── pages/index.astro         # Page composition
│   ├── components/               # One .jsx file per section
│   └── data/page-content.json   # All text, image URLs, nav items
└── public/
    ├── css/                      # Populated by postinstall
    └── js/                       # bootstrap.bundle.min.js
```

**Providing a logo or images:**
If you attach a logo or image with your prompt, the skill copies it to `public/images/` and references it as `/images/<filename>`. Place the actual file at `public/images/<filename>` before running `npm run dev`.

---

### `uds-components` — Add a component

Adds a specific UDS component to an existing Astro + React project. Looks up the component in `uds-catalog.md`, installs the package, creates a wrapper `.jsx`, and wires content into `page-content.json`.

**Supported components:**

| Ask for... | Package | Component |
|------------|---------|-----------|
| Header, top nav, ASU logo bar | `@asu/component-header-footer` | `ASUHeader` |
| Footer | `@asu/component-header-footer` | `ASUFooter` |
| Hero, full-width banner | `@asu/unity-react-core` | `Hero` |
| Card grid, feature cards | `@asu/unity-react-core` | `Card` |
| Carousel, sliding cards | `@asu/unity-react-core` | `Carousel` |
| News feed | `@asu/component-news` | `CardGridNews`, `CardCarouselNews` |
| Events list | `@asu/component-events` | `EventList` |
| Accordion, FAQ | `@asu/unity-react-core` | `Accordion` |
| Tabbed content | `@asu/unity-react-core` | `TabbedPanels` |
| Testimonial, quote | `@asu/unity-react-core` | `Testimonial` |
| Video embed | `@asu/unity-react-core` | `Video` |
| RFI / contact form | `@asu/app-rfi` | `AsuRfi` |
| Faculty/staff directory | `@asu/app-webdir-ui` | `WebDirectoryComponent` |
| Degree/program finder | `@asu/app-degree-pages` | `DegreeList` |
| Anchor / in-page nav | `@asu/unity-react-core` | `AnchorMenu` |
| Pagination | `@asu/unity-react-core` | `Pagination` |

---

### `uds-reviewer` — Review and validate

Validates a built page against UDS standards, build health, and accessibility.

**Checks performed:**
- `npm run build` — clean build, no TypeScript/JSX errors
- UDS compliance — correct packages, deprecated packages flagged
- Pitfall checklist — directives, navTree shape, hero structure, CSS paths
- Visual screenshots — desktop (1280px) and mobile (375px)
- Accessibility — alt text, heading hierarchy, descriptive CTAs

---

## Component examples (`skills/components/`)

Production-ready, storybook-sourced wrapper components used by the skills as copy-ready templates.

| File | Wraps |
|------|-------|
| `Header.jsx` | `ASUHeader` — navTree transform + logo props |
| `Footer.jsx` | `ASUFooter` |
| `Hero.jsx` | Raw CSS hero (`uds-hero-sm/md/lg`) |
| `HorizontalCards.jsx` | Raw CSS card grid |
| `ImageBasedCardAndHover.jsx` | Image card with hover-reveal content overlay |
| `Accordion.jsx` | `Accordion` from `@asu/unity-react-core` |
| `TabsSection.jsx` | `TabbedPanels` from `@asu/unity-react-core` |
| `TestimonialSlider.jsx` | `Testimonial` + custom slider |
| `VideoSection.jsx` | `Video` — YouTube or direct URL |
| `AnchorNav.jsx` | `AnchorMenu` from `@asu/unity-react-core` |
| `Button.jsx` | `Button` from `@asu/unity-react-core` |
| `app-rfi.jsx` | `AsuRfi` from `@asu/app-rfi` |

---

## Reference files

| File | Covers |
|------|--------|
| `skills/uds-components/references/uds-catalog.md` | Every UDS React component — props, packages, imports, known pitfalls |
| `skills/uds-components/references/uds-css-patterns.md` | HTML/CSS layer — background colors, pattern classes, button variants, hero and card templates |
| `skills/uds-page-builder/references/SECTION-PATTERNS.md` | Critical gotchas — SSR crashes, navTree shape, hero image structure, CSS paths |

---

## Critical patterns

### Header and Footer require `client:only="react"`
```astro
<Header client:only="react" ... />
<Footer client:only="react" ... />
```
These components access `document` and `window` at module load time. Using `client:load` or no directive causes a build crash: `document is not defined`.

### Hero background must be `<img class="hero">` — not a CSS background-image
```html
<!-- Correct -->
<div class="uds-hero-lg">
  <img class="hero" src="..." alt="" />
</div>

<!-- Wrong — renders blank -->
<div class="uds-hero-lg" style="background-image: url(...)"></div>
```

### Background patterns need both `.bg` and the pattern class
```html
<!-- Correct -->
<div class="bg network-white"></div>

<!-- Wrong — pattern invisible -->
<div class="network-white"></div>
```

### Use `@asu/component-header-footer` — the combined package
```js
import { ASUHeader, ASUFooter } from "@asu/component-header-footer";
// Not @asu/component-header or @asu/component-footer (both deprecated)
```

### Content lives in `src/data/` — not `src/content/`
Astro 4 reserves `src/content/` for content collections. Always use `src/data/page-content.json`.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `document is not defined` at build | Header/Footer using `client:load` | Change to `client:only="react"` |
| Hero section renders blank | Background set as CSS `background-image` | Use `<img class="hero" src="...">` inside `.uds-hero-*` |
| Background pattern invisible | Missing `.bg` base class | Use `class="bg network-white"` (both classes required) |
| `require is not defined` in postinstall | Script has `.js` extension in an ES module project | Ensure postinstall runs `node scripts/copy-css.cjs` |
| CSS not loading after install | Postinstall didn't run | Run `npm run postinstall` manually |
| Nav links not rendering | navTree not transformed to `htmlLink` shape | See `SECTION-PATTERNS.md` → ASUHeader navTree |
| Mobile logo broken | `mobileSrc` missing from logo prop | Always provide both `src` and `mobileSrc` |
| `CardListlNews` not found | Typo in the actual export name | Import as `CardListlNews` (lowercase 'l') |
| Accordion first item closed | `openedCard` is 0-based | `openedCard` is 1-based — use `1` for first item |

---

## Package versions (verified 2026-03)

| Package | Version | Notes |
|---------|---------|-------|
| `@asu/unity-bootstrap-theme` | `^1.36.0` | CSS lives in `dist/css/` |
| `@asu/component-header-footer` | `^1.3.0` | Combined header + footer |
| `@asu/unity-react-core` | `^1.7.0` | Replaces deprecated `@asu/components-core` and removed `@asu/component-carousel` |
| `astro` | `^4.0.0` | |
| `@astrojs/react` | `^4.1.6` | |
| `react` / `react-dom` | `^18.3.0` | |

**Deprecated — do not use:**
- `@asu/components-core` — replaced by `@asu/unity-react-core`
- `@asu/component-carousel` — removed; `Carousel` is now in `@asu/unity-react-core`
- `@asu/component-header` / `@asu/component-footer` — replaced by `@asu/component-header-footer`

---

## Maintaining the skills

The skills are plain Markdown files. Anyone can update them.

1. **Add a new component** — add an entry to `skills/uds-components/references/uds-catalog.md` and add a working example in `skills/components/`
2. **Document a new pitfall** — add it to `skills/uds-page-builder/references/SECTION-PATTERNS.md`
3. **Update a skill workflow** — edit the relevant `skills/*/SKILL.md` file
4. **Update package versions** — update this guide and the `package.json` template in `uds-page-builder/SKILL.md`
