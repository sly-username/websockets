"use strict";
var gulp = require( "gulp" ),
  karma = require( "karma" ),
  paths = require( "../config.paths.js" );

gulp.task( "karma:server", function( done ) {
  karma.server.start({
    config: paths.karma.rc
  }, done );
});

gulp.task( "karma:run", function( done ) {
  karma.runner.run({
    config: paths.karma.rc
  }, done );
});

gulp.task( "karma:watch", function( done ) {
  karma.server.start({
    config: paths.karma.rc,
    singleRun: false
  }, done );
});
