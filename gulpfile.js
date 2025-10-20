/**
 * 🧠 KNI Cascade – Gulpfile
 * Uses shared settings from cascade-config.js
 */

const gulp = require('gulp');
const gulpAutoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();
const { exec } = require('child_process');
const colors = require('ansi-colors');
const config = require('./cascade-config.js');

// --------------------------
// Paths (from cascade-config.js)
// --------------------------
const scssSrc = `${config.paths.src}/${config.paths.cssEntry}`;
const cssDest = config.paths.dist;
const cssOutName = config.paths.cssOutput;

// --------------------------
// 🔍 Lint SCSS (non-blocking)
// --------------------------
gulp.task('lint-css-fix', function (done) {
  exec(
    // 👇 note: explicitly using .stylelintrc.js now
    'npx stylelint "scss/**/*.scss" "test/**/*.scss" --config .stylelintrc.js --fix --formatter string',
    function (err, stdout, stderr) {
      const colors = require('ansi-colors');

      if (stdout) {
        // 🖍️ Highlight key tokens for readability
        const coloredOutput = stdout
          .replace(/✖/g, colors.red('✖'))
          .replace(/⚠️/g, colors.yellow('⚠️'))
          .replace(/\.scss/g, colors.cyan('.scss'))
          .replace(/\(\S+\)/g, (match) => colors.dim(match)); // rule name in dim gray
        console.log(coloredOutput);
      }

      if (stderr) console.error(colors.red(stderr));

      if (err) {
        console.log(colors.yellow('⚠️  Stylelint fixed some issues (non-blocking)'));
      } else {
        console.log(colors.green('✅  Stylelint clean — all formatting issues resolved'));
      }

      done();
    }
  );
});

// --------------------------
// 🧩 Build SCSS → CSS
// --------------------------
gulp.task('build-sass', async function () {
  // Collect PostCSS plugins from cascade-config
  const activePlugins = Object.entries(config.postcss.plugins)
    .filter(([_, options]) => options !== false)
    .map(([name, options]) => require(name)(options));

  return await gulp
    .src(scssSrc)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss(activePlugins))
    .pipe(gulpAutoprefixer())
    .pipe(sourcemaps.write('./', { includeContent: true }))
    .pipe(gulp.dest(cssDest))
    .pipe(browserSync.stream())
    .on('end', () => {
      console.log(
        colors.green(
          `✅ Built ${config.paths.cssEntry} → ${config.paths.dist}/${config.paths.cssOutput}`
        )
      );
    });
});

// --------------------------
// ⚙️ Serve + Watch
// --------------------------
gulp.task(
  'serve',
  gulp.series('lint-css-fix', function () {
    browserSync.init({
      server: { baseDir: './test' },
      open: false,
      notify: false,
    });

    gulp.watch(`${config.paths.src}/**/*.scss`, gulp.series('lint-css-fix', 'build-sass'));
    gulp.watch('./test/**/*.html').on('change', browserSync.reload);
  })
);

// --------------------------
// 🎯 Tasks
// --------------------------
gulp.task('build', gulp.series('lint-css-fix', 'build-sass'));
gulp.task('default', gulp.series('serve'));
