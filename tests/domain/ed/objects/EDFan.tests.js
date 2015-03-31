( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDFan", function() {
    var EDFan;

    suiteSetup( function( done ) {
      System.import( "domain/ed/objects/EDFan" )
        .then( function( imported ) {
          EDFan = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'EDFan' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    suite( "Properties", function() {
      test( "EDFan should have 'birthday' property", function() {
        var args = {},
          edFan = new EDFan( args );

        expect( edFan )
          .to.have.property( "birthday" );
      });

      test( "'birthday' property should be a string", function() {
        var args = {
          birthday: "01/01/01"
        },
          edFan = new EDFan( args );

        expect( edFan.birthday )
          .to.be.a( "string" );
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
