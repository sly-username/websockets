/*eslint no-process-env:0 */
"use strict";
var gulp = require( "gulp" ),
  fs = require( "fs" ),
  join = require( "path" ).join,
  nodemon = require( "nodemon" ),
  config = require( "../config.paths.js" ),
  loggingEnabled = process.env.GULP_LOG_TO_CONSOLE === "TRUE",
  createFileName;

createFileName = function( date ) {
  date = date || new Date();

  return "build-log_" +
    date.getHours() + "-" + date.getMinutes() + "_" +
    ( 1 + date.getMonth() ) + "-" + date.getDate() + "-" + date.getFullYear() +
    ".log";
};

// Default nodemon task
gulp.task( "nodemon", function( done ) {
  var fileName = join( config.nodemon.logs.gulp, createFileName() ),
    logFile = fs.createWriteStream( fileName );

  nodemon({
    script: config.nodemon.gulp,
    args: [ "start" ],
    stdin: false,
    stdout: false,
    stderr: false
  }).on( "readable", function() {
    // Infinite listeners
    this.stdout.setMaxListeners( 0 );
    this.stderr.setMaxListeners( 0 );

    // Pipe into logFile stream
    this.stdout.pipe( logFile );
    this.stderr.pipe( logFile );

    if ( loggingEnabled ) {
      this.stdout.pipe( process.stdout );
      this.stderr.pipe( process.stderr );
    }
  });

  /*
  .on( "stdout", function( data ) {
    console.log( data.toString().trim() );
  }).on( "stderr", function( data ) {
    console.log( data.toString().trim() );
  });
  */

  done();
});
