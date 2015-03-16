/*eslint-env mocha*/
/*global suite, test, console*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDDataObject", function() {
    var EDDataObject;

    suiteSetup( function( done ) {
      System.import( "domain/ed/ed-data-object/EDDataObject" )
        .then( function( imported ) {
          EDDataObject = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'EDDataObject' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    suite( "EDDataObject creation", function() {
      test( "Constructor has expected property", function() {
        var data = {
            id: "test",
            type: "object"
          },
          edData = new EDDataObject( data );

        expect( edData )
          .to.have.property( "id" )
          .to.be.a( "string" )
          .that.equals( "test" );
        expect( edData )
          .to.have.property( "type" )
          .to.be.a( "string" )
          .that.equals( "object" );
      });

      test( "Constructor toStringTag functional", function() {
        var data = {
            id: "test",
            type: "object"
          },
          edData = new EDDataObject( data );

        expect( edData.toString() ).to.equals( "[object EDDataObject]" );
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
