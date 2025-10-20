/**
 * 🧠 KNI Cascade — Gulpfile
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
const path = require('path');

// Shared Cascade config
const config = require('./cascade-config.js');
const isProd = process.env.NODE_ENV === 'production';

// --------------------------
// 🔍 Paths
// --------------------------
const sassSrcFile = path.join(config.paths.src, config.paths.cssEntry);
const sassOutDir = config.paths.dist;
const sassWatchDir = [
  path.join(config.paths.src, '**/*.scss'),  // watch /scss and its partials
  path.resolve(__dirname, 'test/**/*.scss'), // also watch experimental SCSS in /test
];
const htmlWatchDir = './test/**/*.html';

// --------------------------
// 🔍 Lint SCSS (non-blocking)
// --------------------------
gulp.task('lint-css-fix', function (done) {
  const lintCmd = `npx stylelint "${config.paths.src}/**/*.scss" "test/**/*.scss" --config .stylelintrc.js --fix --formatter string`;

  exec(lintCmd, function (err, stdout, stderr) {
    if (stdout) {
      const coloredOutput = stdout
        .replace(/✖/g, colors.red('✖'))
        .replace(/⚠️/g, colors.yellow('⚠️'))
        .replace(/\.scss/g, colors.cyan('.scss'))
        .replace(/\(\S+\)/g, (match) => colors.dim(match));
      console.log(coloredOutput);
    }

    if (stderr) console.error(colors.red(stderr));

    if (err) {
      console.log(colors.yellow('⚠️  Stylelint fixed some issues (non-blocking)'));
    } else {
      console.log(colors.green('✅  Stylelint clean — all formatting issues resolved'));
    }

    done();
  });
});

// --------------------------
// 🧩 Build SCSS → CSS
// --------------------------
gulp.task('build-sass', async function () {
  // Collect active PostCSS plugins from cascade-config
  const activePlugins = Object.entries(config.postcss.plugins)
    .filter(([_, options]) => options !== false)
    .map(([name, options]) => {
      try {
        console.log(colors.dim(`↳ Using ${name}`));
        return require(name)(options);
      } catch (e) {
        console.log(colors.yellow(`⚠️ Missing PostCSS plugin: ${name}`));
        return null;
      }
    })
    .filter(Boolean);

  return await gulp
    .src(sassSrcFile)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss(activePlugins))
    .pipe(gulpAutoprefixer())
    .pipe(
      sourcemaps.write('./', {
        includeContent: true,
        sourceRoot: '../scss',
      })
    )
    .pipe(gulp.dest(sassOutDir))
    .pipe(browserSync.stream())
    .on('end', () => {
      console.log(colors.green(`✅ Built ${config.paths.cssEntry} → ${sassOutDir}/${config.paths.cssOutput}`));
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

    gulp.watch(sassWatchDir)
      .on('change', (changedFile) => {
        console.log(colors.cyan(`📂 File changed: ${path.relative(__dirname, changedFile)}`));
      })
      .on('change', gulp.series('lint-css-fix', 'build-sass'));

    gulp.watch(htmlWatchDir).on('change', browserSync.reload);
  })
);

// --------------------------
// 🎯 Tasks
// --------------------------
gulp.task('build', gulp.series('lint-css-fix', 'build-sass'));
gulp.task('default', gulp.series('serve'));