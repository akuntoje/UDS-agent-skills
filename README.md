# ASU Unity Design System — AI Skills Toolkit

A structured toolkit for building, extending, and reviewing ASU landing pages using the [ASU Unity Design System (UDS)](https://unity.asu.edu). Provides AI-readable instruction sets, working component examples, and reference documentation that an AI assistant can use to scaffold and validate complete Astro + React projects.

---

## What this repo does

Give your AI assistant a description or screenshot of a page layout — it reads the skills in this repo and produces a fully working Astro + React codebase using UDS components, correct CSS, and proper accessibility markup. No manual wiring of package configs or design tokens required.

---

## What's in this repo

```
skills/                                    ← this repo
├── skills/
│   ├── uds-page-builder/                  ← build a full page from description or screenshot
│   ├── uds-components/                    ← add individual UDS components to an existing project
│   └── uds-reviewer/                      ← validate a built page against UDS standards
├── components/                            ← working component examples (storybook-sourced)
├── scripts/
│   └── copy-css.cjs                       ← copies UDS CSS into public/ after npm install
└── uds-consolidation-upgrade-guide.pdf    ← UDS 2025 package consolidation reference
```

---

## The three workflows

| Skill | When to use |
|-------|-------------|
| **uds-page-builder** | Start a new landing page from a text brief or design screenshot |
| **uds-components** | Add a specific component (carousel, news feed, RFI form, etc.) to an existing project |
| **uds-reviewer** | Check a built page for UDS compliance, broken builds, and accessibility issues |

---

## Prerequisites

- A GitHub NPM token with `read:packages` scope — UDS packages are hosted on GitHub Packages
- Node.js 18+
- An AI assistant that can read Markdown instruction files from this repo

See [docs/GUIDE.md](docs/GUIDE.md) for full setup and usage details.

---

## Generated project stack

Projects built with this toolkit use:

- **[Astro 4](https://astro.build)** — static site framework
- **[React 18](https://react.dev)** — for interactive UDS components
- **[ASU Unity Design System](https://unity.asu.edu)** — ASU's official design system
- **[GitHub Packages](https://npm.pkg.github.com)** — UDS package registry
