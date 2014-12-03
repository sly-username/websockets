/**
 * Created by rj on 11/24/14.
 */


var gulp      = require("gulp"),
    gutil     = require("gulp-util"),
    watch     = require("gulp-watch"),
    through   = require("through2"),
    config    = require("../config.paths.js"),
    traceur   = require("traceur");


// Compiler Options
var options = {
  modules: "instantiate",
  experimental: true
};

// Traceur compile in a stream!
/* Traceur node api is working! ...for now... */
var compileES6 = function(opts){
  return through.obj(function(file, enc, done){
    var es6,
        oldPath = file.path;

    if( file.isNull() ){
      this.push(file);
      return done();
    }

    // set module name
    opts.moduleName = oldPath.replace(config.client+"/", "").replace(/\.js$/, "");

    // if in components folder, set to script mode
    if( (new RegExp("^" + config.client + "/components")).test(oldPath) ){
      opts.script = true;
    }

    // Get ES6 File Content
    es6 = file.contents.toString("utf8");

    // Update File Object
    file.contents = new Buffer( traceur.compile(es6, opts) );
    file.path = oldPath; //oldPath.replace(/\.es6\.js$/, ".js"); TODO: Do we remove the .es6 postfix?

    // Log work
    gutil.log(
      "\n\tCompiling: " + oldPath +
      //"\n\tTo: " + file.path +
      "\n\tNamed: " + opts.moduleName
    );

    this.push(file);
    done();
  });
};

/*** dev task **/
gulp.task("traceur:dev", function(){

  return gulp.src(config.traceur.src)
    .pipe(compileES6(options))
    .pipe(gulp.dest(config.traceur.out.dev));

});


/*** watch task ***/
gulp.task("traceur:watch", function(done){
  //gulp.watch(config.traceur.src,  ["traceur:dev"]);

  watch(config.traceur.src)
    .pipe(compileES6(options))
    .pipe(gulp.dest(config.traceur.out.dev));

  done();
});

// TODO prod task


/*
Command Line Options as of 11-24-2014

  Options:
    --type-assertion-module <path>                            Absolute path to the type assertion module.
    --modules <amd, commonjs, instantiate, inline, register>  select the output format for modules
    --moduleName <string>                                     __moduleName value, + sign to use source name, or empty to omit
    --outputLanguage <es6|es5>                                compilation target language
    --source-maps [file|inline|memory]                        sourceMaps generated to file or inline with data: URL
    --experimental                                            Turns on all experimental features
    --arrow-functions [true|false|parse]
    --block-binding [true|false|parse]
    --classes [true|false|parse]
    --computed-property-names [true|false|parse]
    --default-parameters [true|false|parse]
    --destructuring [true|false|parse]
    --for-of [true|false|parse]
    --generators [true|false|parse]
    --numeric-literals [true|false|parse]
    --property-methods [true|false|parse]
    --property-name-shorthand [true|false|parse]
    --rest-parameters [true|false|parse]
    --spread [true|false|parse]
    --template-literals [true|false|parse]
    --unicode-escape-sequences [true|false|parse]
    --unicode-expressions [true|false|parse]
    --annotations [true|false|parse]
    --array-comprehension [true|false|parse]
    --async-functions [true|false|parse]
    --exponentiation [true|false|parse]
    --generator-comprehension [true|false|parse]
    --symbols [true|false|parse]
    --types [true|false|parse]
    --member-variables [true|false|parse]
    --comment-callback
    --debug
    --free-variable-checker
    --type-assertions
    --validate

  Examples:

    $ traceur a.js [args]
    $ traceur --out compiled.js b.js c.js
    $ traceur --dir indir outdir

*/

