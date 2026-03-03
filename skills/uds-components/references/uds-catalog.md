# UDS Component Catalog

> All packages are scoped `@asu`, installed from `https://npm.pkg.github.com/`.
> Requires `.npmrc` with `@asu:registry=https://npm.pkg.github.com/` and a valid `_authToken`.
> This file is the source of truth for component APIs, Figma signals, and known pitfalls.

---

## Table of Contents

1. [Core / Always Required](#core)
2. [Header + Footer (combined)](#header-footer)
3. [Carousel](#carousel)
4. [News](#news)
5. [Events](#events)
6. [Degree Pages](#degree-pages)
7. [RFI Form](#rfi)
8. [Web Directory](#webdir)
9. [Components Core (Primitives)](#components-core)
10. [Component Selection Guide](#component-selection-guide)
11. [Universal Astro + React Patterns](#universal-patterns)

---

## Core

### `@asu/unity-bootstrap-theme`

```
"@asu/unity-bootstrap-theme": "^1.20.2"
```

**Purpose:** Base Bootstrap 5 CSS theme + JS bundle. Required in every UDS project.
No React component — CSS and JS only.

**CSS files (copy to `public/css/` after install) — paths changed in v1.21.0:**

```
node_modules/@asu/unity-bootstrap-theme/dist/unity-bootstrap-theme.css
node_modules/@asu/unity-bootstrap-theme/dist/unity-bootstrap-theme.bundle.css
node_modules/@asu/unity-bootstrap-theme/dist/unity-bootstrap-header.css
node_modules/@asu/unity-bootstrap-theme/dist/unity-bootstrap-footer.css
```

> ⚠️ **CRITICAL — CSS path change (v1.21.0+):** CSS files moved from `dist/css/` to `dist/` root.
> The combined `unity-bootstrap-header-footer.css` is now split into separate `unity-bootstrap-header.css` and `unity-bootstrap-footer.css`.
> Do NOT use `@asu/component-header` or `@asu/component-footer` — both are deprecated. Use `@asu/component-header-footer`.
> **New in v1.21.0:** `@asu/component-header-footer` no longer requires `unity-bootstrap-theme` as a dependency.

**JS:** Include in `layout.astro` as:

```html
<script
  src="../../node_modules/@asu/unity-bootstrap-theme/dist/js/bootstrap.bundle.min.js"
  is:inline
></script>
```

**Windows-compatible postinstall (use node, NOT bash cp/mkdir) — updated for v1.21.0 paths:**

```json
"postinstall": "node -e \"const fs=require('fs');fs.mkdirSync('public/css',{recursive:true});fs.mkdirSync('public/js',{recursive:true});['unity-bootstrap-theme.css','unity-bootstrap-theme.bundle.css','unity-bootstrap-header.css','unity-bootstrap-footer.css'].forEach(f=>{fs.copyFileSync('node_modules/@asu/unity-bootstrap-theme/dist/'+f,'public/css/'+f);});fs.copyFileSync('node_modules/@asu/unity-bootstrap-theme/dist/js/bootstrap.bundle.min.js','public/js/bootstrap.bundle.min.js');\""
```

**figmaSignals:** None — infrastructure only.

---

## Header + Footer

### `@asu/component-header-footer` ✅ PREFERRED

```
"@asu/component-header-footer": "^1.3.0"
```

> Use this combined package instead of separate `@asu/component-header` + `@asu/component-footer`.
> Same `ASUHeader` and `ASUFooter` exports, one install.

**Import:**

```jsx
import { ASUHeader, ASUFooter } from "@asu/component-header-footer";
```

**CSS:** Served from `public/css/unity-bootstrap-header.css` + `public/css/unity-bootstrap-footer.css` (copied from theme package `dist/` root — see Core above). In v1.0.1+, `component-header-footer` can also be used without `unity-bootstrap-theme`.

---

### `ASUHeader` props

| Prop          | Type    | Required | Description                                              |
| ------------- | ------- | -------- | -------------------------------------------------------- |
| `title`       | string  | no       | Unit/site title shown in header                          |
| `parentOrg`   | string  | no       | Parent organization name                                 |
| `parentOrgUrl`| string  | no       | Parent organization URL                                  |
| `logo`        | object  | yes      | `{ alt, src, href, mobileSrc }` — mobileSrc required     |
| `navTree`     | array   | no       | Navigation items — must use `htmlLink` shape (see below) |
| `buttons`     | array   | no       | CTA buttons `[{ href, text, color }]` color: gold/maroon |
| `userName`    | string  | no       | Logged-in user name                                      |
| `loginLink`   | string  | no       | URL for login action                                     |
| `logoutLink`  | string  | no       | URL for logout action                                    |
| `searchUrl`   | string  | no       | Enables search bar                                       |
| `breakpoint`  | string  | no       | `'Lg'` (default) — mobile nav breakpoint                 |
| `site`        | string  | no       | `'subdomain'` for subdomain sites                        |

**navTree item shape (CRITICAL):**

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

**Pitfalls:**
- `navTree` does NOT accept `{ text, href }` flat objects — SSR crash: `Cannot read properties of undefined (reading 'uri')`.
- `logo.mobileSrc` is required — omitting causes broken image on mobile.
- **Use `client:only="react"`** — NOT `client:load`. `ASUHeader` accesses `document` at module load time, causing SSR crash with `client:load`.

---

### `ASUFooter` props

| Prop      | Type   | Required | Description                      |
| --------- | ------ | -------- | -------------------------------- |
| `social`  | object | no       | Social media logos and links     |
| `contact` | object | no       | Unit contact info and link columns |

**`social` shape:**

```ts
{
  logoUrl: string,       // ASU sunburst logo URL
  unitLogo: string,      // Unit-specific logo URL
  mediaLinks: {
    facebook: string,
    twitter: string,
    instagram: string,
    linkedIn: string,
    youtube: string
  }
}
```

**`contact` shape:**

```ts
{
  title: string,           // Unit name
  contactLink: string,     // Contact page URL
  contributionLink: string,// Donation/contribution URL
  columns: [{
    title: string,
    links: [{ url: string, title: string, text: string }]
  }]
}
```

**Pitfalls:**
- **Use `client:only="react"`** — `ASUFooter` accesses `window` during render, causing SSR crash.
- Footer links use `{ url, title, text }` shape — NOT `{ text, href }`.

**Wrapper pattern:**

```jsx
// src/components/Header.jsx
import { ASUHeader } from "@asu/component-header-footer";
import "@asu/unity-bootstrap-theme";

const Header = ({ navItems = [], siteTitle = "ASU Site", parentOrg = "", parentOrgUrl = "" }) => {
  const dsNavItems = navItems.map((item) => ({
    isActive: false,
    htmlLink: { text: item.text, uri: item.href, target: item.target || "_self" },
    children: (item.children || []).map((child) => ({
      hasBorderTop: false,
      htmlLink: { text: child.text, uri: child.href, target: child.target || "_self" },
    })),
  }));

  return (
    <ASUHeader
      title={siteTitle}
      parentOrg={parentOrg}
      parentOrgUrl={parentOrgUrl}
      logo={{
        alt: "ASU Logo",
        src: "https://www.asu.edu/asuthemes/5.0/assets/asu_sunburst_logo_white.png",
        href: "/",
        mobileSrc: "https://www.asu.edu/asuthemes/5.0/assets/asu_sunburst_logo_white.png",
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

**Astro usage:**
```astro
<Header client:only="react" navItems={content.nav.items} siteTitle={content.nav.siteTitle} />
<Footer client:only="react" />
```

**figmaSignals:** Global site header bar, ASU logo top-left, navigation links, maroon top bar, dark footer with social icons.

---

## Carousel

> ⛔ **`@asu/component-carousel` is DEPRECATED and REMOVED** per the 2025 consolidation.
> Carousel functionality is now in `@asu/unity-react-core`. Do NOT install `@asu/component-carousel`.

### Carousel — now in `@asu/unity-react-core`

```
"@asu/unity-react-core": "^1.7.0"
```

**Import:**

```jsx
import { Carousel, ImageCarousel } from "@asu/unity-react-core";
```

**Key props (Carousel):**

| Prop            | Type    | Required | Description                        |
| --------------- | ------- | -------- | ---------------------------------- |
| `cards`         | array   | yes      | Array of card objects              |
| `perView`       | number  | no       | Cards visible at once (default: 3) |
| `hasNavButtons` | boolean | no       | Show prev/next buttons             |
| `imageAutoSize` | string  | no       | `'16:9'`, `'3:2'`, `'1:1'`         |

**Card object shape:**

```ts
{
  type: 'default' | 'degree' | 'event' | 'news',
  image: string,
  imageAltText: string,
  title: string,
  body: string,
  buttons: [{ color: 'maroon' | 'gold', size: 'default' | 'small', label: string, href: string }],
  tags: [{ color: 'gray', label: string, href: string }]
}
```

**figmaSignals:** Horizontally scrolling card row, prev/next arrows, multiple cards visible simultaneously.

**Pitfalls:**
- Uses `client:only="react"` — it's in `unity-react-core` which accesses `document` at module load.
- `buttons` array must include `href` — omitting it renders a broken button.
- Do NOT install or import from `@asu/component-carousel` — package is removed.

**Wrapper pattern:**

```jsx
// src/components/CarouselSection.jsx
import { Carousel } from "@asu/unity-react-core";
import "@asu/unity-bootstrap-theme";

const CarouselSection = ({ cards = [] }) => {
  return <Carousel cards={cards} perView={3} hasNavButtons={true} />;
};

export default CarouselSection;
```

**Astro usage:** `<CarouselSection client:only="react" cards={content.carousel.cards} />`

---

## News

### `@asu/component-news`

```
"@asu/component-news": "^4.1.1"
```

**Import:**

```jsx
import { CardCarouselNews, CardGridNews, CardListlNews } from "@asu/component-news";
// Note: CardListlNews has a typo ('l' not 'L') — that is the actual export name
```

**Available components:**

| Component        | Layout                        |
| ---------------- | ----------------------------- |
| `CardCarouselNews` | Horizontally scrolling cards |
| `CardGridNews`   | Multi-column card grid        |
| `CardListlNews`  | Vertical list of cards        |

**Props (all three components share the same shape):**

| Prop         | Type         | Required | Description                            |
| ------------ | ------------ | -------- | -------------------------------------- |
| `header`     | FeedHeader   | no       | Section heading config                 |
| `ctaButton`  | FeedCtaButton| no       | "View all" button at bottom            |
| `cardButton` | FeedCardButton| no      | Per-card button config                 |
| `dataSource` | DataSource   | no       | API feed URL + filters                 |
| `maxItems`   | number       | no       | Max news items to display              |

**FeedHeader:** `{ color: "white" | "dark", text: string }`

**FeedCtaButton:** `{ color: "gold" | "maroon" | "gray" | "dark", text: string, url: string }`

**FeedCardButton:** `{ color: "gold" | "maroon" | "gray" | "dark", text: string, size: "default" | "small" | "medium" | "large" }`

**DataSource:** `{ url: string, filters: string }` — filters are comma-separated field values

**figmaSignals:** News feed section, article cards with image/title/date, "view all news" CTA, grid or list of news items.

**Pitfalls:**
- `filters` applies to fields: `newsUnits`, `interests`, `audiences`, `eventTypes` only.
- `dataSource.url` must return ASU news JSON format — if it returns 404 or wrong schema, component renders silently empty.
- Needs `client:load` — fetches feed client-side.
- `CardListlNews` has a double-lowercase-L typo in the export name — use exactly as shown.
- CSS: No separate CSS file. Uses `unity-bootstrap-theme.css` from the theme package.

**Wrapper pattern:**

```jsx
// src/components/NewsSection.jsx
import { CardGridNews } from "@asu/component-news";
import "@asu/unity-bootstrap-theme";

const NewsSection = ({ feedUrl, maxItems = 6, title = "Latest News" }) => {
  return (
    <CardGridNews
      header={{ color: "dark", text: title }}
      dataSource={{ url: feedUrl }}
      maxItems={maxItems}
      ctaButton={{ color: "gold", text: "View all news", url: "/news" }}
      cardButton={{ color: "maroon", text: "Read more", size: "default" }}
    />
  );
};

export default NewsSection;
```

**Astro usage:** `<NewsSection client:load feedUrl="https://news.asu.edu/api" />`

---

## Events

### `@asu/component-events`

```
"@asu/component-events": "^3.0.0"
```

> Updated from 2.1.2 to 3.0.0 in the 2025 consolidation. `vendor.umd.js` is no longer separate — bundled into `asuEvents.umd.js`.

**Import:**

```jsx
import { EventList } from "@asu/component-events";
```

**Key props (EventList):**

| Prop        | Type   | Required | Description                               |
| ----------- | ------ | -------- | ----------------------------------------- |
| `feed`      | string | yes      | URL to an events JSON feed                |
| `maxItems`  | number | no       | Max events to display                     |
| `title`     | string | no       | Section heading                           |
| `ctaButton` | object | no       | `{ label, href }` — "View all events" CTA |

**figmaSignals:** List of upcoming events with date, title, location. Calendar-style layout.

**Pitfalls:**
- `feed` URL must return JSON in ASU events feed format.
- Needs `client:load` — fetches feed data client-side.
- If feed returns nothing or 404, component renders empty silently.
- For development/demo use: `https://events.asu.edu/?format=json`

**Wrapper pattern:**

```jsx
// src/components/EventsSection.jsx
import { EventList } from "@asu/component-events";
import "@asu/unity-bootstrap-theme";

const EventsSection = ({ feedUrl, maxItems = 5 }) => {
  return (
    <EventList feed={feedUrl} maxItems={maxItems} title="Upcoming Events" />
  );
};

export default EventsSection;
```

**Astro usage:** `<EventsSection client:load feedUrl="https://events.asu.edu/?format=json" />`

---

## Degree Pages

### `@asu/app-degree-pages`

```
"@asu/app-degree-pages": "^3.0.0"
```

> Updated from 2.6.2 to 3.0.0 in the 2025 consolidation.
> **Note:** Anonymous profile image path changed — now at `dist/assets/anon.png` (was `dist/img/anon.png`).

**Import:**

```jsx
import { DegreeList, DegreeDetails } from "@asu/app-degree-pages";
```

**Key props (DegreeList):**

| Prop                   | Type   | Required | Description                                           |
| ---------------------- | ------ | -------- | ----------------------------------------------------- |
| `programListingUrl`    | string | yes      | REST API endpoint returning degree data               |
| `searchApiUrl`         | string | no       | Solr/search endpoint for filtering                    |
| `defaultDegreeFilters` | object | no       | Pre-applied filters `{ asuLocals, asuCampuses, ... }` |
| `cardType`             | string | no       | `'micro'` or `'default'`                              |

**figmaSignals:** Program/degree listing page, search + filter bar, degree cards with title/campus/credits.

**Pitfalls:**
- This is a full app — wrap in a dedicated page, not inside a shared layout with other content.
- Needs `client:load`.
- `programListingUrl` must be a live ASU endpoint.

---

## RFI Form

### `@asu/app-rfi`

```
"@asu/app-rfi": "^3.6.4"
```

> Updated to 3.x in the 2025 consolidation (from 2.x pre-consolidation). No interface changes per upgrade guide.

**Import:**

```jsx
import { AsuRfi } from "@asu/app-rfi";
```

**Key props:**

| Prop                        | Type    | Required | Description                                       |
| --------------------------- | ------- | -------- | ------------------------------------------------- |
| `submissionUrl`             | string  | yes      | Endpoint for form submission                      |
| `variant`                   | string  | no       | `"rfiVariant1"` or `"rfiVariant2"`                |
| `campus`                    | string  | no       | Campus identifier                                 |
| `college`                   | string  | no       | College designation                               |
| `department`                | string  | no       | Department name                                   |
| `studentType`               | string  | no       | `"undergrad"`, `"graduate"`, `"readmission"`, etc.|
| `areaOfInterest`            | string  | no       | Subject focus area                                |
| `programOfInterest`         | string  | no       | Degree program selection                          |
| `isCertMinor`               | boolean | no       | Certificate/minor indicator                       |
| `successMsg`                | string  | no       | Message shown after successful submission         |
| `test`                      | boolean | no       | `true` for testing mode (no real submission)      |
| `dataSourceDegreeSearch`    | string  | no       | Degree lookup API endpoint                        |

**figmaSignals:** "Request Information" form, multi-step form, prospective student lead capture, "Apply Now" style form.

**Pitfalls:**
- `submissionUrl` must be a configured ASU endpoint — form will error without it.
- Needs `client:load` — form is fully interactive.
- FontAwesome must be loaded globally for form icons.
- Google Tag Manager / `dataLayer` required for analytics integration in production.
- Use `test: true` during development to avoid real form submissions.
- Peer dependencies: `react`, `react-dom` only — `@asu/components-core` is NOT required (deprecated).

**Wrapper pattern:**

```jsx
// src/components/RFISection.jsx
import { AsuRfi } from "@asu/app-rfi";
import "@asu/unity-bootstrap-theme";

const RFISection = ({ submissionUrl, studentType = "undergrad" }) => {
  return (
    <AsuRfi
      submissionUrl={submissionUrl}
      studentType={studentType}
      test={true}
    />
  );
};

export default RFISection;
```

**Astro usage:** `<RFISection client:load submissionUrl={content.rfi.submissionUrl} />`

---

## Web Directory

### `@asu/app-webdir-ui`

```
"@asu/app-webdir-ui": "^5.0.9"
```

**Import:**

```jsx
import { WebDirectoryComponent, SearchPage } from "@asu/app-webdir-ui";
```

**`WebDirectoryComponent` props:**

| Prop         | Type   | Required | Description                                                           |
| ------------ | ------ | -------- | --------------------------------------------------------------------- |
| `searchType` | string | yes      | `"departments"`, `"people"`, `"people_departments"`, or `"faculty_rank"` |
| `ids`        | array  | yes      | String array for departments; `[{ asuriteid, dept }]` for people      |
| `searchURL`  | string | yes      | Base API endpoint — must end with trailing slash                      |
| `filters`    | object | no       | Additional filtering options                                          |

**`SearchPage` props:**

| Prop       | Type    | Required | Description                              |
| ---------- | ------- | -------- | ---------------------------------------- |
| `searchURL`| string  | yes      | Base API endpoint                        |
| `loggedIn` | boolean | no       | Controls admin button visibility         |

**figmaSignals:** Faculty/staff directory, people search, department listing, employee profiles with photos.

**Pitfalls:**
- `searchURL` must end with a trailing slash — endpoint construction appends path names directly.
- `ids` for departments = string array `['1457', '1374']`; for people = object array `[{ asuriteid: 123, dept: 1457 }]` — mixing the formats breaks silently.
- Needs `client:load` — full client-side search app.
- Is a full app — use in a dedicated page like degree pages, not embedded in a layout with other sections.

**Wrapper pattern:**

```jsx
// src/components/DirectorySection.jsx
import { WebDirectoryComponent } from "@asu/app-webdir-ui";
import "@asu/unity-bootstrap-theme";

const DirectorySection = ({ searchURL, searchType = "people", ids = [] }) => {
  return (
    <WebDirectoryComponent
      searchType={searchType}
      ids={ids}
      searchURL={searchURL}
    />
  );
};

export default DirectorySection;
```

**Astro usage:** `<DirectorySection client:load searchURL="https://dev-asu-isearch.ws.asu.edu/api/v1/" />`

---

## Components Core

### `@asu/unity-react-core` ✅ PREFERRED (primary source package)

```
"@asu/unity-react-core": "^1.7.0"
```

> This is the **canonical** UDS React primitives package. Replaces `@asu/components-core` (deprecated) and now also contains the carousel components previously in `@asu/component-carousel` (removed).
> All future new components will be added here.

**Peer deps to install:** `react-router-dom` (^6.x) — add to dependencies.

**Import:**

```jsx
import { Testimonial, Card, Button, Hero, Accordion, Carousel } from "@asu/unity-react-core";
```

**CSS:** Import the theme package directly (v1.21.0+):

```jsx
import "@asu/unity-bootstrap-theme";
```

> ⚠️ **CRITICAL:** `@asu/unity-react-core` accesses `document` at module load time.
> **Always use `client:only="react"`** — NOT `client:load`.

**All exported components:**

| Component             | Description                              |
| --------------------- | ---------------------------------------- |
| `Accordion`           | Expand/collapse FAQ panels               |
| `AnchorMenu`          | In-page jump navigation                  |
| `Article`             | Rich article/blog content block          |
| `Button`              | ASU-styled button                        |
| `ButtonIconOnly`      | Icon-only button                         |
| `ButtonTag`           | Tag/pill button                          |
| `Card`                | Content card (default, degree, event, news) |
| `Carousel`            | Horizontally scrolling card carousel (moved from `@asu/component-carousel`) |
| `ImageCarousel`       | Image-focused carousel (moved from `@asu/component-carousel`) |
| `FeedHeader`          | Section heading for feed components      |
| `FeedContainerProvider` | Context provider for feed layout       |
| `FeedContext`         | React context for feed state             |
| `FeedBody`            | Feed item container                      |
| `Hero`                | Hero section component                   |
| `Pagination`          | Page navigation                          |
| `TabbedPanels`        | Tabbed content sections                  |
| `Testimonial`         | Single testimonial quote with image      |
| `Video`               | YouTube/video embed                      |

> **Deprecation note:** The `cardTitle` prop on `Button`, `ButtonIconOnly`, and `ButtonTag` is deprecated and will be removed in a future version. Do not use it in new code.

> **Note:** `TestimonialCarousel` exists in source but is NOT exported. Use `Testimonial` with a custom React `useState` slider instead (see wrapper pattern below).

> **ESM individual bundles:** Components are also available as individual ES modules at `dist/esm/components/${ComponentName}.es.js` for environments that support ES modules.

**`Testimonial` props:**

| Prop           | Type   | Required | Description                                      |
| -------------- | ------ | -------- | ------------------------------------------------ |
| `imageSource`  | string | no       | Headshot/photo URL                               |
| `imageAltText` | string | no       | Alt text for image                               |
| `quote`        | object | yes      | `{ title?, content?, cite?: { name?, description? } }` |
| `itemStyle`    | object | no       | `{ containerCssClass?, titleCssClass?, contentCssClass? }` |

**Testimonial slider wrapper pattern** (since `TestimonialCarousel` is not exported):

```jsx
// src/components/TestimonialSlider.jsx
import { useState } from "react";
import { Testimonial } from "@asu/unity-react-core";
import "@asu/unity-bootstrap-theme";

const testimonials = [
  {
    id: 1,
    imageSource: "https://...",
    imageAltText: "Person Name",
    quote: {
      content: "Quote text...",
      cite: { name: "Person Name", description: "Title, Organization" },
    },
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const t = testimonials[current];

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <div key={current}><Testimonial imageSource={t.imageSource} imageAltText={t.imageAltText} quote={t.quote} /></div>
      <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", marginTop: "1.5rem" }}>
        <button className="btn btn-circle btn-circle-alt-gray" onClick={prev} aria-label="Previous">
          <span className="fas fa-chevron-left" aria-hidden="true"></span>
        </button>
        {testimonials.map((item, i) => (
          <button key={item.id} onClick={() => setCurrent(i)}
            style={{ width: 10, height: 10, borderRadius: "50%", border: "none", padding: 0, cursor: "pointer",
              background: i === current ? "#8c1d40" : "#bbb" }} />
        ))}
        <button className="btn btn-circle btn-circle-alt-gray" onClick={next} aria-label="Next">
          <span className="fas fa-chevron-right" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  );
};
export default TestimonialSlider;
```

**Astro usage:** `<TestimonialSlider client:only="react" />`

**figmaSignals:** Individual UI primitives — testimonial quotes, single cards, hero blocks, accordion, video embeds, tabs, pagination.

---

### `Button` props (unity-react-core)

```jsx
import { Button } from "@asu/unity-react-core";
```

| Prop       | Type                                       | Required | Description                                                     |
| ---------- | ------------------------------------------ | -------- | --------------------------------------------------------------- |
| `label`    | string                                     | yes      | Button text                                                     |
| `color`    | `'gold'` \| `'maroon'` \| `'gray'` \| `'dark'` | yes | Button color                                                   |
| `size`     | `'default'` \| `'small'` \| `'xsmall'` \| `'medium'` \| `'large'` | no | Size variant |
| `href`     | string                                     | no       | If provided, renders as `<a>` instead of `<button>`             |
| `onClick`  | function                                   | no       | Click handler (for `<button>` only)                             |
| `disabled` | boolean                                    | no       | Disables the button                                             |
| `icon`     | `[string, string]`                         | no       | FontAwesome icon e.g. `['fas', 'arrow-right']`                  |
| `variant`  | `'borderless'` \| `'outline'` \| `'filled'` | no     | Style variant — enables new UDS button styles                   |
| `target`   | `'_blank'` \| `'_self'` \| `'_top'` \| `'_parent'` | no | Link target (only used when `href` is set)               |
| `ariaLabel`| string                                     | no       | Accessible label override                                       |
| `block`    | boolean                                    | no       | Full-width block button                                         |
| `classes`  | `string[]`                                 | no       | Additional CSS classes to apply                                 |

> ⚠️ `cardTitle` prop is **deprecated** — use `gaData.section` instead.

**Wrapper pattern:**

```jsx
// src/components/CtaButton.jsx
import { Button } from "@asu/unity-react-core";
import "@asu/unity-bootstrap-theme";

const CtaButton = ({ label, href, color = "gold" }) => (
  <Button label={label} href={href} color={color} size="default" />
);

export default CtaButton;
```

**Astro usage:** `<CtaButton client:only="react" label="Apply Now" href="/apply" color="maroon" />`

---

### `Video` props (unity-react-core)

```jsx
import { Video } from "@asu/unity-react-core";
```

| Prop        | Type                    | Required | Default   | Description                                    |
| ----------- | ----------------------- | -------- | --------- | ---------------------------------------------- |
| `type`      | `'video'` \| `'youtube'` | no      | `'video'` | Video source type                              |
| `url`       | string                  | yes      | —         | Video URL (direct file or YouTube URL)         |
| `title`     | string                  | no       | `''`      | Video title (used for iframe title if YouTube) |
| `caption`   | string                  | no       | —         | Caption text displayed below video             |
| `vttUrl`    | string                  | no       | —         | URL to VTT caption track file                  |
| `controls`  | boolean                 | no       | `true`    | Show playback controls                         |
| `className` | string                  | no       | —         | Additional CSS classes                         |

**Wrapper pattern:**

```jsx
// src/components/VideoSection.jsx
import { Video } from "@asu/unity-react-core";
import "@asu/unity-bootstrap-theme";

const VideoSection = ({ url, title, caption }) => (
  <div className="container py-5">
    <Video type="youtube" url={url} title={title} caption={caption} />
  </div>
);

export default VideoSection;
```

**Astro usage:** `<VideoSection client:only="react" url="https://www.youtube.com/watch?v=..." title="Demo" />`

**figmaSignals:** Video embed, YouTube player, video with caption.

---

### `TabbedPanels` props (unity-react-core)

```jsx
import { TabbedPanels } from "@asu/unity-react-core";
```

`TabbedPanels` uses child components as tabs — each child must have a `id` and `title` prop.

| Prop           | Type     | Required | Default | Description                                                 |
| -------------- | -------- | -------- | ------- | ----------------------------------------------------------- |
| `children`     | elements | yes      | —       | Tab components — each must have `id` and `title` props      |
| `initialTab`   | string   | no       | `''`    | `id` of the tab to show on load                             |
| `bgColor`      | string   | no       | `''`    | Background color CSS class e.g. `'bg-dark'`                 |
| `onTabChange`  | function | no       | —       | Callback `(tabId) => void` when active tab changes          |

**Wrapper pattern:**

```jsx
// src/components/TabsSection.jsx
import { TabbedPanels } from "@asu/unity-react-core";
import "@asu/unity-bootstrap-theme";

const TabsSection = ({ tabs = [] }) => (
  <TabbedPanels initialTab={tabs[0]?.id}>
    {tabs.map((tab) => (
      <div key={tab.id} id={tab.id} title={tab.label}>
        <div className="container py-4">
          <p>{tab.content}</p>
        </div>
      </div>
    ))}
  </TabbedPanels>
);

export default TabsSection;
```

**Astro usage:** `<TabsSection client:only="react" tabs={content.tabs} />`

**figmaSignals:** Tabbed content, tabs with panels, content switcher.

---

### `AnchorMenu` props (unity-react-core)

```jsx
import { AnchorMenu } from "@asu/unity-react-core";
```

| Prop                      | Type      | Required | Description                                                            |
| ------------------------- | --------- | -------- | ---------------------------------------------------------------------- |
| `items`                   | array     | yes      | `[{ text: string, targetIdName: string, icon?: [string, string] }]`    |
| `firstElementId`          | string    | yes      | `id` of the first content section directly after the menu              |
| `focusFirstFocusableElement` | boolean | no      | `true` = focus first focusable element in section on click             |

**Item shape:**

```ts
{
  text: string,           // display label in menu
  targetIdName: string,   // ID of the section to scroll to (without #)
  icon?: [string, string] // optional FontAwesome icon e.g. ['fas', 'star']
}
```

**Wrapper pattern:**

```jsx
// src/components/AnchorNav.jsx
import { AnchorMenu } from "@asu/unity-react-core";
import "@asu/unity-bootstrap-theme";

const AnchorNav = ({ items = [], firstElementId = "section-1" }) => (
  <AnchorMenu items={items} firstElementId={firstElementId} />
);

export default AnchorNav;
```

**Astro usage:** `<AnchorNav client:only="react" items={content.anchorNav.items} firstElementId="hero" />`

**Pitfalls:**
- `targetIdName` is the section `id` WITHOUT the `#` prefix.
- The sections you link to must have matching `id` attributes on their root elements.
- Menu becomes sticky on scroll — ensure it's placed between the header and the first content section.

**figmaSignals:** "On This Page" sticky sidebar nav, in-page jump links, section navigation.

---

### `Pagination` props (unity-react-core)

```jsx
import { Pagination } from "@asu/unity-react-core";
```

| Prop          | Type                                           | Required | Default | Description                                     |
| ------------- | ---------------------------------------------- | -------- | ------- | ----------------------------------------------- |
| `type`        | `'default'` \| `'bordered'`                    | yes      | —       | Pagination style variant                        |
| `background`  | `'white'` \| `'gray1'` \| `'gray2'` \| `'gray7'` | yes   | —       | Background color for the pagination container   |
| `currentPage` | number                                         | no       | `1`     | Currently active page number                    |
| `totalPages`  | number                                         | no       | `10`    | Total number of pages                           |
| `onChange`    | function                                       | yes      | —       | `(event, pageNumber) => void` — fires on change |

**Wrapper pattern:**

```jsx
// src/components/PaginationControls.jsx
import { useState } from "react";
import { Pagination } from "@asu/unity-react-core";
import "@asu/unity-bootstrap-theme";

const PaginationControls = ({ totalPages = 10, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const handleChange = (e, page) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };
  return (
    <Pagination
      type="default"
      background="white"
      currentPage={currentPage}
      totalPages={totalPages}
      onChange={handleChange}
    />
  );
};

export default PaginationControls;
```

**Astro usage:** `<PaginationControls client:only="react" totalPages={10} />`

**figmaSignals:** Page navigation, numbered pages, previous/next controls.

---

### `Article` props (unity-react-core)

```jsx
import { Article } from "@asu/unity-react-core";
```

| Prop               | Type                    | Required | Description                                  |
| ------------------ | ----------------------- | -------- | -------------------------------------------- |
| `type`             | `'event'` \| `'news'`   | yes      | Article type determines layout               |
| `title`            | string                  | no       | Article headline                             |
| `body`             | string                  | no       | Article body copy (HTML string)              |
| `articleUrl`       | string                  | no       | Canonical URL of the article                 |
| `publicationDate`  | string                  | no       | ISO date string                              |
| `authorName`       | string                  | no       | Author full name                             |
| `authorEmail`      | string                  | no       | Author email address                         |
| `authorTitle`      | string                  | no       | Author job title                             |
| `headerImageUrl`   | string                  | no       | Hero image URL for the article               |
| `breadcrumbs`      | array                   | no       | `[{ text: string, url: string }]`            |
| `eventLocation`    | string                  | no       | (type=event) Location string                 |
| `eventTime`        | string                  | no       | (type=event) Time/schedule string            |
| `registrationUrl`  | string                  | no       | (type=event) Registration link               |
| `calendarUrl`      | string                  | no       | (type=event) Add-to-calendar link            |

**figmaSignals:** Full article page, news detail, event detail page with breadcrumbs and body.

---

### `@asu/components-core` ⛔ DEPRECATED — DO NOT USE FOR NEW PROJECTS

```
"@asu/components-core": "^4.1.1"   ← FINAL version, no longer updated
```

> ⛔ **DEPRECATED** per the 2025 Unity Design System consolidation. No longer maintained.
> **Use `@asu/unity-react-core` instead** — it exports the same `Testimonial`, `Card`, `Hero`, `Accordion`, etc.
> Existing projects using `components-core` may continue to function but will not receive updates.

**Import pattern (for legacy projects only — use `unity-react-core` for new code):**

```jsx
// ❌ Legacy — use @asu/unity-react-core for new projects
import { Accordion } from "@asu/components-core/dist/esm/components/Accordion";
import { Card } from "@asu/components-core/dist/esm/components/Card";
import { Hero } from "@asu/components-core/dist/esm/components/Hero";
```

**Available components (legacy):**
`Accordion`, `AnchorMenu`, `Article`, `Button`, `ButtonTag`, `Card`, `ComponentCarousel`, `Hero`, `Pagination`, `Testimonial`, `Video`

**Card props:**

| Prop           | Type                                               | Description                             |
| -------------- | -------------------------------------------------- | --------------------------------------- |
| `type`         | `'default'` \| `'degree'` \| `'event'` \| `'news'` | Card variant                            |
| `horizontal`   | boolean                                            | Horizontal layout                       |
| `image`        | string                                             | Image URL                               |
| `imageAltText` | string                                             | Alt text                                |
| `title`        | string                                             | Card title                              |
| `body`         | string                                             | Body copy                               |
| `buttons`      | `[{ color, size, label, href }]`                   | CTA buttons                             |
| `tags`         | `[{ color, label, href }]`                         | Tag pills                               |
| `icon`         | `[string, string]`                                 | FontAwesome icon `['fas', 'newspaper']` |

**Hero props:**

| Prop       | Type   | Description                            |
| ---------- | ------ | -------------------------------------- |
| `title`    | string | Hero headline                          |
| `image`    | string | Background image URL                   |
| `contents` | array  | Content blocks below title             |
| `buttons`  | array  | CTA buttons `[{ color, href, label }]` — color must be `'maroon'` or `'gold'` |

**Accordion props:**

| Prop         | Type   | Description                       |
| ------------ | ------ | --------------------------------- |
| `cards`      | array  | `[{ content: { header, body } }]` |
| `openedCard` | number | 1-based index of initially open card |

**figmaSignals:** Individual UI primitives — single cards, hero blocks, accordion, video embeds.

**Pitfalls:**
- Use the ESM deep import path — root import pulls in entire bundle.
- `buttons` in Card needs `href` — without it, button renders but does nothing.
- FontAwesome must be loaded separately for icon cards.
- Hero `buttons` color is `'maroon'` or `'gold'` — not Bootstrap color names.
- Accordion `openedCard` is 1-based. Accordion `body` must be HTML string with `<p>` tags.

---

## Component Selection Guide

```
User describes a visual pattern
  ↓
Match against figmaSignals in this catalog
  ↓
├─ Clear match → use that component
├─ Partial match → use component + scoped CSS for differences
├─ No match in catalog
│  → Check GitHub: https://github.com/ASU/asu-unity-stack/tree/dev/packages
│  → Fetch README: https://raw.githubusercontent.com/ASU/asu-unity-stack/dev/packages/<name>/README.md
│  → Fetch props:  https://raw.githubusercontent.com/ASU/asu-unity-stack/dev/packages/<name>/docs/README.props.md
│  → If found: add to catalog, install, implement
└─ Truly no match → write bespoke JSX, document reason
```

### Quick reference: user request → component

| User says...                            | Use this                                              |
| --------------------------------------- | ----------------------------------------------------- |
| header, global nav, ASU logo bar        | `@asu/component-header-footer` → `ASUHeader`          |
| footer, bottom bar, links, social       | `@asu/component-header-footer` → `ASUFooter`          |
| hero, banner, splash, full-width image  | `@asu/unity-react-core` → `Hero`                      |
| card grid, feature cards, content cards | `@asu/unity-react-core` → `Card`                      |
| carousel, slider, swipeable cards       | `@asu/unity-react-core` → `Carousel`                  |
| image carousel                          | `@asu/unity-react-core` → `ImageCarousel`             |
| news, news feed, articles               | `@asu/component-news` → `CardGridNews` / `CardCarouselNews` |
| events, upcoming events, calendar       | `@asu/component-events` → `EventList`                 |
| degree finder, program listing          | `@asu/app-degree-pages` → `DegreeList`                |
| RFI, request info, contact form, leads  | `@asu/app-rfi` → `AsuRfi`                             |
| faculty directory, people search, staff | `@asu/app-webdir-ui` → `WebDirectoryComponent`        |
| testimonial, quote, team slider         | `@asu/unity-react-core` → `Testimonial` + custom slider |
| video, YouTube embed                    | `@asu/unity-react-core` → `Video`                     |
| accordion, FAQ, expandable              | `@asu/unity-react-core` → `Accordion`                 |
| anchor navigation, jump links           | `@asu/unity-react-core` → `AnchorMenu`                |
| tabbed content, tabs                    | `@asu/unity-react-core` → `TabbedPanels`              |
| pagination                              | `@asu/unity-react-core` → `Pagination`                |

---

## Universal Patterns

### `client:` directive guide (Astro)

| Component              | Directive             | Reason                                              |
| ---------------------- | --------------------- | --------------------------------------------------- |
| `ASUHeader`            | `client:only="react"` | Accesses `document` at module load — SSR crash      |
| `ASUFooter`            | `client:only="react"` | Accesses `window` during render — SSR crash         |
| `Carousel`             | `client:only="react"` | In `unity-react-core` — accesses `document` at module load |
| `ImageCarousel`        | `client:only="react"` | In `unity-react-core` — accesses `document` at module load |
| `CardCarouselNews`     | `client:load`         | Fetches feed client-side                            |
| `CardGridNews`         | `client:load`         | Fetches feed client-side                            |
| `CardListlNews`        | `client:load`         | Fetches feed client-side                            |
| `EventList`            | `client:load`         | Fetches feed client-side                            |
| `DegreeList`           | `client:load`         | Full client-side app                                |
| `AsuRfi`               | `client:load`         | Interactive multi-step form                         |
| `WebDirectoryComponent`| `client:load`         | Full client-side search app                         |
| Any `@asu/unity-react-core` component | `client:only="react"` | Accesses `document` at module load — SSR crash |

### CSS import in every React component file

Always include this at the top of every UDS React component (v1.21.0+ package import):

```jsx
import "@asu/unity-bootstrap-theme";
```

If the package-level import causes issues, use the explicit path (note: CSS now in `dist/` root, not `dist/css/`):

```jsx
import "../../node_modules/@asu/unity-bootstrap-theme/dist/unity-bootstrap-theme.css";
```

### SVG placeholder fallback

```jsx
const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e8e8e8'/%3E%3C/svg%3E";
```

### Content separation pattern

All page text, links, and image URLs live in `src/data/page-content.json`.
Do NOT use `src/content/` — Astro 4 reserves that directory for content collections.

```json
{
  "meta": { "title": "Page Title" },
  "nav": {
    "siteTitle": "Unit Name",
    "items": [{ "text": "Home", "href": "/", "children": [] }]
  },
  "footer": {
    "contact": null,
    "social": null
  }
}
```
