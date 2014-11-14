
var gulp    = require("gulp"),
    rimraf  = require("rimraf"),
    config  = require("../config.paths.js");


var clean = function(path){
  return function(done){
    rimraf(path, function(){
      done();
    });
  };
};

gulp.task("clean:dev", clean(config.dev));
gulp.task("clean:prod", clean(config.prod));
gulp.task("clean", ["clean:dev", "clean:prod"]);
