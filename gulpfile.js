/**
 * 🧠 KNI Cascade — Gulpfile
 * Local dev / test harness for the Cascade engine.
 *
 * - test/styles.scss is the entry for local testing
 * - test/styles.scss should `@use '../scss/styles' as *;`
 * - Compiles test/styles.scss -> test/styles.css
 * - Applies postcss-pxv
 * - Uses .stylelintrc.cjs for linting (auto-resolved by Stylelint)
 */

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const gulpSass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();
const { exec } = require('child_process');
const colors = require('ansi-colors');
const path = require('path');
const postcssPxv = require('postcss-pxv');

// --------------------------
// 🔍 Paths (engine-local)
// --------------------------
const paths = {
  scssSrc: path.resolve(__dirname, 'scss'),
  entry: path.resolve(__dirname, 'test/styles.scss'),
  dist: path.resolve(__dirname, 'test'),
  cssOutput: 'styles.css',
};

const sassSrcFile = paths.entry;
const sassOutDir = paths.dist;

const sassWatchDir = [
  path.join(paths.scssSrc, '**/*.scss'),
  path.resolve(__dirname, 'test/**/*.scss'),
];

const htmlWatchDir = './test/**/*.html';

// --------------------------
// 🔍 Lint SCSS (non-blocking)
// --------------------------
gulp.task('lint-css-fix', function (done) {
  const lintCmd = [
    'npx stylelint',
    `"${paths.scssSrc}/**/*.scss"`,
    '"test/**/*.scss"',
    '--fix',
    '--formatter string',
  ].join(' ');

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
      console.log(
        colors.yellow(
          '⚠️  Stylelint reported/fixed issues (non-blocking for build)',
        ),
      );
    } else {
      console.log(
        colors.green(
          '✅  Stylelint clean — all formatting issues resolved',
        ),
      );
    }

    done();
  });
});

// --------------------------
// 🧩 Build SCSS → CSS
// --------------------------
gulp.task('build-sass', function () {
  const postcssPlugins = [
    postcssPxv({
      writeVars: false,
    }),
  ];

  return gulp
    .src(sassSrcFile)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(
      gulpSass({ outputStyle: 'expanded' }).on(
        'error',
        gulpSass.logError,
      ),
    )
    .pipe(postcss(postcssPlugins))
    .pipe(
      sourcemaps.write('./', {
        includeContent: true,
        sourceRoot: '../scss',
      }),
    )
    .pipe(gulp.dest(sassOutDir))
    .pipe(browserSync.stream())
    .on('end', () => {
      console.log(
        colors.green(
          `✅ Built test/styles.scss → ${path.join(
            sassOutDir,
            paths.cssOutput,
          )}`,
        ),
      );
    });
});

// --------------------------
// ⚙️ Serve + Watch (local dev)
// --------------------------
gulp.task(
  'serve',
  gulp.series('lint-css-fix', 'build-sass', function () {
    browserSync.init({
      server: { baseDir: './test' },
      open: false,
      notify: false,
    });

    gulp
      .watch(sassWatchDir)
      .on('change', (changedFile) => {
        console.log(
          colors.cyan(
            `📂 File changed: ${path.relative(
              __dirname,
              changedFile,
            )}`,
          ),
        );
      })
      .on('change', gulp.series('lint-css-fix', 'build-sass'));

    gulp.watch(htmlWatchDir).on('change', browserSync.reload);

  }),
);

// --------------------------
// 🎯 Tasks
// --------------------------
gulp.task('build', gulp.series('lint-css-fix', 'build-sass'));
gulp.task('default', gulp.series('serve'));
