"use strict";
var gulp = require( "gulp" ),
  run = require( "run-sequence" ),
  config = require( "../config.paths.js" );

// build/tests
//    -- clean build/tests
//    -- symlink like dev but to build/tests
//    -- vendor like dev but to build/tests + mocha and chai
//    -- Compile to build/tests
//      -- traceur
//      -- less
//    -- run tests/index.tests.js

gulp.task( "build:tests", function( done ) {
  run(
    "clean:tests",
    [
      "symlink:tests",
//      "copy:tests",
      "vendor:tests",
      "traceur:tests",
      "less:tests"
    ],
    "build:tests:index",
    done
  );
});

// TODO Test Watchers
gulp.task( "tests:watch", function( done ) {
  run(
    "build:tests",
    [
      "traceur:watch:tests",
      "less:watch:tests"
    ],
    done
  );
});

// TODO Karma task
gulp.task( "tests", function( done ) {
  run(
    "build:tests",
//    "karma:once",
    done
  );
});

// TODO Karma and Watchers
gulp.task( "tests:watch", function( done ) {
  run(
    "build:tests",
//    "karma:watch",
    done
  );
});
