
var gulp  = require( "gulp" ),
  config  = require( "../config.paths.js" ),
  watch   = require( "gulp-watch" ),
  plumber = require( "gulp-plumber" ),
  jscs    = require( "gulp-jscs" ),
  options, runForPathWithOptions;

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

// jscs client files
gulp.task( "jscs:client", function() {
  return runForPathWithOptions( config.jscs.client, options );
});

// jscs tasks files
gulp.task( "jscs:tasks", function() {
  return runForPathWithOptions( config.jscs.tasks, options );
});

// jscs test files
gulp.task( "jscs:tests", function() {
  return runForPathWithOptions( config.jscs.tests, options );
});

// jscs server files
gulp.task( "jscs:server", function() {
  return runForPathWithOptions( config.jscs.server, options );
});

gulp.task( "jscs:root", function() {
  return runForPathWithOptions( config.jscs.root, options );
});

// jscs all the files
gulp.task( "jscs:all", function() {
  return runForPathWithOptions( config.jscs.all, options );
});

// jscs default is all
gulp.task( "jscs", [ "jscs:all" ]);

// watch all files
// jscs:disable requirePaddingNewLinesInObjects
gulp.task( "jscs:watch", function( done ) {
  watch( config.jscs.all, { name: "JSCS" })
    .pipe( jscs( options ) );

  done();
});
// jscs:enable
