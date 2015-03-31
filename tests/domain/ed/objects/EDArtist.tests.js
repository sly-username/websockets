( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDArtist", function() {
    var EDArtist;

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
      suite( "Properties", function() {
        test( "EDArtist should have the following properties: 'artistName', 'yearFounded', and 'website'", function() {
          var artistInfo = {},
            edArtist = new EDArtist( artistInfo );

          expect( edArtist )
            .to.have.property( "artistName" );

          expect( edArtist )
            .to.have.property( "yearFounded" );

          expect( edArtist )
            .to.have.property( "website" );
        });

        test( "'artistName' property should be a string", function() {
          var inputtedProperty = "sly",
            artistInfo = {
              artistName: inputtedProperty
            },
            edArtist = new EDArtist( artistInfo );

          expect( edArtist.artistName )
            .to.be.a( "string" )
            .that.equals( inputtedProperty );
        });

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

        test( "'website' property should be a string", function() {
          var inputtedProperty = "www.sly.ninja",
            artistInfo = {
              website: inputtedProperty
            },
            edArtist = new EDArtist( artistInfo );

          expect( edArtist.website )
            .to.be.a( "string" )
            .that.equals( inputtedProperty );
        });
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
