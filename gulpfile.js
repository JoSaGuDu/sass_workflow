/* jshint esversion:6 */
const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
  .pipe(sass({ outputStyle: 'expanded' })
  .on('error', sass.logError))
  .pipe(gulp.dest('app/css'));
});

gulp.task('default', ['sass']);
