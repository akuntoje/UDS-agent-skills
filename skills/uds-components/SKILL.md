---
name: uds-components
description: Browse, install, and use any ASU Unity Design System (UDS) component in an Astro + React project.
---

# Skill: uds-components

Browse, install, and use any ASU Unity Design System component in an Astro + React project.

---

## When to use

Use this skill when a user asks to add a specific UDS component ad-hoc ("add a carousel", "I need a news section", "add an RFI form"), asks what UDS components are available, needs help with a specific component's props or usage, or wants to explore component options. Also triggers for: "@asu package", "unity design system component", "ASU header/footer/carousel/events/news/rfi/directory".

## Prerequisites

- `.npmrc` configured:
  ```properties
  @asu:registry=https://npm.pkg.github.com/
  //npm.pkg.github.com/:_authToken=YOUR_TOKEN
  ```
- Existing Astro + React project (or use `uds-page-builder` skill to scaffold one)

---

## How to add a component

```bash
# 1. Install the package
npm install @asu/<component-package-name>

# 2. Run postinstall to refresh public/css/ if the package ships CSS
npm run postinstall   # or re-run npm install

# 3. Create wrapper in src/components/SectionName.jsx
# 4. Add content to src/data/page-content.json
# 5. Import and use in src/pages/index.astro
# 6. Verify
npm run build
```

---

## Component lookup flow

```
User requests a component or CSS styling
  ↓
Search references/uds-catalog.md by name or figmaSignals
  ↓
├─ Found in catalog (React component)
│  → Use documented props, wrapper pattern, client: directive
│  → Install package if not already in package.json
│  → Check references/uds-css-patterns.md for correct CSS class names in the wrapper JSX
│
├─ User asks about CSS styling (backgrounds, buttons, typography, icons, etc.)
│  → Search references/uds-css-patterns.md first
│  → If NOT found in uds-css-patterns.md, fetch Storybook story directly from GitHub:
│    Primary URL (new — stories now in unity-react-core):
│      https://raw.githubusercontent.com/ASU/asu-unity-stack/dev/packages/unity-react-core/stories/{category}/{component}/{component}.templates.stories.js
│    Fallback URL (unity-bootstrap-theme stories kept during transition):
│      https://raw.githubusercontent.com/ASU/asu-unity-stack/dev/packages/unity-bootstrap-theme/stories/{category}/{component}/{component}.templates.stories.js
│    Discover: https://api.github.com/repos/ASU/asu-unity-stack/contents/packages/unity-react-core/stories/{category}
│
└─ NOT in catalog (React component)
   ↓
   Step A: Check GitHub package list
   → Fetch: https://github.com/ASU/asu-unity-stack/tree/dev/packages
   → Look for a package name that matches the request
   ↓
   Step B: Fetch README for that package
   → https://raw.githubusercontent.com/ASU/asu-unity-stack/dev/packages/<name>/README.md
   ↓
   Step C: Fetch detailed props (if README references it)
   → https://raw.githubusercontent.com/ASU/asu-unity-stack/dev/packages/<name>/docs/README.props.md
   ↓
   Step D: Check package name and version
   → https://raw.githubusercontent.com/ASU/asu-unity-stack/dev/packages/<name>/package.json
   ↓
   Step E: Implement and add to catalog
   → Write wrapper component using CSS classes from uds-css-patterns.md
   → Add full catalog entry to references/uds-catalog.md (so next time it's found in Step 1)
   → Add pitfall notes to skills/uds-page-builder/references/SECTION-PATTERNS.md if any discovered
   ↓
   Still no match → write bespoke JSX using uds-css-patterns.md classes, document reason
```

---

## Full component reference

Read `references/uds-catalog.md` for:

- Complete prop tables for every component
- Import syntax (some need deep ESM imports)
- `visualSignals` — visual pattern keywords used to match a section to the right component
- Known pitfalls per component
- `client:` directive requirements

Read `references/uds-css-patterns.md` for:

- Background color and pattern CSS classes (`gray-dark-bg`, `morse-code-white`, etc.)
- Button CSS variants (`btn-gold`, `btn-maroon`, `btn-circle`, etc.)
- Typography helpers (`lead`, `article`, `highlight-gold`, `text-white`)
- Hero structure classes and HTML templates
- Card, banner, alert, list, pagination HTML templates
- Google Analytics `data-ga-*` attributes for all interactive elements
- GitHub Storybook story URL pattern for dynamic lookup of unlisted patterns

Read `../components/` for **working implementation examples**:

These are generic, production-ready wrapper components you can copy and adapt directly.
Each file shows the correct import pattern, CSS import, props, and JSX structure.

| File                    | Component covered                           |
| ----------------------- | ------------------------------------------- |
| `Header.jsx`                  | `ASUHeader` with navTree transform and logo props   |
| `Footer.jsx`                  | `ASUFooter`                                         |
| `Hero.jsx`                    | Raw CSS hero (`uds-hero-*` class approach)          |
| `Accordion.jsx`               | `Accordion` from unity-react-core                   |
| `app-rfi.jsx`                 | `AsuRfi` with full props                            |
| `HorizontalCards.jsx`         | Raw CSS card grid layout                            |
| `ImageBasedCardAndHover.jsx`  | Image card with hover-reveal content overlay        |
| `TestimonialSlider.jsx`       | `Testimonial` + custom useState slider              |
| `VideoSection.jsx`            | `Video` (YouTube and direct)                        |
| `Button.jsx`                  | `Button` from unity-react-core                      |
| `TabsSection.jsx`             | `TabbedPanels`                                      |
| `AnchorNav.jsx`               | `AnchorMenu`                                        |

> Use the catalog for **props/API reference**. Use these files for **how to wire it together**.

---

## Quick reference

| User asks for...                     | Package                        | Import                                                          |
| ------------------------------------ | ------------------------------ | --------------------------------------------------------------- |
| Global header, ASU logo bar, top nav | `@asu/component-header-footer` | `{ ASUHeader }`                                                 |
| Footer, bottom bar, links            | `@asu/component-header-footer` | `{ ASUFooter }`                                                 |
| Hero, banner, full-width image       | `@asu/unity-react-core`        | `{ Hero }`                                                      |
| Card grid, feature cards             | `@asu/unity-react-core`        | `{ Card }`                                                      |
| Carousel, sliding cards              | `@asu/unity-react-core`        | `{ Carousel }` (**NOT** `@asu/component-carousel` — deprecated) |
| Image carousel                       | `@asu/unity-react-core`        | `{ ImageCarousel }`                                             |
| News feed, articles                  | `@asu/component-news`          | `{ CardGridNews, CardCarouselNews, CardListlNews }`             |
| Accordion, FAQ                       | `@asu/unity-react-core`        | `{ Accordion }`                                                 |
| Events list                          | `@asu/component-events`        | `{ EventList }`                                                 |
| Degree/program finder                | `@asu/app-degree-pages`        | `{ DegreeList }`                                                |
| RFI form, request information        | `@asu/app-rfi`                 | `{ AsuRfi }`                                                    |
| Faculty/staff directory, people      | `@asu/app-webdir-ui`           | `{ WebDirectoryComponent }`                                     |
| Testimonial, quote                   | `@asu/unity-react-core`        | `{ Testimonial }`                                               |
| Video embed                          | `@asu/unity-react-core`        | `{ Video }`                                                     |
| Pagination                           | `@asu/unity-react-core`        | `{ Pagination }`                                                |
| Anchor/jump nav                      | `@asu/unity-react-core`        | `{ AnchorMenu }`                                                |
| Tabbed content                       | `@asu/unity-react-core`        | `{ TabbedPanels }`                                              |

---

## After adding a component

```bash
npm run build          # Verify no errors
npm run dev            # Visual check in browser
```
