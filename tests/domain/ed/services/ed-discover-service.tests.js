( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "edDiscoverService", function() {
    var edDiscoverService, EventEmitter, createEvent;

    suiteSetup( function( done ) {
      Promise.all( [
        System.import( "domain/ed/services/ed-discover-service" ),
        System.import( "domain/lib/event/EventEmitter" ),
        System.import( "domain/lib/event/create-event" )
      ] )
        .then( function( imported ) {
          edDiscoverService = imported[0].default;
          EventEmitter = imported[1].default;
          createEvent = imported[2].default;
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
        test( "is an array", function() {

        });

        test( "is an array of EDGenre objects", function() {

        });
      });
    });

    suite( "Methods", function() {
      suite( "getDiscoverSongList", function() {
        test( "can only take in EDGenre object or 'blend' as parameters", function() {

        });

        suite( "blend parameter", function() {
          test( "blend is a string", function() {

          });

          test( "when sending server blend request, server returns an array of genreIDs", function() {

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
