"use strict";
var gulp = require( "gulp" ),
  symlink = require( "gulp-symlink" ),
  config = require( "../config.paths.js" ),
  runSymLinkEnv;

runSymLinkEnv = function( src, env ) {
  return gulp.src( src, { read: false } )
    .pipe( symlink( function( file ) {
      var oldPath = file.path.replace( "urls", "" ),
        newPath = oldPath.replace( env, "urls" );
      return newPath;
    }));
};

gulp.task( "envBuild:dev", function() {
  return runSymLinkEnv( config.envBuild.src.dev, "dev" );
});
