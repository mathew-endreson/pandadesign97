# Panda Design (Blux) — Project Rules

## Current state (read this first)

This is a **fresh Vite + React + Tailwind scaffold** — there is no existing design
system to reverse-engineer yet. `src/App.jsx` is a placeholder. Nothing below
about tokens/components/icons is "found in the codebase" — it's the convention
this project should follow as Figma screens get implemented. Update this file's
"Established" sections as real patterns land, and delete the "not yet decided"
notes once they're resolved.

## Stack

| Concern      | Choice                         | File |
|---           |---                              |---|
| Framework    | React 18 (JS, not TS, despite `@types/react` being installed) | [package.json](package.json) |
| Build tool   | Vite 5, `@vitejs/plugin-react`  | [vite.config.js](vite.config.js) |
| Styling      | Tailwind CSS 3 (utility classes, no CSS Modules / styled-components) | [tailwind.config.js](tailwind.config.js), [postcss.config.js](postcss.config.js) |
| Entry        | `index.html` → `src/main.jsx` → `src/App.jsx` | [index.html](index.html), [src/main.jsx](src/main.jsx) |
| Lint         | ESLint via `npm run lint` (config targets `.ts`/`.tsx` — **currently a no-op** since source is `.jsx`; fix this before relying on lint) | [package.json](package.json) |

There is no router, state library, or component library installed yet. Don't
add one speculatively — pull in only what a given Figma screen actually needs
(e.g. `react-router-dom` once there's more than one screen).

## Design tokens

**Not yet established.** `tailwind.config.js` currently has an empty
`theme.extend` — no custom colors, spacing, radii, or type scale.

Rule: when Figma MCP returns variable/style data (fills, text styles, effect
styles, spacing), **do not hardcode hex values or px in components.** Instead:

1. Add them to `theme.extend` in [tailwind.config.js](tailwind.config.js) under
   the matching Tailwind key (`colors`, `fontFamily`, `fontSize`, `spacing`,
   `borderRadius`, `boxShadow`).
2. Name tokens after their Figma variable/style name (kebab or camel, matching
   Figma), not after where they're first used — e.g. a Figma color variable
   `brand/primary` becomes `colors: { 'brand-primary': '#...' }`, not
   `colors: { 'button-bg': '#...' }`.
3. If Figma exposes semantic variable collections (light/dark, or
   primitive → semantic aliasing), mirror that as two layers in the config
   rather than flattening to one — keep primitives (`panda-blue-500`) separate
   from semantic aliases (`bg-primary`) so theming stays possible later.

`src/index.css` currently hardcodes `font-family: 'Inter', ...` outside
Tailwind's token system — once a type-scale/font token comes from Figma, move
the font family into `theme.extend.fontFamily` instead and reference it via
the `font-sans` (or a custom) utility, not a raw `@layer base` override.

## Component library

**Not yet established** — no `src/components/` directory exists.

Conventions to apply as components are built from Figma frames:

- **Location**: `src/components/`, one file per component,
  `PascalCase.jsx` matching the component name.
- **Architecture**: plain function components, props in, JSX out — no class
  components, no HOCs unless a real cross-cutting need appears.
- **Composition over configuration**: if a Figma component has variants
  (e.g. Button: primary/secondary/ghost × sm/md/lg), model that as a small
  number of props (`variant`, `size`) mapped to Tailwind class strings via a
  lookup object, not a prop per visual property.
- **Co-locate, don't split preemptively**: don't create `Button/index.jsx` +
  `Button/Button.module.css` + `Button/Button.test.jsx` scaffolding until the
  project actually needs that separation. A single `Button.jsx` is fine.
- No Storybook or component docs tool is installed. Don't add one unless
  asked — it's disproportionate to a single-screen scaffold.
- Reuse before creating: before adding a new component for a Figma node,
  check `src/components/` for something that already covers it (e.g. a second
  "Card" in a new frame should reuse `Card.jsx` with different props, not
  spawn `Card2.jsx`).

## Assets

**No `src/assets/` or `public/` directory exists yet** beyond Vite's default
favicon reference (`/vite.svg`, which doesn't currently exist on disk — that
link is currently broken).

When pulling images/exports from Figma via MCP:

- Static, rarely-changing assets (logos, illustrations) → `public/`,
  referenced by absolute path (`/logo.svg`), so Vite serves them unprocessed.
- Assets imported and used inside components (so Vite can hash/optimize them)
  → `src/assets/`, imported as ES modules (`import logo from '../assets/logo.svg'`).
- Prefer SVG for icons/logos and Figma's "Export as SVG" over PNG, for
  crispness and small size. Use PNG/WebP only for photographic content.
- No CDN or image-optimization pipeline is configured. Don't add one for a
  static single-page scaffold.

## Icon system

**Not yet established** — no icon library installed (no `lucide-react`,
`heroicons`, `react-icons`, etc.) and no `src/icons/` directory.

When Figma screens need icons:

- If the Figma file uses a named icon set that maps to a known open-source
  library (Lucide, Heroicons, Phosphor), install that library rather than
  exporting each icon as a one-off SVG — keeps stroke width/sizing consistent
  and avoids asset sprawl.
- If icons are bespoke (custom-drawn in the Figma file), export as SVG via
  MCP, save under `src/icons/`, and wrap each as a small React component
  (`IconName.jsx`) accepting `className`/`size` props — don't inline raw
  `<svg>` blobs directly in feature components.
- Naming: match the Figma layer name for the icon, converted to PascalCase
  with an `Icon` suffix (`arrow-right` → `IconArrowRight.jsx`).

## Styling approach

- **Utility-first Tailwind** in JSX `className`, per [src/App.jsx](src/App.jsx#L5). No CSS Modules, no styled-components/emotion — don't introduce a second
  styling system alongside Tailwind.
- **Global styles** live only in [src/index.css](src/index.css) — the three
  `@tailwind` directives plus a `@layer base` block for document-level
  defaults (currently: antialiasing, base text/bg color, font-family). Keep
  this file minimal; component-specific styling belongs in `className`, not
  here.
- **Responsive design**: use Tailwind's default breakpoint prefixes
  (`sm:`/`md:`/`lg:`/`xl:`) mobile-first, matching whatever breakpoints the
  Figma file defines as frame sizes. If Figma's breakpoints don't line up
  with Tailwind's defaults, override `theme.screens` in
  [tailwind.config.js](tailwind.config.js) rather than fighting the defaults
  with arbitrary-value classes everywhere.
- Avoid `@apply`-heavy custom classes except for truly repeated, multi-utility
  combos (e.g. a card shadow+radius+padding used identically in 5+ places) —
  default to composing utilities directly in JSX so a component's markup and
  its Figma frame stay visually traceable.

## Project structure

Current:

```
Panda design/
├── index.html
├── src/
│   ├── main.jsx        # ReactDOM root
│   ├── App.jsx          # placeholder root component
│   └── index.css        # Tailwind entry + global base styles
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── .claude/
    └── mcp.json          # Figma Dev Mode MCP server config
```

Target structure as Figma screens get built out (add directories only when
the first file that needs them exists — don't pre-create empty folders):

```
src/
├── main.jsx
├── App.jsx               # top-level layout / routing (once >1 screen exists)
├── index.css
├── components/            # shared, reusable UI pieces (Button, Card, Input…)
├── icons/                 # wrapped SVG icon components (if bespoke icon set)
├── assets/                 # imported images/illustrations
└── pages/ (or screens/)   # one file per Figma top-level frame/page
```

- Keep feature-specific one-off markup inside the page/screen file until it's
  reused in a second place — then extract to `components/`. Don't extract
  preemptively from a single Figma frame.

## Figma MCP integration workflow

The Figma MCP server is configured in [.claude/mcp.json](.claude/mcp.json)
as the **official Figma Dev Mode MCP Server** (`http://127.0.0.1:3845/mcp`).

Prerequisites for it to be reachable in a session:
1. Figma **desktop app** running, with the target file open.
2. **Preferences → Enable Dev Mode MCP Server** turned on (requires a Figma
   Dev/Full seat).
3. Claude Code (re)started after the server is enabled, so the MCP tools
   surface.

Because this server reads from what's open/selected in the desktop app
(rather than an arbitrary URL + API key), the practical workflow is:

1. In Figma desktop, select the frame/component to implement (or navigate to
   its node-id, matching the `node-id` query param from the Figma URL if
   given one).
2. Use the MCP tools to pull the node's structure, styles, and any linked
   variables/code connect mappings.
3. Translate returned styles into Tailwind, per the [Design tokens](#design-tokens)
   rules above — add new tokens to `tailwind.config.js` rather than inlining
   raw values, and reuse existing tokens/components where the Figma node
   matches something already built.
4. Build the component under `src/components/` (or `src/pages/` for a full
   screen), matching the naming/structure conventions in this doc.
5. Wire it into `App.jsx` (or the relevant page) and verify in the dev server
   (`npm run dev`) against the Figma frame side-by-side.

Do not fabricate design details (colors, spacing, copy) when the MCP server
is unavailable — say so and wait for the connection rather than guessing at
the "blux" file's contents.
