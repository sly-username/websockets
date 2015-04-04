/*eslint-env mocha*/
/*global suite, test, console*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDLRUCache", function() {
    var EDLRUCache;

    suiteSetup( function( done ) {
      System.import( "domain/ed/storage/EDLRUCache" )
        .then( function( imported ) {
          EDLRUCache = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'EDLRUCache' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    suite( "EDLRUCache creation", function() {
      test( "constructor has expected properties", function() {
        var edCache = new EDLRUCache( 10 );

        expect( edCache )
          .to.have.property( "limit" )
          .to.be.a( "number" )
          .that.equals( 10 );

        expect( edCache )
          .to.have.property( "size" )
          .to.be.a( "number" )
          .that.equals( 0 );
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
