"use strict";
var gulp = require( "gulp" ),
  config = require( "../config.paths.js" );

// build/tests
//    -- clean build/tests
//    -- symlink like dev but to build/tests
//    -- vendor like dev but to build/tests + mocha and chai
//    -- Compile to build/tests
//      -- traceur
//      -- less
//    -- run tests/index.tests.js
