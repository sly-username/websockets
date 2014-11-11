
var gulp = require('gulp'),
    requiredir = require('requiredir');


// load gulp tasks from ./tasks
var dummy = requiredir('./tasks');

gulp.task('watch', ['less:watch']);

gulp.task('dev', ['less'], function(done){

  // todo
  console.log('doing dev');
  done();

});

gulp.task('default', ['dev']);
