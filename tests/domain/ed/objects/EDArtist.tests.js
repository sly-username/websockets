( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDArtist", function() {
    var EDArtist;

    this.timeout( 5000 );

    suiteSetup( function( done ) {
      System.import( "domain/ed/objects/EDArtist" )
        .then( function( imported ) {
          EDArtist = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'EDArtist' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    suite( "EDArtist creation", function() {
      test( "'yearFounded' property should be a string", function() {
        var inputtedProperty = "01/01/01",
          artistInfo = {
            yearFounded: inputtedProperty
          },
          edArtist = new EDArtist( artistInfo );

        expect( edArtist.yearFounded )
          .to.be.a( "string" )
          .that.equals( inputtedProperty );
      });

      test( "'yearFounded' property should not be able to be reset", function() {
        var inputtedProperty = "01/01/01",
          artistInfo = {
            yearFounded: inputtedProperty
          },
          edArtist = new EDArtist( artistInfo ),
          setProperty = function() {
            edArtist.yearFounded = "02/02/02";
          };

        expect( setProperty )
          .to.throw( TypeError );
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
