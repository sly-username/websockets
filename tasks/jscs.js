"use strict";
var gulp = require( "gulp" ),
  gutil = require( "gulp-util" ),
  config = require( "../config.paths.js" ),
  watch = require( "gulp-watch" ),
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
//   like there a ticket to enable better error reporting.
hackPipeErrorPatch = function() {
  return through.obj( function( file, encoding, done ) {
    done();
  });
};

// this is to log the stuffs
logJSCSErrors = function( error ) {
  gutil.log( error.message );
//  jscs().end();
};

// maximum code reuse!
runForPathWithOptions = function( path, opts ) {
  return gulp.src( path )
    .pipe( jscs( opts ) )
    .on( "error", logJSCSErrors )
    .pipe( hackPipeErrorPatch() );
};

// jscs:disable requirePaddingNewLinesInObjects
watchPathWithOptionsAndName = function( path, opts, name ) {
  name = name || "JSCS";

  watch( path, { name: name } )
    .pipe( jscs( opts ) )
    .on( "error", logJSCSErrors )
    .pipe( hackPipeErrorPatch() );
};
// jscs:enable

registerTaskPair = function( appendToName, path, opts ) {
  gulp.task( "jscs:" + appendToName, function() {
    return runForPathWithOptions( path, opts );
  });
  gulp.task( "jscs:watch:" + appendToName, function( done ) {
    watchPathWithOptionsAndName( path, opts, "JSCS-" + appendToName );
    done();
  });
};

Object.keys( config.jscs )
  .filter( function( prop ) { return prop !== "rc"; } )
  .forEach( function( property ) {
    registerTaskPair( property, config.jscs[property], options );
  });

// jscs aliased to jscs:all
gulp.task( "jscs", [ "jscs:all" ]);

// jscs:watch aliased to jscs:watch:client
gulp.task( "jscs:watch", [ "jscs:watch:client" ]);
