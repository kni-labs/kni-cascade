/**
 * 🧠 Cascade Config
 * Shared configuration consumed by all KNI Cascade environments:
 * WordPress (Gulp), React (Next.js), static sites, or anything else.
 */

const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // ------------------------------------------------------------
  // 📁 PATHS
  // ------------------------------------------------------------
  paths: {
    src: path.resolve(__dirname, 'test'), // SCSS source folder
    dist: path.resolve(__dirname, 'test'), // Compiled output folder
    cssEntry: 'styles.scss', // Entry file
    cssOutput: 'styles.css', // Output file
  },

  // ------------------------------------------------------------
  // 🧩 POSTCSS
  // ------------------------------------------------------------
  postcss: {
    plugins: {
      // Viewport-based units — our custom plugin
      'postcss-pxv': {
        writeVars: false,
      },

      // ⚙️ Optional PostCSS plugins (re-enable once verified)
      // autoprefixer: {},
      // cssnano: isProd ? { preset: 'default' } : false,
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
      'custom-property-pattern': null, // disable – conflicts with SCSS $vars
      'declaration-block-no-redundant-longhand-properties': null,
      'function-name-case': null,
      'function-no-unknown': null,
      'keyframes-name-pattern': null,
      'no-descending-specificity': null,
      'property-no-vendor-prefix': null,
      'selector-no-vendor-prefix': null,
      'scss/no-global-function-names': null, // allow legacy map-get
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
      indentation: null, // handled by Prettier
      'max-nesting-depth': 4,
      'declaration-no-important': null,
      'value-list-comma-newline-after': null,
    },
    overrides: [
      {
        files: ['**/*.scss'],
        customSyntax: 'postcss-scss',
      },
    ],
  },

  // ------------------------------------------------------------
  // 🧹 PRETTIER
  // ------------------------------------------------------------
  prettier: {
    singleQuote: true,
    printWidth: 100,
    tabWidth: 2,
    trailingComma: 'es5',
  },
};
