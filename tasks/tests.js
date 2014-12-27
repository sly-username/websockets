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
      "vendor:tests"
//      "traceur:tests", todo
//      "less:tests" todo
    ],
//    "build:tests:index", todo
    done
  );
});
