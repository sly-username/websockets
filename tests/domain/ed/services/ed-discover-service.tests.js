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

    suite( "Properties", function() {
      suite( "currentProfileBlend", function() {
        test( "edService has 'currentProfileBlend' property", function() {
          expect( edDiscoverService )
            .to.have.property( "currentProfileBlend" );
        });

        test( "is an array of EDGenre objects", function() {
          expect( edDiscoverService.currentProfileBlend )
            .to.be.an( "array" );
            // .that.deep.equals( "i have no idea what; is this even necessary" );
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
            getTrackSpy = sinon.spy( this, "getTrackID" );

          edDiscoverService.getDiscoverTrackList( edGenre.id );

          expect( getTrackSpy )
            .to.have.callCount( 1 );
        });

        test( "'profileBlend' is a valid parameter", function() {
          var getTrackSpy = sinon.spy( this, "getGenreID" );

          edDiscoverService.getDiscoverTrackList( "profileBlend" );

          expect( getTrackSpy )
            .to.have.callCount( 1 );
        });

        test( "when invalid parameter is used, an error is thrown", function() {
          var badParameter = "UNACCEPTABLE!",
            badParams = edDiscoverService.getDiscoverTrackList( badParameter );

          expect( badParams )
            .to.throw( Error );
        });
      });

      suite( "setCurrentProfileBlend", function() {
        test( "creates new currentProfileBlend array with genres chosen by user", function() {
          // TODO not sure how this will happen
        });

        test( "after successful response from server, should return array", function() {
          var setCurrentBlend = edDiscoverService.setCurrentProfileBlend();

          expect( setCurrentBlend )
            .to.be.an( "array" );
        });
      });
    });

    suite( "helper functions", function() {
      suite( "getTrackID", function() {
        test( "after successful response from server, should return array", function() {
          var genreData =
            {
              id: 999
            },
            edGenre = new EDGenre( genreData ),
            trackServiceReturn = edDiscoverService.getTrackID( edGenre.id );

          expect( trackServiceReturn )
            .to.be.an( "array" );
        });
      });

      suite( "getGenreID", function() {
        test( "after successful response from server, should return array", function() {
          var genreServiceReturn = edDiscoverService.getGenreID();

          expect( genreServiceReturn )
            .to.be.an( "array" );
        });
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
