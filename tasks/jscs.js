
var gulp  = require("gulp"),
  config  = require("../config.paths.js"),
  watch   = require("gulp-watch"),
  jscs    = require("gulp-jscs");

// Options
var options = {
  configPath: config.jscs.rc
};

// jscs
gulp.task("jscs", function(){
  return gulp.src(config.jscs.src)
    .pipe(jscs(options));
});

// watch
gulp.task("jscs:watch", function(done){
  watch(config.jscs.src, { name: "JSCS" })
    .pipe(jscs(options));

  done();
});
