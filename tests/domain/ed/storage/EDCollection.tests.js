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
        test( "returns a promise that resolves to the data for the id at the given index", function( done ) {
          var edc = new EDCollection( "track", [ 435, 61, 788, 92 ]),
            getFxn = edc.get( 1 );

          expect( getFxn )
            .to.be.an.instanceof( edc.Promise )
            .that.eventually.equals( 61 ).notify( done );

          done();
        });
      });

      suite( "getRange( indexFrom, indexTo )", function() {
        test( "default value for indexFrom parameter is 0", function() {
          var edc = new EDCollection( "track", [ 435 ]),
            getRangeFxn = edc.getRange();

          expect( getRangeFxn )
            .to.eventually.equal( [ 435 ] );
        });

        test( "if indexTo is not specified, getRange will extract to end of array", function() {
          var edc = new EDCollection( "track", [ 435, 61, 788, 92 ]),
            getRangeFxn = edc.getRange( 1 );

          expect( getRangeFxn )
            .to.eventually.equal( [ 61, 788, 92 ] );
        });

        test( "returns an array of promises for ids in the range", function() {
          var edc = new EDCollection( "track", [ 435, 61, 788, 92 ]),
            getRangeFxn = edc.getRange( 1, 3 );

          expect( getRangeFxn )
            .to.eventually.equal( [ 61, 788 ] );
        });
      });

      suite( "getAll()", function() {
        test( "returns an array of promises for all items in the this.ids array", function() {
          var edc = new EDCollection( "track", [ 435, 61, 788, 92 ]),
            getAllFxn = edc.getAll();

          expect( getAllFxn )
            .to.eventually.equal([ 435, 61, 788, 92 ]);
        });
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
