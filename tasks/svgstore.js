"use strict";
var gulp = require( "gulp" ),
  svgstore = require( "gulp-svgstore" ),
  config = require( "../config.paths.js" );

gulp.task( "svgstore:dev", function() {
  return gulp
    .src( config.svgstore.src )
    .pipe( svgstore() )
    .pipe( gulp.dest( config.svgstore.out ));
});
