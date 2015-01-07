"use strict";
var gulp = require( "gulp" ),
  gutil = require( "gulp-util" ),
  plumber = require( "gulp-plumber" ),
  through = require( "through2" ),
  path = require( "path" ),
  defaults = require( "lodash" ).defaults,
  config = require( "../config.paths.js" ),
  traceur = require( "traceur" ),
  traceurOptions,
  compileES6,
  runCompileFromToWithOptions;

// Compiler Options
traceurOptions = {
  modules: "instantiate",
  experimental: true
};

// Traceur compile in a stream!
/* Traceur node api is working! ...for now... */
compileES6 = function( options ) {
  return through.obj( function( file, enc, done ) {
    var es6,
      opts = defaults( {}, options ),
      oldPath = file.path;

    if ( file.isNull() ) {
      this.push( file );
      return done();
    }

    // if in components folder, set to script mode
    // else set module name
    if ( ( new RegExp( "^" + config.client + ".components" ) ).test( oldPath ) ) {
      gutil.log( "Compiling as Script" );
      opts.script = true;
    } else {
      // jscs:disable disallowSpaceBeforeBinaryOperators
      opts.moduleName = oldPath.replace( config.client + "/", "" ).replace( /\.js$/, "" );
      // jscs:enable
    }

    // Get ES6 File Content
    es6 = file.contents.toString( "utf8" );

    // Update File Object
    file.contents = new Buffer( traceur.compile( es6, opts ) );
    file.path = oldPath;
    // TODO: Do we remove the .es6 postfix?
//    file.path = oldPath.replace(/\.es6\.js$/, ".js");

    // Log work
    gutil.log(
      "\n\tCompiling: " + oldPath +
      // "\n\tTo: " + file.path +
      "\n\tNamed: " + opts.moduleName
    );

    this.push( file );
    done();
  });
};

runCompileFromToWithOptions = function( src, dest, opts ) {
  return gulp.src( src )
    .pipe( plumber() )
    .pipe( compileES6( opts ) )
    .pipe( gulp.dest( dest ) );
};

/* dev task */
gulp.task( "traceur:dev", function() {
  return runCompileFromToWithOptions( config.traceur.src, config.traceur.out.dev, traceurOptions );
});

/* watch task */
gulp.task( "traceur:watch", function() {
  var transformDirName = function( src, srcDir, destDir ) {
    return path.dirname( src.replace( srcDir, destDir ) );
  };
//  gulp.watch( config.traceur.src,  [ "traceur:dev" ]);
  return gulp.watch( config.traceur.src )
    .on( "change", function( event ) {
      var destinationPath;

      if ( event.type !== "deleted" ) {
        destinationPath = transformDirName( event.path, config.client, config.dev );
        gutil.log( "Traceur saw a change at " + event.path );
        return runCompileFromToWithOptions( event.path, destinationPath, traceurOptions );
      }
    });
});

// TODO prod task
gulp.task( "traceur:prod", function() {
  return runCompileFromToWithOptions( config.traceur.src, config.traceur.out.prod, traceurOptions );
});
