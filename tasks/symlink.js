/**
 * Created by rj on 11/11/14.
 */

var gulp    = require('gulp'),
    symlink = require('gulp-symlink'),
    config  = require('../config.paths.js');


gulp.task('symlink:dev', function(){

  return gulp.src(config.symlink.src, { read:false })
    .pipe(symlink(function(file){
      return file.path.replace(config.client, config.dev)
    }));

});

