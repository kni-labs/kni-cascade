/**
 * 🧠 KNI Cascade — Gulpfile
 * Local dev / test harness for the Cascade engine.
 *
 * - demo/scss/*.scss are the local demo entry files
 * - Compiles demo/scss/*.scss -> demo/css/*.css
 * - Applies postcss-pxv
 * - Uses .stylelintrc.cjs for linting (auto-resolved by Stylelint)
 */

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const gulpSass = require('gulp-dart-sass');
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
  entry: path.resolve(__dirname, 'demo/scss/*.scss'),
  dist: path.resolve(__dirname, 'demo/css'),
};

const sassSrcFile = paths.entry;
const sassOutDir = paths.dist;

const sassWatchDir = [
  path.join(paths.scssSrc, '**/*.scss'),
  path.resolve(__dirname, 'demo/**/*.scss'),
];

const htmlWatchDir = './demo/**/*.html';

// --------------------------
// 🔍 Lint SCSS (non-blocking)
// --------------------------
gulp.task('lint-css-fix', function (done) {
  const lintCmd = [
    'npx stylelint',
    `"${paths.scssSrc}/**/*.scss"`,
    '"demo/**/*.scss"',
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
    .pipe(plumber())
    .pipe(
      gulpSass({ outputStyle: 'expanded' }).on(
        'error',
        gulpSass.logError,
      ),
    )
    .pipe(postcss(postcssPlugins))
    .pipe(gulp.dest(sassOutDir))
    .pipe(browserSync.stream())
    .on('end', () => {
      console.log(
        colors.green(
          `✅ Built demo stylesheets → ${sassOutDir}`,
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
      server: { baseDir: './demo' },
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
