// jscs:disable requirePaddingNewLinesInObjects
"use strict";
var gulp = require( "gulp" ),
  symlink = require( "gulp-symlink" ),
  config = require( "../config.paths.js" ),
  runSymlink,
  runCopy;

runCopy = function( src, dest ) {
  return gulp.src( src )
    .pipe( gulp.dest( dest ) );
};

runSymlink = function( src, toReplace, replaceWith ) {
  return gulp.src( src, { read: false } )
    .pipe( symlink( function( file ) {
      console.log( file.path );
      return file.path.replace( toReplace, replaceWith );
    }));
};

// Symlink files that don't need to be compiled into the build/www folder
gulp.task( "symlink:dev", function() {
  return runSymlink( config.symlink.src, config.client, config.dev );
});

// Symlink test files
gulp.task( "symlink:tests", function() {
  return runSymlink( config.symlink.tests, config.client, config.dev );
});

// Copy files that don't need to be compiled into the build/prod folder
gulp.task( "copy:prod", function() {
  return runCopy( config.symlink.src, config.prod );
});
