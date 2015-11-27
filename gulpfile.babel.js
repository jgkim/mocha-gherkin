const gulp       = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel      = require('gulp-babel');
const rename     = require('gulp-rename');
const del        = require('del');

gulp.task('default', ['compile']);

gulp.task('compile', () => {
  return gulp.src('*.es6')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(rename({
      extname: '.js',
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'));
});

gulp.task('clean', () => {
  return del([
    'mocha-gherkin.js',
    'spec.js',
    '*.map',
  ]);
});
