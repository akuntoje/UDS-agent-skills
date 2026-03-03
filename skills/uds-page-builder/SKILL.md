---
name: uds-page-builder
description: Scaffold a fully-implemented Astro + React landing page using ASU Unity Design System (UDS) components from a plain text description or screenshot mockup.
---

# Skill: uds-page-builder

Scaffold a new Astro + React landing page using ASU Unity Design System components.
Driven by a plain text description or screenshot/image mockup — no Figma required.

---

## When to use

Use this skill whenever:

- A user says "create a landing page", "build a page with header and footer", or describes a page layout
- A user provides screenshot(s) or image mockups of a page to implement
- A user asks to add a new page to an existing UDS project

## Prerequisites

- GitHub NPM auth token (format: `ghp_xxxx...`) — user must supply this
- Playwright MCP available for visual verification

---

## Step 1: Read component catalog and patterns

Before writing any code, read **all three** references:

```
skills/uds-components/references/uds-catalog.md        — React component APIs, props, CSS paths, client: directives
skills/uds-page-builder/references/SECTION-PATTERNS.md — known SSR pitfalls and wrapper code patterns
skills/uds-components/references/uds-css-patterns.md   — HTML/CSS class names, design tokens, background patterns,
                                                   typography, button variants, hero/card/banner templates
```

`uds-css-patterns.md` is the **Storybook-sourced CSS layer** reference. Use it whenever you need:

- Background pattern class names (e.g. `morse-code-white`, `topo-black`)
- Button CSS variants (`btn-gold`, `btn-maroon`, `btn-circle`)
- Hero structure classes (`uds-hero-sm/md/lg`, `hero-overlay`, `btn-row`)
- Card HTML templates (`card-body`, `card-event-details`, `card-tags`)
- Banner color classes (`banner-orange`, `banner-blue`, `banner-gray`, `banner-black`)
- Google Analytics data attributes for all interactive elements

You need all three references to map sections to the right components, apply correct CSS,
and avoid known failure modes.

**MANDATORY: Before writing any section component, check `../../components/` for an existing example.**

The components directory contains working, storybook-sourced UDS implementations.
You MUST read the matching file and use its code — do NOT write from scratch when a match exists.

**Component file → section type mapping:**

| File | Use when the section has |
|---|---|
| `Header.jsx` | Site header / navigation bar |
| `Footer.jsx` | Site footer |
| `Hero.jsx` | Full-width hero with background image and title |
| `HorizontalCards.jsx` | Row of UDS cards |
| `ImageBasedCardAndHover.jsx` | Single large image card with hover-reveal content overlay |
| `TabsSection.jsx` | Tabbed content panels |
| `Accordion.jsx` | Expandable FAQ / accordion |
| `TestimonialSlider.jsx` | Testimonial / quote carousel |
| `VideoSection.jsx` | Embedded video section |
| `AnchorNav.jsx` | Sticky in-page anchor navigation |
| `Button.jsx` | Standalone CTA button |
| `app-rfi.jsx` | Request for information / contact form |

**Matching rules:**
1. Read the file with Read tool.
2. Copy its JSX structure and CSS class names exactly as written — these are sourced from the official UDS Storybook and are correct.
3. Replace hardcoded strings/URLs with props driven from `page-content.json`.
4. Fix any import paths that reference `../../node_modules/...` — replace with `import "@asu/unity-bootstrap-theme"`.
5. Only write a new component from scratch if NO file in this directory matches the section type.

---

## Step 2: Extract design structure

### From plain text description

Use the user's description to identify sections. Ask for any missing details:

- Site/unit title and navigation links
- Section types needed (hero, cards, news, accordion, etc.)
- Background colors or styles per section
- Specific text content, CTAs, or images needed

For a minimal "header and footer" request, plan:

- Header section (always `ASUHeader`)
- Optional main content placeholder
- Footer section (always `ASUFooter`)

### User-provided logo or image assets

When the user provides an image file (logo, hero background, etc.) alongside their prompt:

1. **Identify the filename** from the attachment (e.g. `my-logo.png`)
2. **Copy it to `public/images/`** in the scaffolded project (e.g. `public/images/my-logo.png`)
3. **Reference it with a root-relative path**: `/images/my-logo.png`
4. **Store it in `page-content.json`** under the relevant field (e.g. `nav.logo.src`)
5. **Do NOT use the ASU fallback URL** when the user has provided a custom logo

If the user provides a logo for the header, set `nav.logo.src` and `nav.logo.mobileSrc`
in `page-content.json` to `/images/<filename>` and instruct the user to copy that file
into the project's `public/images/` folder before running `npm run dev`.

### From screenshot or image mockup

Read the image(s) visually top-to-bottom. For each visible section:

- Identify the section type by its visual structure
- Extract all readable text verbatim
- Note background colors and patterns (map to UDS tokens — see below)
- Note layout (full-width, split left/right, card grid, etc.)
- Flag any images that need real URLs — use SVG placeholder until user provides them

**Background pattern detection — CRITICAL:**
When you see a decorative repeating pattern on a section background,
map it to a UDS CSS class from `uds-css-patterns.md` — NEVER use a background image for these patterns.

| Visual pattern in design                  | UDS class                                     |
| ----------------------------------------- | --------------------------------------------- |
| Connected dots / network graph (light bg) | `network-white`                               |
| Connected dots / network graph (dark bg)  | `network-black`                               |
| Morse code dots                           | `morse-code-white` or `morse-code-black`      |
| Topographic lines                         | `topo-white` or `topo-black`                  |
| Circuit/semiconductor                     | `semiconductor-light` or `semiconductor-dark` |
| Plus/grid                                 | `plus-light` or `plus-dark`                   |

Apply as className on the section div:
`<section className="white-bg network-black py-5">...</section>`

**ASU color token mapping:**

| Color in design    | UDS token |
| ------------------ | --------- |
| `#8C1D40` / maroon | `maroon`  |
| `#FFC627` / gold   | `gold`    |
| `#E8E8E8` / gray   | `gray`    |
| `#FFFFFF` / white  | `white`   |
| `#191919` / black  | `black`   |

---

## Step 3: Map sections to UDS components

For each section:

```
Identify section visual pattern
  ↓
Match against visualSignals in skills/uds-components/references/uds-catalog.md
  ↓
├─ Clear match (confidence ≥ 80%)
│  → Use that UDS React component
│  → Note required props and content mappings
│  → Check SECTION-PATTERNS.md for known pitfalls
│  → Check uds-css-patterns.md for correct CSS class names in the wrapper
│
├─ Partial match (50–80%)
│  → Use UDS React component + scoped CSS overrides
│  → Use uds-css-patterns.md for background/button/layout class names
│
├─ CSS styling needed (backgrounds, typography, spacing)
│  → Check uds-css-patterns.md — Background Patterns, Typography, Icons sections
│  → If pattern not in uds-css-patterns.md, fetch Storybook story directly:
│    https://raw.githubusercontent.com/ASU/asu-unity-stack/dev/packages/unity-bootstrap-theme/stories/{category}/{component}/{component}.templates.stories.js
│
├─ No React component match in catalog
│  → Check GitHub repo for other packages:
│    https://github.com/ASU/asu-unity-stack/tree/dev/packages
│  → Fetch README:
│    https://raw.githubusercontent.com/ASU/asu-unity-stack/dev/packages/<name>/README.md
│  → Fetch props:
│    https://raw.githubusercontent.com/ASU/asu-unity-stack/dev/packages/<name>/docs/README.props.md
│  → If found: add entry to uds-catalog.md, install package, implement
│
└─ Truly no match → write bespoke JSX using CSS classes from uds-css-patterns.md, document reason
```

---

## Step 4: Scaffold the project

Generate these files in order:

### `.npmrc`

```properties
@asu:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=USER_TOKEN_HERE
```

Replace `USER_TOKEN_HERE` with the token the user supplies. **Never log or echo the actual token.**

### `package.json`

Start with the base, add only packages mapped in Step 3.
**Always use `@asu/component-header-footer`** — NOT the separate header/footer packages.

```json
{
  "name": "project-name",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "postinstall": "node scripts/copy-css.cjs"
  },
  "dependencies": {
    "@astrojs/react": "^4.1.6",
    "@asu/component-header-footer": "^1.3.0",
    "@asu/unity-bootstrap-theme": "^1.36.0",
    "astro": "^4.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  }
}
```

> **`copy-css.cjs` — MUST use `.cjs` extension, not `.js`.**
> The project has `"type": "module"` so Node treats `.js` as ES modules — `require()` fails.
> `.cjs` forces CommonJS parsing regardless of package.json type.
> CSS files live in `dist/css/` (NOT `dist/` root).

### `scripts/copy-css.cjs`

```js
const fs = require("fs");
const path = require("path");

const cssFiles = [
  "unity-bootstrap-theme.css",
  "unity-bootstrap-theme.bundle.css",
  "unity-bootstrap-header-footer.css",
];

fs.mkdirSync("public/css", { recursive: true });
fs.mkdirSync("public/js", { recursive: true });

const cssBase = "node_modules/@asu/unity-bootstrap-theme/dist/css";
cssFiles.forEach((f) => {
  fs.copyFileSync(path.join(cssBase, f), path.join("public/css", f));
});

fs.copyFileSync(
  "node_modules/@asu/unity-bootstrap-theme/dist/js/bootstrap.bundle.min.js",
  "public/js/bootstrap.bundle.min.js"
);

console.log("CSS and JS assets copied to public/");
```

### `astro.config.mjs`

```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
});
```

### `src/layouts/Layout.astro`

```astro
---
interface Props { title: string; }
const { title } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="shortlink" href="/" />
    <link rel="canonical" href="/" />
    <meta name="MobileOptimized" content="width" />
    <meta name="HandheldFriendly" content="true" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.png" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
    <link rel="stylesheet" href="/css/unity-bootstrap-theme.css" />
    <link rel="stylesheet" href="/css/unity-bootstrap-header-footer.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    <script src="/js/bootstrap.bundle.min.js" is:inline></script>
  </head>
  <body>
    <slot />
  </body>
</html>
```

### `src/data/page-content.json`

> **Use `src/data/` — NOT `src/content/`.**
> Astro 4 reserves `src/content/` for content collections; arbitrary JSON there triggers warnings.

Populate with ALL text, image URLs, links, and lists from the user's description or screenshots.

```json
{
  "meta": { "title": "Page Title" },
  "nav": {
    "siteTitle": "Unit Name",
    "parentOrg": "",
    "parentOrgUrl": "",
    "logo": {
      "src": "/images/logo.png",
      "alt": "Site Logo",
      "href": "/",
      "mobileSrc": "/images/logo.png"
    },
    "items": [
      { "text": "Home", "href": "/", "children": [] },
      { "text": "About", "href": "/about", "children": [] }
    ]
  },
  "footer": {
    "contact": null,
    "social": null
  }
}
```

### `AGENTS.md`

```markdown
# Agent Instructions

This is an ASU UDS Astro + React project.

## Stack

- Astro 4 + React 18
- ASU Unity Design System (@asu/* packages)
- Registry: https://npm.pkg.github.com — requires GitHub token in .npmrc

## Rules

- All components are React (.jsx) in src/components/
- All page content lives in src/data/page-content.json — no hardcoded strings in JSX
- CSS is served from public/css/ — run postinstall if styles are missing
- ASUHeader and ASUFooter require client:only="react" (NOT client:load) — SSR crash otherwise
- navTree for ASUHeader must be transformed to htmlLink shape — see SECTION-PATTERNS.md
- Use @asu/component-header-footer (combined) — NOT separate header/footer packages
- Run `npm install` (not yarn) unless project has yarn.lock

## Skills

- skills/uds-page-builder — Prompt/screenshot to page pipeline
- skills/uds-reviewer — Review and validate the page
- skills/uds-components — Browse/install/add UDS components
```

### `CLAUDE.md`

```markdown
# Claude Instructions

See AGENTS.md for full instructions.
Key: UDS Astro project. Content in src/data/page-content.json. Skills in skills/.
```

---

## Step 5: Implement sections (one at a time)

**For every section, follow this order — do NOT skip step A:**

**A. Check `../../components/` first (MANDATORY)**
Use the mapping table in Step 1 to find the matching file.
Read it with the Read tool, then copy its JSX structure exactly.
Replace hardcoded values with props. Fix any `../../node_modules/` import paths.
Only if no match exists, proceed to write from scratch.

**B. Re-read `references/SECTION-PATTERNS.md`** for known pitfalls for the component you're using.

For header and footer, always use the combined package:

```jsx
// src/components/Header.jsx
import { ASUHeader } from "@asu/component-header-footer";
import "@asu/unity-bootstrap-theme";

const ASU_FALLBACK_LOGO =
  "https://www.asu.edu/asuthemes/5.0/assets/asu_sunburst_logo_white.png";

const Header = ({
  navItems = [],
  siteTitle = "ASU Site",
  parentOrg = "",
  parentOrgUrl = "",
  logoSrc = ASU_FALLBACK_LOGO,
  logoAlt = "Site Logo",
  logoHref = "/",
  logoMobileSrc = null,
}) => {
  const dsNavItems = navItems.map((item) => ({
    isActive: false,
    htmlLink: {
      text: item.text,
      uri: item.href,
      target: item.target || "_self",
    },
    children: (item.children || []).map((child) => ({
      hasBorderTop: false,
      htmlLink: {
        text: child.text,
        uri: child.href,
        target: child.target || "_self",
      },
    })),
  }));

  return (
    <ASUHeader
      title={siteTitle}
      parentOrg={parentOrg}
      parentOrgUrl={parentOrgUrl}
      logo={{
        alt: logoAlt,
        src: logoSrc,
        href: logoHref,
        mobileSrc: logoMobileSrc || logoSrc,
      }}
      navTree={dsNavItems}
    />
  );
};

export default Header;
```

```jsx
// src/components/Footer.jsx
import { ASUFooter } from "@asu/component-header-footer";
import "@asu/unity-bootstrap-theme";

const Footer = ({ contact = null, social = null }) => {
  return <ASUFooter contact={contact} social={social} />;
};

export default Footer;
```

**After EACH section, verify:**

```bash
npm run build
```

Fix any errors before implementing the next section. Errors compound when batched.

**Placeholder images:** When the design has an image but no URL is available yet,
use this SVG placeholder — never an empty string or broken URL:

```js
const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='800' height='450' fill='%23e8e8e8'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23999' font-size='18'%3EReplace with actual image%3C/text%3E%3C/svg%3E";
```

Add a comment in page-content.json: `"image": "REPLACE_WITH_ACTUAL_IMAGE_URL"`

---

## Step 6: Compose the page

```astro
---
import Layout from '../layouts/Layout.astro';
import content from '../data/page-content.json';
import Header from '../components/Header';
import Footer from '../components/Footer';
// add more section imports as needed
---

<Layout title={content.meta.title}>
  <Header
    client:only="react"
    navItems={content.nav.items}
    siteTitle={content.nav.siteTitle}
    parentOrg={content.nav.parentOrg}
    parentOrgUrl={content.nav.parentOrgUrl}
    logoSrc={content.nav.logo?.src}
    logoAlt={content.nav.logo?.alt}
    logoHref={content.nav.logo?.href}
    logoMobileSrc={content.nav.logo?.mobileSrc}
  />
  <main>
    <!-- additional sections in design order -->
  </main>
  <Footer client:only="react" />
</Layout>
```

> **Always use `client:only="react"`** for Header and Footer.
> Using `client:load` or no directive causes an SSR crash (`document is not defined` / `window is not defined`).

---

## Step 7: Visual verification

```bash
# Desktop
npx playwright screenshot --viewport-size="1280,800" http://localhost:4321 desktop.png

# Mobile
npx playwright screenshot --viewport-size="375,812" http://localhost:4321 mobile.png
```

Review screenshots against the original description or mockup images. Note any deltas for the review report.

---

## Output report

```markdown
## Implementation Summary

### UDS Components Used

| Section | Component | Package                      |
| ------- | --------- | ---------------------------- |
| Header  | ASUHeader | @asu/component-header-footer |
| Hero    | Hero      | @asu/unity-react-core        |
| Footer  | ASUFooter | @asu/component-header-footer |

### Bespoke Markup

| Section | Reason no UDS component used |
| ------- | ---------------------------- |
| (none)  | —                            |

### Content Completeness

- All text from description/mockup: ✅
- Placeholder images remaining: 0

### Known Visual Deltas

- (list any differences from the original description or mockup, and why)

### Next Steps

- Run `npm install` then `npm run dev`
- Replace placeholder image URLs with final assets
```
