"use strict";
var gulp = require( "gulp" ),
  symlink = require( "gulp-symlink" ),
  config = require( "../config.paths.js" );

gulp.task( "envBuild:dev", function() {
  return gulp.src( src, { read: false } )
    .pipe( symlink( function( file ) {
      return file.path.replace( toReplace, replaceWith );
    }));
});
