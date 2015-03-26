var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var config = require( "../config.paths.js" );

gulp.task('svgstore:dev', function () {
  return gulp
    .src(config.svgstore.src)
    .pipe(svgstore())
    .pipe(gulp.dest(config.svgstore.out));
});
