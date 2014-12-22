"use strict";
var gulp = require( "gulp" ),
  gutil = require( "gulp-util" ),
  watch = require( "gulp-watch" ),
  through = require( "through2" ),
  config = require( "../config.paths.js" ),
  traceur = require( "traceur" ),
  options, compileES6;

// Compiler Options
options = {
  modules: "instantiate",
  experimental: true
};

// Traceur compile in a stream!
/* Traceur node api is working! ...for now... */
compileES6 = function( opts ) {
  return through.obj( function( file, enc, done ) {
    var es6,
        oldPath = file.path;

    if ( file.isNull() ) {
      this.push( file );

      return done();
    }

    // set module name
    // jscs:disable disallowSpaceBeforeBinaryOperators
    opts.moduleName = oldPath.replace( config.client + "/", "" ).replace( /\.js$/, "" );
    // jscs:enable

    // if in components folder, set to script mode
    if ( ( new RegExp( "^" + config.client + "/components" ) ).test( oldPath ) ) {
      opts.script = true;
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

/* dev task */
gulp.task( "traceur:dev", function() {
  return gulp.src( config.traceur.src )
    .pipe( compileES6( options ) )
    .pipe( gulp.dest( config.traceur.out.dev ) );
});

/* watch task */
gulp.task( "traceur:watch", function( done ) {
//  gulp.watch( config.traceur.src,  [ "traceur:dev" ]);

  /*
  return watch( config.traceur.src, function( file ) {
    return file
      .pipe( compileES6( options ) )
      .pipe( gulp.dest( config.traceur.out.dev ) );
  });
  */
  watch( config.traceur.src )
    .pipe( compileES6( options ) )
    .pipe( gulp.dest( config.traceur.out.dev ) );

  done();
});

// TODO prod task
gulp.task( "traceur:prod", function() {
  return gulp.src( config.traceur.src )
    .pipe( compileES6( options ) )
    .pipe( gulp.dest( config.traceur.out.prod ) );
});
