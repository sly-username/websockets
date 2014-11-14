
var gulp = require("gulp"),
    symlink = require("gulp-symlink"),
    config = require("../config.paths.js");


gulp.task("vendor:dev", function(){

  return gulp.src(config.vendor.src)
    .pipe(symlink(function(file){
      return file.path.replace(config.bower, config.vendor.dev);
    }));

});

gulp.task("vendor:prod", function(){

  return gulp.src(config.vendor.min, { base: config.bower })
    .pipe(gulp.dest(config.vendor.prod));

});
