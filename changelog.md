# Changelog

This changelog starts with 1.5.0 and covers changes since 1.4.1, including work committed during development.

## 1.5.0 — 2026-10-16

### Added

- `[flex]` attribute utilities that share declarations with the existing `.flex` classes. All legacy modifiers and responsive variants remain supported.
- Compact flex tokens: `row-rev`, `wrap-m`, `inline-m`, `col-m`, `col-m-rev`, `col-d`, `row-rev-d`, `a-c-d`, `a-start-d`, `j-c-d`, `j-sb-d`, and `j-end-d`.
- Flex options for space-around/space-evenly distribution, growth/shrink control, and individual self-alignment, available in both class and attribute syntax.
- `[shadow]` and `[shadow-hover]` utilities, included in the global utilities entry point, with elevation presets `10`–`50`, intensity tokens `.1`–`.9`, a blue preset, and custom RGB colors through `--shadow-color`.
- Default shadows use black, elevation `30`, and base opacity `0.08`. Intensity tokens set base alpha; individual layers apply additional weights.
- Combined resting and interaction shadows, such as `shadow="20 .1" shadow-hover="50 .2"`. Hover options apply only during hover or visible keyboard focus; omitted options retain the resting values.
- Shadow transitions using the shared `--easing` variable, disabled for reduced-motion preferences.
- Native hanging punctuation enabled globally with `--hanging-punctuation: first allow-end last`, plus a `.hanging-quote` fallback using configurable `--quote-hang: -0.45em` in browsers without native support. Set the native value to `none` and the fallback offset to `0` to disable both on a marked element.
- Font-weight utilities `.w--100`, `.w--200`, and `.w--900`, completing the 100–900 range.
- Demo sections for heading/body scales, caps, hanging quotes, text alignment, wrapping, longform line-height, and all nine font weights.
- Flex and shadow examples covering defaults, options, responsive behavior, legacy classes, colors, and resting/interaction states, with links to the flex, shadow, and scrim CodePens.
- Utility reference examples for containers, visibility, positioning, image fitting, clipping, and colors; introductory explanations for attribute utilities, the shared type-scale map, and scrims.
- A code example showing how to exclude unused utilities by commenting out their `@forward` entries and rebuilding.
- Demo-only sticky sidebar with nested Typography and Utilities groups, exclusive accordion opening, active child highlighting, and direct-section link support. Clicking a parent opens its group and jumps to its overview.
- A dynamic version label beside the sidebar title. Each Gulp build generates `test/version.js` from `package.json`; the development watcher rebuilds and reloads when package metadata changes. Generated version output is ignored by Git.
- Fixed bottom-left viewport dimensions and breakpoint helpers, hidden with the sidebar below 768px.

### Changed

- Preserved the four main shadow layers while tightening the two faintest outer layers. The largest blur multiplier decreased from `64` to `24`, and its offset multiplier from `32` to `12`, reducing their rendering area. Frame-rate gains have not been measured.
- Compared with the shadow prototype, removed forced positioning and `!important`, limited transitions to `box-shadow`, and made intensity tokens map directly to base alpha.
- Organized the demo around Typography, Utilities, and standalone Scaling controls, with stronger section dividers, larger titles, and clearer spacing.
- Simplified reference content with constrained reading widths, compact definition rows, labeled Cover/Contain previews, and separate image-fitting, positioning, and clipping explanations.
- Added subtle tinted inline code, standalone typography labels, and dark syntax-colored single-line/multiline code examples, including distinct comment styling.
- Modernized sidebar typography and chevrons, with square active child states, a full-height divider, a wider content gutter, and additional right padding. The sidebar is hidden on mobile.
- Moved font-weight examples into Typography → Text helpers and left Colors as its own utility reference.
- Moved the floating scaling controls into an in-page section with a navigation link and preview. Slider labels are associated with their inputs; the initial maximum-width control matches the demo's 1800 setting.
- Set the demo background to `#fdfdfd`; removed page borders, the introductory colored box/link, and the width readout above the main heading. Added a project description below the heading.
- Removed the temporary standalone shadow stress-test page and its navigation link.
- Updated the package and root lockfile versions from `1.4.1` to `1.5.0`.

### Fixed

- Changed the scrim demo's unsupported `80%` distance to the supported `75%` preset.
- Fixed a `body-l` demo class to use `body--l` and added missing largest/smallest heading examples.
- Prevented hover shadow settings from overriding resting settings before interaction, including when hover elevation is lower than resting elevation.
- Corrected the Gulp build task to return its stream directly, so task completion waits for the build stream instead of an immediately resolved async return.

### Validation

- Rebuilt demo CSS and ran targeted Stylelint and whitespace checks during implementation.
- Verified all 25 legacy flex rules remain unchanged and have matching attribute declarations and media queries.
- Checked compiled shadow rules for resting/interaction states, restoration, lower hover elevations, and hover-only visibility.
- Checked navigation targets, section nesting, unique IDs, JavaScript syntax, and the generated package version.
- Browser visual, keyboard-interaction, and performance verification remains outstanding; local preview access was restricted during this work.
