
var gulp        = require("gulp"),
    gutil       = require("gulp-util"),
    run         = require("run-sequence"),
    requiredir  = require("requiredir"),
    dotenv      = require("dotenv");

dotenv.load();

// load gulp tasks from ./tasks
var dummy = requiredir("./tasks");

/* Watch task? */
gulp.task("watch", ["less:watch"]);



/* MAGIC "START" TASK */
gulp.task("start", function(done){
  var myEnv = process.env.GULP_ENVIRONMENT;

  gutil.log("running task for env: " + myEnv);

  if ( myEnv === "DEVELOPMENT" ) {
    run( "dev", done );
  } else if ( myEnv === "PRODUCTION" ) {
    run( "prod", done );
  } else if ( myEnv === "QA" ){
    // do QA task ?
    gutil.log("Task has not been created yet");
    done();
  } else {
    run( "default", done );
  }
});



/* DEVELOPMENT BUILD TASK */
gulp.task("build:dev", function(done){
  run(
    "clean:dev",
    ["less:dev", "symlink:dev", "vendor:dev"],
    done
  );
});

/* MAIN DEVELOPMENT TASK */
gulp.task("dev", function(done){
  run(
    "build:dev",
    ["server:dev", "less:watch"],
    done
  );
});



/* PRODUCTION BUILD TASK */
gulp.task("build:prod", function(done){
  gutil.log("TODO THIS TASK");
  done();
});



/* MAIN PRODUCTION TASK */
gulp.task("prod", function(done){
  run( "build:prod", done );
});


gulp.task("default", ["build:dev", "build:prod"]);

