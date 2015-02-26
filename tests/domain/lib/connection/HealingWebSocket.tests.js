/*eslint-env mocha*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "HealingWebSocket", function() {
    var HealingWebSocket;

    suiteSetup( function( done ) {
      System.import( "domain/lib/connection/HealingWebSocket" )
        .then( function( imported ) {
          HealingWebSocket = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'HealingWebSocket' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    // Start Tests
    test( "starts in non-open state when created", function() {
      var hws = new HealingWebSocket( "wss://echo.websocket.org" );

      expect( hws )
        .to.have.property( "readyState" )
        .that.equals( WebSocket.CONNECTING );

      expect( hws )
        .to.have.property( "isOpen" )
        .that.equals( false );
    });
    // End Tests
  });
})( window, document, window.System, window.sinon, window.chai.expect );
