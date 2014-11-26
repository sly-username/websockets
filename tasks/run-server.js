/**
 * Created by rj on 11/11/14.
 */

var gulp        = require("gulp"),
    gutil       = require("gulp-util"),
    config      = require("../config.paths.js"),
    livereload  = require("livereload"),
    servers     = require("../server/static.js");

var livereloadOptions = {
  port: 35729, // default livereload port
  applyJSLive: false,
  applyCSSLive: false
  //exts: [ "html", "js", "css" ]
};

gulp.task("server:dev", function(){

  servers.startDev(); // starts koa server

  var lrserver = livereload.createServer(livereloadOptions);
  lrserver.watch(config.server.watch);

  gutil.log("dev server started on " + config.server.ports.dev);

});

gulp.task("server:prod", function(){

  servers.startProd(); // starts koa server
  gutil.log("prod server started on " + config.server.ports.prod);

});
