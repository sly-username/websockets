( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDGenre", function() {
    var EDGenre,
      genreProperties = [
        "id",
        "type",
        "name"
      ];

    suiteSetup( function( done ) {
      System.import( "domain/ed/objects/EDGenre" )
        .then( function( imported ) {
          EDGenre = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'EDGenre' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    suite( "Properties", function() {
      genreProperties.forEach( function( value ) {
        suite( value, function() {
          test( "should have '" + value + "' property", function() {
            var args = {},
              edGenre = new EDGenre( args );

            expect( edGenre )
              .to.have.property( value );
          });

          test( "should not be able to set '" + value + "' property", function() {
            var args = {},
              inputtedValue = "string value I inputted",
              edGenre = new EDGenre( args ),
              setProperty = function() {
                edGenre[ value ] = inputtedValue;
              };

            expect( setProperty )
              .to.throw( TypeError );
          });
        });
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
