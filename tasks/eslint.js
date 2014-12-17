"use strict";
var gulp = require( "gulp" ),
  eslint = require( "gulp-eslint" ),
  config = require( "../config.paths.js" ),
  options,
  runForPathWithOptions,
  watchPathWithOptionsAndName,
  registerTaskPair;

// might not be needed
options = {};

// default lint task
gulp.task( "lint", [ "lint:all" ]);
