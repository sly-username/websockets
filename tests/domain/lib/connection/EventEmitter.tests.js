/*eslint-env mocha*/
/*global suite, test, console*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EventEmitter", function() {
    var EventEmitter, handlerMapSym;

    suiteSetup( function( done ) {
      System.import( "domain/lib/connection/EventEmitter" )
        .then( function( imported ) {
          EventEmitter = imported.default;

          handlerMapSym = Object.getOwnPropertySymbols( new EventEmitter( [ "open" ] ) )[0];

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
              onSpy = sinon.spy( ever, "on" );

          ever.on( "open", openListener );

          ever.on( "open", openListenerAgain );

          expect( onSpy )
            .to.have.callCount( 2 );

          expect( ever[handlerMapSym].open )
            .to.be.instanceof( Array )
            .to.have.length( 2 )
            .to.contain( openListenerAgain );
        });

        test( "on method will add property to handlerMap if eventName does not exist", function() {
          var ever = new EventEmitter( "open" ),
              openListener = function() {},
              closeListener = function() {};

          ever.on( "close", closeListener );

          ever.on( "open", openListener );

          expect( ever[handlerMapSym] )
            .to.have.property( "open" )
            .to.be.instanceof( Array )
            .to.contain( openListener );
        });

        test( "on method is chainable", function() {
          var emitter = new EventEmitter( "open" ),
            openListener = function() {};

          expect( emitter.on( "open", openListener ) )
            .to.equal( emitter );
        });
      });

      suite( "off method", function() {
        test( "off method can remove event from handler map", function() {
          var ever = new EventEmitter( "open" ),
              openListener = function() {},
              removeEventSpy;

          ever.on( "open", openListener );

          expect( ever[handlerMapSym].open )
            .to.have.length( 1 );

          removeEventSpy = sinon.spy( ever[handlerMapSym].open, "filter" );

          ever.off( "open", openListener );

          expect( removeEventSpy )
            .to.have.callCount( 1 );

          expect( ever[handlerMapSym].open )
            .to.have.length( 0 );

          removeEventSpy.restore();
        });

        test( "off method is chainable", function() {
          var emitter = new EventEmitter( "open" ),
            openListener = function() {};

          expect( emitter.off( "open", openListener ))
            .to.equal( emitter );
        });
      });

      suite( "once method", function() {
        test( "if eventName array is found in handlerMap object", function() {
          var ever = new EventEmitter( "open" ),
            openListener = function() {},
            openListenerAgain = function() {},
            eventObj = {
              type: "open"
            },
            onSpy = sinon.spy( ever, "on" ),
            offSpy = sinon.spy( ever, "off" );

          ever.on( "open", openListener );

          ever.once( "open", openListenerAgain );

          ever.dispatch( eventObj );

          expect( onSpy )
            .to.have.callCount( 2 );

          expect( offSpy )
            .to.have.callCount( 1 );

          console.log( ever[handlerMapSym].open );

          onSpy.restore();
          offSpy.restore();
        });

        test( "if eventName array does not exist in handlerMap object", function() {
          var ever = new EventEmitter( "open" ),
              openListener = sinon.spy(),
              eventObj = {
                type: "open"
              },
              onSpy = sinon.spy( ever, "on" ),
              offSpy = sinon.spy( ever, "off" );

          ever.once( "open", openListener );

          ever.dispatch( eventObj );

          expect( onSpy )
            .to.have.callCount( 1 );

          expect( offSpy )
            .to.have.callCount( 1 );

          expect( openListener )
            .to.have.callCount( 1 )
            .and.calledWith( eventObj );

          console.log( ever[handlerMapSym].open );

          onSpy.restore();
          offSpy.restore();
        });
      });

      suite( "clear method", function() {
        test( "if event name specified, clear method should remove all its handlers", function() {
          var ever = new EventEmitter( "open" ),
              openListener = function() {};

          ever.on( "open", openListener );

          ever.clear( "open" );

          expect( ever[handlerMapSym].open )
            .to.have.length( 0 );
        });

        test( "if not specified, clear method should remove all handlers for all events", function() {
          var ever = new EventEmitter( "open" ),
              openListener = function() {},
              closeListener = function() {};

          ever.on( "open", openListener );
          ever.on( "close", closeListener );

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
              eventObj = {
                type: "open"
              },
              openListener = sinon.spy(),
              openListenerAgain = sinon.spy();

          ever.on( "open", openListener );

          ever.dispatch( eventObj, 1, 2, 3 );

          ever.on( "open", openListenerAgain );

          ever.dispatch( eventObj, 4, 5, 6 );

          expect( openListener )
            .to.have.callCount( 2 )
            .and.calledWith( eventObj, 1, 2, 3 )
            .and.calledWith( eventObj, 4, 5, 6 );

          expect( openListenerAgain )
            .to.have.callCount( 1 )
            .and.calledWith( eventObj, 4, 5, 6 );
        });
      });

      suite( "bindToEventHandler method", function() {
        test( "should add event listeners to eventTarget", function() {
          var ever = new EventEmitter( "open" ),
              eventTarget = document.createElement( "button" ),
              eventNames = [
                "click",
                "focus"
              ],
              addEventSpy;

          addEventSpy = sinon.spy( eventTarget, "addEventListener" );

          EventEmitter.bindToEventTarget( ever, eventTarget, eventNames );

          expect( addEventSpy )
            .to.have.callCount( eventNames.length );

          addEventSpy.restore();
        });

        test( "should add unbindEventEmitter to eventTarget", function() {
          var emitter = new EventEmitter( "click" ),
            eventTarget = document.createElement( "button" ),
            eventNames = [
              "click"
            ];

          EventEmitter.bindToEventTarget( emitter, eventTarget, eventNames );

          console.dir( eventTarget );

          expect( eventTarget )
            .to.have.property( "unbindEventEmitter" )
            .that.is.a( "function" );
        });

        test( "should dispatch emitterInstance's events", function() {
          var ever = new EventEmitter( "open" ),
              eventTarget = document.createElement( "button" ),
              openListener = sinon.spy(),
              mouseEvent = new MouseEvent( "click" ),
              eventNames = [
                "click"
              ],
              dispatchSpy = sinon.spy( ever, "dispatch" );

          EventEmitter.bindToEventTarget( ever, eventTarget, eventNames );

          ever.on( "click", openListener );

          eventTarget.dispatchEvent( mouseEvent );

          expect( openListener )
            .to.have.callCount( 1 )
            .and.calledWith( mouseEvent );

          expect( dispatchSpy )
            .to.have.callCount( 1 )
            .and.calledWith( mouseEvent );

          dispatchSpy.restore();
        });

        test( "initializing unbindEventEmitter should remove event listeners from eventTarget", function() {
          var emitter = new EventEmitter( "click" ),
            eventTarget = document.createElement( "button" ),
            openListener = sinon.spy(),
            mouseEvent = new MouseEvent( "click" ),
            eventNames = [
              "click"
            ],
            removeEventSpy = sinon.spy( eventTarget, "removeEventListener" );

          EventEmitter.bindToEventTarget( emitter, eventTarget, eventNames );

          emitter.on( "click", openListener );

          expect( eventTarget )
            .has.property( "unbindEventEmitter" )
            .and.is.a( "function" );

          eventTarget.unbindEventEmitter();

          expect( eventTarget )
            .to.not.have.property( "unbindEventEmitter" );

          eventTarget.dispatchEvent( mouseEvent );

          expect( openListener )
            .to.have.callCount( 0 );

          expect( removeEventSpy )
            .to.have.callCount( 1 )
            .and.calledWith( "click" );

          removeEventSpy.restore();
        });

      });
    });
  });

})( window, document, window.System, window.sinon, window.chai.expect );
