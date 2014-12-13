/*eslint no-process-env:0, valid-jsdoc:0*/
"use strict";
var gulp = require( "gulp" ),
  gutil = require( "gulp-util" ),
  run = require( "run-sequence" ),
  requiredir = require( "requiredir" ),
  dotenv = require( "dotenv" ),
  dummy;

dotenv.load();

// load gulp tasks from ./tasks
/*eslint no-unused-vars:0*/
/* jshint -W098 */
dummy = requiredir( "./tasks" );

/*** MAGIC "START" TASK ***/
gulp.task( "start", function( done ) {
  gutil.log( "running task for env: " + process.env.GULP_ENVIRONMENT );

  switch ( process.env.GULP_ENVIRONMENT ) {
    case "DEVELOPMENT":
      run( "dev", done );
      break;
    case "PRODUCTION":
      run( "prod", done );
      break;
    case "QA":
      // do QA task ?
      gutil.log( "Task has not been created yet" );
      done();
      break;
    default:
      run( "default", done );
      break;
  }
});

/* TODO Need a watch task? */
gulp.task( "watch", function( done ) {
  run(
    [
      "less:watch",
//      "jscs:watch", // not working currently
      "traceur:watch"
    ],
    done
  );
});

/*** DEVELOPMENT BUILD TASK ***/
gulp.task( "build:dev", function( done ) {
  run(
    "clean:dev",
    "jscs:client", // todo also run other jscs tasks?
    [
      "less:dev",
      "symlink:dev",
      "vendor:dev",
      "traceur:dev"
    ],
    done
  );
});

/*** MAIN DEVELOPMENT TASK ***/
gulp.task( "dev", function( done ) {
  run(
    "build:dev",
    "server:dev",
    [
      "less:watch",
      "jscs:watch", // doesn't work, but also doesn't break anything
      "traceur:watch"
    ],
    done
  );
});

/*** PRODUCTION BUILD TASK ***/
gulp.task( "build:prod", function( done ) {
  gutil.log( "TODO THIS TASK" );
  done();
});

/*** MAIN PRODUCTION TASK ***/
gulp.task( "prod", function( done ) {
  run( "build:prod", done );
});

/*** BUILD ALL THE THINGS ***/
gulp.task( "build", [ "build:dev", "build:prod" ]);

/*** GULP DEFAULT IS START ***/
gulp.task( "default", [ "start" ]);
