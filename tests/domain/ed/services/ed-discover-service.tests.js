( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "edDiscoverService", function() {
    var edDiscoverService, EDGenre;

    suiteSetup( function( done ) {
      Promise.all( [
        System.import( "domain/ed/services/ed-discover-service" ),
        System.import( "domain/ed/objects/EDGenre" )
      ] )
        .then( function( imported ) {
          edDiscoverService = imported[0].default;
          EDGenre = imported[1].default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'edDiscoverService' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        } );
    } );

// Tests begin
    suite( "Properties", function() {
      suite( "currentProfileBlend", function() {
        test( "edService has 'currentProfileBlend' property", function() {
          expect( edDiscoverService )
            .to.have.property( "currentProfileBlend" );
        });

        test( "is an array of EDGenre objects", function() {
          expect( edDiscoverService.currentProfileBlend )
            .to.be.an( "array" );
            // .that.deep.equals( "i have no idea what" );
        });
      });
    });

    suite( "Methods", function() {
      suite( "getDiscoverTrackList", function() {
        test( "EDGenre object is a valid parameter", function() {
          var genreData =
            {
              id: 999
            },
            edGenre = new EDGenre( genreData ),
            valid = edDiscoverService.getDiscoverTrackList( edGenre.id );

          expect( valid )
            .to.be( "ok" );
          // expect getTrackID to get called?
        });

        test( "'profileBlend' is a valid parameter", function() {
          var valid = edDiscoverService.getDiscoverTrackList( "profileBlend" );

          expect( valid )
            .to.be( "ok" );
          // expect getGenreID to get called?
        });

        test( "when invalid parameter is used, an error is thrown", function() {
          var badParameter = "UNACCEPTABLE!",
            invalid = edDiscoverService.getDiscoverTrackList( badParameter );

          expect( invalid )
            .to.throw( Error );
          // expect an error, I suppose
        });

        test( "should receive message from the server", function() {
          // TODO how would we ever test this? create a websocket?
          var genreData =
            {
              id: 999
            },
            edGenre = new EDGenre( genreData );

          edDiscoverService.getDiscoverTrackList( edGenre.id );

          expect( getTrackSpy )
            .to.have.callCout( 1 );
        });
      });

      suite( "setCurrentProfileBlend", function() {
        test( "creates new currentProfileBlend array with genres chosen by user", function() {

        });
      });
    });

    suite( "helper functions", function() {
      suite( "getTrackID", function() {
        // TODO when track id request is successful
        test( "not sure what should be tested", function() {

        });
      });

      suite( "getGenreID", function() {
        test( "should receive message from the server", function() {

        });
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
