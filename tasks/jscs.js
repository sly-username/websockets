"use strict";
var gulp = require( "gulp" ),
  gutil = require( "gulp-util" ),
  config = require( "../config.paths.js" ),
  jscs = require( "gulp-jscs" ),
  through = require( "through2" ),
  options,
  runForPathWithOptions,
  watchPathWithOptionsAndName,
  registerTaskPair,
  logJSCSErrors,
  hackPipeErrorPatch;

// Options
options = {
  configPath: config.jscs.rc
};

// Apparently putting something after jscs makes it work fine.
// Will need to keep an eye out for changes to gulp-jscs, looks
//   like there is a ticket to enable better error reporting.
hackPipeErrorPatch = function() {
  return through.obj( function( file, encoding, done ) {
    done();
  });
};

// this is to log the stuffs
logJSCSErrors = function( error ) {
  gutil.log( error.message );
};

// maximum code reuse!
runForPathWithOptions = function( path, opts ) {
  return gulp.src( path )
    .pipe( jscs( opts ) )
    .on( "error", logJSCSErrors )
    .pipe( hackPipeErrorPatch() );
};

watchPathWithOptionsAndName = function( path, opts, name ) {
  name = name || "JSCS";

  return gulp.watch( path )
    .on( "change", function( event ) {
      if ( event.type !== "deleted" ) {
        gutil.log( name + " saw a change at: " + gutil.colors.magenta( event.path ) );
        return runForPathWithOptions( event.path, opts );
      }
    });
};

registerTaskPair = function( appendToName, path, opts ) {
  gulp.task( "jscs:" + appendToName, function() {
    return runForPathWithOptions( path, opts );
  });
  gulp.task( "jscs:watch:" + appendToName, function( done ) {
    watchPathWithOptionsAndName( path, opts, "JSCS-" + appendToName );
    done();
  });
};

// Iterate over taskNames to generate tasks at given prop name
config.jscs.taskNames.forEach( function( property ) {
  if ( config.jscs[ property ] ) {
    registerTaskPair( property, config.jscs[ property ], options );
  }
});

// jscs aliased to jscs:all
gulp.task( "jscs", gulp.series( "jscs:all" ) );

// jscs:watch aliased to jscs:watch:client
gulp.task( "jscs:watch", gulp.series( "jscs:watch:client" ) );
