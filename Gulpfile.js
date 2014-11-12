
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    run = require('run-sequence'),
    requiredir = require('requiredir');

// load gulp tasks from ./tasks
var dummy = requiredir('./tasks');

gulp.task('watch', ['less:watch']);

gulp.task('dev', function(done){

  run(
    'clean:dev',
    ['less:dev', 'symlink:dev', 'vendor:dev'],
    ['server:dev', 'less:watch'],
    done
  );

});

gulp.task('prod', function(done){
  gutil.log('TODO THIS TASK');
});

gulp.task('default', ['dev']);

