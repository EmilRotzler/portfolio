# svelte-app

SvelteKit 2 project using Svelte 5 with runes mode enabled globally (enforced via `svelte.config.js`).

## Stack

- **Framework:** SvelteKit 2 (`@sveltejs/kit`)
- **UI:** Svelte 5 (runes mode)
- **Language:** TypeScript
- **Bundler:** Vite
- **Package manager:** Yarn

## Commands

```bash
yarn dev        # start dev server
yarn build      # production build
yarn preview    # preview production build
yarn check      # type-check with svelte-check
```

## Project structure

```
src/
  app.html              # HTML shell
  lib/
    assets/             # static assets (SVG, images)
    styles/             # global CSS
      variables.css     # CSS custom properties
      global.css        # reset and base styles
      typography.css    # font and heading rules
  routes/
    +layout.svelte      # root layout — imports global CSS
    +page.svelte        # home page
    blog/
      +page.svelte      # blog index
      [slug]/
        +page.svelte    # individual blog post
static/                 # files served at /
```

## Responsive design

The website must support mobile (phone) viewports. All layouts, typography, and UI elements should work on small screens.

- Design mobile-first: base styles target small screens, use `min-width` media queries to scale up
- Touch targets should be large enough to tap comfortably (min 44×44px)
- Avoid fixed widths that would overflow on narrow screens

## Flavors

Flavors are swappable animated canvas backgrounds on the home page. The active flavor is persisted to `localStorage` and cycles via a toggle button.

**Key files:**
- `src/lib/stores/flavor.svelte.ts` — `flavors` array (source of truth), `Flavor` type, and the `flavor` store with `.current` and `.next()`
- `src/lib/components/FlavorToggle.svelte` — button that calls `flavor.next()`; also owns the icon map (`icons` record keyed by flavor name)
- `src/routes/+page.svelte` — renders the correct `*Bg` component based on `flavor.current`
- `src/lib/components/*Bg.svelte` — one component per flavor (e.g. `MeshBg.svelte`, `SandBg.svelte`)

**Adding a new flavor:**
1. Add the name to the `flavors` array in `flavor.svelte.ts`
2. Add an icon entry in `FlavorToggle.svelte`
3. Create `src/lib/components/<Name>Bg.svelte` — a `<canvas>` driven by a `$effect`
4. Add an `{:else if}` branch in `+page.svelte` to mount the new component

Each `*Bg.svelte` component is a full-viewport `<canvas>` (`position: fixed; inset: 0; pointer-events: none; z-index: 0`) animated via `requestAnimationFrame` inside a `$effect`. The effect must return a cleanup function that calls `cancelAnimationFrame` and removes any event listeners.

## Conventions

- Use Svelte 5 runes (`$state`, `$props`, `$derived`, `$effect`) — not the legacy Options API
- Component-scoped styles go in `<style>` blocks inside `.svelte` files
- Global styles go in `src/lib/styles/` and are imported in `+layout.svelte`
- Use the `$lib` alias for imports from `src/lib/`
