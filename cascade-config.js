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
    src: path.resolve(__dirname, 'scss'),   // SCSS source folder
    dist: path.resolve(__dirname, 'test'),  // Compiled output folder (default for dev)
    cssEntry: 'cascade.scss',               // Entry file (imported by Gulp/Next)
    cssOutput: 'styles.css',                // Final output filename
  },

  // ------------------------------------------------------------
  // 🧩 POSTCSS
  // ------------------------------------------------------------
  postcss: {
    plugins: {
      // Viewport-based units — our custom plugin
      'postcss-pxv': {
        siteMin: 0,
        siteBasis: 375,
        siteMax: 1440,
        writeVars: false,
      },

      // ⚙️ Optional PostCSS plugins — temporarily disabled while testing
      // autoprefixer: {},  // Enable once verified
      // cssnano: isProd ? { preset: 'default' } : false,
    },
  },

  // ------------------------------------------------------------
  // 🎨 STYLELINT
  // ------------------------------------------------------------
  stylelint: {
    extends: (() => {
      const base = ['stylelint-config-standard-scss'];
      try {
        // Dynamically include Prettier integration if installed
        require.resolve('stylelint-prettier');
        base.push('stylelint-prettier/recommended');
      } catch {
        console.log('ℹ️  Skipping stylelint-prettier (not installed).');
      }
      return base;
    })(),
    rules: {
      indentation: 2,
      'no-empty-source': null,
      'max-nesting-depth': 3,
      'selector-max-id': 0,
      'declaration-no-important': null,
    },
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