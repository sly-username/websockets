/*eslint no-process-env:0, valid-jsdoc:0, no-unused-vars:0*/
"use strict";
var gulp = require( "gulp" ),
  gutil = require( "gulp-util" ),
  run = require( "run-sequence" ),
  fs = require( "fs" ),
  requiredir = require( "requiredir" ),
  dotenv = require( "dotenv" ),
  config = require( "./config.paths.js" ),
  dummy,
  currentTasks;

// load .env file into process.env
dotenv.load();

// get array of currently running tasks
currentTasks = process.argv.reduce(
  function( prev, curr ) {
    if ( prev.consume ) {
      prev.list.push( curr );
    } else if ( ( /gulp(\.js)?$/ ).test( curr ) ) {
      prev.consume = true;
    }
    return prev;
  }, {
    consume: false,
    list: []
  }
).list.filter( function( name ) { return !( /(^--)|(\/)/g ).test( name ); });

// assume default
if ( currentTasks.length === 0 && process.argv.length === 2 ) {
  currentTasks.push( "default" );
}

// rewrite stdout & stderr write functions to write to log
( function( ogout, ogerr ) {
  var taskNames, filename, createWrite;

  // if no valid task names, or in TravisCI don't overwrite write.
  if ( currentTasks.length === 0 || process.env.TRAVIS === "true" ) {
    // don't rewrite
    return;
  }

  taskNames = currentTasks.join( "_" ).replace( /:/g, "-" );

  filename = config.logging.createDatedLogFile(
    config.logging.gulp, taskNames, new Date()
  );

  createWrite = function( originalStream ) {
    return process.env.GULP_LOG_TO_CONSOLE === "TRUE" ?
      function( chunk ) {
        fs.appendFile( filename, chunk );
        originalStream.apply( this, arguments );
      } :
      function( chunk ) {
        fs.appendFile( filename, chunk );
      };
  };

  // rewrite stdout
  process.stdout.write = createWrite( ogout );

  // rewrite stderr
  process.stderr.write = createWrite( ogerr );
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
    "build:tests:only",
    "server:dev",
    [
      "less:watch",
      "jscs:watch",
      "lint:watch",
      "traceur:watch"
    ],
    "jscs:client",
    "lint:client",
    "tdd",
    done
  );
});

/*** TESTING TASKS ***/
gulp.task( "build:tests:only", function( done ) {
  run(
    [
      "symlink:tests",
      "vendor:tests",
      "build:tests:index"
    ],
    done
  );
});

gulp.task( "build:tests", function( done ) {
  run(
    "build:dev",
    "build:tests:only",
    done
  );
});

gulp.task( "test", function( done ) {
  run(
    "build:tests",
    "karma:once",
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
