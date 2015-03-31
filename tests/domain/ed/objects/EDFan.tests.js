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
      test( "EDProfile should have the following properties: 'birthday', 'name'", function() {
        var args = {},
          edFan = new EDFan( args );

        expect( edFan )
          .to.have.property( "birthday" );

        expect( edFan )
          .to.have.property( "name" );
      });

      test( "property 'name' should be an object", function() {
        // wouldn't it always be an object? is this necessary?
        var args = {
            name: {
              first: "sly",
              last: "sylvia"
            }
          },
          edFan = new EDFan( args );

        expect( edFan.name )
          .to.be.an( "object" );
      });

      test( "property 'birthday' should be a string", function() {
        var args = {
          birthday: "01/01/01" // not sure how we're formatting this
        },
          edFan = new EDFan( args );

        expect( edFan.birthday )
          .to.be.an( "string" );
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
