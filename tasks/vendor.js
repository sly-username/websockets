
var gulp    = require("gulp"),
    path    = require("path"),
    through = require("through2"),
    symlink = require("gulp-symlink"),
    config  = require("../config.paths.js");


// Joins folder name with path basename, will also change .min.js to .js
// This is meant to be used when you have access to the file
var join = function(folder, file){
  var basename = path.basename(file.path);
  if( (/\.min\.js$/).test(basename) ){
    console.log("rewrite min: " + basename);
    basename = basename.replace(/\.min\.js$/, ".js");
  }
  return path.join(
    folder,
    basename
  );
};

// Rewrites part of a path name matching the pattern with replace string
// This is meant to be used like a gulp plugin: .pipe(rewriteExt(p,r))
var rewriteExt = function(pattern, replace){
  if ( typeof pattern === "string" ) {
    pattern = new RegExp(pattern);
  }
  return through.obj(function (file, enc, done) {
    if ( !file.isNull() && pattern.test(file.path) ) {
      file.path = file.path.replace(pattern, replace);
    }

    this.push(file);
    done();
  });
};

gulp.task("vendor:dev", function(){

  return gulp.src(config.vendor.src, { read: false })
    .pipe(symlink(function(file){
      return join(config.vendor.dev, file);
    }));

});

gulp.task("vendor:prod", function(){

  return gulp.src(config.vendor.min)
    .pipe(rewriteExt(/\.min\.js$/, ".js"))
    .pipe(gulp.dest(config.vendor.prod));

});

