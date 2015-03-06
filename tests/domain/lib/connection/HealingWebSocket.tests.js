/*eslint-env mocha*/
/*global suite, test, console*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "HealingWebSocket", function() {
    var HealingWebSocket;
    this.timeout( 5000 );

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

    suite( "properties", function() {
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
          .to.have.property( "extensions" )
          .and.to.equal( "" );
      });

      test( "can get name of the sub-protocol server selected", function() {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" );

        expect( hws )
          .to.have.property( "protocol" )
          .that.is.a( "string" );
      });

      test( "can get websocket's absolute url", function() {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" );

        expect( hws )
          .to.have.property( "url" );
      });
    });

    suite( "methods", function() {
      suite( "close method", function() {
        test( "calling close method disconnects the websocket", function() {
          var hws = new HealingWebSocket( "wss://echo.websocket.org" );

          hws.on( "close", function() {
            expect( hws )
              .to.have.property( "readyState" )
              .that.equals( WebSocket.CLOSED );

            expect( hws )
              .to.have.property( "isOpen" )
              .that.equals( false );
          });
        });
      });

      suite( "send method", function() {
        test( "can send strings", function( done ) {
          var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
              strData = "string data";

          hws.on( "message", function( event ) {
            expect( event.data )
              .to.be.a( "string" )
              .and.equal( strData );

            done();
          });

          hws.send( strData );
        });

        test( "can send blob data", function( done ) {
          var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
            fileReader = new FileReader(),
            blobString = "<a id=\"a\"><b id=\"b\">oh my blob</b></a>",
            blobData = new Blob( [ blobString ], {
              type: "text/html"
            });

          hws.on( "message", function( event ) {
//            console.dir( blobData );
//            console.dir( event.data );
            expect( event.data )
              .to.be.an.instanceOf( Blob )
//              .and.to.have.property( "type", blobData.type )
              .and.to.have.property( "size", blobData.size );

            fileReader.readAsText( event.data );
          });

          fileReader.addEventListener( "loadend", function( event ) {
            expect( fileReader.result )
              .to.be.a( "string" )
              .and.to.equal( blobString );

            done();
          });

          hws.send( blobData );
        });

        test.skip( "can send array buffer data", function( done ) {
          var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
              arrayBufferLength = new ArrayBuffer( 256 );

//          hws.binaryType = "arraybuffer";
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

        test( "can send other data types", function( done ) {
          var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
              objectData = {
                artist: {
                  name: "Ryan",
                  genre: "indie hipster in a coffeeshop"
                }
              };

          hws.on( "open", function() {
            hws.send( objectData );
            hws.on( "message", function( event ) {
              expect( event.data )
                .to.equal( JSON.stringify( objectData ));

              done();
            });
          });
        });
      });
    });

    suite( "receiving messages", function() {
      test( "can receive string data via message event", function( done ) {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
            strData = "string data";

        hws.on( "message", function( event ) {
          expect( event.data )
            .to.be.a( "string" )
            .and.equal( strData );

          done();
        });

        hws.send( strData );
      });

      test( "can receive blob data via message event", function( done ) {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
            fileReader = new FileReader(),
            blobString = "<a id=\"a\"><b id=\"b\">oh my blob</b></a>",
            blobData = new Blob( [ blobString ], {
              type: "text/html"
            });

        hws.on( "message", function( event ) {
          expect( event.data )
            .to.be.an.instanceOf( Blob )
            //              .and.to.have.property( "type", blobData.type )
            .and.to.have.property( "size", blobData.size );

          fileReader.readAsText( event.data );
        });

        fileReader.addEventListener( "loadend", function( event ) {
          expect( fileReader.result )
            .to.be.a( "string" )
            .and.to.equal( blobString );

          done();
        });

        hws.send( blobData );
      });

      test.skip( "can receive array buffer via message event", function( done ) {
        var hws = new HealingWebSocket( "wss://echo.websocket.org" ),
            arrayBufferLength = new ArrayBuffer( 256 );

        hws.binaryType = "arraybuffer";
        hws.on( "message", function( event ) {
          expect( event.data )
            .to.be.an.instanceOf( ArrayBuffer )
            .and.equal( arrayBufferLength );

          done();
        });

        hws.on( "open", function() {
          hws.send( arrayBufferLength );
        });
      });
    });

    suite( "whether event listener is attaching or removing handler functions",
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

