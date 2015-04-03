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
      suite( "getDiscoverSongList", function() {
        test( "EDGenre object is a valid parameter", function() {
          var genreData =
              {
                id: 999
              },
            edGenre = new EDGenre( genreData ),
            valid = edDiscoverService.getDiscoverSongList( edGenre.id );

          expect( valid )
            .to.be( "ok" );
          // expect getSongID to get called
        });

        test( "'profileBlend' is a valid parameter", function() {
          var valid = edDiscoverService.getDiscoverSongList( "profileBlend" );

          expect( valid )
            .to.be( "ok" );
          // expect getGenreID to get called
        });

        test( "when invalid parameter is used, an error is thrown", function() {
          var badParameter = "UNACCEPTABLE!",
            invalid = edDiscoverService.getDiscoverSongList( badParameter );

          expect( invalid )
            .to.throw( Error );
          // expect an error, I suppose
        });

        suite( "EDGenre", function() {
          test( "should call getSongID function", function() {
            var genreData =
              {
                id: 999
              },
              edGenre = new EDGenre( genreData ),
              request = edDiscoverService.getDiscoverSongList( edGenre.id ),
              songSpy = sinon.spy( edDiscoverService, getSongID );
          });

          test( "should receive message from the server", function() {
            // TODO how would we ever test this? create a websocket?
            var genreData =
              {
                id: 999
              },
              edGenre = new EDGenre( genreData ),
              request = edDiscoverService.getDiscoverSongList( edGenre.id );

            expect( request )
              .to.be.an( "array" )
              .that.equals( "currentProfileBlend" );
          });
        });



        suite( "profileBlend parameter", function() {
          test( "returns an array of genreIDs", function() {
            // save as new currentProfileBlend
            // expect currentProfileBlend to be an array
            var request = edDiscoverService.getGenreIDs( "profileBlend" );

            expect( request )
              .to.be.an( "array" );
          });
        });
      });

      suite( "setCurrentProfileBlend", function() {
        test( "creates new currentProfileBlend array with genres chosen by user", function() {

        });
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
