/*eslint no-process-env:0, valid-jsdoc:0*/
"use strict";
var gulp = require( "gulp" ),
  gutil = require( "gulp-util" ),
  run = require( "run-sequence" ),
  fs = require( "fs" ),
  nodemon = require( "nodemon" ),
  requiredir = require( "requiredir" ),
  dotenv = require( "dotenv" ),
  config = require( "./config.paths.js" ),
  dummy;

dotenv.load();

// load gulp tasks from ./tasks
/*eslint no-unused-vars:0*/
/* jshint -W098 */
dummy = requiredir( "./tasks" );
gulp.task( "nodemon", function ( done ) {
  var currDate = new Date(),
    readableDate = currDate.getMonth() + "-" + currDate.getDate() + "-" + currDate.getFullYear();
  nodemon({
    script: "node_modules/gulp/bin/gulp.js",
    stdout: false,
    stderr: false
  }).on( "readable", function () {
    this.stdout.setMaxListeners( 0 );
    this.stderr.setMaxListeners( 0 );
    this.stdout.pipe( fs.createWriteStream( "logs/gulp/nodemon." + readableDate + ".log" ) );
    this.stderr.pipe( fs.createWriteStream( "logs/gulp/nodemon." + readableDate + ".log" ) );
  }).on( "stdout", function ( data ) {
    console.log( data.toString().trim() );
  }).on( "stderr", function ( data ) {
    console.log( data.toString().trim() );
  });
  done();

});

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
