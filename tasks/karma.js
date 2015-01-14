"use strict";
var gulp = require( "gulp" ),
  karma = require( "karma" ).server,
  paths = require( "../config.paths.js" );

gulp.task( "karma:run", function( done ) {
  karma.start({
    config: paths.karma.rc,
    singleRun: true
  }, done );
});

gulp.task( "karma:watch", function( done ) {
  karma.start({
    config: paths.karma.rc
  }, done );
});
