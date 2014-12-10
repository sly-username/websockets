
var gulp  = require( "gulp" ),
  gutil   = require( "gulp-util" ),
  config  = require( "../config.paths.js" ),
  watch   = require( "gulp-watch" ),
  plumber = require( "gulp-plumber" ),
  jscs    = require( "gulp-jscs" ),
  options,
  runForPathWithOptions,
  watchPathWithOptionsAndName,
  registerTaskPair;

// Options
options = {
  configPath: config.jscs.rc
};

// maximum code reuse!
runForPathWithOptions = function( path, opts ) {
  return gulp.src( path )
    .pipe( plumber() )
    .pipe( jscs( opts ) );
};

watchPathWithOptionsAndName = function( path, opts, name ) {
  name = name || "JSCS";
  // jscs:disable requirePaddingNewLinesInObjects
  watch( path, { name: name } )
  // jscs:enable
    .pipe( plumber() )
    .pipe( jscs( opts ) );
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

Object.keys( config.jscs )
  .filter( function( prop ) { return prop !== "rc"; } )
  .forEach( function( property ) {
    registerTaskPair( property, config.jscs[property], options );
  });

/*
// THE LONG WAY

// jscs client files
gulp.task( "jscs:client", function() {
  return runForPathWithOptions( config.jscs.client, options );
});
gulp.task( "jscs:watch:client", function( done ) {
  watchPathWithOptionsAndName( config.jscs.client, options, "JSCS-Client" );
  done();
});

// jscs tasks files
gulp.task( "jscs:tasks", function() {
  return runForPathWithOptions( config.jscs.tasks, options );
});
gulp.task( "jscs:watch:tasks", function( done ) {
  watchPathWithOptionsAndName( config.jscs.tasks, options, "JSCS-Tasks" );
  done();
});

// jscs test files
gulp.task( "jscs:tests", function() {
  return runForPathWithOptions( config.jscs.tests, options );
});
gulp.task( "jscs:watch:tests", function( done ) {
  watchPathWithOptionsAndName( config.jscs.tests, options, "JSCS-Tests" );
  done();
});

// jscs server files
gulp.task( "jscs:server", function() {
  return runForPathWithOptions( config.jscs.server, options );
});
gulp.task( "jscs:watch:server", function( done ) {
  watchPathWithOptionsAndName( config.jscs.server, options, "JSCS-Server" );
  done();
});

// jscs just the root
gulp.task( "jscs:root", function() {
  return runForPathWithOptions( config.jscs.root, options );
});
gulp.task( "jscs:watch:root", function( done ) {
  watchPathWithOptionsAndName( config.jscs.root, options, "JSCS-Root" );
  done();
});

// jscs all the files
gulp.task( "jscs:all", function() {
  return runForPathWithOptions( config.jscs.all, options );
});
gulp.task( "jscs:watch:all", function( done ) {
  watchPathWithOptionsAndName( config.jscs.all, options, "JSCS-All" );
  done();
});
*/

// jscs aliased to jscs:all
gulp.task( "jscs", [ "jscs:all" ]);

// jscs:watch aliased to jscs:watch:client
gulp.task( "jscs:watch", [ "jscs:watch:client" ]);
