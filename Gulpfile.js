/*eslint no-process-env:0, valid-jsdoc:0, no-unused-vars:0*/
"use strict";
var gulp = require( "gulp" ),
  gutil = require( "gulp-util" ),
  run = require( "run-sequence" ),
  fs = require( "fs" ),
  join = require( "path" ).join,
  requiredir = require( "requiredir" ),
  dotenv = require( "dotenv" ),
  config = require( "./config.paths.js" ),
  dummy;

// load .env file into process.env
dotenv.load();

// rewrite stdout & stderr write functions to write to log
( function( ogout, ogerr ) {
  var shouldLog = process.env.GULP_LOG_TO_CONSOLE === "TRUE",
    writeToLog = ( function() {
      var now = new Date(),
        filename = join( config.logs, "gulp",
          "build-log_" +
            now.getHours() + "-" +
            now.getMinutes() + "_" +
            ( 1 + now.getMonth() ) + "-" +
            now.getDate() + "-" +
            now.getFullYear() +
          ".log"
        );

      return function( chunk ) {
        fs.appendFile( filename, chunk );
      };
    })();

  // rewrite stdout
  process.stdout.write = function( chunk ) {
    writeToLog( chunk );

    if ( shouldLog ) {
      ogout.apply( this, arguments );
    }
  };

  // rewrite stderr
  process.stderr.write = function( chunk ) {
    writeToLog( chunk );

    if ( shouldLog ) {
      ogerr.apply( this, arguments );
    }
  };
})( process.stdout.write, process.stderr.write );

// load gulp tasks from ./tasks
/* jshint -W098 */
dummy = requiredir( "./tasks" );

/*** MAGIC "START" TASK ***/
gulp.task( "start", function( done ) {
  gutil.log( ( new Date() ).toString() );
  gutil.log( "Running task for env: " + process.env.GULP_ENVIRONMENT );

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

/* TODO Do we need a watch task? */
gulp.task( "watch", function( done ) {
  run(
    [
      "less:watch",
      "jscs:watch",
      "lint:watch",
      "traceur:watch"
    ],
    done
  );
});

/*** DEVELOPMENT BUILD TASK ***/
gulp.task( "build:dev", function( done ) {
  run(
    "clean:dev",
    "jscs:client",
    "lint:client",
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
      // todo make specific 'watch:dev' tasks?
      "less:watch",
      "jscs:watch",
      "lint:watch",
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
