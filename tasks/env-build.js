"use strict";
var gulp = require( "gulp" ),
  symlink = require( "gulp-symlink" ),
  config = require( "../config.paths.js" ),
  del = require( "del" ),
  runSymLinkEnv;

runSymLinkEnv = function( src, env ) {
  return gulp.src( src, { read: false } )
    .pipe( symlink( function( file ) {
      var oldPath = file.path.replace( "urls", "" ),
        newPath = oldPath.replace( env, "urls" );
      return newPath;
    }));
    //.pipe( del( config.envBuild.remove[ env ],  ) );
};

gulp.task( "envBuild:dev", function() {
  return runSymLinkEnv( config.envBuild.src.dev, "dev" );
});

gulp.task( "envBuild:prod", function() {
  return runSymLinkEnv( config.envBuild.src.prod, "prod" );
});

gulp.task( "envBuild:qa", function() {
  return runSymLinkEnv( config.envBuild.src.prod, "qa" );
});
