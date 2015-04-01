( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDFan", function() {
    var EDFan;

    this.timeout( 5000 );

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

      test( "should not be able to set 'birthday' property", function() {
        var args = {
            birthday: "01/01/01"
          },
          edFan = new EDFan( args ),
          setProperty = function() {
            edFan.birthday = "02/02/02";
          };

        expect( setProperty )
          .to.throw( TypeError );
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
