/**
 * Created by rj on 11/11/14.
 */

var gulp      = require( "gulp" ),
  gutil       = require( "gulp-util" ),
  config      = require( "../config.paths.js" ),
  livereload  = require( "livereload" ),
  servers     = require( "../server/static.js" ),
  livereloadOptions;

// Options
livereloadOptions = {
  port: 35729, // default live reload port
  applyJSLive: false,
  applyCSSLive: false
//  exts: [ "html", "js", "css" ]
};

// Start dev server and live-reload server
gulp.task( "server:dev", function( done ) {
  var lrserver = livereload.createServer( livereloadOptions );

  servers.startDev(); // starts koa server
  lrserver.watch( config.server.watch );

  gutil.log( "dev server started on " + config.server.ports.dev );
  done();
});

// Start prod server
gulp.task( "server:prod", function( done ) {
  servers.startProd(); // starts koa server
  gutil.log( "prod server started on " + config.server.ports.prod );
  done();
});
