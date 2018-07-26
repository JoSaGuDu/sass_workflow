/* jshint esversion:6 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const autoPrefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');

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
  return gulp.src(SOURCEPATHS.sassSource)
    .pipe(autoPrefixer())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
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
  .pipe(gulp.dest(APPPATHS.js));
});

gulp.task('watch', ['serve', 'sass', 'cleanHtml', 'html', 'cleanScripts', 'scripts'], function () {
  gulp.watch([SOURCEPATHS.sassSource], ['sass']);
  gulp.watch([SOURCEPATHS.htmlSource], ['html']);
  gulp.watch([SOURCEPATHS.jsSource], ['scripts']);
});

gulp.task('default', ['watch']);
