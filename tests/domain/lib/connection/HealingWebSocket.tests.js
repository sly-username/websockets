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
    suite( "websocket creation", function() {
      test( "starts in non-open state when created", function() {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" );

        expect( hws )
          .to.have.property( "readyState" )
          .that.equals( WebSocket.CONNECTING );

        expect( hws )
          .to.have.property( "isOpen" )
          .that.equals( false );
      });

      test( "when websocket is open, isOpen property is true", function( done ) {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" );

        hws.on( "open", function() {
          expect( hws )
            .to.have.property( "isOpen" )
            .that.equals( true );

          done();
        });
      });

      test( "when websocket is closed, new websocket is opened", function( done ) {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" );

        hws.on( "open", function() {
          expect( hws )
            .to.have.property( "isOpen" )
            .that.equals( true );
        });

        done();
      });
    });

    suite( "attributes", function() {
      test( "can get the value of the isOpen boolean", function() {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" );

        expect( hws )
          .to.have.property( "isOpen" )
          .that.is.a( "boolean" );
      });

      test( "can get the value of websocket's ready state", function() {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" );

        expect( hws )
          .to.have.property( "readyState" );
      });

      test( "can get the type of binary data transmitted by the connection", function() {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" );

        expect( hws )
          .to.have.property( "binaryType" );
      });

      test( "can set websocket's binary type via binaryType property", function() {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
            socketSym = Object.getOwnPropertySymbols( hws )[0];

        hws[ socketSym ].binaryType = "blob";

        expect( hws[socketSym] )
         .to.have.property( "binaryType" )
         .that.equals( "blob" );
      });

      test( "can get bytes of data in queue via bufferedAmount property", function() {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
            socketSym = Object.getOwnPropertySymbols( hws )[0];

        expect( hws[socketSym] )
          .to.have.property( "bufferedAmount" )
          .that.is.a( "number" );
      });

      test( "can get extensions selected by the server", function() {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" );

        expect( hws )
          .to.have.property( "extensions" );
      });

      test( "can set extensions via extensions property", function() {
        // what should go here?
      });

      test( "can get name of the sub-protocol server selected", function() {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" );

        expect( hws )
          .to.have.property( "protocol" )
          .that.is.a( "string" );
      });

      test( "can set protocol via protocol property", function() {
        // how about here?
      });

      test( "can get websocket's absolute url", function() {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" );

        expect( hws )
          .to.have.property( "url" );
      });
    });

    suite( "data type testing", function() {
      test( "can send string", function( done ) {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
            strData = "string data";

        // need to set socket to connected
        hws.on( "message", function( data ) {
          expect( data )
            .to.be.a( "string" )
            .and.equal( strData );

          done();
        });

        hws.send( strData );
      });

      test( "can send blob", function( done ) {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
            blobArray = [ "<a id=\"a\"><b id=\"b\">oh my blob</b></a>" ],
            blobData = new Blob( blobArray );

        hws.on( "message", function( data ) {
          expect( data )
            .to.be.an.instanceOf( Blob )
            .and.equal( blobData );

          done();
        });

        hws.send( blobData );
      });

      test( "can send array buffer", function( done ) {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
            arrayBufferLength = new ArrayBuffer( 256 );

        hws.on( "message", function( data ) {
          expect( data )
            .to.be.an.instanceOf( ArrayBuffer )
            .and.equal( arrayBufferLength );

          done();
        });

        hws.send( arrayBufferLength );
      });
    });

    suite( "whether on method is properly calling addEventListener functions",
      function() {
        test( "onmessage event listener", function() {
          var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
              messageListener = function() {},
              socketSym = Object.getOwnPropertySymbols( hws )[0],
              addEventSpy;

          addEventSpy = sinon.spy( hws[socketSym], "addEventListener" );
          hws.on( "message", messageListener );

          expect( addEventSpy )
            .to.have.callCount( 1 )
            .to.have.been.calledWith( "message", messageListener );

          addEventSpy.restore();
      });

        test( "onopen event listener", function() {
          var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
              openListener = function() {},
              socketSym = Object.getOwnPropertySymbols( hws )[0],
              addEventSpy;

          addEventSpy = sinon.spy( hws[socketSym], "addEventListener" );
          hws.on( "open", openListener );

          expect( addEventSpy )
            .to.have.callCount( 1 )
            .to.have.been.calledWith( "open", openListener );

          addEventSpy.restore();
        });

        test( "onerror event listener", function() {
          var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
              errorListener = function() {},
              socketSym = Object.getOwnPropertySymbols( hws )[0],
              addEventSpy;

          addEventSpy = sinon.spy( hws[socketSym], "addEventListener" );
          hws.on( "error", errorListener );

          expect( addEventSpy )
            .to.have.callCount( 1 )
            .to.have.been.calledWith( "error", errorListener );

          addEventSpy.restore();
        });

        test( "onclose event listener", function() {
          var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
              closeListener = function() {},
              socketSym = Object.getOwnPropertySymbols( hws )[0],
              addEventSpy;

          addEventSpy = sinon.spy( hws[socketSym], "addEventListener" );
          hws.on( "close", closeListener );

          expect( addEventSpy )
            .to.have.callCount( 1 )
            .to.have.been.calledWith( "close", closeListener );

          addEventSpy.restore();
        });

        test( "one event listener", function() {
          var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
              oneListener = function() {},
              socketSym = Object.getOwnPropertySymbols( hws )[0],
              addEventSpy;

          addEventSpy = sinon.spy( hws[socketSym], "addEventListener" );
          hws.one( oneListener );

          expect( addEventSpy )
            .to.have.callCount( 1 )
            .to.have.been.calledWith( "close", oneListener );

          addEventSpy.restore();
        });
    });

    // End Tests
  });
})( window, document, window.System, window.sinon, window.chai.expect );
