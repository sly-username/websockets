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

        //expect( socket.isAuthenticated )
        //  .to.be.a( "boolean" );

        expect( socket.request )
          .to.be.a( "function" );

        expect( socket.doAuthentication )
          .to.be.a( "function" );

        expect( socket.send )
          .to.be.a( "function" );
      });
    });

    suite.skip( "Send Method", function() {
      test( "calls the method", function( done ) {
        var socket = new EDWebSocket(),
          socketData = {
            action: {
              route: "string",
              priority: "string"
            }
          },
          sendSpy;

        sendSpy = sinon.spy( socket, "send" );
        socket.send( socketData );

        expect( sendSpy )
          .to.have.callCount( 1 );

        sendSpy.restore();
        done();
      });
    });

    suite.skip( "Request Method", function() {
      test( "calls the method", function( done ) {
        var socket = new EDWebSocket(),
          socketData = {
            action: {
              route: "string",
              priority: "string"
            }
          },
          requestSpy;

        requestSpy = sinon.spy( socket, "request" );
        socket.request( socketData );

        expect( requestSpy )
          .to.have.callCount( 1 );

        requestSpy.restore();
        done();
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );