# Changelog

This changelog starts with 1.5.0 and covers changes since 1.4.1, including work committed during development.

## 1.10.0 — 2026-10-18

### Added

- Opt-in minimal, bordered, and zebra table treatments with shared Sass settings, inherited CSS variables, captions, and a horizontal scrolling wrapper.
- Optional CSS-only mobile table overflow scrim, enabled by default through the table settings when using its frame wrapper.

### Changed

- Added table examples and customization documentation, full-width highlighted usage snippets, and mobile scroll cues for wide demo code blocks.
- Reused the documentation navigation in an accessible mobile drawer with a fixed menu button, native dialog focus handling, and the shared shadow mixin.
- Corrected mobile header spacing so the title and badges remain visible.

## 1.9.0 — 2026-10-18

### Added

- Hover/focus inset-border utility and shared Sass mixin, with configurable color, width, duration, inherited corners, disabled/reduced-motion handling, and demo examples.

### Changed

- Reworked the documentation introduction, pxv input/output examples, primary media-query explanation, and advanced scaling settings; clarified optional breakpoint references and feature inclusion comments.

## 1.8.0 — 2026-10-18

### Added

- Shadow, shadow-hover, and scrim Sass mixins shared with their attribute utilities, with component-class examples in the demo. Importing the Sass helpers alone generates no CSS.

## 1.7.0 — 2026-10-17

### Added

- Optional native form styles with project appearance settings, inherited CSS variables, font-relative sizing, custom closed-select arrows with native dropdown menus, focus/disabled/read-only/error states, and demo examples.

## 1.6.1 — 2026-10-17

### Added

- `[btn]` button foundation with responsive `xs`, `s`, `m`, and `l` sizes, medium defaults, configurable color themes, outline/inverted treatments, full-width layout, keyboard focus, and disabled states.
- Button label sizes scale down but are capped at their active reference sizes by default, configurable with `$btn-scale-up`.
- Project button settings and a reusable `btn-size()` Sass mixin for custom components that need consistent dimensions without the default appearance.

### Changed

- Expanded getting-started and component documentation, added button customization examples, and refined demo navigation, typography, and code styling.

## 1.5.1 — 2026-10-16

### Added

- GitHub Actions validation and automatic npm trusted publishing after reviewed PR merges, with version consistency checks and already-published version detection.

### Changed

- Added a strict validation command, removed dependency reinstalling from the prepublish hook, and allowed npm 11 for OIDC publishing.

### Fixed

- Restored missing platform-specific optional dependencies in the lockfile and pinned validation and publishing to the same npm version, preventing a clean-install failure in the release job.

## 1.5.0 — 2026-10-16

### Added

- Flex options for space-around/space-evenly distribution, growth/shrink control, and individual self-alignment, available as `.flex` modifier classes.
- `[shadow]` and `[shadow-hover]` utilities, included in the global utilities entry point, with elevation presets `10`–`50`, intensity tokens `.1`–`.9`, a blue preset, and custom RGB colors through `--shadow-color`.
- Default shadows use black, elevation `30`, and base opacity `0.08`. Intensity tokens set base alpha; individual layers apply additional weights.
- Combined resting and interaction shadows, such as `shadow="20 .1" shadow-hover="50 .2"`. Hover options apply only during hover or visible keyboard focus; omitted options retain the resting values.
- Shadow transitions using the shared `--easing` variable, disabled for reduced-motion preferences.
- Native hanging punctuation enabled globally with `--hanging-punctuation: first allow-end last`, plus a `.hanging-quote` fallback using configurable `--quote-hang: -0.45em` in browsers without native support. Set the native value to `none` and the fallback offset to `0` to disable both on a marked element.
- Font-weight utilities `.w--100`, `.w--200`, and `.w--900`, completing the 100–900 range.

### Changed

- Updated test / docs.

- Preserved the four main shadow layers while tightening the two faintest outer layers. The largest blur multiplier decreased from `64` to `24`, and its offset multiplier from `32` to `12`, reducing their rendering area. Frame-rate gains have not been measured.
- Compared with the shadow prototype, removed forced positioning and `!important`, limited transitions to `box-shadow`, and made intensity tokens map directly to base alpha.
- Updated the package and root lockfile versions from `1.4.1` to `1.5.0`.

### Fixed

- Derived the scaling switch and mobile/desktop limits from `$tm`, keeping them synchronized with layout helpers and the default typography breakpoint when customized.

- Prevented hover shadow settings from overriding resting settings before interaction, including when hover elevation is lower than resting elevation.
- Corrected the Gulp build task to return its stream directly, so task completion waits for the build stream instead of an immediately resolved async return.

### Validation

- Rebuilt demo CSS and ran targeted Stylelint and whitespace checks during implementation.
- Checked compiled shadow rules for resting/interaction states, restoration, lower hover elevations, and hover-only visibility.
- Browser visual, keyboard-interaction, and performance verification remains outstanding; local preview access was restricted during this work.
