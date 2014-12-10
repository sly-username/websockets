
var gulp  = require( "gulp" ),
  path    = require( "path" ),
  through = require( "through2" ),
  symlink = require( "gulp-symlink" ),
  config  = require( "../config.paths.js" ),
  join, rewriteExt;

// Joins folder name with path basename, will also change .min.js to .js
// This is meant to be used when you have access to the file
join = function( folder, file ) {
  var basename = path.basename( file.path );

  if ( (/\.min\.js$/).test( basename ) ) {
    console.log( "rewrite min: " + basename );
    // jscs:disable disallowSpaceBeforeBinaryOperators
    basename = basename.replace( /\.min\.js$/, ".js" );
    // jscs:enable
  }

  return path.join(
    folder,
    basename
  );
};

// Rewrites part of a path name matching the pattern with replace string
// This is meant to be used like a gulp plugin: .pipe(rewriteExt(p,r))
rewriteExt = function( pattern, replace ) {
  if ( typeof pattern === "string" ) {
    pattern = new RegExp( pattern );
  }

  return through.obj( function( file, enc, done ) {
    if ( file.path && pattern.test( file.path ) ) {
      file.path = file.path.replace( pattern, replace );
    }

    this.push( file );
    done();
  });
};

gulp.task( "vendor:dev", function() {
  // jscs:disable requirePaddingNewLinesInObjects
  return gulp.src( config.vendor.src, { read: false })
  // jscs:enable
    .pipe( symlink( function( file ) {
      return join( config.vendor.dev, file );
    }) );
});

gulp.task( "vendor:prod", function() {
  return gulp.src( config.vendor.min )
    // jscs:disable disallowSpaceBeforeBinaryOperators
    .pipe( rewriteExt( /\.min\.js$/, ".js" ) )
    // jscs:enable
    .pipe( gulp.dest( config.vendor.prod ) );
});
