/**
 * Created by rj on 11/11/14.
 */

var gulp        = require("gulp"),
    gutil       = require("gulp-util"),
    watch       = require("gulp-watch"),
    config      = require("../config.paths.js"),
    livereload  = require("livereload"),
    servers     = require("../server/static.js");


gulp.task("server:dev", function(){

  servers.dev; // starts koa server

  // livereload
  var lrserver = livereload.createServer({
    port: 35729, // default livereload port
    applyJSLive: false,
    applyCSSLive: false
    //exts: [ 'html', 'js', 'css' ]
  });

  lrserver.watch(config.server.watch);

  gutil.log("dev server started on " + config.server.ports.dev);

});

gulp.task("server:prod", function(){

  servers.prod; // starts koa server
  gutil.log("prod server started on " + config.server.ports.prod);

});
