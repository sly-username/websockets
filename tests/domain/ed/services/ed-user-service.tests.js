( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "CreateEvent", function() {
    var userService;

    suiteSetup( function( done ) {
      System.import( "domain/lib/event/user-service" )
        .then( function( imported ) {
                 userService = imported.default;
                 done();
               }, function( error ) {
                 console.warn( "Could not import 'user-service' for testing: ", error.message );
                 console.error( error.stack );
                 done( error );
               });
    });

// Tests begin
    suite( "Properties", function() {
      test( "currentUser", function() {

      });

      test( "")
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
