const gulp = require('gulp');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');

gulp.task('default', watchFunction);

function watchFunction() {
  gulp.watch('./src/js/*.js', minifierJs);
}

function minifierJs() {
  return gulp
    .src('./src/js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./assets/js'));
}
