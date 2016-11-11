import gulp from 'gulp';
import header from 'gulp-header';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';

gulp.task('build', () =>
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(header('import \'source-map-support/register\'\n'))
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['add-module-exports'],
    }))
    .pipe(sourcemaps.write('.', { sourceRoot: '../src' }))
    .pipe(gulp.dest('build')));
