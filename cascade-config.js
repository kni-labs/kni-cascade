/** ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
 * 🌊 Cascade Config
 * Shared configuration consumed by all KNI Cascade environments:
 * WordPress (Gulp), React (Next.js), static sites, or anything else.
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
 */

const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

// ------------------------------------------------------------
// 📁 PATHS
// ------------------------------------------------------------
const env = process.env.KNI_ENV || 'static'; // static | wordpress | react

let srcDir, distDir;

switch (env) {
  case 'wordpress':
    srcDir = path.resolve(__dirname, 'wp-content/themes/kni-gulp/dev/scss');
    distDir = path.resolve(__dirname, 'wp-content/themes/kni-gulp/dev/css');
    break;

  case 'react':
    srcDir = path.resolve(__dirname, 'src/styles');
    distDir = path.resolve(__dirname, 'public/css');
    break;

  default: // static (local test)
    srcDir = path.resolve(__dirname, 'scss'); // main source folder
    distDir = path.resolve(__dirname, 'test'); // BrowserSync sandbox + compiled CSS
    break;
}

// Optional: log environment for clarity
console.log(`🌊 KNI Cascade environment: ${env}`);

module.exports = {
  // ------------------------------------------------------------
  // 📁 PATHS
  // ------------------------------------------------------------
  paths: {
    src: srcDir,
    dist: distDir,
    cssEntry: 'styles.scss',
    cssOutput: 'styles.css',
  },

  // ------------------------------------------------------------
  // 🧩 POSTCSS
  // ------------------------------------------------------------
  postcss: {
    plugins: {
      'postcss-pxv': {
        writeVars: false,
      },

      // Vendor prefixing (safe default)
      autoprefixer: {
        grid: 'autoplace',
      },

      // Minify only in production
      cssnano: isProd ? { preset: 'default' } : false,
    },
  },

  // ------------------------------------------------------------
  // 🎨 STYLELINT
  // ------------------------------------------------------------
  stylelint: {
    root: true,
    extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
    ignoreFiles: ['**/*.{js,mjs,jsx,ts,tsx,json,md,mdx}', 'test/*{.css,.css.map}'],
    rules: {
      // Syntax
      'annotation-no-unknown': [true, { ignoreAnnotations: ['default'] }],
      'at-rule-empty-line-before': null,
      'custom-property-pattern': null,
      'declaration-block-no-redundant-longhand-properties': null,
      'function-name-case': null,
      'function-no-unknown': null,
      'keyframes-name-pattern': null,
      'no-descending-specificity': null,
      'property-no-vendor-prefix': null,
      'selector-no-vendor-prefix': null,
      'scss/no-global-function-names': null,
      'scss/at-if-no-null': null,
      'unit-no-unknown': [true, { ignoreUnits: ['pxv'] }],
      'media-query-no-invalid': null,
      'media-feature-range-notation': null,
      'no-empty-source': null,

      // Selectors
      'selector-class-pattern': null,
      'selector-id-pattern': null,
      'selector-max-id': 2,

      // Formatting
      indentation: null,
      'max-nesting-depth': 4,
      'declaration-no-important': null,

      // 👇 These help avoid fights with Prettier on token maps
      'value-list-comma-newline-after': null,
      'value-list-comma-space-after': 'always-single-line',
      'value-list-comma-space-before': 'never',

      // 👇 Optional: allow inline SCSS maps like (desktop: 60, mobile: 34)
      'scss/dollar-variable-colon-space-after': 'at-least-one-space',
      'scss/dollar-variable-colon-space-before': 'never',
    },
    overrides: [
      {
        files: ['**/*.scss'],
        customSyntax: 'postcss-scss',
      },
    ],
  },
};
