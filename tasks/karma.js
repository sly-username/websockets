"use strict";
var gulp = require( "gulp" ),
  gutil = require( "gulp-util" ),
  karma = require( "karma" ).server,
  paths = require( "../config.paths.js" );

gulp.task( "karma:once", function( done ) {
  karma.start({
    configFile: paths.karma.rc,
    singleRun: true
  }, function( exitCode ) {
    gutil.log( "Karma exited with code: " + exitCode );
    done();
  });
});

gulp.task( "tdd", function( done ) {
  karma.start({
    configFile: paths.karma.rc
  }, function( exitCode ) {
    gutil.log( "Karma exited with code: " + exitCode );
    done( exitCode );
    global.process.exit( exitCode );
  });
});
