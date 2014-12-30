/*jscs:disable requirePaddingNewLinesInObjects */
"use strict";
// Read ./index.tests.html
// Find all files matching "client/components/**/*.test.html"
// Add <link> tag for each component test file
// Write out to build/tests/index.html

var gulp = require( "gulp" ),
  gutil = require( "gulp-util" ),
  through = require( "through2" ),
  config = require( "../config.paths.js" ),
  separator = require( "path" ).sep,
  toReplace = "<!-- INCLUDE COMPONENT TEST FILES -->",
  getTestFileList,
  transformFileListToImports,
  buildIndexPage;

// Return promise that revolves to an array of absolute file names
getTestFileList = function() {
  return new Promise( function( resolve, reject ) {
    var files = [];
    // Gulp me the file names! But don't read the files
    gulp.src( config.scripts.componentTests, { read: false })
      .pipe( through({
          objectMode: true
        },
        function( file, enc, done ) {
          // clean path to be relative to build folder
          files.push( file.path.replace( config.client + separator, "" ) );
          done( null );
        },
        function( done ) {
          // return promise with full list
          resolve( files );
          done();
        }
      ) )
      .on( "error", function( err ) {
        // if there was an error reject that promise!
        reject( err );
      });
  });
};

transformFileListToImports = function( files ) {
  return files.map( function( path ) {
    return "<link rel=\"import\" href=\"" + path + "\" />";
  });
};

buildIndexPage = function( toReplace, imports ) {
  return through.obj( function( file, enc, done ) {
    file.contents = new Buffer( file.contents.toString( "utf8" ).replace( toReplace, imports ) );
    file.path = file.path.replace( /\.tests\.html$/, ".html" );
    done( null, file );
  });
};

gulp.task( "build:tests:index", function() {
  return getTestFileList().then( function( files ) {
    return gulp.src( config.testsIndex )
      .pipe( buildIndexPage( toReplace, transformFileListToImports( files ) ) )
      .pipe( gulp.dest( config.testsBuild ) );
  });
});
