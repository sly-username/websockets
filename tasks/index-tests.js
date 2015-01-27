/*jscs:disable requirePaddingNewLinesInObjects */
"use strict";
// Read ./tests.html
// Find all files matching "client/components/**/*.test.html"
// Add <link> tag for each component test file
// Write out to build/tests/index.html

var gulp = require( "gulp" ),
//  gutil = require( "gulp-util" ),
  through = require( "through2" ),
  config = require( "../config.paths.js" ),
  path = require( "path" ),
  separator = path.sep,
  toReplace = {
    imports: "<!-- INCLUDE COMPONENT TEST FILES -->",
    wrappers: "<!-- INCLUDE TEST WRAPPERS -->"
  },
  getTestFileList,
  pathToElementName,
  transformFileListToImports,
  transformFileListToTestWrappers,
  buildIndexPage;

// Return promise that revolves to an array of absolute file names
getTestFileList = function() {
  return new Promise( function( resolve, reject ) {
    var files = [];
    // Gulp me the file names! But don't read the files
    gulp.src( config.testing.client.html, { read: false })
      .pipe(
        through({ objectMode: true },
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
        )
      ).on( "error", function( err ) {
        // if there was an error reject that promise!
        reject( err );
      });
  });
};

pathToElementName = function( filePath, extension ) {
  extension = extension || ".tests.html";
  return path.basename( filePath, extension );
};

// Create an array of <link rel="import" /> elements for files in array
transformFileListToImports = function( files ) {
  return files.map( function( thisPath ) {
    return "<link" +
      " id=\"tests-import-" + pathToElementName( thisPath ) + "\"" +
      " rel=\"import\"" +
      " href=\"" + thisPath + "\" />";
  });
};

// Create an array of <div id="element-name-test-wrapper" class="hidden"></div>
// elements for files in the array, these get added for testing purposes
transformFileListToTestWrappers = function( files ) {
  return files.map( function( thisPath ) {
    return "<div" +
      " id=\"" + pathToElementName( thisPath ) + "-test-wrapper\"" +
      " class=\"hidden\"></div>";
  });
};

// Gulp Plugin style testing index page builder
buildIndexPage = function( replaceString, imports ) {
  return through.obj( function( file, enc, done ) {
    file.contents = new Buffer(
      file.contents.toString( "utf8" ).replace( replaceString, imports.join( "\n  " ) )
    );
    done( null, file );
  });
};

// build the tests.html page
gulp.task( "build:tests:index", function() {
  return getTestFileList().then( function( files ) {
    return gulp.src( config.testing.index )
      .pipe( buildIndexPage( toReplace.imports, transformFileListToImports( files ) ) )
      .pipe( buildIndexPage( toReplace.wrappers, transformFileListToTestWrappers( files ) ) )
      .pipe( gulp.dest( config.dev ) );
  });
});
