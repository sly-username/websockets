"use strict";
var gulp = require( "gulp" ),
  gutil = require( "gulp-util" ),
  watch = require( "gulp-watch" ),
  plumber = require( "gulp-plumber" ),
  through = require( "through2" ),
  config = require( "../config.paths.js" ),
  defaults = require( "lodash" ).defaults,
  less = require( "less" ),
  lessOptions, myLess;

// Options
lessOptions = {
  "no-ie-compat": true,
  compress: false,
  paths: config.less.includePaths
};

/* jshint -W071 */
myLess = function() {
  return through.obj( function( file, enc, done ) {
    if ( file.isNull() ) {
      return done( null, file );
    }

    var str = file.contents.toString( "utf8" ),
      opts = defaults( {}, lessOptions );

    opts.filename = file.path;
    opts.sourceMap = file.sourceMap ? true : false;

    less.render( str, opts )
      .then(
        function( css ) {
          file.contents = new Buffer( css.css );
          file.path = gutil.replaceExtension( file.path, ".css" );

          if ( file.sourceMap ) {
            // TODO: add source map stuff?
            gutil.log( "LESS Souce mapping not implemented" );
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

gulp.task( "less", [ "less:dev" ]);

gulp.task( "less:dev", function() {
  return gulp.src( config.less.compile )
    .pipe( myLess() )
    .pipe( gulp.dest( config.less.out.dev ) );
});

gulp.task( "less:watch", function( done ) {
  // regular watch included less, recompile all
  gulp.watch( config.less.include, [ "less" ]);

  // watch all non-include and compile per file
  // jscs:disable requirePaddingNewLinesInObjects
  watch( config.less.compile, { name: "LESS" })
    .pipe( plumber() )
    .pipe( myLess() )
    .pipe( gulp.dest( config.less.out.dev ) );
  // jscs:enable

  done();
});
