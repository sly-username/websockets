// jscs:disable requirePaddingNewLinesInObjects
"use strict";
var gulp = require( "gulp" ),
  symlink = require( "gulp-symlink" ),
  config = require( "../config.paths.js" ),
  runSymlink;

runSymlink = function( src, toReplace, replaceWith ) {
  return gulp.src( src, { read: false } )
    .pipe( symlink( function( file ) {
      return file.path.replace( toReplace, replaceWith );
    }) );
};

// symlink files that don't need to be compiled into the build/www folder
gulp.task( "symlink:dev", function() {
  return runSymlink( config.symlink.src, config.client, config.dev );
});

// symlink files for testing
gulp.task( "symlink:tests", function() {
  return runSymlink( config.symlink.tests, config.client, config.testsBuild );
});
