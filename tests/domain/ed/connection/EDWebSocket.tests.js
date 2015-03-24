/*eslint-env mocha*/
/*global suite, test, console*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDWebSocket", function() {
    var EDWebSocket;

    suiteSetup( function( done ) {
      System.import( "domain/ed/connection/EDWebSocket" )
        .then( function( imported ) {
          EDWebSocket = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'EDWebSocket' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        }
      );
    });

    // Start Testing
    suite( "EDWebSocket creation", function() {
      test( "starts with appropriate properties", function() {
        var socket = new EDWebSocket();

        expect( socket.isAuthenticated )
          .to.be.a( "boolean" );
      });
    });

    suite( "Request Method", function() {
      test( "appropriate data is passed through", function() {
        var socket = new EDWebSocket(),
          socketData = "data";

        expect( socket.request( socketData ) )
          .to.be.a( "string" );
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
