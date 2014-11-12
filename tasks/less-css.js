
var gulp      = require('gulp'),
    gutil     = require('gulp-util'),
    watch     = require('gulp-watch'),
    plumber   = require('gulp-plumber'),
    through   = require('through2'),
    config    = require('../config.paths.js'),
    defaults  = require('lodash').defaults,
    less      = require('less');


var lessOptions = {
  'no-ie-compat': true,
  'compress':     false,
  //'include-paths': []
  //'include-paths': config.less.include.join(':')
};

/*
config.less.include.forEach(function(p){
  var files = glob.sync(p);
  lessOptions['include-paths'] = lessOptions['include-paths'].concat(files);
});
*/

//lessOptions['include-paths'] = lessOptions['include-paths'].join(process.platform.test(/win/) ? ';' : ':');
//gutil.log(lessOptions['include-paths']);

var myLess = function(){
  return through.obj(function(file, enc, cb){

    if( file.isNull() ){
      return cb(null, file);
    }

    var str = file.contents.toString('utf8');
    var opts = defaults({}, lessOptions);

    opts.filename = file.path;
    opts.sourceMap = file.sourceMap ? true : false;

    less.render(str, opts)
      .then(
      function(css){
        file.contents = new Buffer(css.css);
        file.path = gutil.replaceExtension(file.path, '.css');

        if( file.sourceMap ){
          // TODO: add source map stuff
        }

        cb(null, file);
      },
      function(err){
        err.lineNumber = err.line;
        err.fileName = err.filename;
        err.message = err.message + ' in file ' + err.fileName + ' line #' + err.lineNumber;

        cb(new gutil.PluginError('my-less', err));
      }
    );

  });
};

gulp.task('less', ['less:dev']);

gulp.task('less:dev', function(){

  return gulp.src(config.less.compile)
    .pipe(myLess())
    .pipe(gulp.dest(config.less.out.dev));

});

gulp.task('less:watch', function(){

  // regular watch included less, recompile all
  gulp.watch(config.less.include, ['less']);

  // watch all non-include and compile per file
  watch(config.less.compile, {
    name: 'LESS'
  })
    .pipe(plumber())
    .pipe(myLess())
    .pipe(gulp.dest(config.less.out.dev));

});
