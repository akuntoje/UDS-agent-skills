---
name: uds-reviewer
description: Validate a UDS Astro + React landing page against DS standards, build health, and visual fidelity.
---

# Skill: uds-reviewer

Validate a UDS Astro + React landing page against build health, DS standards,
and visual fidelity.

---

## When to use

Use this skill after implementing a page (post uds-page-builder workflow), when asked to review an existing UDS page, when debugging visual or structural issues, or as a quality gate before handoff. Triggers include: "review my UDS page", "check if this is correct", "why isn't my component working", "validate the build", "check DS compliance".

---

## Step 1: Build check

```bash
npm run build
```

**Check for:**

- TypeScript / JSX errors
- Missing imports
- Bad prop types
- Template compilation errors
- `document is not defined` or `window is not defined` → means Header/Footer is using `client:load` instead of `client:only="react"`

A clean build confirms all components render without crash. Fix all errors before proceeding.

---

## Step 2: Lint

```bash
npm run lint   # if configured, otherwise skip
```

**Check for:**

- Bespoke JSX that could be replaced with a UDS component
- Hardcoded strings in JSX that should be in `src/data/page-content.json`
- Wrong `client:` directives (see Step 3)

---

## Step 3: UDS compliance check

Read all references and review each section component in `src/components/`:
- `skills/uds-components/references/uds-catalog.md` — React component props, imports, directives
- `skills/uds-components/references/uds-css-patterns.md` — CSS class names, HTML templates, design tokens
- `skills/uds-brand-guide/references/asu-brand-guide.md` — brand colors, typography, voice, violation checklist
- `../components/` — canonical working examples; use these as the gold standard when evaluating
  whether a project's wrapper components are structured correctly

For each component, verify:

**1. Is a UDS component being used?**

- YES → Check that props match catalog definitions
- NO → Is there a UDS component that could work? Check `visualSignals` in catalog.
  - Match found → flag as "should use UDS component"
  - No match → acceptable if documented

**2. Are known pitfalls avoided?** Cross-check against `references/SECTION-PATTERNS.md`:

| Check | What to look for |
| ----- | ---------------- |
| Header package | Uses `@asu/component-header-footer` (NOT deprecated `@asu/component-header`)? |
| Footer package | Uses `@asu/component-header-footer` (NOT deprecated `@asu/component-footer`)? |
| Header directive | `client:only="react"` (NOT `client:load` or no directive)? |
| Footer directive | `client:only="react"` (NOT `client:load` or no directive)? |
| Header navTree | Transformed to `htmlLink` shape? |
| Header logo | `mobileSrc` provided? |
| Hero source | Imported from `@asu/unity-react-core` (NOT deprecated `@asu/components-core`)? |
| Hero directive | `client:only="react"` (unity-react-core accesses `document` at load)? |
| Hero buttons | Have `href`? Color is `'maroon'`/`'gold'`? |
| Carousel source | Imported from `@asu/unity-react-core` (NOT removed `@asu/component-carousel`)? |
| Carousel directive | `client:only="react"` (NOT `client:load` — carousel now in unity-react-core)? |
| Carousel cards | Have `type`, `image`, `imageAltText`, `buttons[].href`? |
| Accordion source | Imported from `@asu/unity-react-core` (NOT deprecated `@asu/components-core`)? |
| Accordion directive | `client:only="react"`? |
| Accordion `openedCard` | Is it 1-based (not 0)? |
| Accordion body | Is it HTML string with `<p>` tags? |
| News component | Using `CardGridNews`/`CardCarouselNews`/`CardListlNews` (note lowercase 'l')? |
| News dataSource | Feed URL provided and valid? |
| EventList feed | Is `feed` URL valid and returns data? |
| RFI form | Has `submissionUrl`? Using `test={true}` in dev? |
| Web directory | `searchURL` ends with trailing slash? `ids` correct type for `searchType`? |
| CSS imports | Does each `.jsx` file use `import "@asu/unity-bootstrap-theme"` (not old relative path)? |
| Layout CSS | References `unity-bootstrap-header-footer.css` (combined — NOT separate `unity-bootstrap-header.css` / `unity-bootstrap-footer.css`)? |
| CSS paths | `copy-css.cjs` copies from `dist/css/` of `@asu/unity-bootstrap-theme` (NOT `dist/` root, NOT from `@asu/component-header-footer`)? |
| `postinstall` | Runs `node scripts/copy-css.cjs` (NOT `copy-css.js` — `.cjs` required when `"type":"module"`)? |
| No deprecated packages | No `@asu/components-core`, `@asu/component-carousel`, `@asu/component-header`, `@asu/component-footer` in package.json? |
| Content JSON | Located at `src/data/page-content.json` (NOT `src/content/`)? |
| Background classes | Using correct UDS classes (`gray-dark-bg`, `gray-faint-bg`) not deprecated `bg-gray-*`? |
| Button classes | Using `btn-gold`/`btn-maroon` not Bootstrap `btn-primary`/`btn-secondary` for UDS buttons? |
| Pattern backgrounds | Pattern class paired with `.bg` base class? |
| GA attributes | Interactive elements have `data-ga-*` attributes (see uds-css-patterns.md)? |
| Icon accessibility | Decorative icons have `aria-hidden="true"`? |

**3. Is content data-driven?**

- All text/links/images should come from `src/data/page-content.json`
- No hardcoded strings in JSX (structural HTML like `<main>`, `<div>` is OK)

**4. Campaign mode compliance** (check only if the page was built in campaign mode — no user screenshots or section descriptions were provided):

| Campaign Check | What to look for |
| -------------- | ---------------- |
| Single CTA rule | Every button on the page uses `href="#rfi"` or another in-page anchor — no links to external pages |
| RFI form present | `app-rfi.jsx` rendered with `id="rfi"` before the footer |
| Nav links | All `nav.items` are in-page anchors (`#about`, `#programs`, etc.) — no external URLs |
| No placeholder copy | No "Lorem ipsum", "Your heading here", "Program Name", or other generic fill text |
| Keyword-aligned copy | Hero headline and section headings reference the campaign keyword, not generic ASU messaging |
| Inline program content | Programs/degrees displayed in cards/tabs on the page — no "View All Programs" or catalog links |

If any campaign check fails, flag it as **🟡 Warning** (copy issues) or **🔴 Blocker** (broken single-CTA rule or missing RFI form).

**5. Brand compliance** (from `skills/uds-brand-guide/references/asu-brand-guide.md` Section 7):

| Brand Check                                              | What to look for                                        |
| -------------------------------------------------------- | ------------------------------------------------------- |
| Heading case                                             | No ALL CAPS headings — use Title Case or Sentence case  |
| Italics                                                  | No italic text — not permitted in ASU brand             |
| Secondary colors (Green/Blue/Orange/etc.)                | Only used when Maroon or Gold also present in the section |
| Button variants                                          | Using `btn-gold`/`btn-maroon`, not `btn-primary`/`btn-secondary` |
| Hero background                                          | Uses `<img class="hero">`, NOT CSS `background-image`   |
| Background pattern classes                               | Pattern class paired with `.bg` base class              |
| Logo placement                                           | Logo on solid color background (not busy pattern)       |
| CTA copy                                                 | Descriptive text ("Apply Now", "Learn More") — not "Click here" |

---

## Step 4: Visual check

Start dev server and take screenshots:

```bash
npm run dev &
sleep 5  # wait for server

# Desktop
npx playwright screenshot --viewport-size="1280,800" http://localhost:4321 review-desktop.png

# Mobile
npx playwright screenshot --viewport-size="375,812" http://localhost:4321 review-mobile.png
```

**Review for:**

- Section order matches the original description or mockup (if applicable)
- Text content is correct
- Images are loading (no broken image icons)
- Colors match UDS tokens (maroon, gold)
- Mobile layout stacks properly
- No obvious layout overflow or broken spacing
- Header renders with ASU logo and navigation
- Footer renders with ASU branding

---

## Step 5: Accessibility quick check

For each section component, verify:

- Images have non-empty `alt` or `imageAltText` props
- One `<h1>` on the page (usually in Hero)
- Subsequent sections use `<h2>` and below
- CTA buttons/links have descriptive text (not just "Click here")

---

## Output report

```markdown
## UDS Page Review Report

### Build Health

- Build: ✅/❌ [error details if any]
- Lint: ✅/❌ [error count]

### UDS Compliance

| Section    | Component                    | Package                       | UDS? | Notes                           |
| ---------- | ---------------------------- | ----------------------------- | ---- | ------------------------------- |
| Header     | ASUHeader                    | @asu/component-header-footer  | ✅   | client:only="react" correct     |
| Hero       | Hero                         | @asu/unity-react-core         | ✅   | client:only="react" correct     |
| News       | CardGridNews                 | @asu/component-news           | ✅   | Feed URL configured             |
| Footer     | ASUFooter                    | @asu/component-header-footer  | ✅   | client:only="react" correct     |
| Custom     | bespoke div                  | —                             | ❌   | No UDS match — justified: [reason] |

### Pitfall Check

| Pitfall | Status |
| ------- | ------ |
| Header/Footer use combined package | ✅/❌ |
| Header `client:only="react"` | ✅/❌ |
| Footer `client:only="react"` | ✅/❌ |
| Header navTree shape | ✅/❌ |
| Header mobileSrc | ✅/❌ |
| Hero button href and color | ✅/❌ |
| CSS links correct (header-footer.css) | ✅/❌ |
| Postinstall Windows-compatible | ✅/❌ |
| Content in src/data/ not src/content/ | ✅/❌ |

### Campaign Mode Compliance (skip if page was built from user screenshots/descriptions)

| Check | Status | Notes |
| ----- | ------ | ----- |
| Single CTA — all buttons anchor to `#rfi` | ✅/❌ | |
| RFI form present with `id="rfi"` | ✅/❌ | |
| Nav items are in-page anchors only | ✅/❌ | |
| No placeholder/generic copy | ✅/❌ | |
| Copy aligned to campaign keyword | ✅/❌ | |
| Programs rendered inline (no catalog links) | ✅/❌ | |

### Brand Compliance

| Check                                   | Status     | Notes               |
| --------------------------------------- | ---------- | ------------------- |
| No ALL CAPS headings                    | ✅/❌      |                     |
| No italic text                          | ✅/❌      |                     |
| Secondary colors only with Maroon/Gold  | ✅/❌      |                     |
| Buttons use `btn-gold`/`btn-maroon`     | ✅/❌      |                     |
| Hero uses `<img class="hero">`          | ✅/❌      |                     |
| Pattern classes paired with `.bg`       | ✅/❌      |                     |
| CTA copy is descriptive                 | ✅/❌      |                     |

### Content Data-Driven

- All text in page-content.json: ✅/❌
- Hardcoded strings found: [list if any]

### Visual

- Desktop screenshot: [path]
- Mobile screenshot: [path]
- Design deltas: [list any differences from original description or mockup]

### Recommendations

1. [specific actionable fix]
2. [specific actionable fix]
```

---

## Severity guide

| Level      | Meaning                                                   | Action              |
| ---------- | --------------------------------------------------------- | ------------------- |
| 🔴 Blocker | Build fails, SSR crash, broken layout                                       | Fix before handoff  |
| 🟡 Warning | Bespoke markup where UDS could work, missing alt text, brand violation       | Fix if time allows  |
| 🟢 Info    | Minor visual delta from design, outdated package version, style preference   | Document and accept |

**Brand violations are always 🟡 Warning or higher:**

| Brand violation                             | Severity   |
| ------------------------------------------- | ---------- |
| ALL CAPS heading                            | 🟡 Warning |
| Italic text in headings/body                | 🟡 Warning |
| Secondary color used without Maroon/Gold    | 🟡 Warning |
| Bootstrap `btn-primary`/`btn-secondary`     | 🟡 Warning |
| Hero using CSS `background-image`           | 🔴 Blocker (renders blank) |
| Pattern class used without `.bg`            | 🔴 Blocker (pattern invisible) |
| CTA with non-descriptive text ("Click here")| 🟡 Warning |
