( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "CustomEvents", function() {
    var CustomEvents;

    suiteSetup( function( done ) {
      System.import( "domain/lib/event/CustomEvents" )
        .then( function( imported ) {
          CustomEvents = imported.default;
        }, function( error ) {
          console.warn( "Could not import 'CustomEvents' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    // Tests begin
    suite( "browser support", function() {
      test( "if browser doesn't support CustomEvent constructor, deprecated createEvent constructor is used, ", function() {
        var event = new CustomEvents( "parameters" );

      });

      test( "if browser doesn't support CustomEvent constructor, error is thrown, ", function() {
        var event = new CustomEvents( "parameters" );

      });

      test( "if browser supports CustomEvent constructor, that constructor is used, ", function() {
        var event = new CustomEvents( "parameters" );

      });
    });

    suite( "second category", function() {
      test( "are there any other tests that are needed?", function() {

      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
