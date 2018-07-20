/* jshint esversion:6 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const SOURCEPATHS = {
  sassSource: 'src/scss/*.scss'
}
const APPPATHS = {
  root: 'app/',
  css: 'app/css',
  js: 'app/js'
}

gulp.task('sass', function () {
  return gulp.src(SOURCEPATHS.sassSource)
    .pipe(sass({ outputStyle: 'expanded' })
      .on('error', sass.logError))
    .pipe(gulp.dest(APPPATHS.css));
});

gulp.task('serve', function () {
  browserSync.init([APPPATHS.css + '/*css', APPPATHS.root + '/*.html', APPPATHS.js + '/*.js'], {
    server: {
      baseDir: APPPATHS.root
    }
  });
});

gulp.task('watch', ['sass', 'serve'], function () {
  gulp.watch([SOURCEPATHS.sassSource], ['sass']);
});

gulp.task('default', ['watch']);
