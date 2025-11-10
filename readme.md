# KNI Cascade

A modern front-end architecture creating a single source of truth for all our CSS — across **WordPress**, **React**, **static**, or any future builds.

KNI Cascade unifies structure, tooling, and logic into a maintainable, portable system for all front-end projects.  
It’s designed for **clarity, scalability, and minimal friction** — a single shared foundation that powers every KNI build.

## What We Package

<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>SCSS Boilerplate</strong></td>
      <td>
        <ul>
          <li>Modern, layered structure that fixes inheritance issues</li>
          <li>Clear separation of responsibility → <BR><code>00-config → 01-base → 02-components → 03-modules → 04-pages</code></li>
          <li>Config-first system — tokens, mixins, and primitives power everything downstream</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Sass (SCSS)</strong></td>
      <td>
        <ul>
          <li>Clean, familiar syntax and developer experience</li>
          <li>Zero CSS output from config layer ensures predictable, isolated overrides</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>PostCSS PXV</strong></td>
      <td>Our custom viewport unit plugin
      </td>
    </tr>
    <tr>
      <td><strong>Stylelint config</strong></td>
      <td>Centralized configs for Stylelint
      </td>
    </tr>
  </tbody>
</table>

## Folder Structure

```plaintext
scss/
├── 00-config/      # Tokens, mixins, functions, no CSS output
├── 01-base/        # Resets, type, layout, and core utilities
├── 02-components/  # Reusable UI building blocks
├── 03-modules/     # Larger composite regions (header, hero, footer)
├── 04-pages/       # Page-specific overrides
└── styles.scss    # Public entry file for final CSS build
```

---

## 🧩 Core Features

- **Fluid Typography** – Scales seamlessly across breakpoints using `$type-scale` maps
- **Viewport-Based Units (`pxv`)** – Uniform responsive sizing with fallback support
- **Token-Driven Architecture** – Edit `_settings.scss` to update a project globally
- **Predictable Cascade** – Each layer builds safely on the one before it
- **Framework-Agnostic** – Single source of truth across any kni boilerplate

---

## ⚙️ Local Build Setup

```bash
# install dependencies
npm install

# run local dev build
npx gulp

# compile & minify for production
npx gulp build
```

By default, **Gulp** runs:

- `sass` → compile SCSS → CSS
- `postcss` → apply pxv, autoprefixer, and minify
- `stylelint` → lint & auto-fix code style
- `browsersync` → live-reload for local development

---

## Design Principles

1. **Settings-first** – All editable project values live in `_settings.scss`.
2. **No CSS output in config** – Logic, not styling.
3. **Token inheritance** – Everything flows from primitives to components.
4. **Small overrides > big rewrites** – The cascade should always work with you.
5. **Readable by default** – Comments are documentation.

---

## 🧰 Requirements

- Node v18+
- npm or pnpm
- Gulp CLI (global)

---

## 🧑‍💻 Contributing

1. Clone this repo
2. Create a new branch
3. Run `npx gulp` and make your changes
4. Submit a PR with a clear summary

---

## 🪄 Quick Philosophy

> _“If it’s visual, it lives in base.  
> If it’s reusable, it lives in components.  
> If it’s page-specific, it lives in pages.  
> And if it defines how the system works — it lives in config.”_
