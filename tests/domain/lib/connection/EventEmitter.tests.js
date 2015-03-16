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
          var emitter = new EventEmitter( [ "open" ] ),
            openListener = function() {},
            openListenerAgain = function() {},
            onSpy = sinon.spy( emitter, "on" );

          emitter.on( "open", openListener );

          emitter.on( "open", openListenerAgain );

          expect( onSpy )
            .to.have.callCount( 2 );

          expect( emitter[handlerMapSym].open )
            .to.be.instanceof( Array )
            .to.have.length( 2 )
            .to.contain( openListenerAgain );
        });

        test( "on method will add property to handlerMap if eventName does already not exist",
          function() {
            var emitter = new EventEmitter( [ "open" ] ),
                openListener = function() {},
              closeListener = function() {};

            emitter.on( "close", closeListener );

            emitter.on( "open", openListener );

            expect( emitter[handlerMapSym] )
              .to.have.property( "open" )
              .to.be.instanceof( Array )
              .to.contain( openListener );
          });

        test( "on method should be chainable", function() {
          var emitter = new EventEmitter( [ "open" ] ),
            openListener = function() {};

          expect( emitter.on( "open", openListener ) )
            .to.equal( emitter );
        });
      });

      suite( "off method", function() {
        test( "off method can remove event from handler map", function() {
          var emitter = new EventEmitter( [ "open" ] ),
            openListener = function() {},
            removeEventSpy;

          emitter.on( "open", openListener );

          expect( emitter[handlerMapSym].open )
            .to.have.length( 1 );

          removeEventSpy = sinon.spy( emitter[handlerMapSym].open, "filter" );

          emitter.off( "open", openListener );

          expect( removeEventSpy )
            .to.have.callCount( 1 );

          expect( emitter[handlerMapSym].open )
            .to.have.length( 0 );

          removeEventSpy.restore();
        });

        test( "off method should be chainable", function() {
          var emitter = new EventEmitter( [ "open" ] ),
            openListener = function() {};

          expect( emitter.off( "open", openListener ))
            .to.equal( emitter );
        });
      });

      suite( "once method", function() {
        test( "if eventName array is found in handlerMap object", function() {
          var emitter = new EventEmitter( [ "open" ] ),
            openListener = function() {},
            onSpy = sinon.spy( emitter, "on" ),
            offSpy = sinon.spy( emitter, "off" ),
            eventObj = new CustomEvent( "open",
              {
                type: "open"
              });

          expect( emitter[ handlerMapSym ].open )
            .to.be.an.instanceof( Array )
            .to.have.length( 0 );

          emitter.once( "open", openListener );

          emitter.dispatch( eventObj );

          expect( onSpy )
            .to.have.callCount( 2 );

          expect( offSpy )
            .to.have.callCount( 1 );

          onSpy.restore();
          offSpy.restore();
        });

        test( "if eventName array does not exist in handlerMap object", function() {
          var emitter = new EventEmitter( [ "open" ] ),
            openListener = sinon.spy(),
            eventObj = new CustomEvent( "open", {
              type: "open"
            }),
            onSpy = sinon.spy( emitter, "on" ),
            offSpy = sinon.spy( emitter, "off" );

          emitter.once( "open", openListener );

          emitter.dispatch( eventObj );

          expect( onSpy )
            .to.have.callCount( 1 );

          expect( offSpy )
            .to.have.callCount( 1 );

          expect( openListener )
            .to.have.callCount( 1 )
            .and.calledWith( eventObj );

          onSpy.restore();
          offSpy.restore();
        });

        test( "once method should be chainable", function() {
          var emitter = new EventEmitter( [ "open" ] ),
            openListener = function() {};

          expect( emitter.once( "open", openListener ))
            .to.equal( emitter );
        });
      });

      suite( "clear method", function() {
        test( "if event name specified, clear method should remove all its handlers", function() {
          var emitter = new EventEmitter( [ "open" ] ),
            openListener = function() {};

          emitter.on( "open", openListener );

          emitter.clear( "open" );

          expect( emitter[handlerMapSym].open )
            .to.have.length( 0 );
        });

        test( "if not specified, clear method should remove all handlers for all events",
          function() {
            var emitter = new EventEmitter( [ "open" ] ),
              openListener = function() {},
              closeListener = function() {};

            emitter.on( "open", openListener );

            emitter.on( "close", closeListener );

            emitter.clear();
          });

        test( "clear method should be chainable", function() {
          var emitter = new EventEmitter( [ "open" ] ),
            openListener = function() {};

          emitter.on( "open", openListener );
          expect( emitter.clear( "open" ))
            .to.equal( emitter );
        });
      });

      suite( "dispatch method", function() {
        test( "should fire event handler", function() {
          var emitter = new EventEmitter( [ "open" ] ),
            eventObj = new CustomEvent( "open", {
              type: "open"
            }),
            openListener = sinon.spy(),
            openListenerAgain = sinon.spy();

          emitter.on( "open", openListener );

          emitter.dispatch( eventObj );

          emitter.on( "open", openListenerAgain );

          emitter.dispatch( eventObj );

          expect( openListener )
            .to.have.callCount( 2 )
            .and.calledWith( eventObj )
            .and.calledWith( eventObj );

          expect( openListenerAgain )
            .to.have.callCount( 1 )
            .and.calledWith( eventObj );
        });

        test( "should fire event handler with extraArgs passed in", function() {
          var emitter = new EventEmitter( [ "open" ] ),
              eventObj = new CustomEvent( "open", {
                type: "open"
              }),
              openListener = sinon.spy(),
              openListenerAgain = sinon.spy();

          emitter.on( "open", openListener );

          emitter.dispatch( eventObj, 1, 2, 3 );

          emitter.on( "open", openListenerAgain );

          emitter.dispatch( eventObj, 4, 5, 6 );

          expect( openListener )
            .to.have.callCount( 2 )
            .and.calledWith( eventObj, 1, 2, 3 )
            .and.calledWith( eventObj, 4, 5, 6 );

          expect( openListenerAgain )
            .to.have.callCount( 1 )
            .and.calledWith( eventObj, 4, 5, 6 );
        });

        test( "should throw error if valid Event is not passed", function() {
          var emitter = new EventEmitter( [ "open" ] ),
              eventObj = new CustomEvent( "open", {
                type: "open"
              }),
              openListener = sinon.spy(),
              openListenerAgain = sinon.spy();

          emitter.on( "open", openListener );

          emitter.dispatch( eventObj, 1, 2, 3 );

          emitter.on( "open", openListenerAgain );

          emitter.dispatch( eventObj, 4, 5, 6 );
        });

        test( "dispatch method should be chainable", function() {
          var emitter = new EventEmitter( [ "open" ] ),
            eventObj = new CustomEvent( "open", {
              type: "open"
            }),
            openListener = sinon.spy();

          emitter.on( "open", openListener );

          emitter.dispatch( eventObj );

          expect( openListener )
            .to.have.callCount( 1 )
            .and.calledWith( eventObj );
        });
      });

      suite( "bindToEventHandler method", function() {
        test( "should add event listeners to eventTarget", function() {
          var emitter = new EventEmitter( [ "open" ] ),
            eventTarget = document.createElement( "button" ),
            eventNames = [
              "click",
              "focus"
            ],
            addEventSpy;

          addEventSpy = sinon.spy( eventTarget, "addEventListener" );

          EventEmitter.bindToEventTarget( emitter, eventTarget, eventNames );

          expect( addEventSpy )
            .to.have.callCount( eventNames.length );

          addEventSpy.restore();
        });

        test( "should add unbindEventEmitter to eventTarget", function() {
          var emitter = new EventEmitter( [ "click" ] ),
            eventTarget = document.createElement( "button" ),
            eventNames = [
              "click"
            ];

          EventEmitter.bindToEventTarget( emitter, eventTarget, eventNames );

          expect( eventTarget )
            .to.have.property( "unbindEventEmitter" )
            .that.is.a( "function" );
        });

        test( "should dispatch emitterInstance's events", function() {
          var emitter = new EventEmitter( [ "click" ] ),
            eventTarget = document.createElement( "button" ),
            openListener = sinon.spy(),
            mouseEvent = new MouseEvent( "click" ),
            eventNames = [
              "click"
            ],
            dispatchSpy = sinon.spy( emitter, "dispatch" );

          EventEmitter.bindToEventTarget( emitter, eventTarget, eventNames );

          emitter.on( "click", openListener );

          eventTarget.dispatchEvent( mouseEvent );

          expect( openListener )
            .to.have.callCount( 1 )
            .and.calledWith( mouseEvent );

          expect( dispatchSpy )
            .to.have.callCount( 1 )
            .and.calledWith( mouseEvent );

          dispatchSpy.restore();
        });

        test( "should dispatch emitterInstance's events with extra arguments", function() {
          var emitter = new EventEmitter( [ "click" ] ),
            eventTarget = document.createElement( "button" ),
            openListener = sinon.spy(),
            mouseEvent = new MouseEvent( "click" ),
            eventNames = [
              "click"
            ],
            dispatchSpy = sinon.spy( emitter, "dispatch" );

          EventEmitter.bindToEventTarget( emitter, eventTarget, eventNames, 1, 2, 3 );

          emitter.on( "click", openListener );

          eventTarget.dispatchEvent( mouseEvent );

          expect( openListener )
            .to.have.callCount( 1 )
            .and.calledWith( mouseEvent, 1, 2, 3 );

          expect( dispatchSpy )
            .to.have.callCount( 1 )
            .and.calledWith( mouseEvent );

          dispatchSpy.restore();
        });

        test( "initializing unbindEventEmitter should remove event listeners from eventTarget",
          function() {
            var emitter = new EventEmitter( [ "click" ] ),
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
