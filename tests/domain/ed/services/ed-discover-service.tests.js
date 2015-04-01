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
          edUserService = imported[0].default;
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

    suite( "tests test TEEEEEESSSSSSSSSSSSSTS", function() {
      tests( "test 1", function() {
        // ready set ... test!
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
