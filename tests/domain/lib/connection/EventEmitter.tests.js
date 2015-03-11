/*eslint-env mocha*/
/*global suite, test, console*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EventEmitter", function() {
    var EventEmitter;

    suiteSetup( function( done ) {
      System.import( "domain/lib/connection/EventEmitter" )
        .then( function( imported ) {
          EventEmitter = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'EventEmitter' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    // Tests begin
    suite( "Instance Methods", function() {
      suite( "on method", function() {
        test( "on method can attach handler to the specified event", function() {
          var ever = new EventEmitter( "open" ),
              openListener = function() {},
              openListenerAgain = function() {},
              handlerMapSym = Object.getOwnPropertySymbols( ever )[0],
              addEventSpy;

          ever[handlerMapSym] = {
            open: [
              openListener
            ]
          };

          addEventSpy = sinon.spy( ever[handlerMapSym].open, "push" );

          ever.on( "open", openListenerAgain );

          expect( addEventSpy )
            .to.have.callCount( 1 )
            .to.have.been.calledWith( openListenerAgain );
        });

        test( "on method will add property to handlerMap if eventName does not exist", function() {
          var ever = new EventEmitter( "open" ),
              openListener = function() {},
              closeListener = function() {},
              handlerMapSym = Object.getOwnPropertySymbols( ever )[0];

          ever[handlerMapSym] = {
            close: [
              closeListener
            ]
          };

          ever.on( "open", openListener );

          expect( ever[handlerMapSym] )
            .to.have.property( "open" )
            .that.is.an( "array" );
        });
      });

      suite( "off method", function() {
        test( "off method can remove event from handler map", function() {
          var ever = new EventEmitter( "open" ),
              openListener = function() {},
              handlerMapSym = Object.getOwnPropertySymbols( ever )[0],
              removeEventSpy;

          ever.on( "open", openListener );

          removeEventSpy = sinon.spy( ever[handlerMapSym].open, "filter" );

          ever.off( "open", openListener );

          expect( removeEventSpy )
            .to.have.callCount( 1 );

          expect( ever[handlerMapSym].open )
            .to.have.length( 0 );

//          expect( ever[handlerMapSym].hasOwnProperty( open ))
//            .to.be( false );

          removeEventSpy.restore();
        });
      });

      suite( "once method", function() {
        test( "if eventName array is found in handlerMap object", function() {
          var ever = new EventEmitter( "open" ),
              openListener = function() {},
              openListenerAgain = function() {},
              handlerMapSym = Object.getOwnPropertySymbols( ever )[0],
              addEventSpy,
              removeEventSpy;

          ever[handlerMapSym] = {
            open: [
              openListener
            ]
          };

          addEventSpy = sinon.spy( ever[handlerMapSym].open, "push" );
          removeEventSpy = sinon.spy( ever[handlerMapSym].open, "filter" );

          ever.on( "open", openListenerAgain );

          expect( addEventSpy )
            .to.have.callCount( 1 )
            .to.have.been.calledWith( openListenerAgain );

          ever.off( "open", openListenerAgain );

          expect( removeEventSpy )
            .to.have.callCount( 1 );

          addEventSpy.restore();
          removeEventSpy.restore();
        });

        test( "if eventName array does not exist in handlerMap object", function() {
          var ever = new EventEmitter( "open" ),
              openListener = function() {},
              closeListener = function() {},
              handlerMapSym = Object.getOwnPropertySymbols( ever )[0],
              removeEventSpy;

          ever[handlerMapSym] = {
            close: [
              closeListener
            ]
          };

          ever.on( "open", openListener );

          expect( ever[handlerMapSym] )
            .to.have.property( "open" )
            .that.is.an( "array" );

          removeEventSpy = sinon.spy( ever[handlerMapSym].open, "filter" );

          ever.off( "open", openListener );

          expect( removeEventSpy )
            .to.have.callCount( 1 );

          expect( ever[handlerMapSym].open )
            .to.have.length( 0 );

          removeEventSpy.restore();
        });
      });

      suite( "clear method", function() {
        test( "if event name specified, clear method should remove all its handlers", function() {
          var ever = new EventEmitter( "open" ),
              openListener = function() {},
              handlerMapSym = Object.getOwnPropertySymbols( ever )[0];

          ever[handlerMapSym] = {
            open: [
              openListener
            ]
          };

          ever.clear( "open" );

          expect( ever[handlerMapSym].open )
            .to.have.length( 0 );
        });

        test( "if not specified, clear method should remove all handlers for all events", function() {
          var ever = new EventEmitter( "open" ),
              openListener = function() {},
              closeListener = function() {},
              handlerMapSym = Object.getOwnPropertySymbols( ever )[0];

          ever[handlerMapSym] = {
            open: [
              openListener
            ],
            close: [
              closeListener
            ]
          };

          ever.clear();

          expect( ever[handlerMapSym].open )
            .to.have.length( 0 );

          expect( ever[handlerMapSym].close )
            .to.have.length( 0 );
        });
      });

      suite( "dispatch method", function() {
        test( "dispatch method should fire event handler", function() {
          var ever = new EventEmitter( "open" ),
              openListener = function() {},
              handlerMapSym = Object.getOwnPropertySymbols( ever )[0];

        });
      });
    });
  });

})( window, document, window.System, window.sinon, window.chai.expect );
