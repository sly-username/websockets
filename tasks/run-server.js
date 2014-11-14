/**
 * Created by rj on 11/11/14.
 */

var gulp    = require("gulp"),
    gutil   = require("gulp-util"),
    config  = require("../config.paths.js"),
    lr      = require("better-livereload"),
    servers = require("../server/static.js");


gulp.task("server:dev", function(){

  servers.dev; // starts koa server

  // livereload
  var lrserver = lr.createServer();
  lrserver.watch(config.dev);

  gutil.log("dev server started on " + config.server.ports.dev);

});

gulp.task("server:prod", function(){

  servers.prod; // starts koa server
  gutil.log("prod server started on " + config.server.ports.prod);

});
