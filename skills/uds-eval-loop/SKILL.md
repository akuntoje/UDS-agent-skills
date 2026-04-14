---
name: uds-eval-loop
description: Automated visual evaluation and correction loop — compares a running UDS site against original requirements (images or description) and iteratively fixes discrepancies until the site matches.
---

# Skill: uds-eval-loop

After building a UDS page, this skill automatically:
1. Screenshots the live dev server section by section
2. Compares screenshots against the original user requirements
3. Generates a precise fix list for every visual discrepancy
4. Applies fixes to source files
5. Re-screenshots and re-checks — loops until the page matches or max iterations reached

---

## When to use

Invoke this skill immediately after `uds-page-builder` finishes, or any time the user says:
- "check if it matches the design"
- "verify against the screenshots I gave you"
- "auto-fix any visual issues"
- "run the eval loop"

**Prerequisites:**
- Dev server is either already running, or can be started with `npm run dev`
- Playwright MCP is available for screenshots (required)
- The original requirements (text description AND/OR reference images) are in the current conversation context

---

## Step 0: Lock requirements

Before touching any code, extract and record the original requirements from the conversation context.
Write them to `eval-requirements.md` at the project root so they survive across loop iterations.

```markdown
# Eval Requirements

## Text description
[copy the user's original textual description verbatim]

## Reference sections
List each section the user described or showed, in order:
1. [section name] — [what it should look like / behavior]
2. ...

## Reference images
List images the user pasted, by position in conversation:
- Image 1: [what section it shows]
- Image 2: ...

## Acceptance criteria
- [ ] All sections present and in correct order
- [ ] No broken images
- [ ] Colors match (Maroon #8C1D40, Gold #FFC627 where applicable)
- [ ] Typography correct (font sizes, weight, no ALL CAPS, no italics)
- [ ] Layout matches reference (columns, spacing, card grid)
- [ ] Interactive elements visible (buttons, tabs, accordions)
- [ ] Mobile layout stacks correctly
```

> **Rule:** Never change `eval-requirements.md` during the loop. It is the ground truth.

---

## Step 1: Build check

```bash
npm run build 2>&1
```

- If build fails → fix errors (see `uds-reviewer` pitfall table) before proceeding
- Do NOT start the dev server until build is clean

---

## Step 2: Start dev server and take screenshots

```bash
# Start dev server in background (kill any existing one first)
pkill -f "astro dev" 2>/dev/null; sleep 1
npm run dev &
sleep 6  # wait for Astro to compile
```

Take screenshots using Playwright MCP at these viewports:

| Screenshot file           | Viewport       | Purpose               |
|---------------------------|----------------|-----------------------|
| `eval-desktop-full.png`   | 1280 × 800     | Full page, desktop    |
| `eval-mobile-full.png`    | 375 × 812      | Full page, mobile     |

**Then take section-by-section screenshots** by scrolling/clipping to each section:

```bash
# Full page at desktop (scroll entire page)
npx playwright screenshot --full-page --viewport-size="1280,800" http://localhost:4321 eval-desktop-full.png

# Full page at mobile
npx playwright screenshot --full-page --viewport-size="375,812" http://localhost:4321 eval-mobile-full.png
```

Save all screenshots to the project root (or `eval-screenshots/` subfolder).

---

## Step 3: Visual evaluation — compare screenshots against requirements

Read `eval-requirements.md`. Look at each screenshot you just took.
For every requirement item, evaluate pass or fail.

**Evaluation matrix — check each of these:**

| Category          | What to check                                                                 |
|-------------------|-------------------------------------------------------------------------------|
| **Section order** | Are all sections present, in the right order?                                 |
| **Hero**          | Background image visible? Heading/subtitle text correct? Button(s) present?   |
| **Colors**        | Maroon/Gold used correctly? No wrong background colors?                       |
| **Typography**    | Font sizes roughly match reference? No ALL CAPS? No italic text?              |
| **Images**        | All images load (no broken-image icons)? Correct images in correct sections?  |
| **Cards/Grid**    | Correct number of columns? Cards show image+title+body? No layout overflow?   |
| **Spacing**       | Sections have reasonable padding (not squished, not huge gaps)?               |
| **Buttons**       | Correct label text? Correct color (`btn-gold` / `btn-maroon`)?                |
| **Mobile**        | Stacks to single column? No horizontal overflow? Text readable?               |
| **Interactive**   | Tabs/accordion visible? Testimonial/carousel renders?                         |
| **Footer/Header** | ASU logo visible? Nav links present? Footer branding correct?                 |

**When comparing against reference images (images the user pasted):**
- Look at BOTH the reference image AND the current screenshot side by side
- Note every visual difference: layout structure, color, font size, image placement, column count, padding
- Be specific: "Card grid is 2 columns, reference shows 3 columns" not just "cards look different"

Produce a **discrepancy list** — each item must include:

```
[SECTION] [SEVERITY] [DESCRIPTION] → [SOURCE FILE to fix] [WHAT TO CHANGE]
```

Example:
```
Hero        🔴 BLOCKER  Background image not showing (blank gray)     → src/components/Hero.jsx     Use <img class="hero"> not style="background-image:..."
Cards       🟡 WARNING  3 columns on desktop, reference shows 4       → src/components/HorizontalCards.jsx   Change col-md-4 to col-md-3
Typography  🟡 WARNING  Section heading is ALL CAPS                   → src/data/page-content.json  Change "PROGRAMS" to "Programs"
Mobile      🟡 WARNING  Button row overflows horizontally at 375px    → src/components/Hero.jsx     Add flex-wrap:wrap to .btn-row
```

---

## Step 4: Decide — pass or fix

**If discrepancy list is empty → PASS.** Go to Step 6 (final report).

**If discrepancies exist:**
- Count iterations so far. If this is iteration 4 or more → go to Step 6 (report remaining issues, stop looping).
- Otherwise → proceed to Step 5.

---

## Step 5: Apply fixes

Fix ALL discrepancies from Step 3 before looping back.

**Priority order:**
1. 🔴 BLOCKER first (build errors, blank sections, SSR crashes, invisible hero backgrounds)
2. 🟡 WARNING next (wrong colors, wrong column count, ALL CAPS text, broken images)
3. 🟢 INFO last (minor spacing, subtle color differences)

**Fix rules:**
- Read the target file before editing
- Fix only what the discrepancy specifies — do not refactor surrounding code
- All text changes go in `src/data/page-content.json`, not in JSX
- After applying all fixes, run `npm run build` to confirm no new errors

Then **go back to Step 2** (re-screenshot).

---

## Step 6: Final report

Stop the dev server:
```bash
pkill -f "astro dev" 2>/dev/null
```

Output this report:

```markdown
## UDS Eval Loop Report

**Iterations:** [N]
**Final status:** ✅ PASSED / ⚠️ PASSED WITH WARNINGS / ❌ ISSUES REMAIN

### Requirements checked
[list from eval-requirements.md]

### Iteration history

#### Iteration 1
- Screenshots taken: eval-desktop-full.png, eval-mobile-full.png
- Discrepancies found: [N]
  - [list]
- Fixes applied: [list files changed]

#### Iteration 2 (if applicable)
...

### Final discrepancy status

| Section | Issue | Status |
|---------|-------|--------|
| Hero    | Background image | ✅ Fixed in iteration 1 |
| Cards   | Column count     | ✅ Fixed in iteration 2 |
| ...     | ...              | ❌ Could not resolve (reason) |

### Screenshots
- Desktop: eval-desktop-full.png
- Mobile: eval-mobile-full.png

### Remaining issues (if any)
[List anything that could not be auto-fixed, with recommendations]
```

Delete `eval-requirements.md` after the report is printed (it was a temp file).

---

## Loop control summary

```
uds-page-builder finishes
        ↓
uds-eval-loop Step 0: capture requirements
        ↓
    ┌─→ Step 1: build check
    │       ↓
    │   Step 2: screenshot
    │       ↓
    │   Step 3: visual evaluation
    │       ↓
    │   Step 4: pass? ──YES──→ Step 6: final report
    │       ↓ NO
    │   Step 5: apply fixes ──iteration≥4──→ Step 6: final report
    └───────┘
```

Maximum 3 fix iterations. After 3, report remaining issues instead of continuing.

---

## Notes on visual comparison accuracy

- Claude's vision is the evaluator. When comparing screenshots to reference images, be precise about layout (column counts, stacking), color values, and image presence.
- **Font size differences < 2px** are 🟢 INFO — acceptable drift from browser rendering.
- **Layout structure differences** (wrong columns, sections missing, wrong order) are always 🔴 BLOCKER.
- **Color token mismatches** (e.g., Bootstrap blue instead of ASU gold) are 🟡 WARNING.
- If a section was not in the original requirements, do not flag it as a discrepancy.