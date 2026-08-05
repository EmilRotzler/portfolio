# Portfolio App

Personal portfolio website built with SvelteKit 2 and Svelte 5 (runes mode). Includes pages for the CV, projects, and contact info, animated canvas backgrounds ("flavors"), dark/light theming, and English/Danish language support.

## Stack

- **Framework:** SvelteKit 2 (`@sveltejs/kit`)
- **UI:** Svelte 5 (runes mode)
- **Language:** TypeScript
- **Bundler:** Vite
- **Package manager:** Yarn

## Features

- **Flavors** — swappable animated canvas backgrounds (mesh, code, ocean, sand, matrix) on the home page, cycled via a toggle and persisted to `localStorage`
- **Theme toggle** — light/dark theme, persisted to `localStorage`
- **Language toggle** — English/Danish, persisted to `localStorage` with browser-language detection as the default

## Developing

Install dependencies, then start a dev server:

```sh
yarn install
yarn dev

# or start the server and open the app in a new browser tab
yarn dev -- --open
```

## Building

To create a production version of the app:

```sh
yarn build
```

You can preview the production build with `yarn preview`.

## Other commands

```sh
yarn check         # type-check with svelte-check
yarn check:watch   # type-check in watch mode
yarn format        # format with prettier
yarn format:check  # check formatting
```

## Project structure

```
src/
  app.html              # HTML shell
  lib/
    assets/             # static assets (images, icons)
    components/         # UI components, incl. *Bg.svelte flavor backgrounds
    data/                # CV, projects, contact, and translation content
    stores/              # flavor, theme, and lang runes stores
    styles/              # global CSS and per-component stylesheets
  routes/
    +layout.svelte       # root layout — imports global CSS
    +page.svelte         # home page
    about/
    cv/
    projects/
    contact/
static/                  # files served at /
```

> To deploy the app, you may need to install a different [adapter](https://svelte.dev/docs/kit/adapters) for your target environment (currently uses `adapter-auto`).
