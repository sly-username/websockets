/*global suite, suiteSetup, test, console*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDCollection", function() {
    var EDCollection, iteratorSym;

    suiteSetup( function( done ) {
      System.import( "domain/ed/storage/EDCollection" )
      .then( function( imported ) {
        EDCollection = imported.default;
        iteratorSym = Object.getOwnPropertySymbols( new EDCollection( [ "ids", "type" ] ) )[0];

        done();
      }, function( error ) {
        console.warn( "Could not import 'EDCollection' for testing: ", error.message );
        console.error( error.stack );
        done( error );
      });
    });

// Tests begin
    suite( "Methods", function() {
      suite( "get( index )", function() {
        test( "returns a promise that resolves to the data for the id at the given index", function() {
          // returns this.ids[ index ]
          // expect to be an instance of EDDataObject
        });
      });

      suite( "getRange( indexFrom, indexTo )", function() {
        test( "default value for indexFrom parameter is 0", function() {
          // expect( indexFrom )
          //  .to.equal( 0 );
        });

        test( "if indexTo is not specified, getRange will extract to end of array", function() {
          // expect( indexTo )
          //  .to.equal( arr.length);
        });

        test( "returns range specified by parameters", function() {
          // pass whatever array, and see it the correct range is returned
          // via values or index numbers
        });

        test( "returns an array of promises for ids in the range", function() {
          // pass whatever array
          // see if array of promises is for the correct range
        });
      });

      suite( "getAll()", function() {
        test( "returns an array of promises for all items in the this.ids array", function() {
          // pass whatever array
          // expect a return of array of promises for all items in array
        });
      });

      suite( "iterator does things", function() {
        test( "the test", function() {
          // good job test
        });
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
