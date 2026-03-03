# UDS CSS Patterns Reference

This is the **second reference layer** for UDS landing page skills. While `uds-catalog.md`
covers React component APIs and props, this file covers the **HTML/CSS class names and
design tokens** that those components render — drawn directly from the official
`@asu/unity-bootstrap-theme` Storybook source stories.

**What's here:** Backgrounds, typography, buttons, heroes, cards, banners, alerts, lists,
icons, pagination — every CSS class name, HTML template structure, and variant option.

**Relationship to `uds-catalog.md`:** Complementary. Use `uds-catalog.md` to know WHICH
React component to import and its props. Use this file to know WHICH CSS classes to apply
in wrappers, bespoke JSX, or inline styles.

---

## GitHub Story Lookup (dynamic fallback)

When a CSS pattern is not listed in this file, fetch the source story directly:

```
Base:    https://raw.githubusercontent.com/ASU/asu-unity-stack/dev/packages/unity-bootstrap-theme/stories/
Pattern: {category}/{component}/{component}.templates.stories.js
         {category}/{component}/{component}.stories.js

Category values: design | atoms | molecules | organisms
```

**Examples:**
```
Buttons:     stories/atoms/buttons/buttons.templates.stories.js
Backgrounds: stories/design/backgrounds/backgrounds.stories.js
Heroes:      stories/molecules/heroes/heroes.templates.stories.js
Cards:       stories/molecules/cards/cards.templates.stories.js
Banners:     stories/molecules/banners/banners.templates.stories.js
Accordions:  stories/atoms/accordions/accordions.templates.stories.js
Pagination:  stories/molecules/pagination/pagination.templates.stories.js
Lists:       stories/atoms/list/list.templates.stories.js
```

To discover all available story folders:
```
https://api.github.com/repos/ASU/asu-unity-stack/contents/packages/unity-bootstrap-theme/stories/atoms
https://api.github.com/repos/ASU/asu-unity-stack/contents/packages/unity-bootstrap-theme/stories/molecules
https://api.github.com/repos/ASU/asu-unity-stack/contents/packages/unity-bootstrap-theme/stories/design
https://api.github.com/repos/ASU/asu-unity-stack/contents/packages/unity-bootstrap-theme/stories/organisms
```

---

## Design Tokens

### Background Colors

| Class           | Description         |
|-----------------|---------------------|
| `gray-dark-bg`  | Dark gray background |
| `gray-light-bg` | Light gray background |
| `gray-faint-bg` | Faint/off-white gray background |
| `white-bg`      | White background |

> **Deprecated:** `bg-gray-1` through `bg-gray-7` — use the classes above instead.

### Background Patterns

> ⚠️ **CRITICAL — verified against actual CSS:** Pattern classes require **BOTH `.bg` AND the
> pattern class on the same element**. The CSS rule is `.bg.network-white { background-image: url(...) }`.
> Using the pattern class alone (e.g., just `class="network-white"`) matches **nothing** and renders
> a blank — confirmed by reading `unity-bootstrap-theme.css`.

**`.bg` base class** (from CSS): `background: transparent repeat padding-box; opacity: 1`
It does **not** include `position:absolute` — you must add that yourself when overlaying.

| Class                | Description |
|----------------------|-------------|
| `morse-code-white`   | Morse code dots — white on current background |
| `morse-code-black`   | Morse code dots — black on current background |
| `network-white`      | Network graph — white |
| `network-black`      | Network graph — black |
| `topo-white`         | Topographic lines — white |
| `topo-black`         | Topographic lines — black |
| `semiconductor-light`| Circuit/semiconductor — light variant |
| `semiconductor-dark` | Circuit/semiconductor — dark variant |
| `plus-light`         | Plus grid — light variant |
| `plus-dark`          | Plus grid — dark variant |
| `arrows-light`       | Arrow pattern — light variant |
| `arrows-dark`        | Arrow pattern — dark variant |

**Correct usage — pattern as an absolutely-positioned overlay div:**
```html
<!-- ✅ CORRECT: section keeps its background-color, pattern div overlays it -->
<section class="my-section" style="position: relative;">
  <div class="bg network-white"
       style="position:absolute;top:0;left:0;width:100%;height:100%;
              pointer-events:none;background-repeat:repeat;background-size:auto;opacity:0.6;">
  </div>
  <div class="container py-5" style="position:relative;z-index:1;">
    <!-- content -->
  </div>
</section>

<!-- ❌ WRONG: pattern class alone does nothing -->
<section class="gray-dark-bg network-white">...</section>

<!-- ❌ WRONG: missing .bg, so CSS selector .bg.network-white never matches -->
<section class="network-white">...</section>
```

**Simple full-width pattern block** (no separate bg-color, just the pattern div):
```html
<div class="bg network-white" style="height: 250px; background-repeat:repeat;"></div>
```

### Brand Colors (utility classes)

| Class        | Hex       | Use |
|--------------|-----------|-----|
| `bg-gold`    | `#FFC627` | Gold background |
| `bg-maroon`  | `#8C1D40` | Maroon background |
| `bg-white`   | `#FFFFFF` | White background |
| `bg-success` | Green     | Success state |
| `bg-warning` | Orange    | Warning state |
| `bg-info`    | Blue      | Info state |

### Text & Highlight Colors

| Class              | Effect |
|--------------------|--------|
| `text-white`       | White text |
| `text-gold`        | Gold text |
| `text-gray-1`      | Gray-1 text |
| `highlight-gold`   | Gold highlight (background on inline text) |
| `highlight-black`  | Black highlight on inline text |
| `highlight-white`  | White highlight on inline text |

---

## Typography

UDS typography uses semantic HTML elements styled by the theme. No extra class needed
for headings — use `<h1>` through `<h5>` and the theme handles sizing.

**Special text classes:**

| Class     | Element   | Use |
|-----------|-----------|-----|
| `lead`    | `<p>`     | Lead/intro paragraph — larger font size |
| `article` | `<div>`   | Article-body text style |

**Inline text formatting (standard HTML):**
```html
<strong>bold</strong>
<em>italic</em>
<mark>highlighted</mark>
<del>strikethrough</del>
<small>smaller</small>
<u>underline</u>
```

**Layout helpers:**
```html
<div class="container">…</div>
<div class="container-fluid">…</div>
<div class="container-xl">…</div>
<div class="row">
  <div class="col col-sm-12 col-md-6 col-lg-4">…</div>
</div>
```

---

## Atoms

### Buttons

**Base class:** Always start with `btn`.

| Modifier        | Result |
|-----------------|--------|
| `btn-gold`      | Gold button (primary ASU CTA) |
| `btn-maroon`    | Maroon button |
| `btn-gray`      | Light gray button |
| `btn-dark`      | Dark/black button |
| `btn-sm`        | Small size |
| `btn-md`        | Medium size |
| _(no size mod)_ | Large (default) |
| `disabled`      | Disabled state (add `aria-disabled="true"`) |

**HTML templates:**

```html
<!-- Standard button -->
<button class="btn btn-gold" data-ga="cta label" data-ga-name="onclick"
  data-ga-event="link" data-ga-action="click" data-ga-type="internal link"
  data-ga-region="main content">
  Button Text
</button>

<!-- Button as link -->
<a role="button" class="btn btn-maroon btn-md" href="/path">
  Button Text
</a>

<!-- Button with icon -->
<a role="button" class="btn btn-gold" href="/path">
  <span class="fas fa-rocket" aria-hidden="true"></span>
  Button Text
</a>

<!-- Small button -->
<button class="btn btn-gray btn-sm">Small</button>
```

**Circular icon buttons:**

| Class                   | Use |
|-------------------------|-----|
| `btn-circle`            | Base circular button |
| `btn-circle-large`      | Large circle (prev/next nav arrows) |
| `btn-circle-x-large`    | Extra-large circle |
| `btn-circle-alt-gray`   | Gray circular |
| `btn-circle-alt-white`  | White circular |
| `btn-circle-alt-black`  | Black circular |

**Tag buttons:**

| Class               | Use |
|---------------------|-----|
| `btn btn-tag`       | Tag button (default) |
| `btn btn-tag-alt-white` | White tag button |
| `btn btn-tag-alt-gray`  | Gray tag button |

> **Note:** Buttons are being migrated to the React `UDSButton` component from
> `@asu/components-core`. For React wrappers, prefer the React component. For bespoke
> HTML sections, use these CSS classes.

### Google Analytics Data Attributes

Add these to **every interactive element** (buttons, links, cards):

```html
data-ga="descriptive event label"
data-ga-name="onclick"
data-ga-event="link"
data-ga-action="click"
data-ga-type="internal link"
data-ga-region="main content"
data-ga-section="section name"
```

### Alerts

| Class             | Color |
|-------------------|-------|
| `alert-warning`   | Orange/yellow |
| `alert-success`   | Green |
| `alert-info`      | Blue |
| `alert-danger`    | Red |

**HTML template:**
```html
<div class="alert alert-warning alert-dismissable alert-icon" role="alert">
  <div class="alert-icon">
    <span class="fa fa-icon fas fa-bell" aria-hidden="true"></span>
  </div>
  <div class="alert-content">
    <p>Alert message here.</p>
  </div>
  <!-- Optional dismiss button -->
  <div class="alert-close">
    <button class="btn btn-circle btn-circle-alt-black close" aria-label="Close"
      data-bs-dismiss="alert" data-ga="close cross" data-ga-name="onclick"
      data-ga-event="modal" data-ga-action="close" data-ga-type="click"
      data-ga-region="main content">
      <span class="fas fa-times" aria-hidden="true"></span>
    </button>
  </div>
</div>
```

### Lists

| Class                     | Type |
|---------------------------|------|
| `uds-list`                | Styled unordered/ordered list |
| `uds-list fa-ul`          | Icon list (Font Awesome icons as bullets) |
| `uds-steplist`            | Step/numbered list with descriptions |
| `uds-steplist-maroon`     | Step list with maroon bullets |
| `uds-steplist-gold`       | Step list with gold bullets |
| `uds-display-list`        | Display list (term + secondary text) |

**Background variants for lists:**
- `smokemode`, `light-smokemode`, `darkmode`

**HTML templates:**
```html
<!-- Standard list -->
<ul class="uds-list">
  <li>List item one</li>
  <li>List item two</li>
</ul>

<!-- Icon list -->
<ul class="uds-list fa-ul">
  <li><span class="fa-li fas fa-rocket" aria-hidden="true"></span>Item with rocket icon</li>
  <li><span class="fa-li fas fa-bus" aria-hidden="true"></span>Item with bus icon</li>
</ul>

<!-- Step list -->
<ol class="uds-steplist uds-steplist-maroon">
  <li>
    <span>Step heading</span>
    <p>Step description text here.</p>
  </li>
</ol>

<!-- Display list -->
<ul class="uds-display-list">
  <li>Primary text <span>Secondary text</span></li>
</ul>
```

### Dividers

```html
<hr class="copy-divider" />
```

### Icons (Font Awesome)

**Size classes** (add to icon `<span>` or wrapper):

| Class       | Size |
|-------------|------|
| `icon-small`| Small |
| `icon-base` | Base (default) |
| `icon-large`| Large |
| `icon-xl`   | Extra-large |
| `icon-xxl`  | Extra-extra-large |

**Common icon names:**

| Category       | Icons |
|----------------|-------|
| Navigation     | `fa-home`, `fa-bars`, `fa-times`, `fa-search`, `fa-arrow-right`, `fa-external-link-alt`, `fa-chevron-up`, `fa-chevron-down`, `fa-chevron-left`, `fa-chevron-right`, `fa-play`, `fa-pause` |
| Contact        | `fa-envelope`, `fa-phone`, `fa-map-marker-alt` |
| Informational  | `fa-info-circle`, `fa-lock`, `fa-file-download`, `fa-bell` |
| Social         | `fa-facebook-square`, `fa-square-x-twitter`, `fa-linkedin`, `fa-instagram-square`, `fa-youtube-square` |

**Usage:**
```html
<span class="fas fa-arrow-right icon-large" aria-hidden="true"></span>
<!-- or as prefix -->
<i class="fas fa-home" aria-hidden="true"></i>
```

---

## Molecules

### Heroes

**Size variants** (add to root hero element):

| Class          | Description |
|----------------|-------------|
| `uds-hero-sm`  | Small hero |
| `uds-hero-md`  | Medium hero |
| `uds-hero-lg`  | Large hero |

**Story hero variants:**

| Class              | Description |
|--------------------|-------------|
| `uds-story-hero`   | Story/article hero (medium) |
| `uds-story-hero-lg`| Story/article hero (large) |
| `entry-header`     | Page entry header style |

**Internal structure classes:**

| Class           | Role |
|-----------------|------|
| `hero`          | **Must be an `<img>` tag**, NOT a div — CSS: `img.hero { position:absolute; object-fit:cover }` |
| `hero-overlay`  | Dark gradient overlay div — `position:absolute; background: linear-gradient(180deg, transparent, rgba(25,25,25,0.79))` |
| `hero-subtitle` | Subtitle — direct child of `uds-hero-*`, grid-row 2 |
| `has-btn-row`   | Add to `uds-hero-*` root when CTA buttons follow |
| `btn-row`       | CTA button group container |
| `content`       | Text content wrapper — **`display:none` for `uds-hero-md` and `uds-hero-lg`** |

> ⚠️ **CRITICAL — verified against actual CSS:**
> 1. The background image must be `<img class="hero" src="...">` — NOT `<div class="hero" style="background-image:...">`.
>    CSS rule: `div[class^=uds-hero] img.hero { position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover }`
>    A `<div>` with `background-image` is ignored.
> 2. Text (`h1`, `.hero-subtitle`, `.btn-row`) must be **direct children** of `uds-hero-*`, NOT wrapped in `.content container-xl > row > col`.
>    The `.content` class is `display:none` for `uds-hero-md` and `uds-hero-lg`.
> 3. **subtitle comes before h1** in DOM order (grid-row:2 for subtitle, grid-row:3 for h1).
> 4. Wrap text in `<span>` for proper `box-decoration-break` highlight effects.

**Correct HTML template (verified):**
```html
<!-- ✅ CORRECT -->
<div class="uds-hero-lg">
  <img class="hero" src="/path/to/image.jpg" alt="Hero image"
       fetchpriority="high" decoding="async" />
  <div class="hero-overlay"></div>
  <p class="hero-subtitle text-white"><span>Subtitle text here</span></p>
  <h1 class="text-white"><span>Hero Title</span></h1>
</div>

<!-- ✅ With CTA buttons — add has-btn-row to root div -->
<div class="uds-hero-lg has-btn-row">
  <img class="hero" src="/path/to/image.jpg" alt="Hero image"
       fetchpriority="high" decoding="async" />
  <div class="hero-overlay"></div>
  <p class="hero-subtitle text-white"><span>Subtitle</span></p>
  <h1 class="text-white"><span>Title</span></h1>
  <div class="btn-row">
    <a role="button" class="btn btn-gold btn-md" href="/primary">Primary CTA</a>
    <a role="button" class="btn btn-maroon btn-md" href="/secondary">Secondary</a>
  </div>
</div>

<!-- ❌ WRONG — div with background-image is ignored by UDS CSS -->
<div class="uds-hero-lg">
  <div class="hero" style="background-image: url('/path/to/image.jpg')">
    <div class="hero-overlay"></div>
  </div>
  <div class="content container-xl">...</div>  <!-- display:none for lg! -->
</div>
```

**Min-heights by size variant** (from CSS):
- `uds-hero-sm` → `min-height: 16rem`
- `uds-hero-md` → `min-height: 21rem`
- `uds-hero-lg` → `min-height: 32rem`

**Story hero template:**
```html
<div class="uds-story-hero">
  <div class="content container-xl">
    <div class="row">
      <div class="col-lg-10 offset-lg-1">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Article Title</li>
          </ol>
        </nav>
        <h1 class="article">Article Headline</h1>
        <p class="lead">Lead paragraph text goes here.</p>
      </div>
    </div>
  </div>
</div>
```

> **Note:** When using the React `Hero` component from `@asu/components-core`, these
> classes are applied internally. Use them in bespoke HTML sections only.

### Cards

**Structure classes:**

| Class               | Role |
|---------------------|------|
| `card`              | Root card container |
| `card-img-top`      | Image at top of card |
| `card-icon-top`     | Icon at top of card |
| `card-header`       | Card header section (`pt-2` commonly added) |
| `card-body`         | Main content area |
| `card-text`         | Body text inside card |
| `card-event-details`| Event details container |
| `card-event-icons`  | Icons within event details |
| `card-buttons`      | Button group container |
| `card-button`       | Individual action button |
| `card-link`         | Text link at bottom of card |
| `card-tags`         | Tag group container |

**HTML template (full card):**
```html
<div class="card">
  <!-- Header: choose one -->
  <img src="/image.jpg" alt="Alt text" class="card-img-top"
    loading="lazy" decoding="async" />
  <!-- OR -->
  <div class="card-header pt-2">
    <span class="far fa-calendar fa-2x card-icon-top" aria-hidden="true"></span>
  </div>

  <div class="card-body">
    <h3 class="card-title">Card Heading</h3>
    <p class="card-text">Card body copy goes here.</p>

    <!-- Event details (optional) -->
    <div class="card-event-details">
      <div class="card-event-icons">
        <span class="fas fa-map-marker-alt" aria-hidden="true"></span>
        <span>Location text</span>
      </div>
    </div>

    <!-- Buttons -->
    <div class="card-buttons">
      <a class="btn btn-dark btn-md card-button" href="/path"
        data-ga="card cta" data-ga-name="onclick" data-ga-event="link"
        data-ga-action="click" data-ga-type="internal link"
        data-ga-region="main content" data-ga-section="heading">
        Read More
      </a>
    </div>

    <!-- Text link -->
    <a class="card-link" href="/path">Link text</a>

    <!-- Tags -->
    <div class="card-tags">
      <button class="btn btn-tag btn-tag-alt-white">
        Tag Label <span class="visually-hidden">tag description</span>
      </button>
    </div>
  </div>
</div>
```

**Card header variants** (controlled by `cardHeader` prop/arg):
- `"none"` → no header element
- `"image"` → `<img class="card-img-top" />`
- `"icon"` → `<div class="card-header"><span class="far fa-calendar fa-2x card-icon-top"></span></div>`

### Banners

**Color variants** (apply to root element):

| Class           | Color |
|-----------------|-------|
| `banner-orange` | Orange (default) |
| `banner-blue`   | Blue |
| `banner-gray`   | Gray |
| `banner-black`  | Black |

**HTML template:**
```html
<section class="alert alert-banner banner-orange" role="alert">
  <div class="uds-content-align">
    <div class="banner">
      <div class="banner-icon">
        <span class="fa fa-icon fas fa-bell" aria-hidden="true"></span>
      </div>
      <div class="banner-content">
        <h1 tabIndex="0">Banner headline text</h1>
        <p>Supporting banner message here.</p>
      </div>
      <div class="banner-buttons">
        <a class="btn btn-sm btn-dark" href="/path">Action</a>
      </div>
      <div class="banner-close">
        <button class="btn btn-circle btn-circle-alt-black close"
          aria-label="Close" data-bs-dismiss="alert">
          <span class="fas fa-times" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </div>
</section>
```

### Pagination

**Structure classes:**

| Class                   | Role |
|-------------------------|------|
| `pagination`            | Root `<ul>` |
| `justify-content-center`| Center-align pagination |
| `page-item`             | Each `<li>` |
| `page-link`             | Each `<a>` or `<span>` |
| `page-link-icon`        | Icon-only page link (prev/next arrows) |
| `active`                | Currently active page |
| `disabled`              | Disabled page link |
| `uds-bg-gray`           | Gray section background |
| `uds-bg-dark`           | Dark section background |

**HTML template:**
```html
<nav aria-label="Page navigation">
  <ul class="pagination justify-content-center">
    <!-- Previous (disabled on first page) -->
    <li class="page-item disabled">
      <a class="page-link page-link-icon" href="#" aria-disabled="true" aria-label="Previous page">
        <span class="fas fa-chevron-left" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </a>
    </li>

    <!-- Active page -->
    <li class="page-item active">
      <a class="page-link" href="#" aria-current="page"
        data-ga="page 1" data-ga-event="select" data-ga-action="click"
        data-ga-name="onclick" data-ga-type="pagination"
        data-ga-region="main content" data-ga-section="pagination title">
        1
      </a>
    </li>

    <!-- Additional pages -->
    <li class="page-item">
      <a class="page-link" href="#"
        data-ga="page 2" data-ga-event="select" data-ga-action="click"
        data-ga-name="onclick" data-ga-type="pagination"
        data-ga-region="main content" data-ga-section="pagination title">
        2
      </a>
    </li>

    <!-- Next -->
    <li class="page-item">
      <a class="page-link page-link-icon" href="#" aria-label="Next page">
        <span class="fas fa-chevron-right" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </a>
    </li>
  </ul>
</nav>
```

---

## Universal Patterns

### Accessibility

| Pattern | When to use |
|---------|-------------|
| `aria-hidden="true"` | All decorative icons/images |
| `aria-label="..."` | Buttons/links without visible text |
| `aria-current="page"` | Active page in pagination/breadcrumb |
| `aria-disabled="true"` | Disabled interactive elements |
| `class="visually-hidden"` | Screen-reader-only text (e.g. inside icon buttons) |
| `alt="..."` | Non-empty for informational images; `alt=""` for decorative |

### Image Performance Attributes

Always add to `<img>` elements:
```html
<img src="..." alt="..." loading="lazy" decoding="async" />
<!-- For above-the-fold hero images use fetchpriority instead: -->
<img src="..." alt="..." fetchpriority="high" decoding="async" />
```

### Google Analytics on All Interactive Elements

```html
<!-- Links and buttons -->
data-ga="descriptive label"
data-ga-name="onclick"
data-ga-event="link"
data-ga-action="click"
data-ga-type="internal link"
data-ga-region="main content"
data-ga-section="section identifier"

<!-- Pagination specifically -->
data-ga="page N"
data-ga-event="select"
data-ga-type="pagination"

<!-- Modal close specifically -->
data-ga="close cross"
data-ga-event="modal"
data-ga-action="close"
data-ga-type="click"
```

### Common Spacing Utilities

| Class  | Effect |
|--------|--------|
| `mb-3` | margin-bottom: 1rem |
| `mt-2` | margin-top: 0.5rem |
| `p-3`  | padding: 1rem all sides |
| `p-4`  | padding: 1.5rem all sides |
| `p-5`  | padding: 3rem all sides |
| `py-3` | padding top/bottom: 1rem |
| `pb-3` | padding-bottom: 1rem |
| `pt-2` | padding-top: 0.5rem |
