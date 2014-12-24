"use strict";
var gulp = require( "gulp" ),
  rimraf = require( "rimraf" ),
  config = require( "../config.paths.js" ),
  clean;

// rm -rf path
clean = function( path ) {
  return function( done ) {
    rimraf( path, function() {
      done();
    });
  };
};

gulp.task( "clean:dev", clean( config.dev ) );
gulp.task( "clean:tasks", clean( config.testsBuild ) );
gulp.task( "clean:prod", clean( config.prod ) );

gulp.task( "clean", [ "clean:dev", "clean:tasks", "clean:prod" ]);
