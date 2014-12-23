"use strict";
var gulp = require( "gulp" ),
  gutil = require( "gulp-util" ),
  path = require( "path" ),
  through = require( "through2" ),
  config = require( "../config.paths.js" ),
  defaults = require( "lodash" ).defaults,
  less = require( "less" ),
  lessOptions,
  runCompile,
  myLessCompile;

// Options
lessOptions = {
  "no-ie-compat": true,
  compress: false,
  paths: config.less.includePaths
};

/* jshint -W071 */
myLessCompile = function( options ) {
  return through.obj( function( file, enc, done ) {
    var str, opts;

    if ( file.isNull() ) {
      return done( null, file );
    }

    str = file.contents.toString( "utf8" );
    opts = defaults( {}, options );

    opts.filename = file.path;
    opts.sourceMap = file.sourceMap ? true : false;

    less.render( str, opts )
      .then(
        function( css ) {
          file.contents = new Buffer( css.css );
          file.path = gutil.replaceExtension( file.path, ".css" );

          if ( file.sourceMap ) {
            // TODO: add source map stuff?
            gutil.log( "LESS Source mapping not implemented" );
          }

          done( null, file );
        },
        function( err ) {
          err.lineNumber = err.line;
          err.fileName = err.filename;
          err.message = err.message + " in file " + err.fileName + " line #" + err.lineNumber;

          done( new gutil.PluginError( "my-less", err ) );
        }
      );
  });
};

runCompile = function( src, dest, opts ) {
  return gulp.src( src )
    .pipe( myLessCompile( opts ) )
    .pipe( gulp.dest( dest ) );
};

// COMPILE DEV
gulp.task( "less:dev", function() {
  return runCompile( config.less.compile, config.less.out.dev, lessOptions );
});

// WATCH LESS COMPILE TO DEV
gulp.task( "less:watch", function() {
  var transformDirName = function( src, srcDir, destDir ) {
    return path.dirname( src.replace( srcDir, destDir ) );
  };

  // regular watch included less, recompile all
  gulp.watch( config.less.included, [ "less" ]);

  // watch all non-include and compile per file
  return gulp.watch( config.less.compile )
    .on( "change", function( event ) {
      var destinationPath;

      if ( event.type !== "deleted" ) {
        destinationPath = transformDirName( event.path, config.client, config.dev );
        gutil.log( "LESS saw a change at: " + event.path );
        return runCompile( event.path, destinationPath, lessOptions );
      }
    });
});

// COMPILE FOR PRODUCTION
// TODO MINIMIZE AND OTHER OPTIMIZATIONS
gulp.task( "less:prod", function() {
  return runCompile( config.less.compile, config.less.out.prod, lessOptions );
});

gulp.task( "less", [ "less:dev" ]);
