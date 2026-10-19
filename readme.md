# kni-cascade

A modern front-end architecture creating a single source of truth for all our CSS — across **WordPress**, **React**, **static**, or any future builds.

kni-cascade unifies structure, tooling, and logic into a maintainable, portable system for all front-end projects.\
It’s designed for **clarity, scalability, and minimal friction** — a single shared foundation that powers every KNI build.

## Getting started in a KNI project

KNI’s [WordPress](https://github.com/kni-labs/kni-wp-bp),
[Eleventy](https://github.com/kni-labs/kni-11ty), and [Next.js](https://github.com/kni-labs/kni-next-cascade) boilerplates seed your project’s `scss`
directory with the latest version of kni-cascade during setup. From there, those files
belong to your project—customize them freely. Existing projects don’t automatically
receive future kni-cascade updates. Configure the shared foundation first, then build
on it using your project’s existing development workflow.

1. Match `$type-scale` in `scss/00-sass/_variables.scss` to your Figma typography.
2. Check mobile/desktop reference dimensions in `scss/01-base/_scaling.scss`.
   Set `$desktop-max` in `_variables.scss` if you need a different scaling limit.
3. Customize component defaults, such as `$btn-design` and `$btn-sizes`, and omit
   unused components and utilities through their index files.
4. Build with `pxv`, shared typography, and your own project styles. Verify mobile,
   desktop, intermediate widths, and interaction states.

See [Getting started in the demo](demo/index.html#getting-started) for the folder
responsibilities and links to each part of the foundation. The local build commands
below are for working on kni-cascade itself, rather than setting up a KNI project.

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
          <li>Clear separation of responsibility → <BR><code>00-sass → 01-base → 02-components → 03-modules → 04-pages</code></li>
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
├── 00-sass/        # Settings, Sass vars, mixins, functions, no CSS output
├── 01-base/        # Resets, type, layout, and core utilities
├── 02-components/  # Globally-available UI elements (header, footer, buttons, etc.)
├── 03-modules/     # Page body building blocks
├── 04-pages/       # Template- and page-specific styles, intended to imported only into the relevant file
└── styles.scss     # Public entry file for global CSS build
```

---

## 🧩 Core Features

- **Fluid Typography** – Scales seamlessly across breakpoints using `$type-scale` maps
- **Viewport-Based Units (`pxv`)** – Uniform responsive sizing with fallback support
- **Token-Driven Architecture** – Edit `scss/00-sass/_variables.scss` to update a project globally
- **Predictable cascade** – Each layer builds safely on the one before it
- **Framework-Agnostic** – Single source of truth across any kni boilerplate

---

## ⚙️ Developing kni-cascade locally

```bash
# install dependencies
npm install

# run local dev build
npx gulp
```

By default, **Gulp** runs:

- `sass` → compile SCSS → CSS
- `postcss` → apply pxv
- `stylelint` → lint & auto-fix code style
- `browsersync` → live-reload for local development

---

## Design Principles


1. **No CSS output in 00-sass** – Logic, not styling.
2. **Small overrides > big rewrites** – The cascade should always work with you.
3. **Readable by default** – Comments are documentation.

---

## 🧰 Requirements

- Node 18–22 (matching the package engine range)
- npm or pnpm
- Use the local Gulp installation through `npx gulp`

---

## 🧑‍💻 Contributing

### Demo & Reference

The Demo & Reference page lives in `demo/index.html`, with demo styles in `demo/scss/styles.scss` and shared effect-demo styles in `demo/scss/effect-demos.scss`. Generated styles go into the ignored `demo/css/` folder, without source maps. It is both a living reference and a visual test page. The [interactive scaling demo](demo/scaling-demo.html) provides a resizable sample site with live scaling controls, guides, and the current calculation. The [scrim demo](demo/scrim-demo.html) and [shadow demo](demo/shadow-demo.html) keep their interactive controls local and use the library’s current attribute implementations.

Every new feature or behavior change must include a working example in the demo. Show the default, available options, and relevant responsive or interaction states. For bug fixes, include an example that makes the corrected behavior easy to verify. Check the examples at mobile and desktop widths and with keyboard navigation where applicable.

Run `npx gulp` to preview changes with live reload. Use `npm run build` for a one-time CSS build. Visual examples complement automated checks; they do not replace them.

1. Clone this repo
2. Create a new branch
3. Run `npx gulp` and make your changes
4. Submit a PR with a clear summary

---

## 🪄 Quick Philosophy

> If it defines how the system works is a Sass function, mixin or variable, it lives in sass.
> If it’s a globally-used reset, type, or layout rule, it lives in base.
> If it’s a globally-used element, it lives in components.
> If it's a page body building block, it lives in modules.
> If it’s page-specific, it lives in pages.

## Automated npm releases

`.github/workflows/publish.yml` validates PRs targeting `main`. After a PR merges, it checks for a teammate's approval of the final PR commit, validates the merged code, and publishes an unpublished stable package version to npm. Re-runs skip versions already on npm; registry lookup errors fail the release instead of attempting a publish. Version numbers remain an explicit PR change, not an automatic bump. Do not merge releases out of version order.

### One-time npm setup

In the `kni-cascade` package settings on npm, add a GitHub Actions **Trusted Publisher** with:

| Field | Value |
| --- | --- |
| Organization or user | `kni-labs` |
| Repository | `kni-cascade` |
| Workflow filename | `publish.yml` |
| Environment | Leave blank |
| Allowed actions | Allow direct publishing with `npm publish` |

No npm token or GitHub secret is needed. Keep the existing teammate-review requirement on `main`; also require the workflow's `validate` check before merging. Publishing independently checks an approval from an owner, organization member, or collaborator on the final PR commit. The workflow uses Node 22 and npm 11 for npm's OIDC support.

Merge the workflow through the normal review process. Until the trusted publisher is configured, publishing will fail with an authentication error. Once configured, a merged PR with a new stable version and matching lockfile publishes automatically. Check the **Validate and publish** workflow under GitHub Actions for the result. An existing version is safely skipped; publishing is never attempted from an unmerged PR.


## Components

Components are customizable starting points for complete interface elements.
Include only the ones your project needs: comment out unused forwards in
`scss/02-components/_index.scss` and rebuild to omit their CSS.

### Buttons

`[btn]` is a starting point for consistent button sizing across projects, with a
modest default appearance. Build on it freely with project-specific styles, hover
effects, and animation. Extend `[btn]` with a project class, or use `btn-size()`
for sizing alone when creating a completely custom button:

```html
<button type="button" btn>Medium by default</button>
<button type="button" btn="s outline">Small outline</button>
<a href="/contact" btn="l">Contact us</a>
<button type="button" btn="m" class="project-button">Custom project hover</button>
```

Use `xs`, `s`, `m`, and `l` for size. One color palette is provided by default.
`outline`, `inverted`, and `block` control treatment and layout. Inverted swaps
background/text colors and derives a subtle hover tint from the existing palette. Native `disabled` and
`aria-disabled="true"` receive disabled styling; ARIA alone does not suppress
activation, so remove a disabled link's `href` or prevent the action in your app.

Project defaults live in `scss/00-sass/_variables.scss`: `$btn-design`,
`$btn-themes` and `$btn-sizes` (font sizes and padding). Component
classes can override `--btn-bg`, `--btn-color`, `--btn-hover-bg`,
`--btn-hover-color`, `--btn-border`, `--btn-hover-border`, `--btn-radius`,
`--btn-weight`, `--btn-gap`, `--btn-speed`, and `--btn-focus`. Set these overrides
on the button itself; the component declares its defaults there, so parent-level
values do not override them. Labels follow the global
`--font-min-clamp` minimum. Sizes grow with the clamped
font using `em` padding. By default, `$btn-scale-up: false` caps labels at
their mobile/desktop reference size in actual pixels, so they scale down but not
up. Set it to `true` to allow upward scaling, or override `--btn-font-max` on a
specific component to set a different cap. The global minimum takes precedence
if it exceeds the cap. Supply a single size token.

For custom art direction, keep `[btn]` and add a project class. The foundation
does not reserve transforms or pseudo-elements. To adopt only dimensions:

```scss
@use 'kni-cascade/scss/00-sass' as *;

.project-button {
  @include btn-size(m);
  // Supply your own appearance, layout, focus, and disabled behavior.
}
```

To exclude button CSS, omit `@forward 'button'` from the components entry point.
See the [Demo & Reference](demo/index.html#buttons) for sizes, treatments, disabled
states, link examples, and a project hover effect.

`$btn-themes` is empty by default. Uncomment the secondary example or add a named
entry with `background`, `text`, `hover-background`, and `hover-text` when needed.
The component automatically generates its solid, outline, and inverted variants;
no selector changes are needed.

Button labels in `$btn-sizes` start one step below body sizes: `l` 16/14, `m`
14/12, `s` 12/11, and `xs` 11/10 (desktop/mobile reference pixels).
The global minimum still applies; padding distinguishes sizes when labels clamp.


Button sizing defaults are configured in one place:

```scss
$btn-scale-up: false !default; // Allow growth beyond the mobile/desktop font sizes.
$btn-sizes: (
  xs: (desktop: 11, mobile: 10, padding-x: 1.5em, padding-y: 0.5em),
  s: (desktop: 12, mobile: 11, padding-x: 1.5em, padding-y: 0.625em),
  m: (desktop: 14, mobile: 12, padding-x: 1.5em, padding-y: 0.75em),
  l: (desktop: 16, mobile: 14, padding-x: 1.5em, padding-y: 0.75em)
) !default;
```

Font-size values are reference pixels processed through kni-cascade scaling.
`padding-x` and `padding-y` follow the clamped font size. Filled buttons have a
1px border matching the background, keeping their dimensions aligned with outlines.

## Forms

Native form styling is included through `@forward 'forms'` in
`scss/02-components/_index.scss`. Comment out that forward to omit it; no
styling attributes are required in your HTML.

Edit `$form-design` in `scss/00-sass/_variables.scss` for project defaults:
`radius`, `padding-x`, `padding-y`, `background`, `border`, `muted`, `accent`,
`focus`, and `error`. Controls inherit typography and text color, with a 16px
minimum control font size and `em` padding. Borders stay 1px. Inputs, native
selects, and textareas share the same appearance; checkboxes and radios use thin borders and animated checkmarks/dots with native
keyboard and selection behavior. The 0.2-second animation respects reduced-motion
preferences, and forced-colors mode restores the native appearance. Textareas resize vertically.

Defaults become inherited CSS variables on the root. Override them on any form,
wrapper, or individual control. The selectors use `:where()` to keep specificity
low, so regular project styles can override them easily:

```scss
.contact-form {
  --form-bg: #fff9f7;
  --form-border: #963a30;
  --form-radius: 0;
  --form-accent: #963a30;
}
```

Other available variables are `--form-padding-x`, `--form-padding-y`,
`--form-muted`, `--form-focus`, `--form-error`, and `--form-select-arrow`
(a background image). The native select dropdown is preserved. Multiple/list
selects retain their native selection UI. Specialized file, color, and range
controls are not replaced with custom widgets.

Use native `disabled` and `readonly` attributes. Validation errors use
`aria-invalid="true"` plus an associated `.form-error` message; help text uses
`.form-help`. Connect messages to their control with `aria-describedby`.
Validation logic, submission, field grouping, and form layout remain project
responsibilities. See the [forms demo](demo/index.html#forms) for complete examples.

Range tracks use `--form-accent` for the filled portion and thumb. Firefox draws
its filled portion natively. For Chromium/WebKit, update `--form-range-fill`
with the current percentage on initialization and each `input` event:

```js
const updateRange = (range) => {
  const min = range.min === '' ? 0 : Number(range.min);
  const max = range.max === '' ? 100 : Number(range.max);
  const percent = max > min
    ? Math.max(0, Math.min(100, (Number(range.value) - min) / (max - min) * 100))
    : 0;
  range.style.setProperty('--form-range-fill', `${percent}%`);
};
document.querySelectorAll('input[type="range"]').forEach(range => {
  updateRange(range);
  range.addEventListener('input', () => updateRange(range));
});
```

Call the updater after programmatic value changes or form resets as needed.
The input's dragging and keyboard behavior remain native without this helper.

## Utility mixins

Shadow and scrim utilities work through attributes or Sass mixins. Importing the
Sass helpers alone produces no CSS; each include generates styles for its selector.
The attribute utilities use these same implementations.

```scss
@use 'kni-cascade/scss/00-sass' as *;

.news-card {
  @include shadow(20, 0.1);
  @include shadow-hover(30, 0.2);
}

.hero-image {
  @include scrim(to-t, 0.6, 75%, (0, 20, 72));
}
```

`shadow($elevation: 30, $opacity: 0.08, $color: null)` accepts the existing
10–50 elevation presets. Color is an optional RGB channel list, such as
`(0, 20, 190)`. `shadow-hover()` accepts the same arguments, all optional;
omitted values retain the resting settings. It also activates on keyboard focus
and disables transitions for reduced motion. A hover-only shadow starts invisible.

`scrim($direction: to-t-tr, $opacity: 1, $distance: 100%, $color: (0, 0, 0))`
accepts the same direction names as the attribute, with arbitrary opacity and
percentage distance values. It positions the host, clips overflow, and reserves
`::before` for the overlay. Set text above the overlay in your component layout.

Commenting out utility forwards removes the attribute CSS while keeping these
mixins available through `00-sass`.

Scrims use an eased, multi-stop gradient for a more gradual fade into the image
than a standard two-stop gradient. Read [Easing Linear Gradients on CSS-Tricks](https://css-tricks.com/easing-linear-gradients/)
for the technique behind this approach.

## Inset border

`inset-border` adds an inward-growing border on hover or keyboard focus. It is
invisible at rest and does not change layout. Disabled controls and elements with
`aria-disabled="true"` do not activate it. Reduced motion disables the transition.

```html
<a class="news-card" inset-border href="/story">Read the story</a>
```

```scss
.news-card {
  border-radius: 12pxv;
  --inset-border-color: #2a649c;
  --inset-border-width: 5pxv;
  --inset-border-speed: 350ms;
}
```

Or use the shared mixin without the attribute:

```scss
@use 'kni-cascade/scss/00-sass' as *;

.news-card {
  @include inset-border(5pxv, #2a649c, 350ms);
  border-radius: 12pxv;
}
```

Arguments are width, color, and speed; defaults are `5pxv`, `currentColor`, and
`350ms`. The effect reserves `::after`, inherits the host's radius, and ignores
pointer events. It draws above normal child content while leaving the host's
`box-shadow` free. Children with their own higher stacking levels may cover it.
Use a block or inline-block host and keep an accessible keyboard focus indicator.
The utility sets `position: relative`; apply any absolute, fixed, or sticky
positioning after the include, or override the attribute selector as needed.

Comment out `@forward 'inset-border';` in the utilities entry to omit attribute
CSS; the mixin remains available from `00-sass`, with no CSS generated on import.
