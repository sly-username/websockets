( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "edDiscoverService", function() {
    var edDiscoverService, edUserService, EDGenre;

    suiteSetup( function( done ) {
      Promise.all( [
        System.import( "domain/ed/services/ed-discover-service" ),
        System.import( "domain/ed/services/ed-user-service" ),
        System.import( "domain/lib/event/EventEmitter" ),
        System.import( "domain/lib/event/create-event" )
      ] )
        .then( function( imported ) {
          edDiscoverService = imported[0].default;
          edUserService = imported[1].default;
          EventEmitter = imported[2].default;
          createEvent = imported[3].default;
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
        test( "can take in EDGenre object as a parameter", function() {
          var genreData = {
                name: "bluegrass"
              },
            edGenre = new EDGenre( genreData ),
            valid = edDiscoverService.getDiscoverSongList( edGenre );

          expect( valid )
            .to.be( "ok" );
          // not sure what to test
        });

        test( "can take in 'blend' as a parameter", function() {
          var valid = edDiscoverService.getDiscoverSongList( "blend" );

          expect( valid )
            .to.be( "ok" );
          // yup, I got nothing.
        });

        test( "when invalid parameter is used, an error is thrown", function() {
          var badParameter = "UNACCEPTABLE!",
            invalid = edDiscoverService.getDiscoverSongList( badParameter );

          expect( invalid )
            .to.throw( Error );
        });

        suite( "blend parameter", function() {
          test( "when sending server 'blend' request, if successful, server returns an array of genreIDs", function() {

          });

          test( "send genreIDs to server", function() {

          });

          test( "when server responds with songIDs, all songs are pushed to single songList array", function() {

          });
        });

        suite( "EDGenre parameter", function() {
          test( "send genreIDs to server", function() {

          });

          test( "when server provides list of songIDs, songs are pushed to songList array", function() {

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
