/*eslint-env mocha*/
( function( win, doc, System, sinon, expect ) {
  "use strict";
  System.import( "domain/lib/connection/HealingWebSocket" )
  .then(
    function( imported ) {
      var HealingWebSocket = imported.default;
//      console.log( "imported", HealingWebSocket );

      // Start Tests
      suite( "HealingWebSocket", function() {
        test( "starts in non-open state when created", function() {
          var hws = new HealingWebSocket( "wss://echo.websocket.org" );

          expect( hws )
            .to.have.property( "readyState" )
            .that.equals( WebSocket.CONNECTING );

          expect( hws )
            .to.have.property( "isOpen" )
            .that.equals( false );
        });
      });
      // End Tests
    },
    function( error ) {
      console.log( "Could not import 'HealingWebSocket' for testing: ", error.message );
      console.error( error.stack );
    }
  );
})( window, document, window.System, window.sinon, window.chai.expect );
