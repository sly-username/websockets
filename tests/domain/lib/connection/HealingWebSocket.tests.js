/*eslint-env mocha*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "HealingWebSocket", function() {
    var HealingWebSocket;
    this.timeout( 15000 );

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

        hws.on( "close", function() {
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
      test( "can receive string data via message event", function( done ) {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
            strData = "string data";

        hws.on( "message", function( data ) {
          expect( data )
            .to.be.a( "string" )
            .and.equal( strData );

          done();
        });

        hws.on( "open", function() {
          hws.send( strData );
        });

        hws.close();
      });

      test( "can receive blob via message event", function( done ) {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
            blobArray = [ "<a id=\"a\"><b id=\"b\">oh my blob</b></a>" ],
            blobData = new Blob( blobArray );

        hws.binaryType = "blob";
        hws.on( "message", function( data ) {
          expect( data )
            .to.be.an.instanceOf( Blob )
            .and.equal( blobData );

          done();
        });

        hws.on( "open", function() {
          hws.send( blobData );
        });
      });

      test( "can receive array buffer via message event", function( done ) {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
            arrayBufferLength = new ArrayBuffer( 256 );

        hws.binaryType = "arraybuffer";
        hws.on( "message", function( data ) {
          expect( data )
            .to.be.an.instanceOf( ArrayBuffer )
            .and.equal( arrayBufferLength );

          done();
        });

        hws.on( "open", function() {
          hws.send( arrayBufferLength );
        });
      });

      test( "can send string via send method", function( done ) {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
            strData = "string data";

        hws.on( "open", function() {
          hws.send( strData );
          hws.on( "message", function( event ) {
            expect( event.data )
              .to.be.a( "string" )
              .and.equal( strData );

            done();
          });
        });
      });

      test( "can send blob via send method", function( done ) {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
            blobArray = [ "<a id=\"a\"><b id=\"b\">oh my blob</b></a>" ],
            blobData = new Blob( blobArray );

        hws.on( "open", function() {
          hws.send( blobData );
          hws.on( "message", function( event ) {
            expect( event.data )
              .to.be.an.instanceOf( Blob )
              .and.equal( blobData );

            done();
          });
        });
      });

      test( "can send array buffer via send method", function( done ) {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
            arrayBufferLength = new ArrayBuffer( 256 );

        hws.on( "open", function() {
          hws.send( arrayBufferLength );
          hws.on( "message", function( event ) {
            expect( event.data )
              .to.be.an.instanceOf( ArrayBuffer )
              .and.equal( arrayBufferLength );

            done();
          });
        });
      });

      test( "can send other data types via send method", function( done ) {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
            data = {
              name: "Ryan",
              genre: "indie in a coffeeshop"
            };

        hws.on( "open", function() {
          hws.send( data );
          hws.on( "message", function( event ) {
            expect( event.data )
              .to.equal( JSON.stringify( data ));

            done();
          });
        });

      });
    });

    suite( "whether on method is properly calling addEventListener functions",
      function() {
        test( "add onmessage event listener", function() {
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

        test( "add onopen event listener", function() {
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

        test( "add onerror event listener", function() {
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

        test( "add onclose event listener", function() {
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

        test( "remove onmessage event listener", function() {
          var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
              messageListener = function() {},
              socketSym = Object.getOwnPropertySymbols( hws )[0],
              removeEventSpy;

          removeEventSpy = sinon.spy( hws[socketSym], "removeEventListener" );
          hws.off( "message", messageListener );

          expect( removeEventSpy )
            .to.have.callCount( 1 )
            .to.have.been.calledWith( "message", messageListener );

          removeEventSpy.restore();
        });

        test( "remove onopen event listener", function() {
          var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
              openListener = function() {},
              socketSym = Object.getOwnPropertySymbols( hws )[0],
              removeEventSpy;

          removeEventSpy = sinon.spy( hws[socketSym], "removeEventListener" );
          hws.off( "open", openListener );

          expect( removeEventSpy )
            .to.have.callCount( 1 )
            .to.have.been.calledWith( "open", openListener );

          removeEventSpy.restore();
        });

        test( "remove onerror event listener", function() {
          var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
              errorListener = function() {},
              socketSym = Object.getOwnPropertySymbols( hws )[0],
              removeEventSpy;

          removeEventSpy = sinon.spy( hws[socketSym], "removeEventListener" );
          hws.off( "error", errorListener );

          expect( removeEventSpy )
            .to.have.callCount( 1 )
            .to.have.been.calledWith( "error", errorListener );

          removeEventSpy.restore();
        });

        test( "remove onclose event listener", function() {
          var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
              closeListener = function() {},
              socketSym = Object.getOwnPropertySymbols( hws )[0],
              removeEventSpy;

          removeEventSpy = sinon.spy( hws[socketSym], "removeEventListener" );
          hws.off( "close", closeListener );

          expect( removeEventSpy )
            .to.have.callCount( 1 )
            .to.have.been.calledWith( "close", closeListener );

          removeEventSpy.restore();
        });

        test( "one event listener", function( done ) {
          var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
              openListener = function() {
                expect( addEventSpy )
                  .to.have.callCount( 1 )
                  .to.have.been.calledWith( "open" );

                expect( removeEventSpy )
                  .to.have.callCount( 1 )
                  .to.have.been.calledWith( "open", openListener );

                addEventSpy.restore();
                removeEventSpy.restore();

                done();
              },
              socketSym = Object.getOwnPropertySymbols( hws )[0],
              addEventSpy,
              removeEventSpy;

          addEventSpy = sinon.spy( hws[socketSym], "addEventListener" );
          removeEventSpy = sinon.spy( hws[socketSym], "removeEventListener" );

          hws.one( "open", openListener );

        });
    });

    // End Tests
  });
})( window, document, window.System, window.sinon, window.chai.expect );

