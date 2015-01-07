"use strict";
var gulp = require( "gulp" ),
    symlink = require( "gulp-symlink" ),
    config = require( "../config.paths.js" );

// symlink files that don't need to be compiled into the build/www folder
gulp.task( "symlink:dev", function() {
  // jscs:disable requirePaddingNewLinesInObjects
  return gulp.src( config.symlink.src, { read: false } )
    .pipe( symlink( function( file ) {
      return file.path.replace( config.client, config.dev );
    }) );
});
