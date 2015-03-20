"use strict";
var gulp = require( "gulp" ),
  symlink = require( "gulp-symlink" ),
  config = require( "../config.paths.js" ),
  del = require( "del" );

gulp.task( "envBuild:dev", function() {
  //return gulp.src( config.envBuild.src, { read: false } )
  //  .pipe( symlink( function( file ) {
  //    var newPath = file.path.replace( config.client, config.dev );
  //    return newPath.replace( "urls", "" );
  //  }));

  return gulp.src( config.envBuild.src, { read: false } )
    .pipe( gulp.dest( path.join( config.dev, "domain/ed" ) ) );
});

gulp.task( "envBuild:prod", function() {
  return gulp.src( config.envBuild.src, { read: false } )
    .pipe( symlink( function( file ) {
      var newPath = file.path.replace( config.client, config.prod );
      return newPath.replace( "urls", "" );
    }));
});

gulp.task( "envBuild:qa", function() {
  return gulp.src( config.envBuild.src, { read: false } )
    .pipe( symlink( function( file ) {
      var newPath = file.path.replace( config.client, config.dev );
      return newPath.replace( "urls", "" );
    }));
});
