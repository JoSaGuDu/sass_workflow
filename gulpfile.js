/* jshint esversion:6 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const autoPrefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const browserify = require('gulp-browserify');
const merge = require('merge-stream');

//Workflow variables
const reload = browserSync.reload;
const SOURCEPATHS = {
  sassSource: 'src/scss/*.scss',
  htmlSource: 'src/*.html',
  jsSource: 'src/js/*.js'
};
const APPPATHS = {
  root: 'app/',
  css: 'app/css',
  js: 'app/js'
};

//Tasks
gulp.task('cleanHtml', function () {
  //read: false speeds u the task by avoiding clean to read the file content
  //force: true allows clean tor delete folders out of curent working directory
  return gulp.src(APPPATHS.root + '/*.html', { read: false, force: true })
  .pipe(clean());
});

gulp.task('cleanScripts', function () {
  return gulp.src(APPPATHS.js + '/*.js', { read: false, force: true })
  .pipe(clean());
});

gulp.task('sass', function () {
  let bootstrapCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');//fetch bootsrap css
  let sassFiles = gulp.src(SOURCEPATHS.sassSource)
    .pipe(autoPrefixer())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError));
  return merge(bootstrapCSS, sassFiles)
    .pipe(concat('app.css'))
    .pipe(gulp.dest(APPPATHS.css));
});

gulp.task('serve', function () {
  browserSync.init([APPPATHS.css + '/*.css', APPPATHS.root + '/*.html', APPPATHS.js + '/*.js'], {
    server: {
      baseDir: APPPATHS.root
    }
  });
});

gulp.task('html', ['cleanHtml'], function () {
  gulp.src(SOURCEPATHS.htmlSource)
  .pipe(gulp.dest(APPPATHS.root));
});

gulp.task('scripts', ['cleanScripts'], function () {
  return gulp.src(SOURCEPATHS.jsSource)
  .pipe(concat('main.js'))
  .pipe(browserify())
  .pipe(gulp.dest(APPPATHS.js));
});

gulp.task('watch', ['serve', 'sass', 'cleanHtml', 'html', 'cleanScripts', 'scripts'], function () {
  gulp.watch([SOURCEPATHS.sassSource], ['sass']);
  gulp.watch([SOURCEPATHS.htmlSource], ['html']);
  gulp.watch([SOURCEPATHS.jsSource], ['scripts']);
});

//generic task for move files from any dependency to the app files
// gulp.task('taskName', function () {
//   gulp.src('./node_modules/dependencyFolder/fileName.ext or *.ext or *.{ext1,ext2,ext3}')
//   .pipe(gulp.dest(APPPATHS.destination defined in APPPATHS object ));
// });

gulp.task('default', ['watch']);
