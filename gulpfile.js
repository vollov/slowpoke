//Load all task modules
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var nano = require('gulp-cssnano');

//Process JS files
gulp.task('minify-js', function() {
  return gulp.src([
      'app/js/app.js',
      'app/js/config.js',
      'app/js/auth/*.js',
    ]) //Source files
    .pipe(concat("app.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest('app/js/')); //Destination folder
});

//Process styles
gulp.task('compile-less', function() {
  return gulp.src('app/styles/*.less') //Source files
    .pipe(less()) //Compile Less
    .pipe(nano()) //Minify CSS
    .pipe(concat("styles.min.css")) //Combine
    .pipe(gulp.dest('app/styles/')); //Destination folder
});

gulp.task('default', ['minify-js', 'compile-less']);
