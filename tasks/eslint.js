"use strict";
var gulp = require( "gulp" ),
  watch = require( "gulp-watch" ),
  eslint = require( "gulp-eslint" ),
  config = require( "../config.paths.js" ),
  formatter = "stylish",
  options,
  runForPathWithOptions,
  watchPathWithOptionsAndName,
  registerTaskPair;

// not needed right now but might be useful later
options = {};

// maximum code reuse! add opts arg if needed
runForPathWithOptions = function( path ) {
  return gulp.src( path )
    .pipe( eslint() )
    .pipe( eslint.format( formatter ) );
};

// watch version, add opts arg to eslint if needed
// jscs:disable requirePaddingNewLinesInObjects
watchPathWithOptionsAndName = function( path, opts, name ) {
  name = name || "ESLINT";

  return watch( path, { name: name }, function( file ) {
    return file
      .pipe( eslint() )
      .pipe( eslint.format( formatter ) );
  });
};
// jscs:enable

// register both lint and lint:watch for prop name with gulp
registerTaskPair = function( appendToName, path, opts ) {
  gulp.task( "lint:" + appendToName, function() {
    return runForPathWithOptions( path, opts );
  });
  gulp.task( "lint:watch:" + appendToName, function( done ) {
    watchPathWithOptionsAndName( path, opts, "ESLINT-" + appendToName );
    done();
  });
};

// Iterate taskNames in config.eslint building tasks for paths
config.eslint.taskNames.forEach( function( property ) {
  if ( config.eslint[property] ) {
    registerTaskPair( property, config.eslint[property], options );
  }
});

// default lint task
gulp.task( "lint", [ "lint:all" ]);

// default watch is "lint:watch:client"
gulp.task( "lint:watch", [ "lint:watch:client" ]);
