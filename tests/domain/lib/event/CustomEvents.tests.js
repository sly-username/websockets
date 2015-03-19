( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EventEmitter", function() {
    var EventEmitter, handlerMapSym;

    suiteSetup( function() {
      System.import( "domain/lib/event/CustomEvents" )
        .then( function( imported ) {
                 //var hws;
                 //HealingWebSocket = imported[ 0 ].default;
                 //EventEmitter = imported[ 1 ].default;
               }, function( error ) {
                 console.warn( "Could not import 'CustomEvents' for testing: ", error.message );
                 console.error( error.stack );
                 done( error );
               });
    });

    // Tests begin
    suite( "first category", function() {
      tests( "first test in first category", function() {
        
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
