"use strict";
var gulp = require( "gulp" ),
  del = require( "del" ),
  config = require( "../config.paths.js" ),
  clean;

// rm -rf path
clean = function( path ) {
  return function( done ) {
    del( path, done );
  };
};

gulp.task( "clean:dev", clean( config.dev ) );
gulp.task( "clean:prod", clean( config.prod ) );

gulp.task( "clean", [ "clean:dev", "clean:prod" ]);
