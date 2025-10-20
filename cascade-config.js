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

// 🎨 STYLELINT (Stylelint 16+)
stylelint: {
  root: true,
  extends: [
    'stylelint-config-standard-scss',
  ],
  ignoreFiles: [
    '**/*.{js,mjs,jsx,ts,tsx,json,md,mdx}',
    'test/*.{css,css.map}',
  ],
  rules: {
    // ------------------------------------------------------------------
    // ⚙️ Core syntax / SCSS
    // ------------------------------------------------------------------
    'annotation-no-unknown': [true, { ignoreAnnotations: ['default'] }],
    'scss/at-import-no-partial-leading-underscore': null, // ✅ new rule name
    'custom-property-pattern': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'function-no-unknown': null,
    'function-name-case': null,
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

    // ------------------------------------------------------------------
    // ⚙️ Formatting
    // ------------------------------------------------------------------
    'max-nesting-depth': 4,
    'declaration-no-important': null,

    // ------------------------------------------------------------------
    // ⚙️ Selectors
    // ------------------------------------------------------------------
    'selector-class-pattern': null,
    'selector-id-pattern': null,
    'selector-max-id': 2,

    // ------------------------------------------------------------------
    // ⚙️ Optional SCSS niceties
    // ------------------------------------------------------------------
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
