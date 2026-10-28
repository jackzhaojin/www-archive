On this page

- [Overview](#overview)

- [Color](#color)

- [Typography](#typography)

- [Spacing](#spacing)

- [Layout](#layout)

- [Shape and elevation](#shape-elevation)

- [Motion](#motion)

- [Iconography](#iconography)

- [Theming](#theming)

- [Components](#components)

  - [Skip link](#c-skip-link)
  - [Site header](#c-site-header)
  - [Breadcrumb](#c-breadcrumb)
  - [Page head](#c-page-head)
  - [Kicker](#c-kicker)
  - [Button](#c-button)
  - [Chip](#c-chip)
  - [Card](#c-card)
  - [Facts table](#c-facts-table)
  - [Data table](#c-data-table)
  - [Counts strip](#c-counts)
  - [Row list](#c-row-list)
  - [FAQ](#c-faq)
  - [Filter bar](#c-filter-bar)
  - [Pagination](#c-pagination)
  - [Embed](#c-embed)
  - [Chapters](#c-chapters)
  - [Transcript](#c-transcript)
  - [Author box](#c-author-box)
  - [Callout](#c-callout)
  - [Proof list](#c-proof)
  - [Inverse panel](#c-panel-inverse)
  - [Showcase](#c-showcase)
  - [Frame](#c-frame)
  - [Proof links](#c-proof-links)
  - [Stat chips](#c-stat)
  - [Chapter head](#c-chapter-head)
  - [Timeline](#c-timeline)
  - [Section band](#c-band)
  - [Divider](#c-divider)
  - [CTA band](#c-cta-band)
  - [Footer](#c-footer)
  - [Icons](#c-icons)

- [Patterns](#patterns)

- [Templates](#templates)

- [Status](#status)

- [Changelog](#changelog)

+-------------------+
| Section Metadata  |
+---------+---------+
| style   | outline |
+---------+---------+

---

# Design system v3

v3 0.2.0 · base claude-fable-5-1 · built 2026-09-14

One design system for www\.jackzhaojin.com, the portfolio page included. Serif display type, warm neutrals, a lavender accent, hairline borders and mono labels, in a light default and a dark set on the same tokens. Built from the Claude Fable 5.1 candidate with pieces from Astra, Kimi K3 and Google Stitch.

## Overview

### Origin

- Lineage: v1 is the original site (home, blogs, certifications, since 2025-04-01), v2 is the portfolio page (since 2026-07-25), v3 is this system, for every page.
- Base: the Claude Fable 5.1 candidate from the 2026-09-13 round, chosen after a four-way critique on 2026-09-14. Tokens continue `portfolio/styles.css` with a light theme as the default.
- Borrowed: question-shaped section headings and the inverse proof panel (Astra), the facts caption, ruled grid and whole-card hit areas (Kimi K3), the flagship card border, status chips and the one-row header (Google Stitch).
- Contract: `design-systems/2026-09-13/SPEC.md`, plus the v3 rules in the README: no LinkedIn as a destination, placeholders never as controls, generated marks silent to screen readers.

### Identity

Editorial field notes. Playfair Display carries headings and the wordmark; Inter carries body copy; JetBrains Mono carries every label, byline, chip, button and nav item in uppercase with 0.14em tracking. Surfaces step by tone rather than by shadow. Every border is a one pixel hairline. The lavender accent marks links, active navigation, focus and the AEM + AI topic. Chips carry a small colored dot. The primary button is filled with ink. Text links are mono with an underline border.

### Principles

1. Content in the HTML. Tables are tables, steps are ordered lists, breadcrumbs are a nav with an ordered list. Scripts switch theme, open the menu, filter and sort. They never supply or hide content.
2. Facts over adjectives. Copy points at the work. Every number comes from the shared data or stays bracketed.
3. One system, two palettes. Light and dark are two token sets under one set of semantic names; components never know which theme is on.
4. Hairlines and tone, not shadow. Surfaces step from bg to surface to surface-raised; shadows are near zero and reserved for the two elevation tokens.
5. Clean over clever. No glyph in the wordmark, no reveal animations, no fixed artboard. A fluid centered container at every width.

### Version and status

v3 0.2.0, status beta. Built 2026-09-14 from the 2026-09-13 base; 0.2.0 added the components extracted from the v2 portfolio page. See [Status](#status) and [Changelog](#changelog).

### Quick start

Set the default theme on the root element, load the three stylesheets in order, and load the shared theme script deferred. Copy the pre-paint snippet from [Theming](#theming) into the head before any stylesheet.

```
<html lang="en" data-theme-default="light">
...
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="base.css">
<link rel="stylesheet" href="components.css">
<script src="shared/theme.js" defer></script>
```

+--------------------+
| Section Metadata   |
+---------+----------+
| id      | overview |
+---------+----------+
| style   | docs     |
+---------+----------+

---

## Color

Three tiers. Primitives are the palette below and never appear in a component. Semantic tokens name a role and point at a primitive, once per theme. Components consume semantic tokens only.

### Primitive palette

+------------------+
| Section Metadata |
+---------+--------+
| id      | color  |
+---------+--------+
| style   | docs   |
+---------+--------+

---

#### Warm neutrals (light)

- \--palette-warm-0\
  \#ffffff
- \--palette-warm-50\
  \#f6f4f0
- \--palette-warm-100\
  \#f1eee9
- \--palette-warm-150\
  \#efece6
- \--palette-warm-200\
  \#e6e2db
- \--palette-ink-900\
  \#1a1917
- \--palette-ink-700\
  \#4a4744
- \--palette-ink-500\
  \#6f6b66

#### Night neutrals (dark)

- \--palette-night-950\
  \#0e0e0e
- \--palette-night-900\
  \#131313
- \--palette-night-850\
  \#1a1a19
- \--palette-night-800\
  \#201f1f
- \--palette-night-700\
  \#2a2a2a
- \--palette-bone-100\
  \#e8e5e3
- \--palette-bone-300\
  \#b2afac
- \--palette-bone-400\
  \#94908c

#### Lavender accent and topic colors

- \--palette-lavender-700\
  \#4a3ba8
- \--palette-lavender-600\
  \#5b4bc4
- \--palette-lavender-300\
  \#c0b3ff
- \--palette-lavender-200\
  \#d6cdff
- \--palette-blue-600\
  \#2f6bb3
- \--palette-blue-300\
  \#9db8e8
- \--palette-red-600\
  \#c2433d
- \--palette-red-300\
  \#ff9d9d
- \--palette-gold-700\
  \#7d5f0e
- \--palette-gold-300\
  \#f0cf8e

#### Project accents, from the portfolio

Six per-project accents the v2 portfolio page uses for its chapters, each with a light value (700, passes AA on paper) and a dark value (300). Four other portfolio accents already are topic colors. Use them through the semantic `--color-project-*` tokens as a chapter band's `--band-accent`.

- \--palette-cyan-700\
  \#1d6b7a
- \--palette-cyan-300\
  \#8fd8e8
- \--palette-amber-700\
  \#8a5a00
- \--palette-amber-300\
  \#ffc46b
- \--palette-leaf-700\
  \#3b7628
- \--palette-leaf-300\
  \#b3dba0
- \--palette-bronze-700\
  \#7a4f2c
- \--palette-bronze-300\
  \#d8b48f
- \--palette-mint-700\
  \#1f6e52
- \--palette-mint-300\
  \#9fe0c0
- \--palette-rose-700\
  \#a63658
- \--palette-rose-300\
  \#e8a9b8

#### Hairlines and tints (alpha over the page background)

- \--palette-line-warm\
  rgba(20,18,15,0.10)
- \--palette-line-warm-strong\
  rgba(20,18,15,0.48)
- \--palette-line-night\
  rgba(255,255,255,0.08)
- \--palette-line-night-strong\
  rgba(255,255,255,0.36)
- \--palette-lavender-tint-light\
  rgba(91,75,196,0.08)
- \--palette-lavender-tint-dark\
  rgba(192,179,255,0.10)

+--------------------+
| Section Metadata   |
+---------+----------+
| demo    | swatches |
+---------+----------+

---

### Semantic tokens

+-------------------------------------------------------------------------------------------------------+
| Data Table (mono head, caption)                                                                       |
+-------------------------+----------------------+------------------------+-----------------------------+
| Token                   | Light                | Dark                   | Use                         |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-bg             | \#f6f4f0             | \#131313               | Page background             |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-bg-alt         | \#efece6             | \#0e0e0e               | Alternate band              |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-surface        | \#ffffff             | \#1a1a19               | Cards, panels, tables,      |
|                         |                      |                        | header of a story           |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-surface-raised | \#f1eee9             | \#201f1f               | Raised surface inside a     |
|                         |                      |                        | card, embed frame, avatar,  |
|                         |                      |                        | code                        |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-text           | \#1a1917             | \#e8e5e3               | Headings, primary text,     |
|                         |                      |                        | summary                     |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-text-muted     | \#4a4744             | \#b2afac               | Body copy, excerpts, nav    |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-text-faint     | \#6f6b66             | \#94908c               | Kickers, meta, table        |
|                         |                      |                        | headers                     |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-line           | rgba(20,18,15,0.10)  | rgba(255,255,255,0.08) | Hairline borders and        |
|                         |                      |                        | dividers                    |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-line-strong    | rgba(20,18,15,0.48)  | rgba(255,255,255,0.36) | Borders that must be        |
|                         |                      |                        | perceivable: buttons,       |
|                         |                      |                        | inputs, link underlines     |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-accent         | \#5b4bc4             | \#c0b3ff               | Links, active nav, chip     |
|                         |                      |                        | dots, AEM \+ AI             |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-accent-hover   | \#4a3ba8             | \#d6cdff               | Accent on hover             |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-on-accent      | \#ffffff             | \#131313               | Text on an accent fill      |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-accent-soft    | rgba(91,75,196,0.08) | rgba(192,179,255,0.10) | Callout background          |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-focus          | \#5b4bc4             | \#c0b3ff               | Focus ring                  |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-inverse-bg     | \#1a1917             | \#e8e5e3               | Ink fill: primary button,   |
|                         |                      |                        | pressed chip, current page  |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-inverse-text   | \#f6f4f0             | \#131313               | Text on an ink fill         |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-topic-aem-ai   | \#5b4bc4             | \#c0b3ff               | Topic AEM \+ AI             |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-topic-aem      | \#2f6bb3             | \#9db8e8               | Topic Adobe AEM and EDS     |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-topic-agents   | \#c2433d             | \#ff9d9d               | Topic AI Agents             |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-topic-work     | \#7d5f0e             | \#f0cf8e               | Topic Working with AI       |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-project-cyan   | \#1d6b7a             | \#8fd8e8               | Project accent cyan, for a  |
|                         |                      |                        | chapter band                |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-project-amber  | \#8a5a00             | \#ffc46b               | Project accent amber, for a |
|                         |                      |                        | chapter band                |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-project-leaf   | \#3b7628             | \#b3dba0               | Project accent leaf, for a  |
|                         |                      |                        | chapter band                |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-project-bronze | \#7a4f2c             | \#d8b48f               | Project accent bronze, for  |
|                         |                      |                        | a chapter band              |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-project-mint   | \#1f6e52             | \#9fe0c0               | Project accent mint, for a  |
|                         |                      |                        | chapter band                |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-project-rose   | \#a63658             | \#e8a9b8               | Project accent rose, for a  |
|                         |                      |                        | chapter band                |
+-------------------------+----------------------+------------------------+-----------------------------+
| \--color-diagram-ground | \#f6f4f0             | \#f6f4f0               | Ground behind light diagram |
|                         |                      |                        | artwork                     |
+-------------------------+----------------------+------------------------+-----------------------------+
| Semantic color tokens, both themes                                                                    |
+-------------------------------------------------------------------------------------------------------+

### Contrast

Measured on 2026-09-13 with a WCAG 2.x relative luminance script (alpha colors composited over the background first). Requirement: 4.5:1 for text pairs, 3:1 for the UI border pair. Every pair passes in both themes. The vendor round's line-strong values (0.24 and 0.20 alpha) measured 1.69:1 and 2.16:1 and were raised to 0.48 and 0.36.

---

+-------------------------------------------------------------------+
| Data Table (mono head, caption)                                   |
+-------------------+---------+---------+--------+---------+--------+
| Pair              | Minimum | Light   | Result | Dark    | Result |
+-------------------+---------+---------+--------+---------+--------+
| text on bg        | 4.5     | 15.99:1 | pass   | 14.82:1 | pass   |
+-------------------+---------+---------+--------+---------+--------+
| text on surface   | 4.5     | 17.57:1 | pass   | 13.89:1 | pass   |
+-------------------+---------+---------+--------+---------+--------+
| text-muted on bg  | 4.5     | 8.40:1  | pass   | 8.51:1  | pass   |
+-------------------+---------+---------+--------+---------+--------+
| text-muted on     | 4.5     | 9.23:1  | pass   | 7.98:1  | pass   |
| surface           |         |         |        |         |        |
+-------------------+---------+---------+--------+---------+--------+
| text-faint on bg  | 4.5     | 4.81:1  | pass   | 5.86:1  | pass   |
+-------------------+---------+---------+--------+---------+--------+
| accent on bg      | 4.5     | 5.89:1  | pass   | 9.85:1  | pass   |
+-------------------+---------+---------+--------+---------+--------+
| on-accent on      | 4.5     | 6.46:1  | pass   | 9.85:1  | pass   |
| accent            |         |         |        |         |        |
+-------------------+---------+---------+--------+---------+--------+
| inverse-text on   | 4.5     | 15.99:1 | pass   | 14.82:1 | pass   |
| inverse-bg        |         |         |        |         |        |
+-------------------+---------+---------+--------+---------+--------+
| line-strong on bg | 3       | 3.22:1  | pass   | 3.33:1  | pass   |
+-------------------+---------+---------+--------+---------+--------+
| Contrast ratios, light and dark                                   |
+-------------------------------------------------------------------+

The ratios above are static text. A small script re-checks them in this browser and reports here.

+--------------------+
| Section Metadata   |
+---------+----------+
| check   | contrast |
+---------+----------+

---

## Typography

Three families from Google Fonts with system fallbacks. Playfair Display 500 and 600 for display, headings and the wordmark, italic allowed for emphasis inside a heading but never in the wordmark. Inter 400, 500 and 600 for body. JetBrains Mono 400, 500 and 700 for labels, bylines, nav, buttons, chips and code.

### Scale

Headings use clamp() so the same token reads at 44px on a desktop H1 and 32px on a phone. Body stays at 16px with a 1.65 line height. The reading measure is 66ch.

+----------------------+
| Section Metadata     |
+---------+------------+
| id      | typography |
+---------+------------+
| style   | docs       |
+---------+------------+

---

**display**--text-display\
Playfair Display 600\
44 to 64px / 1.05

Jack Jin

**h1**--text-h1\
Playfair Display 600\
32 to 44px / 1.12

Adobe Stardust Explained

**h2**--text-h2\
Playfair Display 600\
24 to 30px / 1.2

What does Jack write about?

**h3**--text-h3\
Playfair Display 600\
20px / 1.3

Theming a Brand-New EDS Site with Google Stitch + MCP

**body-lg**--text-body-lg\
Inter 400\
19px / 1.55

The summary paragraph under the H1 answers who, what and for whom in 40 to 60 words.

**body**--text-body\
Inter 400\
16px / 1.65

Body copy sits in the muted ink. Links inside prose are ink with a hairline underline border, so they read as part of the sentence.

**small**--text-small\
Inter 400\
14px / 1.55

Card excerpts, footer links and notes use the small step.

**label**--text-label\
JetBrains Mono 500\
11px / 1.5, 0.14em, uppercase

Flagship topic

**mono**--text-mono\
JetBrains Mono 400\
13px / 1.6

By Jack Jin · Published 2026-08-09 · Video

+---------------------+
| Section Metadata    |
+---------+-----------+
| demo    | specimens |
+---------+-----------+

---

### Line heights and measure

- `--leading-tight` 1.12 for headings, `--leading-body` 1.65 for body.
- `--measure` 66ch. `.prose` and `.summary` stop there; the page head stops at 860px so a long H1 still wraps well.
- `--tracking-label` 0.14em on uppercase mono. Chips use 0.04em, nav 0.06em, table headers 0.10em.

---

## Spacing

A 4px base. Ten steps. Section gaps use space-8 (64) on desktop; the stack default is space-4 (16); card padding is 22px, panel padding 26px, both fixed.

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | spacing |
+---------+---------+
| style   | docs    |
+---------+---------+

---

- \--space-1 · 4px
- \--space-2 · 8px
- \--space-3 · 12px
- \--space-4 · 16px
- \--space-5 · 24px
- \--space-6 · 32px
- \--space-7 · 48px
- \--space-8 · 64px
- \--space-9 · 96px
- \--space-10 · 128px

+------------------+
| Section Metadata |
+---------+--------+
| demo    | space  |
+---------+--------+

---

## Layout

One centered container. `.container` has `max-width: var(--container-max)` (1280px), `margin-inline: auto` and `padding-inline: var(--gutter)`, where the gutter is `clamp(20px, 5vw, 64px)`. Content is therefore 1152px wide from 1408px up and never sits flush left.

### Breakpoints

+---------------------------------------------------------------------------------+
| Data Table (mono head, compact, caption)                                        |
+---------------------+-----------------------------------------------------------+
| Width               | What changes                                              |
+---------------------+-----------------------------------------------------------+
| 480                 | Hub grid goes from one column to two. Header actions      |
|                     | leave their own row. Row list gets its date column. CTA   |
|                     | buttons stop stacking.                                    |
+---------------------+-----------------------------------------------------------+
| 768                 | Two and three column grids go to two. Footer goes to four |
|                     | columns. Facts table label column widens. Header becomes  |
|                     | sticky.                                                   |
+---------------------+-----------------------------------------------------------+
| 1024                | Three column grid goes to three. Nav shows inline and the |
|                     | menu button hides. Docs nav becomes a sticky sidebar.     |
|                     | Feature panel goes to two columns.                        |
+---------------------+-----------------------------------------------------------+
| 1280                | Hub grid goes to four in one row. Container reaches its   |
|                     | max width at 1408 (1280 plus gutters).                    |
+---------------------+-----------------------------------------------------------+
| 1600                | Nothing changes. Reserved.                                |
+---------------------+-----------------------------------------------------------+
| Mobile first breakpoints                                                        |
+---------------------------------------------------------------------------------+

### Grids

`.grid` auto-fits columns of at least `--grid-min` (260px). `.grid--2`, `.grid--3` and `.grid--4` set explicit counts. Four hub cards sit in one row at 1280 and up and two by two below, never three plus one.

+------------------+
| Section Metadata |
+---------+--------+
| id      | layout |
+---------+--------+
| style   | docs   |
+---------+--------+

---

grid grid--4 (resize to see 1, 2, 4 columns)

- 01
- 02
- 03
- 04

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| demo    | grid-4 |
+---------+--------+

---

grid grid--3

- a
- b
- c

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| demo    | grid-3 |
+---------+--------+

---

grid grid--2

- left
- right

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| demo    | grid-2 |
+---------+--------+

---

grid (auto-fit, --grid-min 260px)

- auto
- auto
- auto
- auto
- auto

+---------------------+
| Section Metadata    |
+---------+-----------+
| style   | story     |
+---------+-----------+
| demo    | grid-auto |
+---------+-----------+

---

### Stack and cluster

`.stack` is a column with `gap: var(--stack-gap, var(--space-4))`; `.stack--sm`, `--lg` and `--xl` set 8, 32 and 64. `.cluster` is a wrapping flex row with a 12px gap; `.cluster--between` spreads its ends.

### Wide screens

At 1920 and 2560 the container stays 1280px wide and centered, so the side margins grow to 320px and 640px. Bands (`.band`) and the header border run full width behind it; content does not stretch. This is the fix for the canvas round, which was a fixed 1440px artboard and read as left aligned on wide screens.

---

## Shape and elevation

Cards 10px, buttons and controls 6px, chips 4px, filter pills 999px. Every border is one pixel. Elevation is tone, not shadow: bg, surface, surface-raised. Hover raises a card border from line to line-strong.

### Radii

+---------------------------+
| Section Metadata          |
+---------+-----------------+
| id      | shape-elevation |
+---------+-----------------+
| style   | docs            |
+---------+-----------------+

---

- \--radius-sm 4
- \--radius-md 6
- \--radius-lg 10
- \--radius-pill

+------------------+
| Section Metadata |
+---------+--------+
| demo    | radius |
+---------+--------+

---

### Borders

- `--border-width` 1px everywhere. No two pixel rules, no colored left borders.
- `--color-line` for cards, table rows, dividers, the header and footer rule.
- `--color-line-strong` for buttons, inputs, the theme control, link underlines and anything a user must find by its edge.

### Shadows

---

- none (default)
- \--shadow-1
- \--shadow-2

+------------------+
| Section Metadata |
+---------+--------+
| demo    | shadow |
+---------+--------+

---

shadow-1 is `0 1px 2px rgba(20,18,15,0.04)` and shadow-2 is `0 8px 24px rgba(20,18,15,0.07)` in light; both use black at 0.30 and 0.40 in dark. No shipped component uses either today; they exist for a future overlay.

---

## Motion

Two durations and one easing. `--duration-fast` 120ms for color, border and background changes. `--duration-base` 250ms for transforms, the FAQ chevron and the primary button lift. `--ease-standard` is `cubic-bezier(0.16, 1, 0.3, 1)`, the portfolio's reveal curve.

+------------------+
| Section Metadata |
+---------+--------+
| id      | motion |
+---------+--------+
| style   | docs   |
+---------+--------+

---

hover to move (250ms, ease-standard)

+------------------+
| Section Metadata |
+---------+--------+
| demo    | motion |
+---------+--------+

---

### Reduced motion

Under `prefers-reduced-motion: reduce` every animation and transition collapses to 0.01ms and smooth scrolling turns off. There are no reveal-on-scroll patterns and no opacity-zero starts, so nothing depends on motion to appear.

```
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Iconography

One inline `<svg hidden>` sprite per page with ten symbols on a 24 unit grid. Strokes are 1.6 units, round caps and joins, `currentColor`. Two symbols (video, play) fill a triangle with `currentColor`. Use with `<svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-video"></use></svg>`.

+-----------------------+
| Section Metadata      |
+---------+-------------+
| id      | iconography |
+---------+-------------+
| style   | docs        |
+---------+-------------+

---

- :video:icon-video
- :article:icon-article
- :post:icon-post
- :repo:icon-repo
- :external:icon-external
- :arrow:icon-arrow
- :play:icon-play
- :menu:icon-menu
- :close:icon-close
- :check:icon-check

+------------------+
| Section Metadata |
+---------+--------+
| demo    | icons  |
+---------+--------+

---

### Sizing

- `.icon` is 1em square and sits at `vertical-align: -0.15em`, so it follows the text size next to it.
- `.icon--sm` 12px inside chips, `.icon--md` 16px in buttons and the menu toggle, `.icon--lg` 24px in the icon grid, `.icon--xl` 32px reserved.
- Decorative icons carry `aria-hidden="true"` and `focusable="false"`. An icon that is the only content of a control needs a text alternative next to it or in `aria-label`.
- Format chips draw their icon with a CSS mask on `::before` so the canonical chip markup stays text only.

---

## Theming

Light is the default. A three-state control in the header offers Light, Dark and System. The choice is stored in `localStorage` under the key `jj-theme` with the values `light`, `dark` or `system`, and applied before first paint by an inline snippet in the head. The shared `../shared/theme.js` syncs `aria-pressed`, persists the choice, sets `data-theme-effective` and follows OS changes while in System.

### Live control

+-------------------+
| Section Metadata  |
+---------+---------+
| id      | theming |
+---------+---------+
| style   | docs    |
+---------+---------+

---

theme-control (this one changes the whole page)

+-------------------------+
| Section Metadata        |
+---------+---------------+
| style   | story, row    |
+---------+---------------+
| demo    | theme-control |
+---------+---------------+

---

### How it resolves

1. `data-theme-default="light"` on `<html>` is the page default. Every page in this round uses light.
2. The pre-paint snippet reads `jj-theme`. Light or dark becomes `data-theme="light|dark"`. System removes the attribute so the media query decides. It also adds the `js` class.
3. `tokens.css` defines light on `:root` and on `[data-theme="light"]`, dark on `[data-theme="dark"]`, and dark again under `prefers-color-scheme: dark` for a root with no attribute.
4. Because the attribute selector matches any element, a frame such as `<div class="story" data-theme="dark">` forces one theme for its subtree. The dark stories on this page use that.

### Pre-paint snippet (copy verbatim, before any stylesheet)

```
<script>
(function(){var d=document.documentElement;d.classList.add('js');try{var s=localStorage.getItem('jj-theme');var def=d.getAttribute('data-theme-default')||'light';var c=(s==='light'||s==='dark'||s==='system')?s:def;if(c==='system'){d.removeAttribute('data-theme');}else{d.setAttribute('data-theme',c);}d.setAttribute('data-theme-choice',c);}catch(e){}})();
</script>
```

### Selector structure

```
:root, [data-theme="light"] { color-scheme: light; /* light semantic tokens */ }
[data-theme="dark"] { color-scheme: dark; /* dark semantic tokens */ }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]):not([data-theme="dark"]) { color-scheme: dark; /* dark semantic tokens, duplicated */ }
}
```

### Control markup

```
<div class="theme-control" role="group" aria-label="Color theme">
  <button type="button" class="theme-control__btn" data-set-theme="light" aria-pressed="true">Light</button>
  <button type="button" class="theme-control__btn" data-set-theme="dark" aria-pressed="false">Dark</button>
  <button type="button" class="theme-control__btn" data-set-theme="system" aria-pressed="false">System</button>
</div>
```

Without JavaScript the control renders with Light pressed and does nothing; the page still reads in light, or in dark when the OS prefers it and no stored choice can be read.

---

## Components

One subsection per component. Each follows the Storybook docs pattern: status, when to use it, anatomy, one story per variant and state (at least one in a dark frame), the canonical markup, a do and a don't, accessibility notes and the tokens it consumes. Class names are fixed by the contract; modifier classes may be added but nothing is renamed.

+----------------------+
| Section Metadata     |
+---------+------------+
| id      | components |
+---------+------------+
| style   | docs       |
+---------+------------+

---

### Skip link

stable

The first focusable element on every page. Hidden off screen until it receives keyboard focus, then shown as an ink block at the top left. `.sr-only` is the companion utility for text that only assistive technology should read.

#### Anatomy

- One `<a class="skip-link">` pointing at `#main`.
- `<main id="main">` as its target.

#### Stories

+-----------------------+
| Section Metadata      |
+---------+-------------+
| id      | c-skip-link |
+---------+-------------+
| style   | component   |
+---------+-------------+

---

focused state (shown statically here)

[Skip to content](#main)

+---------------------+
| Section Metadata    |
+---------+-----------+
| style   | story     |
+---------+-----------+
| demo    | skip-link |
+---------+-----------+

---

dark

[Skip to content](#main)

+---------------------+
| Section Metadata    |
+---------+-----------+
| style   | story     |
+---------+-----------+
| theme   | dark      |
+---------+-----------+
| demo    | skip-link |
+---------+-----------+

---

#### Markup

```
<a class="skip-link" href="#main">Skip to content</a>
...
<main id="main">
```

Do

Put it first in the body, before the sprite is fine, before the header always.

Don't

Hide it with `display: none`; it must stay focusable.

#### Accessibility

- Visible on focus with 4.5:1 text on the ink fill.
- `.sr-only` keeps text in the accessibility tree and out of the visual layout.

#### Tokens

`--color-inverse-bg`, `--color-inverse-text`, `--font-mono`, `--text-mono`, `--radius-md`, `--z-header`.

---

### Site header

stable

One row at every width: wordmark, primary nav, then the tools (a Book a talk button and the theme control) at the right end of the nav. Below 1024px the whole nav, tools included, folds behind a 44px Menu button when JavaScript runs, so the phone header is the wordmark and one button; without JavaScript the nav stays visible as a wrapping row. The header is sticky.

#### Anatomy

- `.wordmark`: the text "Jack Jin" in Playfair Display 600 and nothing else, 44px tall.
- `.nav-toggle`: a button with `aria-expanded` and `aria-controls`; its text swaps between "Menu" and "Close" by CSS, as do the icons.
- `.site-nav`: a `nav` holding the list of six links and `.site-nav__tools`; the current page carries `aria-current="page"`.
- `.site-nav__tools`: the primary button (to the contact band, never to LinkedIn) and the `.theme-control`. In the open phone menu they sit on their own row with 44px targets.

#### Stories

+-------------------------+
| Section Metadata        |
+---------+---------------+
| id      | c-site-header |
+---------+---------------+
| style   | component     |
+---------+---------------+

---

light, current page Blog (the toggle shows below 1024px)

[Jack Jin](/)

:menu: :close: Menu Close

- [AEM + AI](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=aem-ai)
- **[Blog](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html)**
- [Portfolio](/portfolio/)
- [Talks](https://www.jackzhaojin.com/design-systems/v3/templates/home.html#talks)
- [Certifications](/certifications/)
- [Contact](https://www.jackzhaojin.com/design-systems/v3/templates/home.html#contact)

**[Book a talk](https://www.jackzhaojin.com/design-systems/v3/templates/home.html#contact)**

**Light**

Dark

System

+----------------------------------------------------------------+
| Section Metadata                                               |
+---------+------------------------------------------------------+
| style   | story                                                |
+---------+------------------------------------------------------+
| labels  | nav: Primary, example \| group: Color theme, example |
+---------+------------------------------------------------------+
| demo    | site-header                                          |
+---------+------------------------------------------------------+

---

dark, menu open state of the toggle

[Jack Jin](/)

:menu: :close: Menu Close

- **[AEM + AI](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=aem-ai)**
- [Blog](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html)
- [Portfolio](/portfolio/)
- [Talks](https://www.jackzhaojin.com/design-systems/v3/templates/home.html#talks)
- [Certifications](/certifications/)
- [Contact](https://www.jackzhaojin.com/design-systems/v3/templates/home.html#contact)

**[Book a talk](https://www.jackzhaojin.com/design-systems/v3/templates/home.html#contact)**

Light

**Dark**

System

+------------------------------------------------------------------+
| Section Metadata                                                 |
+---------+--------------------------------------------------------+
| style   | story, expanded                                        |
+---------+--------------------------------------------------------+
| theme   | dark                                                   |
+---------+--------------------------------------------------------+
| labels  | nav: Primary, dark example \| group: Color theme, dark |
|         | example                                                |
+---------+--------------------------------------------------------+
| demo    | site-header                                            |
+---------+--------------------------------------------------------+

---

#### Markup

```
<header class="site-header">
  <div class="container site-header__inner">
    <a class="wordmark" href="/">Jack Jin</a>
    <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav">
      <span class="nav-toggle__open">Menu</span><span class="nav-toggle__close">Close</span>
    </button>
    <nav class="site-nav" id="site-nav" aria-label="Primary">
      <ul><li><a href="..." aria-current="page">AEM + AI</a></li>...</ul>
      <div class="site-nav__tools">
        <a class="btn btn--primary btn--sm" href="#contact">Book a talk</a>
        <div class="theme-control" role="group" aria-label="Color theme">...</div>
      </div>
    </nav>
  </div>
</header>
```

Do

Keep the wordmark as plain text. Mark the current page with `aria-current="page"`, not a class.

Don't

Add a glyph, half circle or theme symbol next to the name. Do not hide the nav with CSS alone; the collapse is gated on `html.js`.

#### Accessibility

- `nav` has a label. The toggle announces expanded state and controls the nav by id.
- Nav links are 12.5px mono at 8.40:1 against the page; the active link gets an accent rule under it plus the ink color, so color is not the only cue.
- The header is sticky only from 768px so it never eats a phone screen.

#### Tokens

`--header-height`, `--color-bg`, `--color-line`, `--color-line-strong`, `--color-text`, `--color-text-muted`, `--color-accent`, `--font-display`, `--font-mono`, `--z-header`.

---

### Breadcrumb

stable

A mono trail directly above the H1 on every page except home. Mirrors the URL. Separators are a slash drawn by CSS, so the list stays a clean ordered list.

#### Anatomy

- `nav.breadcrumb` with `aria-label="Breadcrumb"`.
- An `ol`; every item but the last is a link; the last carries `aria-current="page"`.

#### Stories

+------------------------+
| Section Metadata       |
+---------+--------------+
| id      | c-breadcrumb |
+---------+--------------+
| style   | component    |
+---------+--------------+

---

three levels

+------------------------------------------------------------------------------+
| Hero (page)                                                                  |
+------------------------------------------------------------------------------+
| 1. [Home](https://www.jackzhaojin.com/design-systems/v3/templates/home.html) |
| 2. [Blog](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html) |
| 3. Adobe Stardust Explained                                                  |
+------------------------------------------------------------------------------+

+------------------------------------+
| Section Metadata                   |
+---------+--------------------------+
| style   | story                    |
+---------+--------------------------+
| labels  | nav: Breadcrumb, example |
+---------+--------------------------+

---

dark, two levels

+------------------------------------------------------------------------------+
| Hero (page)                                                                  |
+------------------------------------------------------------------------------+
| 1. [Home](https://www.jackzhaojin.com/design-systems/v3/templates/home.html) |
| 2. Blog                                                                      |
+------------------------------------------------------------------------------+

+-----------------------------------------+
| Section Metadata                        |
+---------+-------------------------------+
| style   | story                         |
+---------+-------------------------------+
| theme   | dark                          |
+---------+-------------------------------+
| labels  | nav: Breadcrumb, dark example |
+---------+-------------------------------+

---

#### Markup

```
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="...">Home</a></li>
    <li aria-current="page">Blog</li>
  </ol>
</nav>
```

Do

Place it as the first child of the page head, immediately above the H1.

Don't

Type separators into the markup or repeat the page title as a link.

#### Accessibility

- Labelled nav landmark; the current item is text, not a link.
- The CSS slash is generated content and is not read as a list item.

#### Tokens

`--font-mono`, `--color-text-faint`, `--color-text-muted`, `--color-text`.

---

### Page head

stable

The block that opens every page: kicker, H1, byline and the 40 to 60 word summary. The summary is the answer block that search and AI engines lift, so it sits in the ink color, not the muted one, and nothing goes between it and the H1.

#### Anatomy

- `header.page-head`, max width 860px, column with 16px gaps.
- `p.kicker`, `h1.page-title`, `p.byline` with `time` elements, `p.summary`.
- Home adds `.page-head--home`, `.page-title--display` and a `.positioning` line.

#### Stories

+-----------------------+
| Section Metadata      |
+---------+-------------+
| id      | c-page-head |
+---------+-------------+
| style   | component   |
+---------+-------------+

---

post head (h1 on a real page; a paragraph here to keep one H1 on this page)

Video · AEM + AI

Adobe Stardust Explained: Design Agent Skills on Edge Delivery Services (EDS)

By [Jack Jin](https://www.jackzhaojin.com/design-systems/v3/templates/home.html#contact) · Published 2026-08-09 · Updated \[date] · \[watch time to confirm] · Video

Adobe Stardust is a skill in the public adobe/skills repo, not a product. It builds on impeccable, the 57K-star UX design skill library that does the design work.

+-----------------------------------------------+
| Section Metadata                              |
+---------+-------------------------------------+
| style   | story                               |
+---------+-------------------------------------+
| items   | kicker, page-title, byline, summary |
+---------+-------------------------------------+

---

dark, home head with the display size

Jack Jin

Associate Director at Accenture. Cloud architect. Adobe Certified Master. AEM Champion 2026.

+-------------------------------------------+
| Section Metadata                          |
+---------+---------------------------------+
| style   | story                           |
+---------+---------------------------------+
| theme   | dark                            |
+---------+---------------------------------+
| items   | page-title-display, positioning |
+---------+---------------------------------+

---

#### Markup

```
<header class="page-head">
  <p class="kicker">Video · AEM + AI</p>
  <h1 class="page-title">...</h1>
  <p class="byline">By <a href="...">Jack Jin</a> · Published <time datetime="2026-08-09">2026-08-09</time> · Updated <time>...</time> · 12 min · Video</p>
  <p class="summary">40 to 60 words</p>
</header>
```

Do

Keep the H1 short and put the keywords in the summary. Show published and updated dates as `time` elements.

Don't

Put a hero image between the H1 and the summary, or write a keyword string as the H1.

#### Accessibility

- Exactly one H1 per page. The byline separates items with a middle dot and spaces so screen readers pause.

#### Tokens

`--text-h1`, `--text-display`, `--text-body-lg`, `--measure`, `--font-display`, `--font-mono`, `--color-text`, `--color-text-muted`, `--color-text-faint`.

---

### Kicker

stable

The system's label voice: JetBrains Mono 500, 11px, uppercase, 0.14em tracking, faint ink. Used as the label voice of card meta lines, hub labels, captions, dividers and every docs story. Never as an eyebrow above a heading: headings carry their own weight, and a label that only restates the heading is deleted. `.kicker--accent` switches it to lavender. `.kicker--rule` adds the portfolio's trailing hairline through `::after`; no dash character is ever used.

#### Anatomy

- A `p` or `span` with `.kicker`. Text only.

#### Stories

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | c-kicker  |
+---------+-----------+
| style   | component |
+---------+-----------+

---

default, accent, rule

Flagship topic

Design tokens

Featured project

+----------------------------------------------+
| Section Metadata                             |
+---------+------------------------------------+
| style   | story, row                         |
+---------+------------------------------------+
| items   | kicker, kicker-accent, kicker-rule |
+---------+------------------------------------+

---

dark

Flagship topic

Design tokens

Featured project

+----------------------------------------------+
| Section Metadata                             |
+---------+------------------------------------+
| style   | story, row                         |
+---------+------------------------------------+
| theme   | dark                               |
+---------+------------------------------------+
| items   | kicker, kicker-accent, kicker-rule |
+---------+------------------------------------+

---

#### Markup

```
<p class="kicker">Flagship topic</p>
<p class="kicker kicker--accent">Design tokens</p>
<p class="kicker kicker--rule">Featured project</p>
```

Do

Two to four words that name the section or the type of thing.

Don't

Use it as a slogan line or put a dash in it.

#### Accessibility

- Faint ink measures 4.81:1 in light and 5.86:1 in dark, so the small size still passes AA.

#### Tokens

`--font-mono`, `--text-label`, `--tracking-label`, `--weight-medium`, `--color-text-faint`, `--color-accent`.

---

### Button

stable

Mono text, 6px radius, one hairline. Primary is filled with ink (the identity mark), secondary is bordered, ghost has no border until hover. Works on `a` and `button`. Disabled links use `aria-disabled="true"` so they stay in the tab order semantics of a link that goes nowhere yet.

#### Anatomy

- `.btn` plus one of `.btn--primary`, `.btn--secondary`, `.btn--ghost`; optional `.btn--sm`.
- Optional leading `.icon`.

#### Stories

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | c-button  |
+---------+-----------+
| style   | component |
+---------+-----------+

---

variants

**[Book a talk](https://www.jackzhaojin.com/design-systems/v3/templates/home.html#contact)**

*[All posts](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html)*

[Ghost](https://www.jackzhaojin.com/design-systems/v3/templates/home.html)

+-------------------------------------------------+
| Section Metadata                                |
+---------+---------------------------------------+
| style   | story, row                            |
+---------+---------------------------------------+
| items   | btn-primary, btn-secondary, btn-ghost |
+---------+---------------------------------------+

---

small and with an icon

**[Book a talk](https://www.jackzhaojin.com/design-systems/v3/templates/home.html#contact)**

*[:repo:GitHub](https://github.com/jackzhaojin)*

[Ghost small](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html)

+----------------------------------------------------------+
| Section Metadata                                         |
+---------+------------------------------------------------+
| style   | story, row                                     |
+---------+------------------------------------------------+
| items   | btn-primary-sm, btn-secondary-sm, btn-ghost-sm |
+---------+------------------------------------------------+

---

disabled (aria-disabled) and a real button element

Not yet available

Disabled button

Button element

+-----------------------------------------------------------------+
| Section Metadata                                                |
+---------+-------------------------------------------------------+
| style   | story, row                                            |
+---------+-------------------------------------------------------+
| items   | btn-primary-disabled, btn-secondary-element-disabled, |
|         | btn-secondary-element                                 |
+---------+-------------------------------------------------------+

---

dark

**[Book a talk](https://www.jackzhaojin.com/design-systems/v3/templates/home.html#contact)**

*[All posts](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html)*

[Ghost](https://www.jackzhaojin.com/design-systems/v3/templates/home.html)

Disabled

+--------------------------------------------------+
| Section Metadata                                 |
+---------+----------------------------------------+
| style   | story, row                             |
+---------+----------------------------------------+
| theme   | dark                                   |
+---------+----------------------------------------+
| items   | btn-primary, btn-secondary, btn-ghost, |
|         | btn-primary-disabled                   |
+---------+----------------------------------------+

---

#### Markup

```
<a class="btn btn--primary" href="...">Book a talk</a>
<a class="btn btn--secondary btn--sm" href="...">All posts</a>
<button type="button" class="btn btn--ghost">Ghost</button>
<a class="btn btn--primary" aria-disabled="true">Not yet available</a>
```

Do

One primary per view. Label with the destination: "Book a talk", "All posts".

Don't

Point a placeholder at a bare hash; drop the href and set `aria-disabled`.

#### Accessibility

- Minimum 44px tall at the default size. Focus shows the 2px accent ring with a 2px offset.
- Hover changes border or lifts by 1px; disabled reduces opacity and removes pointer events but keeps the text readable.

#### Tokens

`--button-radius`, `--button-pad`, `--font-mono`, `--text-mono`, `--color-line-strong`, `--color-inverse-bg`, `--color-inverse-text`, `--color-text`, `--color-surface-raised`, `--duration-fast`, `--duration-base`.

---

### Chip

stable

Mono 11px in a 4px hairline box with a small colored dot before the text. Topic chips color the dot by `data-topic`; format chips replace the dot with a masked icon; status chips use accent for stable and gold for beta. In the filter bar the same chip grows to a pill.

#### Anatomy

- `.chip` with `.chip--topic`, `.chip--format` or `.chip--status`.
- Dot or icon drawn by `::before`. `.chip--plain` removes it.
- As a filter: `button.chip` with `aria-pressed`, or `a.chip` for topic links.

#### Stories

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | c-chip    |
+---------+-----------+
| style   | component |
+---------+-----------+

---

topic chips

AEM + AI

AEM

AI Agents

Working with AI

+----------------------+
| Section Metadata     |
+---------+------------+
| style   | story, row |
+---------+------------+
| demo    | chips      |
+---------+------------+

---

format chips

Video

Article

Post

+----------------------+
| Section Metadata     |
+---------+------------+
| style   | story, row |
+---------+------------+
| demo    | chips      |
+---------+------------+

---

status and plain

stable

beta

Adobe Certified Master

+----------------------+
| Section Metadata     |
+---------+------------+
| style   | story, row |
+---------+------------+
| demo    | chips      |
+---------+------------+

---

as buttons: pressed and not pressed

**All**

Video

**Video**

+----------------------+
| Section Metadata     |
+---------+------------+
| style   | story, row |
+---------+------------+
| demo    | chips      |
+---------+------------+

---

dark

AEM + AI

AEM

AI Agents

Working with AI

Video

**All**

+----------------------+
| Section Metadata     |
+---------+------------+
| style   | story, row |
+---------+------------+
| theme   | dark       |
+---------+------------+
| demo    | chips      |
+---------+------------+

---

#### Markup

```
<span class="chip chip--topic" data-topic="aem">AEM</span>
<span class="chip chip--format" data-format="video">Video</span>
<span class="chip chip--status" data-status="beta">beta</span>
<button type="button" class="chip" data-filter="format" data-value="all" aria-pressed="true">All</button>
```

Do

Use the four topic values only: aem-ai, aem, agents, work.

Don't

Make a chip the only link on a card, or rely on the dot color alone to carry meaning; the text names the topic.

#### Accessibility

- Button chips expose `aria-pressed`; the pressed state is an ink fill, not a color shift alone.
- The dot and icon are generated content and never carry text.

#### Tokens

`--chip-radius`, `--chip-dot`, `--font-mono`, `--text-label`, `--color-line`, `--color-text-muted`, `--color-accent`, `--color-topic-*`, `--color-inverse-bg`, `--color-inverse-text`.

---

### Card

stable

A surface with a hairline and a 10px radius. Three kinds: post (meta, title, excerpt, topic chips), hub (topic label, a question as the title, counts) and project (name, period, summary, facts, link). The title carries the one real link; with `.card--link` the whole card becomes its hit area through a stretched pseudo-element and the focus ring draws on the card. Hover raises the border to line-strong. A row of hub cards sits in `.grid--rules`: zero gap, shared hairlines, one object instead of four boxes. The flagship hub carries `data-flagship` for its accent border and a flagship status chip.

#### Anatomy

- `article.card` with `.card--post`, `.card--hub` or `.card--project`, plus `.card--link` when the card should be one tap target.
- Post: `h3.card__title` with a link, then `.card__meta` (format chip and `time`) as its byline, `.card__excerpt` (clamped to four lines), `.card__footer` with topic chips.
- Hub: `h3.card__title` holding the question, then `.card__label` (topic name with its color dot, optional status chip), `.card__counts`; `data-topic` on the card colors the label.
- Project: `.card__period`, `h3.card__title`, `.card__excerpt`, `.card__facts`, `.card__link`.

#### Stories

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | c-card    |
+---------+-----------+
| style   | component |
+---------+-----------+

---

post card, linked

### [Adobe Stardust Explained: Design Agent Skills on EDS](https://www.jackzhaojin.com/design-systems/v3/templates/post.html)

**Video** *2026-08-09*

What Adobe Stardust actually is: a skill in the public adobe/skills repo, not a product. It builds on impeccable, the 57K-star UX design skill library that does the actual design work.

**AEM + AI** **AEM**

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| demo    | cards  |
+---------+--------+
| kinds   | post   |
+---------+--------+
| cols    | 3      |
+---------+--------+

---

hub cards on a ruled grid, the flagship first

### [How do AI agents, skills and MCP servers work on AEM, EDS and DA.live?](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=aem-ai)

AEM + AI **Flagship**

6 posts, provisional set

### [When does headless AEM make sense, and how do the EDS offerings compare?](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=adobe-aem)

Adobe AEM and EDS

12 posts and videos

+----------------------------------------+
| Section Metadata                       |
+---------+------------------------------+
| style   | story                        |
+---------+------------------------------+
| demo    | cards                        |
+---------+------------------------------+
| kinds   | hub:aem-ai:flagship, hub:aem |
+---------+------------------------------+
| cols    | 2-rules                      |
+---------+------------------------------+

---

project card

Jul 2026 to present

### [Anima Mesh](/portfolio/anima-mesh/)

Runs recurring back-office work from a private repo: compliance checks, bookkeeping prep, document memory, governance, research and inbound triage.

Apache 2.0 · v0.16.2 · TypeScript on Cloudflare Workers, Durable Objects, GitHub

[anima-mesh on GitHub](https://github.com/jackzhaojin/anima-mesh)

+-------------------+
| Section Metadata  |
+---------+---------+
| style   | story   |
+---------+---------+
| demo    | cards   |
+---------+---------+
| kinds   | project |
+---------+---------+
| cols    | 2       |
+---------+---------+

---

dark, post card and hub card

### [AnimaMesh Conference Pre-Read: An Engine for Running a Company with Agents](https://www.linkedin.com/posts/jackjin_anima-mesh-ai-tinkerer-columbus-2026-08-ugcPost-7490122558491533313-m-o0/)

**Post** *2026-08-03*

Pre-read deck for the AI Tinkerers Columbus talk on AnimaMesh, an engine for running a company with agents.

**AI Agents**

### [How do continuous agents, harnesses and safety that lives in code fit together?](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=ai-agents)

AI Agents

27 posts and videos

+----------------------------+
| Section Metadata           |
+---------+------------------+
| style   | story            |
+---------+------------------+
| theme   | dark             |
+---------+------------------+
| demo    | cards            |
+---------+------------------+
| kinds   | post, hub:agents |
+---------+------------------+
| cols    | 2                |
+---------+------------------+

---

tool cards, whole card a link (from the portfolio's workbench)

+----------------------------------------------------------------------------------------+
| Cards (tool)                                                                           |
+----------------------------------------------------------------------------------------+
| **[jackzhaojin.github.io](https://github.com/jackzhaojin/jackzhaojin.github.io)**\     |
| The personal site at jackzhaojin.com. No frameworks, no build step, on purpose.\       |
| *Apr 2025 to Jul 2026*                                                                 |
+----------------------------------------------------------------------------------------+
| **[anima-mesh](https://github.com/jackzhaojin/anima-mesh)**\                           |
| Runs recurring back-office work from a private repo; a human stays the approval gate.\ |
| *Jul 2026 to present*                                                                  |
+----------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+

---

#### Markup

```
<article class="card card--post">
  <p class="card__meta"><span class="chip chip--format" data-format="video">Video</span> <time datetime="2026-08-09">2026-08-09</time></p>
  <h3 class="card__title"><a href="...">Title</a></h3>
  <p class="card__excerpt">...</p>
  <p class="card__footer"><span class="chip chip--topic" data-topic="aem">AEM</span></p>
</article>

<div class="grid grid--4 grid--rules">
  <article class="card card--hub card--link" data-topic="aem-ai" data-flagship>
    <p class="card__label">AEM + AI <span class="chip chip--status" data-status="flagship">Flagship</span></p>
    <h3 class="card__title"><a href="...">How do AI agents, skills and MCP servers work on AEM, EDS and DA.live?</a></h3>
    <p class="card__counts">Curated set, newest first</p>
  </article>
  ...
</div>

<article class="card card--project">
  <p class="card__period">Jul 2026 to present</p>
  <h3 class="card__title"><a href="...">Name</a></h3>
  <p class="card__excerpt">...</p>
  <p class="card__facts">license · version · stack</p>
  <a class="text-link card__link" href="...">repo</a>
</article>
```

Do

Link the title. Keep the excerpt to the post's own excerpt. Use `h3` under an `h2` section heading.

Don't

Wrap the whole card in an anchor, or add card art.

#### Accessibility

- The heading link is the single tab stop; chips inside a card are text.
- Cards use `min-width: 0` so long titles wrap inside grid columns.

#### Tokens

`--card-radius`, `--card-pad`, `--color-surface`, `--color-line`, `--color-line-strong`, `--color-text`, `--color-text-muted`, `--color-text-faint`, `--color-topic-*`, `--font-display`, `--font-mono`.

---

### Facts table

stable

Key and value rows under a page head or a project. Row headers are mono uppercase; values are muted body text. A real table so parsers lift it verbatim. Wrap in `.table-wrap` only when values are long.

#### Anatomy

- `table.facts` with a `caption.sr-only` and a `tbody`.
- Each row: `th scope="row"` and one `td`.

#### Stories

+-------------------------+
| Section Metadata        |
+---------+---------------+
| id      | c-facts-table |
+---------+---------------+
| style   | component     |
+---------+---------------+

---

post facts

+---------------------------------------------------------------------------------------------------------+
| Facts                                                                                                   |
+---------------------------------------------------------------------------------------------------------+
| Key facts                                                                                               |
+-----------+---------------------------------------------------------------------------------------------+
| Topic     | [AEM \+ AI](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=aem-ai) |
+-----------+---------------------------------------------------------------------------------------------+
| Format    | Video, \[watch time to confirm]                                                             |
+-----------+---------------------------------------------------------------------------------------------+
| Tools     | Adobe Edge Delivery Services (EDS), Stardust in the public adobe/skills repo, impeccable,   |
|           | DA.live, Google Stitch as the baseline                                                      |
+-----------+---------------------------------------------------------------------------------------------+
| Published | 2026-08-09                                                                                  |
+-----------+---------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+

---

dark, project facts

+------------------------------------------------------------------------------------------+
| Facts                                                                                    |
+------------------------------------------------------------------------------------------+
| Project facts                                                                            |
+---------+--------------------------------------------------------------------------------+
| Repo    | [github.com/jackzhaojin/anima-mesh](https://github.com/jackzhaojin/anima-mesh) |
+---------+--------------------------------------------------------------------------------+
| License | Apache 2.0                                                                     |
+---------+--------------------------------------------------------------------------------+
| Version | v0.16.2                                                                        |
+---------+--------------------------------------------------------------------------------+
| Commits | \[from git, not yet verified]                                                  |
+---------+--------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| theme   | dark   |
+---------+--------+

---

#### Markup

```
<table class="facts">
  <caption class="sr-only">Key facts</caption>
  <tbody>
    <tr><th scope="row">Topic</th><td>...</td></tr>
  </tbody>
</table>
```

Do

Bracket a value you cannot verify. Put links in the value cell.

Don't

Rebuild it as a `dl` or a div grid; the table is the point.

#### Accessibility

- Row headers carry `scope="row"`; the caption names the table for screen readers.
- The header column narrows to 120px under 768px so values keep their width.

#### Tokens

`--font-mono`, `--color-line`, `--color-text-faint`, `--color-text-muted`, `--color-text`, `--color-line-strong`.

---

### Data table

stable

Column tables for comparisons and reference data: a mono header row with a strong rule, hairline body rows, the first column in ink. Always inside `.table-wrap`, which scrolls sideways on narrow screens.

#### Anatomy

- `div.table-wrap` around `table.table`.
- A visible `caption`, a `thead` with `th scope="col"`, a `tbody`.
- `.table--compact` drops the 36rem minimum width for short tables.

#### Stories

+------------------------+
| Section Metadata       |
+---------+--------------+
| id      | c-data-table |
+---------+--------------+
| style   | component    |
+---------+--------------+

---

comparison with bracketed cells

+------------------------------------------------------------------------+
| Data Table (mono head, caption)                                        |
+-------------+------------------------+----------------+----------------+
| Block       | Google Stitch baseline | Stardust run 1 | Stardust run 2 |
+-------------+------------------------+----------------+----------------+
| \[block 1]  | \[result]              | \[result]      | \[result]      |
+-------------+------------------------+----------------+----------------+
| \[block 2]  | \[result]              | \[result]      | \[result]      |
+-------------+------------------------+----------------+----------------+
| Three DA.live blocks across the baseline and two runs                  |
+------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+

---

dark, compact

+------------------------------------------+
| Data Table (mono head, compact, caption) |
+---------------------+--------------------+
| Format              | Count              |
+---------------------+--------------------+
| Articles            | 7                  |
+---------------------+--------------------+
| Short posts         | 13                 |
+---------------------+--------------------+
| Videos              | 19                 |
+---------------------+--------------------+
| Counts by format                         |
+------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| theme   | dark   |
+---------+--------+

---

#### Markup

```
<div class="table-wrap">
  <table class="table">
    <caption>...</caption>
    <thead><tr><th scope="col">...</th></tr></thead>
    <tbody><tr><td>...</td></tr></tbody>
  </table>
</div>
```

Do

Give every table a caption. Let it scroll inside its wrap on phones.

Don't

Shrink the font to fit, or drop columns on mobile.

#### Accessibility

- Column headers carry `scope="col"`. The wrap is keyboard scrollable because it has overflow and the browser gives it focus when needed.

#### Tokens

`--font-mono`, `--color-line-strong`, `--color-line`, `--color-text-faint`, `--color-text-muted`, `--color-text`.

---

### Counts strip

stable

A definition list of numbers with mono labels and Playfair values. For hub pages and collection heads. `.counts--inline` collapses it to a single mono line for cards.

#### Anatomy

- `dl.counts` with one `div` per pair of `dt` and `dd`.

#### Stories

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | c-counts  |
+---------+-----------+
| style   | component |
+---------+-----------+

---

default

- Posts **39**
- Articles **7**
- Short posts **13**
- Videos **19**
- Talks **6**

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| demo    | counts |
+---------+--------+

---

dark, inline

- Projects **12**
- Certifications **22**
- Talks **6**

+-------------------------+
| Section Metadata        |
+---------+---------------+
| style   | story         |
+---------+---------------+
| theme   | dark          |
+---------+---------------+
| demo    | counts-inline |
+---------+---------------+

---

#### Markup

```
<dl class="counts">
  <div><dt>Posts</dt><dd>39</dd></div>
  <div><dt>Videos</dt><dd>19</dd></div>
</dl>
```

Do

Use numbers that come from the data files or from git.

Don't

Round up or carry a number forward without checking.

#### Accessibility

- Each `div` groups one term and one value, which screen readers announce as a pair.

#### Tokens

`--font-mono`, `--font-display`, `--color-text-faint`, `--color-text`, `--space-3`, `--space-6`.

---

### Row list

stable

Hairline rows with a mono date column, a title link and an optional note. For talks, related items and start-here lists. Below 480px the date stacks above the title.

#### Anatomy

- `ol.row-list`; each `li` holds a `time` (or `span.row-list__kind` for a non date such as "Hub"), `span.row-list__title` with a link, and `span.row-list__note`.

#### Stories

+----------------------+
| Section Metadata     |
+---------+------------+
| id      | c-row-list |
+---------+------------+
| style   | component  |
+---------+------------+

---

talks, upcoming first

+---------------------------------------------------------------------------------+
| Row List                                                                        |
+------------+---------------------------------------+----------------------------+
| 2026       | adaptTo() 2026, Berlin: \[talk title  | Upcoming. Date to confirm. |
|            | to confirm]                           |                            |
+------------+---------------------------------------+----------------------------+
| 2026-04-06 | [AI Tinkerers Columbus: OpenClaw 24/7 | Columbus, Ohio. Delivered. |
|            | Development Agent](/certifications/)  |                            |
+------------+---------------------------------------+----------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+

---

dark, related items with a kind column

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                                                                                                   |
+------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------+
| Hub        | [AEM \+ AI](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=aem-ai)                                                                            | AI agents, skills and MCP servers on |
|            |                                                                                                                                                                        | AEM, EDS and DA.live.                |
+------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------+
| 2026-05-24 | [Theming a Brand-New EDS Site with Google Stitch \+ MCP](https://www.linkedin.com/posts/jackjin_edgedeliveryservices-aem-claudecode-ugcPost-7464766955137191936-2kip/) | The Google Stitch baseline.          |
+------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| theme   | dark   |
+---------+--------+

---

#### Markup

```
<ol class="row-list">
  <li><time datetime="2026-04-06">2026-04-06</time><span class="row-list__title"><a href="...">...</a></span><span class="row-list__note">...</span></li>
</ol>
```

Do

Keep source order meaningful: upcoming first for talks, newest first for posts.

Don't

Invent a link for an item that has no page yet; leave the title as text with a bracketed note.

#### Accessibility

- Dates are `time` elements with a machine value where one exists. The list is ordered because order carries meaning.

#### Tokens

`--font-mono`, `--color-accent`, `--color-line`, `--color-text`, `--color-text-muted`, `--color-text-faint`, `--text-small`.

---

### FAQ

stable

Question and answer pairs as `details` elements. The answer is in the DOM open or closed; opening is a native browser behavior that needs no script. The question is a Playfair summary with a chevron that rotates on open.

#### Anatomy

- `section.faq` with an `h2` on a page (an `h3` in this story to keep the docs outline).
- `details.faq__item` with a `summary` and one or more `p`.

#### Stories

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | c-faq     |
+---------+-----------+
| style   | component |
+---------+-----------+

---

closed and open

+------------------------------------------------------------------------------------------------+
| Faq                                                                                            |
+------------------------------------------------------------------------------------------------+
| ### Questions about this video                                                                 |
+------------------------------+-----------------------------------------------------------------+
| Is Adobe Stardust a product? | No. It is a skill in the public adobe/skills repo.              |
+------------------------------+---------------------------------------+-------------------------+
| What does Stardust build on? | On impeccable, the 57K-star UX design | open                    |
|                              | skill library that does the design    |                         |
|                              | work.                                 |                         |
+------------------------------+---------------------------------------+-------------------------+

+--------------------------------+
| Section Metadata               |
+---------+----------------------+
| style   | story                |
+---------+----------------------+
| labels  | section: FAQ example |
+---------+----------------------+

---

dark

+----------------------------------------------------------------------------------------------------+
| Faq                                                                                                |
+----------------------------------------------------------------------------------------------------+
| ### Questions about the blog                                                                       |
+-------------------------------+---------------------------------------+----------------------------+
| How many pieces are there?    | 39: 7 articles, 13 short posts and 19 | open                       |
|                               | videos.                               |                            |
+-------------------------------+---------------------------------------+----------------------------+
| Where do the full posts live? | On LinkedIn today. Each card links to its LinkedIn copy.           |
+-------------------------------+--------------------------------------------------------------------+

+----------------------------------+
| Section Metadata                 |
+---------+------------------------+
| style   | story                  |
+---------+------------------------+
| theme   | dark                   |
+---------+------------------------+
| labels  | section: FAQ example 2 |
+---------+------------------------+

---

#### Markup

```
<section class="faq">
  <h2>Questions about this video</h2>
  <details class="faq__item">
    <summary>Question?</summary>
    <p>Answer.</p>
  </details>
</section>
```

Do

Ask questions the page can answer from its own content. Two to four per page.

Don't

Load answers with JavaScript or hide them with `display: none` outside a `details`.

#### Accessibility

- Native disclosure: keyboard operable, state announced. The chevron is decorative generated content.

#### Tokens

`--font-display`, `--color-line`, `--color-text`, `--color-text-muted`, `--color-accent`, `--duration-base`, `--ease-standard`.

---

### Filter bar

beta

A form panel with three rows: topic chips (links to the hubs, so they work without JavaScript), format and type chips (buttons with `aria-pressed`), and a sort select. `scripts.js` mirrors the state into the query string (`?format=video&type=leadership&sort=oldest`) while the canonical stays clean. Without JavaScript every card shows.

#### Anatomy

- `form.filter-bar` with `data-collection`.
- `.filter-bar__row` with a `.filter-bar__label` or a `label`, then chips or a `select`.
- Topic chips: `a.chip.chip--topic`. Format and type chips: `button.chip` with `data-filter`, `data-value`, `aria-pressed`.

#### Stories

+------------------------+
| Section Metadata       |
+---------+--------------+
| id      | c-filter-bar |
+---------+--------------+
| style   | component    |
+---------+--------------+

---

light (static; the live one is on the blog template)

Topic

[All](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html)

[AEM + AI](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=aem-ai)

[Adobe AEM and EDS](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=adobe-aem)

[AI Agents](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=ai-agents)

[Working with AI](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=working-with-ai)

Format

All

Article

Post

Video

Sort

Newest first

+------------------------------------------------------------------+
| Section Metadata                                                 |
+---------+--------------------------------------------------------+
| style   | story, row                                             |
+---------+--------------------------------------------------------+
| demo    | chips                                                  |
+---------+--------------------------------------------------------+
| items   | row-label, pressed, chip, chip, chip, chip, row-label, |
|         | pressed, chip, chip, chip, row-label, chip-plain       |
+---------+--------------------------------------------------------+

---

dark, video pressed

Topic

[All](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html)

[AEM + AI](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=aem-ai)

[AI Agents](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=ai-agents)

Format

All

Video

Sort

Oldest first

+---------------------------------------------------------------------+
| Section Metadata                                                    |
+---------+-----------------------------------------------------------+
| style   | story, row                                                |
+---------+-----------------------------------------------------------+
| theme   | dark                                                      |
+---------+-----------------------------------------------------------+
| demo    | chips                                                     |
+---------+-----------------------------------------------------------+
| items   | row-label, chip, pressed, chip, row-label, chip, pressed, |
|         | row-label, chip-plain                                     |
+---------+-----------------------------------------------------------+

---

#### Markup

```
<form class="filter-bar" data-collection>
  <div class="filter-bar__row"><span class="filter-bar__label">Topic</span> <a class="chip chip--topic" data-topic="aem-ai" href="...">AEM + AI</a>...</div>
  <div class="filter-bar__row"><span class="filter-bar__label">Format</span> <button type="button" class="chip" data-filter="format" data-value="all" aria-pressed="true">All</button>...</div>
  <div class="filter-bar__row"><label for="sort">Sort</label> <select id="sort" name="sort">...</select></div>
</form>
```

Do

Keep topic chips as links. Reflect state in the URL so a filtered view can be shared.

Don't

Make topic chips buttons, or paginate a collection under 48 items.

#### Accessibility

- Button chips announce pressed state. The select has a visible label. Hidden cards use the `hidden` attribute, so they leave the accessibility tree as well.

#### Tokens

`--card-radius`, `--color-surface`, `--color-line`, `--color-line-strong`, `--radius-pill`, `--font-mono`, `--color-text-faint`.

---

### Pagination

stable

Numbered links in 44px boxes, the current page filled with ink. Appears only when a collection passes 48 items; the blog has 39 today, so the templates do not use it.

#### Anatomy

- `nav.pagination` with `aria-label="Pagination"` and an `ol` of links; the current one carries `aria-current="page"`.

#### Stories

+------------------------+
| Section Metadata       |
+---------+--------------+
| id      | c-pagination |
+---------+--------------+
| style   | component    |
+---------+--------------+

---

page 2 of 3

+----------------------------------------------------------------------------------+
| Pagination                                                                       |
+----------------------------------------------------------------------------------+
| 1. [Previous](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html) |
| 2. [1](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html)        |
| 3. **[2](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html)**    |
| 4. [3](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html)        |
| 5. [Next](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html)     |
+----------------------------------------------------------------------------------+

+------------------------------------+
| Section Metadata                   |
+---------+--------------------------+
| style   | story                    |
+---------+--------------------------+
| labels  | nav: Pagination, example |
+---------+--------------------------+

---

dark, page 1

+-------------------------------------------------------------------------------+
| Pagination                                                                    |
+-------------------------------------------------------------------------------+
| 1. **[1](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html)** |
| 2. [2](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html)     |
| 3. [Next](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html)  |
+-------------------------------------------------------------------------------+

+-----------------------------------------+
| Section Metadata                        |
+---------+-------------------------------+
| style   | story                         |
+---------+-------------------------------+
| theme   | dark                          |
+---------+-------------------------------+
| labels  | nav: Pagination, dark example |
+---------+-------------------------------+

---

#### Markup

```
<nav class="pagination" aria-label="Pagination">
  <ol>
    <li><a href="..." aria-current="page">1</a></li>
    <li><a href="...">2</a></li>
    <li><a href="...">Next</a></li>
  </ol>
</nav>
```

Do

Use real links to real pages so crawlers can follow them.

Don't

Use it for infinite scroll or as a JavaScript-only control.

#### Accessibility

- Labelled nav, 44px targets, current page announced through `aria-current`.

#### Tokens

`--button-radius`, `--font-mono`, `--color-line`, `--color-text-muted`, `--color-inverse-bg`, `--color-inverse-text`.

---

### Embed

beta

A 16 by 9 frame for a video with a plain fallback link always present in the caption. The frame holds an iframe with a title when one exists, or a play mark and a bracketed placeholder when it does not.

#### Anatomy

- `figure.embed`, `div.embed__frame` (raised surface), optional `span.embed__play`, `figcaption.embed__fallback` with links.

#### Stories

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | c-embed   |
+---------+-----------+
| style   | component |
+---------+-----------+

---

placeholder state

\[video embed to be supplied]

\[YouTube link pending]

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| demo    | embed  |
+---------+--------+

---

dark

\[video embed to be supplied]

\[YouTube link pending]

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| theme   | dark   |
+---------+--------+
| demo    | embed  |
+---------+--------+

---

#### Markup

```
<figure class="embed">
  <div class="embed__frame">[video placeholder or iframe with title]</div>
  <figcaption class="embed__fallback"><a href="...">Watch on YouTube</a></figcaption>
</figure>
```

Do

Give the iframe a `title`. Keep the watch link outside the frame.

Don't

Autoplay, or make the frame the only way to reach the video.

#### Accessibility

- The play mark is decorative. The fallback link is real text and always visible.

#### Tokens

`--card-radius`, `--color-surface-raised`, `--color-line`, `--color-bg`, `--color-accent`, `--font-mono`, `--color-text-faint`.

---

### Chapters

stable

Timestamps and titles for a video, as an ordered list with hairline rows. Timestamps are mono in the accent color.

#### Anatomy

- `ol.chapters`; each `li` holds a `time` and a `span` or link.

#### Stories

+----------------------+
| Section Metadata     |
+---------+------------+
| id      | c-chapters |
+---------+------------+
| style   | component  |
+---------+------------+

---

placeholder, single item (used on the post template)

+------------------------------------------------------+
| Chapters                                             |
+------+-----------------------------------------------+
| 0:00 | \[chapters to be supplied from the recording] |
+------+-----------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+

---

dark

+------------------------------------------------------+
| Chapters                                             |
+------+-----------------------------------------------+
| 0:00 | \[chapters to be supplied from the recording] |
+------+-----------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| theme   | dark   |
+---------+--------+

---

#### Markup

```
<ol class="chapters">
  <li><time>0:00</time> <span>What Stardust is</span></li>
</ol>
```

Do

Take timestamps from the recording and match them to the H2s in the body.

Don't

Write chapters before the recording exists.

#### Accessibility

- Ordered list, so the sequence is announced. Timestamps are text.

#### Tokens

`--font-mono`, `--color-accent`, `--color-line`, `--color-text`.

---

### Transcript

stable

A `details` panel that holds the full transcript text in the DOM. Closed by default on the post template; the text is still there for parsers and for find in page.

#### Anatomy

- `details.transcript` with a `summary` and `div.transcript__body` of paragraphs; an optional `span.ts` timestamp before each paragraph.

#### Stories

+------------------------+
| Section Metadata       |
+---------+--------------+
| id      | c-transcript |
+---------+--------------+
| style   | component    |
+---------+--------------+

---

open, placeholder body

+-----------------------------------------------------+
| Transcript (open)                                   |
+-----------------+-----------------------------------+
| Transcript      | auto generated, corrected by hand |
+-----------------+-----------------------------------+
| 0:00 \[transcript to be supplied]                   |
+-----------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+

---

dark, closed

+-----------------------------------------------------+
| Transcript                                          |
+-----------------+-----------------------------------+
| Transcript      | auto generated, corrected by hand |
+-----------------+-----------------------------------+
| 0:00 \[transcript to be supplied]                   |
+-----------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| theme   | dark   |
+---------+--------+

---

#### Markup

```
<details class="transcript">
  <summary>Transcript</summary>
  <div class="transcript__body">
    <p><span class="ts">0:00</span>...</p>
  </div>
</details>
```

Do

Put the whole text in the page. Mark it as auto generated if it is.

Don't

Fetch it on open.

#### Accessibility

- Native disclosure. Paragraphs, not one block, so screen reader users can move by paragraph.

#### Tokens

`--card-radius`, `--color-surface`, `--color-line`, `--font-mono`, `--color-text`, `--color-text-muted`, `--color-text-faint`.

---

### Author box

stable

Closes every post: initials in a round raised surface (a headshot replaces it when supplied), the name in Playfair, the role line and profile links.

#### Anatomy

- `aside.author-box`, `span.avatar` with `aria-hidden`, then `p.author-box__name`, `p.author-box__role`, `p.author-box__links`.

#### Stories

+------------------------+
| Section Metadata       |
+---------+--------------+
| id      | c-author-box |
+---------+--------------+
| style   | component    |
+---------+--------------+

---

light

+-------------------------------------------------------------------------------------------------+
| Author Box                                                                                      |
+------+------------------------------------------------------------------------------------------+
| JJ   | Jack Jin                                                                                 |
|      |                                                                                          |
|      | Associate Director at Accenture, Columbus, Ohio. Adobe Certified Master. AEM Champion    |
|      | 2026\. Builds AI agent systems and writes about AEM, EDS and agentic engineering.        |
|      |                                                                                          |
|      | [LinkedIn](https://www.linkedin.com/in/jackjin) [GitHub](https://github.com/jackzhaojin) |
+------+------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+

---

dark

+-------------------------------------------------------------------------------------------------+
| Author Box                                                                                      |
+------+------------------------------------------------------------------------------------------+
| JJ   | Jack Jin                                                                                 |
|      |                                                                                          |
|      | Associate Director at Accenture, Columbus, Ohio. Adobe Certified Master. AEM Champion    |
|      | 2026\.                                                                                   |
|      |                                                                                          |
|      | [LinkedIn](https://www.linkedin.com/in/jackjin) [GitHub](https://github.com/jackzhaojin) |
+------+------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| theme   | dark   |
+---------+--------+

---

#### Markup

```
<aside class="author-box">
  <span class="avatar" aria-hidden="true">JJ</span>
  <div>
    <p class="author-box__name">Jack Jin</p>
    <p class="author-box__role">...</p>
    <p class="author-box__links"><a href="...">LinkedIn</a> <a href="...">GitHub</a></p>
  </div>
</aside>
```

Do

Use the same name and role line on every page. When a headshot arrives, the `img` alt is the name.

Don't

Add profile links that are not in the site data.

#### Accessibility

- The initials are hidden from assistive technology because the name follows as text.

#### Tokens

`--card-radius`, `--card-pad`, `--color-surface`, `--color-surface-raised`, `--color-line`, `--font-display`, `--font-mono`, `--color-text-muted`.

---

### Callout

stable

A note inside body copy. Lavender tint with a hairline for the default; a raised surface with a red label for `.callout--warn`. No colored left border, in keeping with the rest of the system.

#### Anatomy

- `aside.callout` with `role="note"`, an optional `p.callout__label`, then paragraphs.

#### Stories

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | c-callout |
+---------+-----------+
| style   | component |
+---------+-----------+

---

note and warn

+----------------------------------------------------------------+
| Callout                                                        |
+------+---------------------------------------------------------+
| Note | Hub pages are not built in this round. Topic links open |
|      | the blog filtered by topic.                             |
+------+---------------------------------------------------------+

+------------------------------------------------------------------+
| Callout (warn)                                                   |
+---------+--------------------------------------------------------+
| Caution | Numbers in brackets have not been verified against git |
|         | yet.                                                   |
+---------+--------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+

---

dark

+----------------------------------------------------------------+
| Callout                                                        |
+------+---------------------------------------------------------+
| Note | Hub pages are not built in this round. Topic links open |
|      | the blog filtered by topic.                             |
+------+---------------------------------------------------------+

+------------------------------------------------------------------+
| Callout (warn)                                                   |
+---------+--------------------------------------------------------+
| Caution | Numbers in brackets have not been verified against git |
|         | yet.                                                   |
+---------+--------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| theme   | dark   |
+---------+--------+

---

#### Markup

```
<aside class="callout" role="note">
  <p class="callout__label">Note</p>
  <p>...</p>
</aside>
<aside class="callout callout--warn" role="note">...</aside>
```

Do

Use it for a fact the reader needs before the next section.

Don't

Use it for emphasis or marketing. One per section at most.

#### Accessibility

- `role="note"` gives it a landmark-like role; the label is real text.

#### Tokens

`--card-radius`, `--color-accent-soft`, `--color-surface-raised`, `--color-line`, `--color-accent`, `--color-topic-agents`, `--color-text-muted`.

---

### Showcase

beta

The portfolio's story block: a text column beside a media column, used 25 times on the v2 page. Text comes first in the markup so the page reads in order without styles; the flip modifier shows the media on the left from 768px; the wide modifier stacks a centered text block over a full-width media block. Inside a tint band the italic in the title and the date follow the band's accent.

#### Anatomy

- `article.showcase` with optional `.showcase--flip` or `.showcase--wide`.
- `div.showcase__text` (add `.showcase__text--center` in the wide layout): `h3` (italic `em` allowed), `p.showcase__meta` under the title with a `time`, `p.showcase__lead`, plain paragraphs, then [proof links](#c-proof-links) or [stat chips](#c-stat).
- `div.showcase__media` holding a [frame](#c-frame), a panel or a table.

#### Stories

+----------------------+
| Section Metadata     |
+---------+------------+
| id      | c-showcase |
+---------+------------+
| style   | component  |
+---------+------------+

---

light, media on the right

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Showcase (flip)                                                                                                                                                                                                                                                                       |
+-------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ### Cloud first, *one private brain per instance*           | [![Anima Mesh cloud architecture: a Worker, Durable Objects and a private GitHub repo as the shared state.][image0]](https://www.jackzhaojin.com/design-systems/v3/media_14d1ac0ad972a1c6f26b89203d3287054e1dcc6d6.svg) |
|                                                             |                                                                                                                                                                                                                         |
| *v0.16.0* · Cloudflare Workers \+ Durable Objects \+ GitHub | The normal operating path. The cloud tier runs while the laptop is closed.                                                                                                                                              |
|                                                             |                                                                                                                                                                                                                         |
| Durable Objects hold alarms, locks, queues and budgets. The |                                                                                                                                                                                                                         |
| private GitHub repo holds knowledge and evidence.           |                                                                                                                                                                                                                         |
|                                                             |                                                                                                                                                                                                                         |
| A Worker reads the brain as one tarball, runs the agents    |                                                                                                                                                                                                                         |
| that are due, verifies their artifacts, and lands one       |                                                                                                                                                                                                                         |
| commit before a brief or reply is sent.                     |                                                                                                                                                                                                                         |
+-------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------------------+
| Proof Links                                                                                                    |
+----------------------------------------------------------------------------------------------------------------+
| [anima-mesh on GitHub](https://github.com/jackzhaojin/anima-mesh) [Portfolio write-up](/portfolio/anima-mesh/) |
+----------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+

---

dark, flipped, inside a tint band with a project accent

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| theme   | dark   |
+---------+--------+

---

+----------------------------------------------------------------------------------------------------------------------------+
| Showcase (story)                                                                                                           |
+---------------------------------------------------------------------+------------------------------------------------------+
| ### Two-repo architecture, *the brain never receives worker output* | ![Thumbnail image used by the blog listing.][image1] |
|                                                                     |                                                      |
| *Jan 24, 2026* · built in a single day                              | A frame with a photo, caption in mono.               |
|                                                                     |                                                      |
| A constitution of eight immutable limits, including a spend cap.    |                                                      |
|                                                                     |                                                      |
| Contracts, deterministic verifiers and an append-only ledger. The   |                                                      |
| number of human interventions is counted from the ledgers in the    |                                                      |
| repo.                                                               |                                                      |
+---------------------------------------------------------------------+------------------------------------------------------+

+-----------------------------+
| Stat Chips                  |
+-----------------------------+
| - **571** worker contracts  |
| - **8** human interventions |
+-----------------------------+

+-----------------------------------------------------+
| Section Metadata                                    |
+---------+-------------------------------------------+
| style   | tint, mint, in-story                      |
+---------+-------------------------------------------+
| labels  | section: showcase in a band, dark example |
+---------+-------------------------------------------+
| theme   | dark                                      |
+---------+-------------------------------------------+

---

#### Markup

```
<article class="showcase showcase--flip">
  <div class="showcase__text">
    <h3>Title, <em>subtitle</em></h3>
    <p class="showcase__meta"><time datetime="2026-08">v0.16.0</time> · stack</p>
    <p class="showcase__lead">The one-sentence claim.</p>
    <p>Body.</p>
    <p class="proof-links"><a class="link--repo" href="...">repo</a></p>
  </div>
  <div class="showcase__media"><figure class="frame">...</figure></div>
</article>
```

Do

Keep the text column first in the markup. One lead sentence, then facts; the media proves the text.

Don't

Put the meta line above the title, or fade the block in from opacity zero; a page script may animate it from a visible state.

#### Accessibility

- Reading order equals source order in every layout. The figure's caption is real text; the image alt names what the diagram shows.

#### Tokens

`--band-accent` (falls back to `--color-accent`), `--color-text`, `--color-text-muted`, `--color-text-faint`, `--font-display`, `--font-mono`, `--text-label`, `--space-6`.

---

### Frame

beta

A bordered figure for a screenshot or a diagram with a mono caption, the portfolio's frame (12 on the v2 page). The diagram variant keeps a paper ground in both themes because diagrams are light artwork, and wraps the image in a link to the full-size file. A portrait variant caps the width.

#### Anatomy

- `figure.frame` with optional `.frame--diagram` or `.frame--portrait`; an `img` (inside an `a` for the full-size file), then `figcaption`.

#### Stories

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | c-frame   |
+---------+-----------+
| style   | component |
+---------+-----------+

---

diagram frame, light

+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| Frame (diagram)                                                                                                                                        |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![Anima Mesh cloud architecture diagram.][image0]](https://www.jackzhaojin.com/design-systems/v3/media_14d1ac0ad972a1c6f26b89203d3287054e1dcc6d6.svg) |
|                                                                                                                                                        |
| Cloud tier. Click to open the diagram full size.                                                                                                       |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+

+-------------------------+
| Section Metadata        |
+---------+---------------+
| style   | story, narrow |
+---------+---------------+

---

dark: the diagram ground stays paper; a plain frame takes the surface

+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| Frame (diagram)                                                                                                                                        |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| [![Anima Mesh cloud architecture diagram.][image0]](https://www.jackzhaojin.com/design-systems/v3/media_14d1ac0ad972a1c6f26b89203d3287054e1dcc6d6.svg) |
|                                                                                                                                                        |
| Diagram on paper.                                                                                                                                      |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------------------------------------------+
| Frame (sub)                                          |
+------------------------------------------------------+
| ![Thumbnail image used by the blog listing.][image1] |
|                                                      |
| Photo on the surface.                                |
+------------------------------------------------------+

+-------------------------+
| Section Metadata        |
+---------+---------------+
| style   | story, cols-2 |
+---------+---------------+
| theme   | dark          |
+---------+---------------+

---

#### Markup

```
<figure class="frame frame--diagram">
  <a href="diagram.svg"><img src="diagram.svg" alt="What the diagram shows" loading="lazy"></a>
  <figcaption>Caption.</figcaption>
</figure>
```

Do

Write alt text that names the entities in the diagram. Keep the caption to one line.

Don't

Put a fact only inside the image, or set a light background inline; use `.frame--diagram`.

#### Accessibility

- A real `figure` and `figcaption`; the link around the image needs no extra label when the alt text names the diagram.

#### Tokens

`--card-radius`, `--color-line`, `--color-surface`, `--color-diagram-ground`, `--color-text-faint`, `--font-mono`.

---

### Proof links

beta

A row of mono links that name where the evidence lives, each typed by destination with a small icon: repo (branch), post, video, live (globe). The portfolio used the row 17 times with 48 typed links. Repos read as ink, posts and videos as muted, live sites in the accent, so the eye finds the source first. The hit area grows upward through padding, so a row that wraps never overlaps the one above.

#### Anatomy

- `p.proof-links` holding `a.link--repo`, `a.link--post`, `a.link--video`, `a.link--live`. The link classes also work alone, outside the row.

#### Stories

+-------------------------+
| Section Metadata        |
+---------+---------------+
| id      | c-proof-links |
+---------+---------------+
| style   | component     |
+---------+---------------+

---

light, all four kinds

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Proof Links                                                                                                                                                                                                                                    |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [anima-mesh on GitHub](https://github.com/jackzhaojin/anima-mesh) [Portfolio write-up](/portfolio/anima-mesh/) [Adobe Stardust Explained, video](https://www.jackzhaojin.com/design-systems/v3/templates/post.html) [jackzhaojin.com, live](/) |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+

---

dark, inside a tint band with a project accent

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| theme   | dark   |
+---------+--------+

---

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Proof Links                                                                                                                                                                   |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [Architecture notes](https://github.com/jackzhaojin/anima-mesh) [Scrubbed sample brain](https://github.com/jackzhaojin/anima-mesh/tree/main/docs/sample-brain) [Live site](/) |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+--------------------------------------------------------+
| Section Metadata                                       |
+---------+----------------------------------------------+
| style   | tint, amber, in-story                        |
+---------+----------------------------------------------+
| labels  | section: proof links in a band, dark example |
+---------+----------------------------------------------+
| theme   | dark                                         |
+---------+----------------------------------------------+

---

#### Markup

```
<p class="proof-links">
  <a class="link--repo" href="...">anima-mesh on GitHub</a>
  <a class="link--post" href="...">Write-up</a>
  <a class="link--live" href="...">Live site</a>
</p>
```

Do

Name the destination in the link text. One row per story, repos first.

Don't

Use an arrow glyph in the text (the icon says where it goes), or point a post link at LinkedIn once the post lives here.

#### Accessibility

- Icons are CSS masks with empty content, so screen readers hear only the link text; the text names the destination kind.

#### Tokens

`--icon-repo`, `--icon-post`, `--icon-video`, `--icon-live`, `--band-accent`, `--color-text`, `--color-text-muted`, `--color-line-strong`, `--font-mono`, `--text-mono`.

---

### Stat chips

beta

Small evidence chips: a number in the accent and a label, in a wrapping row. The block variant stacks the number over its label for a counter row. From the portfolio's 18 stats and 11 counters. A page script may count the number up; without it the final value is in the HTML.

#### Anatomy

- `div.stat-chips` holding `span.stat` elements, each with a `b` for the value. Add `.stat--block` for the stacked counter, `.stat--accent` to color a block value.

#### Stories

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | c-stat    |
+---------+-----------+
| style   | component |
+---------+-----------+

---

light, inline chips and a counter row

+------------------------------------+
| Stat Chips                         |
+------------------------------------+
| - **3** gated write paths          |
| - **2** fetch-only cloud harnesses |
| - **1** evidence commit per beat   |
+------------------------------------+

+---------------------------------------+
| Stat Chips                            |
+---------------------------------------+
| - **571** worker contracts            |
| - **41** goals completed autonomously |
| - **3338** verifier runs              |
| - ***8*** human interventions, total  |
+---------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+

---

dark

+---------------------------------+
| Stat Chips                      |
+---------------------------------+
| - **36** tags in 29 days        |
| - **9** agents                  |
| - ***v0.16.2*** current release |
+---------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| theme   | dark   |
+---------+--------+

---

#### Markup

```
<div class="stat-chips">
  <span class="stat"><b>36</b> tags in 29 days</span>
  <span class="stat stat--block stat--accent"><b>8</b> human interventions</span>
</div>
```

Do

Count from a source you can name (a ledger, git, a changelog). Three to five chips per row.

Don't

Use a chip for a claim without a number, or start the number at zero in the HTML for an animation.

#### Accessibility

- Plain text; the value is a `b`, not an image. Tabular numerals on the block variant.

#### Tokens

`--band-accent`, `--color-line`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-text-faint`, `--radius-md`, `--font-mono`.

---

### Chapter head

beta

The opening of a project chapter on the portfolio scroll or of a project page: a decorative outlined numeral, the title with an italic subtitle, the date line under the title, the method line that says how the project was built, the thesis and an optional arc paragraph. The v2 page had eleven. The numeral is hidden from screen readers; the heading carries the name.

#### Anatomy

- `header.chapter-head` (add `.chapter-head--flagship` for the largest title) with `p.chapter-head__num` (`aria-hidden`) and `div.chapter-head__body`.
- Body: `h2` (an `h3` on a page where the chapter sits under another heading) with an `em` subtitle, `p.chapter-head__meta`, `p.method-line` with a `b` label, `p.thesis`, optional `p.arc`, then a [facts table](#c-facts-table) or [proof links](#c-proof-links).

#### Stories

+--------------------------+
| Section Metadata         |
+---------+----------------+
| id      | c-chapter-head |
+---------+----------------+
| style   | component      |
+---------+----------------+

---

light, flagship, inside a tint band

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+

---

+-------------------------------------------------------------------------------------------------------------------------+
| Chapter Head                                                                                                            |
+-------------------------------------------------------------------------------------------------------------------------+
| ### Anima Mesh *The company-of-0 experiment*                                                                            |
|                                                                                                                         |
| *Jul 2026* · present · 2 repos                                                                                          |
|                                                                                                                         |
| **ad hoc** no spec preceded the code. The structure came from releases: 36 tags in 29 days, a changelog per minor line. |
|                                                                                                                         |
| Runs recurring back-office work from a private repo: compliance checks, bookkeeping prep, document memory, governance,  |
| research and inbound triage. A human remains the approval gate for money, filings, publishing, credentials and access.  |
+-------------------------------------------------------------------------------------------------------------------------+

+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Proof Links                                                                                                                                                      |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [anima-mesh on GitHub](https://github.com/jackzhaojin/anima-mesh) [Architecture notes](https://github.com/jackzhaojin/anima-mesh/blob/main/docs/architecture.md) |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+--------------------------------------------+
| Section Metadata                           |
+---------+----------------------------------+
| style   | tint, aem-ai, flagship, in-story |
+---------+----------------------------------+
| labels  | section: chapter head example    |
+---------+----------------------------------+

---

dark, a regular chapter with a project accent

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| theme   | dark   |
+---------+--------+

---

+----------------------------------------------------------------------------------------------+
| Chapter Head                                                                                 |
+----------------------------------------------------------------------------------------------+
| ### Content Factory *Pages from a spec, on a schedule*                                       |
|                                                                                              |
| *May 2026* · *Aug 2026*                                                                      |
|                                                                                              |
| **incremental specs** a dated spec folder per release, then build, tag and repeat.           |
|                                                                                              |
| A placeholder thesis for the story frame; the real chapter text lives on the portfolio page. |
+----------------------------------------------------------------------------------------------+

+----------------------------------------------+
| Section Metadata                             |
+---------+------------------------------------+
| style   | tint, cyan, in-story               |
+---------+------------------------------------+
| labels  | section: chapter head dark example |
+---------+------------------------------------+
| theme   | dark                               |
+---------+------------------------------------+

---

#### Markup

```
<header class="chapter-head chapter-head--flagship">
  <p class="chapter-head__num" aria-hidden="true">01</p>
  <div class="chapter-head__body">
    <h2>Anima Mesh <em>The company-of-0 experiment</em></h2>
    <p class="chapter-head__meta"><time datetime="2026-07">Jul 2026</time> · present · 2 repos</p>
    <p class="method-line"><b>ad hoc</b> no spec preceded the code.</p>
    <p class="thesis">...</p>
  </div>
</header>
```

Do

Keep the numeral decorative and the date under the title. One method label from the fixed set: spec-first, incremental specs, ad hoc, dark factory.

Don't

Put a kicker above the H2, or let the subtitle carry the only statement of what the project is.

#### Accessibility

- The numeral is `aria-hidden` and unselectable; the H2 is the chapter's name in the outline; dates are `time` elements.

#### Tokens

`--band-accent`, `--font-display`, `--font-mono`, `--color-text`, `--color-text-muted`, `--color-text-faint`, `--color-line-strong`, `--radius-sm`, `--space-7`, `--space-9`.

---

### Timeline

beta

A release ladder: a rail on the left, a dot per item, the version in the accent, then the title, its date and one paragraph. Optional era rows group items. From the portfolio's nine rungs; also fits a talk history or a changelog.

#### Anatomy

- `ol.timeline` with `li.timeline__era` group rows and `li.timeline__item` rows holding `span.timeline__version` and `div.timeline__body` (`h4`, `time.timeline__date`, `p`).

#### Stories

+----------------------+
| Section Metadata     |
+---------+------------+
| id      | c-timeline |
+---------+------------+
| style   | component  |
+---------+------------+

---

light

+-------------------------------------------------------------------+
| Timeline (ladder)                                                 |
+-------------------------------------------------------------------+
| Era 1 · Foundation                                                |
+----------+--------------------------------------------------------+
| v1.0     | #### Foundation                                        |
|          |                                                        |
|          | Jan 24, 2026 · built in a single day                   |
|          |                                                        |
|          | The 8-phase executive loop. Two-repo architecture: the |
|          | brain never receives worker output.                    |
+----------+--------------------------------------------------------+
| v1.1     | #### Verifiers                                         |
|          |                                                        |
|          | Jan 27, 2026                                           |
|          |                                                        |
|          | Deterministic verifiers on every contract, and an      |
|          | append-only ledger.                                    |
+----------+--------------------------------------------------------+

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+

---

dark, inside a tint band with a project accent

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| theme   | dark   |
+---------+--------+

---

+---------------------------------------------+
| Timeline (ladder)                           |
+---------+-----------------------------------+
| 2024    | #### Adobe Summit 2024, Las Vegas |
|         |                                   |
|         | 2024-03-28                        |
|         |                                   |
|         | AEM Rockstar, winner.             |
+---------+-----------------------------------+
| 2025    | #### Columbus AI Week 2025        |
|         |                                   |
|         | September 2025                    |
|         |                                   |
|         | AI in Professional Services.      |
+---------+-----------------------------------+

+------------------------------------------+
| Section Metadata                         |
+---------+--------------------------------+
| style   | tint, rose, in-story           |
+---------+--------------------------------+
| labels  | section: timeline dark example |
+---------+--------------------------------+
| theme   | dark                           |
+---------+--------------------------------+

---

#### Markup

```
<ol class="timeline">
  <li class="timeline__era">Era 1 · Foundation</li>
  <li class="timeline__item">
    <span class="timeline__version">v1.0</span>
    <div class="timeline__body"><h4>Foundation</h4><time class="timeline__date" datetime="2026-01-24">Jan 24, 2026</time><p>...</p></div>
  </li>
</ol>
```

Do

Order oldest to newest inside an era, newest era first. Every item carries a real date.

Don't

Use it for fewer than three items; a facts table serves two dates better.

#### Accessibility

- An ordered list, so the count and position are announced; the dot is decorative; the version is text in the accent with the title beside it.

#### Tokens

`--band-accent`, `--color-line`, `--color-line-strong`, `--color-bg`, `--color-text-muted`, `--color-text-faint`, `--font-display`, `--font-mono`, `--text-label`.

---

### Proof list

beta

A description list of dated facts from the shared data, used in the home hero so the first viewport shows evidence instead of a restated title line: the latest post, the project shipping now, the credential count, the next talk. Each row is a mono label, a linked value and a mono note. Hairlines between rows, no box.

#### Anatomy

- `dl.proof` with an `aria-label`; one `div` per row holding `dt`, then `dd` with a link (or text) and `span.proof__note`.

#### Stories

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | c-proof   |
+---------+-----------+
| style   | component |
+---------+-----------+

---

light

- **Latest** [Adobe Stardust Explained: Design Agent Skills on EDS](https://www.jackzhaojin.com/design-systems/v3/templates/post.html)\
  2026-08-09 · Video · AEM + AI
- **Shipping** [Anima Mesh](/portfolio/anima-mesh/)\
  v0.16.2 · 36 tags in 29 days · nine agents
- **Next talk** adaptTo() 2026, Berlin\
  2026, date to confirm

+----------------------------------+
| Section Metadata                 |
+---------+------------------------+
| style   | story                  |
+---------+------------------------+
| labels  | dl: Right now, example |
+---------+------------------------+
| demo    | proof                  |
+---------+------------------------+

---

dark

- **Credentials** [22 certifications](/certifications/)\
  Adobe Certified Master · AEM Champion 2026
- **Shipping** [Anima Mesh](/portfolio/anima-mesh/)\
  v0.16.2 · 36 tags in 29 days

+---------------------------------------+
| Section Metadata                      |
+---------+-----------------------------+
| style   | story                       |
+---------+-----------------------------+
| theme   | dark                        |
+---------+-----------------------------+
| labels  | dl: Right now, dark example |
+---------+-----------------------------+
| demo    | proof                       |
+---------+-----------------------------+

---

#### Markup

```
<dl class="proof" aria-label="Right now">
  <div><dt>Latest</dt><dd><a href="...">Title</a><span class="proof__note"><time datetime="2026-08-09">2026-08-09</time> · Video</span></dd></div>
  ...
</dl>
```

Do

Fill every row from the shared data with a date or a count. Three to five rows.

Don't

Put a placeholder in a row; drop the row instead. Never restate the positioning line here.

#### Accessibility

- A real description list with an `aria-label`; every date is a `time` with `datetime`; links are underlined ink, not accent.

#### Tokens

`--proof-label`, `--color-line`, `--color-line-strong`, `--color-text`, `--color-text-faint`, `--font-mono`, `--text-label`, `--tracking-label`.

---

### Inverse panel

beta

A panel on the inverse ground, used for the featured project: the proof block of the home page. Inside it every semantic token is set again per theme from palette primitives, the same block the inverse band uses, so links, buttons, chips and the facts table read without their own rules. The title is the display face in the accent; the facts table sits beside the summary from 1024px.

#### Anatomy

- `div.panel.panel--inverse.feature` holding a `div.stack` (`p.feature__period`, `h3.feature__title` with a link, `p.summary`, a `p.cluster` of two buttons) and a `table.facts` with a visible caption.

#### Stories

+---------------------------+
| Section Metadata          |
+---------+-----------------+
| id      | c-panel-inverse |
+---------+-----------------+
| style   | component       |
+---------+-----------------+

---

light

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+

---

Jul 2026 to present

### [Anima Mesh](/portfolio/anima-mesh/)

Runs recurring back-office work from a private repo. A human remains the approval gate for money, filings, publishing, credentials and access.

**[Repository](https://github.com/jackzhaojin/anima-mesh)**

*[Portfolio write-up](/portfolio/anima-mesh/)*

+-------------------------------+
| Facts (caption)               |
+-------------------------------+
| Key facts                     |
+----------+--------------------+
| License  | Apache 2.0         |
+----------+--------------------+
| Version  | v0.16.2            |
+----------+--------------------+
| Releases | 36 tags in 29 days |
+----------+--------------------+
| Agents   | nine agents        |
+----------+--------------------+

+--------------------------------------+
| Section Metadata                     |
+---------+----------------------------+
| style   | inverse, feature, in-story |
+---------+----------------------------+
| items   | period, lead, cta, cta     |
+---------+----------------------------+

---

dark: the inverse ground is the light one

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| theme   | dark   |
+---------+--------+

---

Jul 2026 to present

### [Anima Mesh](/portfolio/anima-mesh/)

Runs recurring back-office work from a private repo.

**[Repository](https://github.com/jackzhaojin/anima-mesh)**

AI Agents

+-------------------------------+
| Facts (caption)               |
+-------------------------------+
| Key facts                     |
+----------+--------------------+
| License  | Apache 2.0         |
+----------+--------------------+
| Releases | 36 tags in 29 days |
+----------+--------------------+

+------------------------------------------+
| Section Metadata                         |
+---------+--------------------------------+
| style   | inverse, feature, in-story     |
+---------+--------------------------------+
| items   | period, lead, cta, chip-agents |
+---------+--------------------------------+
| theme   | dark                           |
+---------+--------------------------------+

---

#### Markup

```
<div class="panel panel--inverse feature">
  <div class="stack">
    <p class="feature__period">Jul 2026 to present</p>
    <h3 class="feature__title"><a href="...">Anima Mesh</a></h3>
    <p class="summary">...</p>
    <p class="cluster"><a class="btn btn--primary" href="...">Repository</a> ...</p>
  </div>
  <table class="facts"><caption>Key facts</caption>...</table>
</div>
```

Do

One per page, for the strongest dated evidence. Let the facts table do the talking.

Don't

Put it inside an inverse band, or use it for a pitch.

#### Accessibility

- Every pair inside was re-measured in both themes; the focus ring uses the inverse focus token; the caption is visible text.

#### Tokens

`--panel-pad`, `--card-radius`, `--color-inverse-bg`, `--color-inverse-text`, and inside: the full semantic set from primitives per theme.

---

### Section band

beta

A full-bleed ground for one section, the portfolio's chapter treatment. The band spans the viewport, the content stays in a `.container`, and every band opens with a hairline. Tint bands paint a wash of an accent behind themselves: a radial glow at the top and a faint gradient down the band, the same layers as `.chapter::before` on the portfolio page. Bands are how sections separate on this site; there are no other full-bleed elements between the header and the footer.

#### Anatomy

- `section.band` (or `div.band` around a page head) with one variant: `.band--plain`, `.band--alt`, `.band--tint`, `.band--inverse` or `.band--milestone`. `.band--dots` combines with any of them.
- `div.container` holding the section content.
- For tint: an inline `style="--band-accent: var(--color-topic-aem-ai)"` when the section belongs to a topic. Without it the wash uses the page accent.
- For milestone: `p.band__numeral` (outlined display numeral; add `.band__numeral--solid` for ink) and `p.band__caption`.

#### Stories

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | c-band    |
+---------+-----------+
| style   | component |
+---------+-----------+

---

plain, alt, tint with the AEM + AI accent

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+

---

Plain

The page ground. The default when no variant is given.

+----------------------------------+
| Section Metadata                 |
+---------+------------------------+
| style   | plain, in-story        |
+---------+------------------------+
| items   | kicker, note           |
+---------+------------------------+
| labels  | section: plain example |
+---------+------------------------+

---

Alt

The alternate ground, solid. Two alt bands never touch.

+--------------------------------+
| Section Metadata               |
+---------+----------------------+
| style   | alt, in-story        |
+---------+----------------------+
| items   | kicker, note         |
+---------+----------------------+
| labels  | section: alt example |
+---------+----------------------+

---

Tint, AEM + AI

A wash of the section's topic color: 9% at the glow, 5% and 4% at the edges in light.

+----------------------------------+
| Section Metadata                 |
+---------+------------------------+
| style   | tint, aem-ai, in-story |
+---------+------------------------+
| items   | kicker-accent, note    |
+---------+------------------------+
| labels  | section: tint example  |
+---------+------------------------+

---

tint with dots, and inverse with the CTA band inside

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+

---

Tint and dots

The motif layer: six tiny accent dots tiled at half opacity. Decorative only.

+---------------------------------+
| Section Metadata                |
+---------+-----------------------+
| style   | tint, dots, in-story  |
+---------+-----------------------+
| items   | kicker-accent, note   |
+---------+-----------------------+
| labels  | section: dots example |
+---------+-----------------------+

---

+----------------------------------------------------------------------------------------------------------------+
| Cta Band                                                                                                       |
+----------------------------------------------------------------------------------------------------------------+
| **Follow the work**                                                                                            |
|                                                                                                                |
| Every token is set again inside the inverse band, per theme, from primitives, so links, buttons and chips read |
| without their own dark rules.                                                                                  |
|                                                                                                                |
| **[Start with AEM \+ AI](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=aem-ai)**     |
|                                                                                                                |
| AEM \+ AI                                                                                                      |
|                                                                                                                |
| [All 22 certifications](/certifications/)                                                                      |
+----------------------------------------------------------------------------------------------------------------+

+------------------------------------+
| Section Metadata                   |
+---------+--------------------------+
| style   | inverse, in-story        |
+---------+--------------------------+
| labels  | section: inverse example |
+---------+--------------------------+

---

milestone

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+

---

+-------------------------------------------------+
| Divider (year)                                  |
+--------+----------------------------------------+
| 2026   | Posts, videos and talks from this year |
+--------+----------------------------------------+

+--------------------------------------+
| Section Metadata                     |
+---------+----------------------------+
| style   | milestone, in-story        |
+---------+----------------------------+
| labels  | section: milestone example |
+---------+----------------------------+

---

dark: tint, alt, inverse

+------------------+
| Section Metadata |
+---------+--------+
| style   | story  |
+---------+--------+
| theme   | dark   |
+---------+--------+

---

Tint, Working with AI

Dark uses the portfolio's own values: 7% at the glow, 4% and 3% at the edges.

+--------------------------------------+
| Section Metadata                     |
+---------+----------------------------+
| style   | tint, work, in-story       |
+---------+----------------------------+
| items   | kicker-accent, note        |
+---------+----------------------------+
| labels  | section: dark tint example |
+---------+----------------------------+
| theme   | dark                       |
+---------+----------------------------+

---

Alt

The dark alternate ground.

+-------------------------------------+
| Section Metadata                    |
+---------+---------------------------+
| style   | alt, in-story             |
+---------+---------------------------+
| items   | kicker, note              |
+---------+---------------------------+
| labels  | section: dark alt example |
+---------+---------------------------+
| theme   | dark                      |
+---------+---------------------------+

---

+------------------------------------------------------------------------------------------------------------+
| Cta Band                                                                                                   |
+------------------------------------------------------------------------------------------------------------+
| **Follow the work**                                                                                        |
|                                                                                                            |
| In dark, inverse is the light ground.                                                                      |
|                                                                                                            |
| **[Start with AEM \+ AI](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=aem-ai)** |
|                                                                                                            |
| *[Certifications](/certifications/)*                                                                       |
+------------------------------------------------------------------------------------------------------------+

+-----------------------------------------+
| Section Metadata                        |
+---------+-------------------------------+
| style   | inverse, in-story             |
+---------+-------------------------------+
| labels  | section: dark inverse example |
+---------+-------------------------------+
| theme   | dark                          |
+---------+-------------------------------+

---

#### Markup

```
<section class="band band--tint" style="--band-accent: var(--color-topic-aem-ai)" aria-labelledby="h-topics">
  <div class="container">
    <h2 id="h-topics">What does Jack write about?</h2>
    ...
  </div>
</section>

<section class="band band--inverse" aria-labelledby="h-contact">
  <div class="container"><div class="cta-band">...</div></div>
</section>

<section class="band band--milestone" aria-label="2026">
  <div class="container"><p class="band__numeral">2026</p><p class="band__caption">...</p></div>
</section>
```

Do

Give every section its own band and let the tint follow the section's topic. Put the container inside the band, never the band inside a container.

Don't

Stack two alt bands, use more than one inverse band per page, or raise the tint until the ground competes with the cards on it.

#### Accessibility

- The wash and the dots sit on pseudo-elements at `z-index: -1` inside an isolated stacking context, so they never sit over text and never take pointer events.
- Text color never changes on plain, alt or tint bands, so every pair in the contrast table still holds. Inside inverse, every semantic token is re-pointed and the pairs were re-measured in both themes.
- A `section.band` needs `aria-labelledby` or `aria-label`; use `div.band` around a page head so the H1 is not wrapped in a second landmark.

#### Tokens

`--band-pad`, `--band-tint-strong`, `--band-tint-soft`, `--band-tint-edge` (per theme), `--band-accent` (set inline, defaults to `--color-accent`), `--color-bg`, `--color-bg-alt`, `--color-line`, `--color-inverse-bg`, `--color-inverse-text`, `--font-display`.

---

### Divider

beta

The portfolio's `tdiv`: a mono label between two hairlines that fade toward the edges. It opens a band whose heading is visually quiet (the credentials strip) or separates two groups inside one band. Without a label it is a single fading hairline.

#### Anatomy

- `div.divider` with `role="separator"` and an `aria-label`, holding an optional `span.divider__label`.

#### Stories

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | c-divider |
+---------+-----------+
| style   | component |
+---------+-----------+

---

with a label, and without

+----------------+
| Divider (rule) |
+----------------+
| Credentials    |
+----------------+

+----------------+
| Divider (rule) |
+----------------+
|                |
+----------------+

+--------------------------------------------------------------+
| Section Metadata                                             |
+---------+----------------------------------------------------+
| style   | story                                              |
+---------+----------------------------------------------------+
| labels  | separator: Credentials \| separator: Section break |
+---------+----------------------------------------------------+

---

dark

+----------------+
| Divider (rule) |
+----------------+
| 05 / Talks     |
+----------------+

+----------------------------+
| Section Metadata           |
+---------+------------------+
| style   | story            |
+---------+------------------+
| theme   | dark             |
+---------+------------------+
| labels  | separator: Talks |
+---------+------------------+

---

#### Markup

```
<div class="divider" role="separator" aria-label="Credentials">
  <span class="divider__label">Credentials</span>
</div>
```

Do

Use it where a section has no visible H2, or between two groups that share one band.

Don't

Use it under every heading. The band's own hairline already separates sections.

#### Accessibility

- `role="separator"` with an `aria-label`; the label text is real text, not a pseudo-element.

#### Tokens

`--color-line-strong`, `--color-text-faint`, `--font-mono`, `--text-label`, `--tracking-label`, `--space-3`, `--space-4`, `--space-5`.

---

### CTA band

stable

A panel with a factual heading, one sentence and two buttons, plus an optional contact line. Used once per page at most, at the end of home, inside the inverse band. The heading names what happens next, never a slogan. The page ends on "Follow the work": the two buttons lead into the site, and the contact line carries the booking route as text, so a missing email address stays a visible placeholder rather than a disabled control, and nothing routes the reader off the site.

#### Anatomy

- `section.cta-band` (a `div` inside the inverse band) with an `h2` on a page (an `h3` here), a `p`, a `p.cluster` of buttons, then `p.cta-band__contact` and `p.cta-band__profiles` holding text links to the profiles.

#### Stories

+----------------------+
| Section Metadata     |
+---------+------------+
| id      | c-cta-band |
+---------+------------+
| style   | component  |
+---------+------------+

---

light

+------------------------------------------------------------------------------------------------------------+
| Cta Band                                                                                                   |
+------------------------------------------------------------------------------------------------------------+
| ### Follow the work                                                                                        |
|                                                                                                            |
| Posts and videos publish here first. LinkedIn and YouTube carry the syndicated copies.                     |
|                                                                                                            |
| **[Start with AEM \+ AI](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=aem-ai)** |
|                                                                                                            |
| *[All 39 posts and videos](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html)*             |
|                                                                                                            |
| **Book a talk.** Send the event, date and audience to \[email address to be supplied].                     |
|                                                                                                            |
| [LinkedIn profile](https://www.linkedin.com/in/jackjin) [GitHub profile](https://github.com/jackzhaojin)   |
+------------------------------------------------------------------------------------------------------------+

+-------------------------------------+
| Section Metadata                    |
+---------+---------------------------+
| style   | story                     |
+---------+---------------------------+
| labels  | section: CTA band example |
+---------+---------------------------+

---

dark

+------------------------------------------------------------------------------------------------------------+
| Cta Band                                                                                                   |
+------------------------------------------------------------------------------------------------------------+
| ### Follow the work                                                                                        |
|                                                                                                            |
| Posts and videos publish here first. LinkedIn and YouTube carry the syndicated copies.                     |
|                                                                                                            |
| **[Start with AEM \+ AI](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=aem-ai)** |
|                                                                                                            |
| *[All 39 posts and videos](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html)*             |
|                                                                                                            |
| **Book a talk.** Send the event, date and audience to \[email address to be supplied].                     |
+------------------------------------------------------------------------------------------------------------+

+---------------------------------------+
| Section Metadata                      |
+---------+-----------------------------+
| style   | story                       |
+---------+-----------------------------+
| theme   | dark                        |
+---------+-----------------------------+
| labels  | section: CTA band example 2 |
+---------+-----------------------------+

---

#### Markup

```
<section class="cta-band">
  <h2>Follow the work</h2>
  <p>...</p>
  <p class="cluster"><a class="btn btn--primary" href="...">Start with AEM + AI</a> <a class="btn btn--secondary" href="...">All 39 posts and videos</a></p>
  <p class="cta-band__contact"><strong>Book a talk.</strong> Send the event, date and audience to <a href="mailto:...">...</a>.</p>
  <p class="cta-band__profiles"><a class="text-link" href="...">LinkedIn profile</a> ...</p>
</section>
```

Do

State what happens next. Keep to two actions.

Don't

Write a slogan heading or add a form that needs JavaScript.

#### Accessibility

- Buttons stack full width under 480px so targets stay 44px tall.

#### Tokens

`--card-radius`, `--color-surface`, `--color-line`, `--font-display`, `--color-text-muted`.

---

### Footer

stable

Four columns of links under mono headings: Topics, Sections, Elsewhere, Machine files. A hairline meta row with the copyright and location. Two columns under 768px.

#### Anatomy

- `footer.site-footer`, `div.container.site-footer__grid` with four `.site-footer__col`, each an `h2.site-footer__heading` (an `h3` in this story) and a list.
- `div.container.site-footer__meta` with the copyright line.

#### Stories

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | c-footer  |
+---------+-----------+
| style   | component |
+---------+-----------+

---

dark (the light one closes this page)

### Topics

- [AEM + AI](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=aem-ai)
- [Adobe AEM and EDS](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html?topic=adobe-aem)

### Sections

- [Blog](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html)
- [Portfolio](/portfolio/)

### Elsewhere

- [LinkedIn](https://www.linkedin.com/in/jackjin)
- [GitHub](https://github.com/jackzhaojin)

### Machine files

- [sitemap.xml](https://www.jackzhaojin.com/sitemap.xml)
- [robots.txt](https://www.jackzhaojin.com/robots.txt)

© 2026 Jack Jin · Columbus, Ohio

Static HTML. No frameworks, no build step.

+-----------------------+
| Section Metadata      |
+---------+-------------+
| style   | story       |
+---------+-------------+
| theme   | dark        |
+---------+-------------+
| demo    | site-footer |
+---------+-------------+

---

#### Markup

```
<footer class="site-footer">
  <div class="container site-footer__grid">
    <div class="site-footer__col"><h2 class="site-footer__heading">Topics</h2><ul>...</ul></div>
    ... Sections, Elsewhere, Machine files
  </div>
  <div class="container site-footer__meta"><p>© 2026 Jack Jin · Columbus, Ohio</p></div>
</footer>
```

Do

Link only profiles and files that exist. Bracket the rest.

Don't

Add a newsletter box or social icons without names.

#### Accessibility

- Headings are h2 on a page so the footer sections appear in the outline. Links are 13.5px at 8.40:1.

#### Tokens

`--color-line`, `--font-mono`, `--text-label`, `--tracking-label`, `--color-text-faint`, `--color-text-muted`, `--space-9`.

---

### Icons

stable

The sprite and the `.icon` class, documented in full under [Iconography](#iconography). This entry exists so the component index is complete.

#### Anatomy

- One `<svg hidden>` with ten `symbol` elements after the opening `body` tag.
- `svg.icon` with `use` wherever an icon is drawn.

#### Stories

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | c-icons   |
+---------+-----------+
| style   | component |
+---------+-----------+

---

inline with text, in a button, in a chip size

:external: external link

*[:repo:anima-mesh](https://github.com/jackzhaojin/anima-mesh)*

:check:verified

+------------------------------------+
| Section Metadata                   |
+---------+--------------------------+
| style   | story, row               |
+---------+--------------------------+
| items   | mono, button, chip-plain |
+---------+--------------------------+

---

dark

:arrow: arrow

:play: play, large

+-------------------------+
| Section Metadata        |
+---------+---------------+
| style   | story, row    |
+---------+---------------+
| theme   | dark          |
+---------+---------------+
| items   | mono, mono-lg |
+---------+---------------+

---

#### Markup

```
<svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-video"></use></svg>
```

Do

Pair an icon with text. Let it inherit color.

Don't

Load an icon font or an external sprite.

#### Accessibility

- Every decorative icon is `aria-hidden="true"` and `focusable="false"`.

#### Tokens

None beyond `currentColor`.

---

## Patterns

The page rules come from the SEO and GEO blueprint at [ai-docs/2026-09-13-seo-geo-redesign/seo-page-blueprint.md](https://www.jackzhaojin.com/ai-docs/2026-09-13-seo-geo-redesign/seo-page-blueprint.md). Tags there say who a rule serves: humans, search engines or AI engines.

### Page anatomy

1. Skip link, header.
2. Breadcrumb directly above the H1 on every page except home.
3. H1, then the byline with published and updated dates as `time` elements.
4. Summary of 40 to 60 words as the first paragraph. No image between the H1 and it.
5. Facts table.
6. Body: H2 sub-questions, steps in `ol`, comparisons in `table`. Video pages add the embed with a plain link, chapters and the transcript in the DOM.
7. FAQ, related items, author box, CTA where it fits, footer.

### Section rhythm

Every section between the page head and the footer is a [section band](#c-band), the portfolio's chapter treatment carried across the site. The ground changes at every section, so the bands do the separating and the sections need no extra rules or spacing.

+-----------------------------------------------------------------------------------------------+
| Data Table (mono head, span first, row heads, sr caption)                                     |
+---------------------------------------+-----------------------------------+-------------------+
| Template                              | Section                           | Band              |
+---------------------------------------+-----------------------------------+-------------------+
| Home                                  | Hero: introduction and proof list | plain             |
+---------------------------------------+-----------------------------------+-------------------+
| Which question brought you here? (hub | tint, AEM \+ AI accent                                |
| cards)                                |                                                       |
+---------------------------------------+-------------------------------------------------------+
| What was published most recently?     | alt                                                   |
+---------------------------------------+-------------------------------------------------------+
| What is being built right now?        | tint with dots, page accent                           |
| (inverse panel)                       |                                                       |
+---------------------------------------+-------------------------------------------------------+
| Which credentials does Jack hold?     | plain                                                 |
+---------------------------------------+-------------------------------------------------------+
| Where has Jack spoken, and where      | tint, Working with AI accent                          |
| next?                                 |                                                       |
+---------------------------------------+-------------------------------------------------------+
| Follow the work, with the booking     | inverse                                               |
| line                                  |                                                       |
+---------------------------------------+-----------------------------------+-------------------+
| Post                                  | Everything through the FAQ        | plain             |
+---------------------------------------+-----------------------------------+-------------------+
| Related, author box                   | alt                                                   |
+---------------------------------------+-----------------------------------+-------------------+
| Blog                                  | Start here and counts             | tint, page accent |
+---------------------------------------+-----------------------------------+-------------------+
| Filter bar and grid                   | plain                                                 |
+---------------------------------------+-------------------------------------------------------+
| FAQ                                   | alt                                                   |
+---------------------------------------+-------------------------------------------------------+
| Which band each section uses                                                                  |
+-----------------------------------------------------------------------------------------------+

- Two alt bands never touch. A tint accent follows the section's topic, otherwise the page accent. One inverse band per page at most.
- The wash never changes text color, so every contrast pair holds on every band. Inside inverse the tokens are re-pointed and re-measured.
- Bands are the only full-bleed elements between the header and the footer. Cards, tables and panels stay inside the container.

### Heading rules

- One H1 per page. The H1 is the name of the thing, short. Keywords go in the summary.
- H2 then H3 in order, never skipping. Phrase H2s the way people ask when the section answers a question.
- Card titles are H3 under an H2 section heading. Footer headings are H2.

### Content in HTML

- Every slot ships in the initial HTML. JavaScript may enhance, never supply.
- Facts in tables, steps in ordered lists, lists in lists. No styled div grids standing in for data.
- Disclosures use `details`. The default view shows the summary, the facts table and the first section.
- No opacity-zero reveals, no fixed artboards.

### Images and alt text

- Alt text is one sentence naming what a diagram shows and the entities in it.
- Decorative images get `alt=""`; decorative SVG gets `aria-hidden="true"`.
- No fact lives only inside an image.

### Theme default

- Every page in this round sets `data-theme-default="light"`. The value `system` is reserved for the portfolio page later.
- Dark is a first class token set, not a filter. Test every component in both.

### Voice

- An engineer's plain voice. Facts over adjectives. Copy points at the work.
- Link labels name the destination: "anima-mesh on GitHub", "All 39 posts and videos".
- The site is the destination. No "Discuss on LinkedIn", "Watch on LinkedIn" or "Message on LinkedIn"; LinkedIn appears only as a profile link in the footer, the author box and the closing band.
- A placeholder is bracketed text in `span.placeholder`. It never renders as a button or a link, and never sits in a page's loudest slot.
- No em dashes or other unicode dashes anywhere. Use "-", "/", "," or rephrase.

+--------------------+
| Section Metadata   |
+---------+----------+
| id      | patterns |
+---------+----------+
| style   | docs     |
+---------+----------+

---

## Templates

Three pages built from the components with content from `shared/data`. Hub links point to the blog filtered by topic because hub pages are not built in this round.

+-----------------------------------------------------------------------------------------------------------------------------------------+
| Row List                                                                                                                                |
+------+------------------------------------------------------------------------------------------+---------------------------------------+
| Home | [templates/home.html](https://www.jackzhaojin.com/design-systems/v3/templates/home.html) | Hero with the proof list, four        |
|      |                                                                                          | question-led hub cards on a ruled     |
|      |                                                                                          | grid, latest three posts, the         |
|      |                                                                                          | featured project in an inverse panel, |
|      |                                                                                          | credentials strip, talks with status  |
|      |                                                                                          | chips, the Follow the work band.      |
+------+------------------------------------------------------------------------------------------+---------------------------------------+
| Post | [templates/post.html](https://www.jackzhaojin.com/design-systems/v3/templates/post.html) | The Stardust video post in its video  |
|      |                                                                                          | state: facts, embed, chapters, body,  |
|      |                                                                                          | transcript, FAQ, related, author box. |
+------+------------------------------------------------------------------------------------------+---------------------------------------+
| Blog | [templates/blog.html](https://www.jackzhaojin.com/design-systems/v3/templates/blog.html) | All 39 posts newest first with the    |
|      |                                                                                          | filter bar and query-string state,    |
|      |                                                                                          | counts by facet, FAQ.                 |
+------+------------------------------------------------------------------------------------------+---------------------------------------+

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | templates |
+---------+-----------+
| style   | docs      |
+---------+-----------+

---

## Status

+--------------------------------------------------------------+
| Data Table (mono head, compact, caption)                     |
+---------------+-------------------------+---------+----------+
| Component     | Class                   | Status  | Since    |
+---------------+-------------------------+---------+----------+
| Skip link     | .skip-link              | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Site header   | .site-header            | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Theme control | .theme-control          | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Breadcrumb    | .breadcrumb             | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Page head     | .page-head              | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Kicker        | .kicker                 | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Button        | .btn                    | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Chip          | .chip                   | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Card          | .card                   | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Facts table   | .facts                  | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Data table    | .table                  | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Counts strip  | .counts                 | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Row list      | .row-list               | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| FAQ           | .faq                    | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Filter bar    | .filter-bar             | beta    | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Pagination    | .pagination             | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Embed         | .embed                  | beta    | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Chapters      | .chapters               | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Transcript    | .transcript             | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Author box    | .author-box             | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Callout       | .callout                | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| CTA band      | .cta-band               | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Footer        | .site-footer            | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Icons         | .icon                   | stable  | 0.1.0    |
+---------------+-------------------------+---------+----------+
| Section band  | .band                   | beta    | 0.2.0    |
+---------------+-------------------------+---------+----------+
| Divider       | .divider                | beta    | 0.2.0    |
+---------------+-------------------------+---------+----------+
| Proof list    | .proof                  | beta    | v3 0.1.0 |
+---------------+-------------------------+---------+----------+
| Linked card   | .card--link             | beta    | v3 0.1.0 |
+---------------+-------------------------+---------+----------+
| Ruled grid    | .grid--rules            | beta    | v3 0.1.0 |
+---------------+-------------------------+---------+----------+
| Inverse panel | .panel--inverse         | beta    | v3 0.1.0 |
+---------------+-------------------------+---------+----------+
| Showcase      | .showcase               | beta    | v3 0.2.0 |
+---------------+-------------------------+---------+----------+
| Frame         | .frame                  | beta    | v3 0.2.0 |
+---------------+-------------------------+---------+----------+
| Proof links   | .proof-links, .link--\* | beta    | v3 0.2.0 |
+---------------+-------------------------+---------+----------+
| Stat chips    | .stat-chips, .stat      | beta    | v3 0.2.0 |
+---------------+-------------------------+---------+----------+
| Chapter head  | .chapter-head,          | beta    | v3 0.2.0 |
|               | .method-line, .thesis   |         |          |
+---------------+-------------------------+---------+----------+
| Timeline      | .timeline               | beta    | v3 0.2.0 |
+---------------+-------------------------+---------+----------+
| Tool card     | .card--tool             | beta    | v3 0.2.0 |
+---------------+-------------------------+---------+----------+
| Component status, v3 0.1.0                                   |
+--------------------------------------------------------------+

Beta means the markup is settled but the behavior has only one consumer so far: the filter bar's script and the embed's iframe state have not run against a real video.

+------------------+
| Section Metadata |
+---------+--------+
| id      | status |
+---------+--------+
| style   | docs   |
+---------+--------+

---

## Changelog

### v3 0.2.0, 2026-09-14

- Seven components extracted from the v2 portfolio page so the portfolio scroll, project pages and posts can share them: showcase, frame, proof links with typed link icons, stat chips, chapter head with method line and thesis, timeline, tool card. All CSS; page scripts may animate or switch them.
- Six project accents added as primitives with light and dark pairs (cyan, amber, leaf, bronze, mint, rose) and as semantic `--color-project-*` tokens for chapter bands; the other four portfolio accents already map to the topic colors. `--color-diagram-ground` keeps light diagram artwork on paper in both themes.
- Two icon tokens added: `--icon-repo` and `--icon-live`.

### v3 0.1.0, 2026-09-14

- Copied from the Claude Fable 5.1 candidate after the four-way critique; the round folders stay as built.
- Header on one row at every width, sticky, with the theme control and the primary button inside the menu below 1024px; 44px targets on the wordmark, toggle, menu links, text links and footer links.
- Home hero: proof list on the right (latest post, project shipping now, credentials, next talk), "Start with AEM + AI" as the primary action, booking secondary, the summary no longer restates the title line.
- Section headings phrased as the reader's questions (from Astra); hub cards carry the question as their title, sit on a ruled grid (from Kimi K3), are whole-card tap targets, and the flagship carries a border and status chip (from Google Stitch). Section numbers dropped.
- Featured project moved into an inverse panel with a visible "Key facts" caption; the illegible diagram removed.
- Inverse band and panel set every semantic token per theme from primitives; no alias round trip.
- Talks: event as the row title, bracketed titles as notes, status chips; rows are not links until a talks page exists.
- The page ends on "Follow the work" with the booking line as text; footer margin removed after a band; no "Discuss on LinkedIn", "Watch on LinkedIn" or "Message on LinkedIn" anywhere.
- Hub counts drop the facet vocabulary; generated marks use the alt-text syntax; footer meta raised to 12px; post excerpts clamp to four lines.

### 0.1.1, 2026-09-13

- Fidelity review against the Claude Design canvas: colors, faces, H1, body, card, kicker, button and chip values measure identical; the summary paragraph now follows the canvas on phones (17px) through a clamp on the body-lg token.
- Deviations list in the README completed with the composition changes the review found.

### 0.1.0, 2026-09-13

- First release for the four-system comparison round.
- Tokens lifted from portfolio/styles.css and the Claude Design canvas; light theme made the default; dark kept as the portfolio's set.
- line-strong raised from 0.24 to 0.48 alpha (light) and 0.20 to 0.36 (dark) to pass the 3:1 UI border requirement.
- Fixed 1440px artboard replaced by a fluid centered container; hub and blog H1s shortened; three-state theme control added; wordmark glyph removed.
- All 23 components documented with light and dark stories; three templates built from shared data.

+---------------------+
| Section Metadata    |
+---------+-----------+
| id      | changelog |
+---------+-----------+
| style   | docs      |
+---------+-----------+

+-------------------------------------------------------------------------+
| Metadata                                                                |
+-------------+-----------------------------------------------------------+
| title       | Design system v3 \| Jack Jin                              |
+-------------+-----------------------------------------------------------+
| description | Design system v3 for www\.jackzhaojin.com, built from the |
|             | Claude Fable 5.1 candidate: tokens, components, patterns  |
|             | and templates in light and dark.                          |
+-------------+-----------------------------------------------------------+
| template    | design-docs                                               |
+-------------+-----------------------------------------------------------+
| nav         | /design-systems/v3/nav                                    |
+-------------+-----------------------------------------------------------+
| footer      | /design-systems/v3/footer                                 |
+-------------+-----------------------------------------------------------+
| robots      | noindex                                                   |
+-------------+-----------------------------------------------------------+

[image0]: https://main--www-eds--jackzhaojin.aem.page/media_14d1ac0ad972a1c6f26b89203d3287054e1dcc6d6.svg#width=1280&height=1000

[image1]: https://main--www-eds--jackzhaojin.aem.page/media_1dc240dbfeeee23cbdfcc64aa957d8102026aa6a1.jpg#width=2233&height=1039
