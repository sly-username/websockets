// jscs:disable requirePaddingNewLinesInObjects
"use strict";
var gulp = require( "gulp" ),
  config = require( "../config.paths.js" ),
  runCopy;

runCopy = function( src, dest ) {
  return gulp.src( src )
    .pipe( gulp.dest(dest) );
};

// symlink files that don't need to be compiled into the build/www folder
gulp.task( "copy:prod", function() {
  return runCopy( config.symlink.src, config.prod );
});

// symlink files for testing
gulp.task( "copy:tests", function() {
  return runCopy( config.symlink.tests, config.testsBuild );
});
