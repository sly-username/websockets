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

//          expect( ever[handlerMapSym].open )
//            .should.not.exist;

          removeEventSpy.restore();
        });
      });

      suite( "once method", function() {
        test( "once method runs on method, and immediately after runs off method", function() {

        });
      });

      suite( "clear method", function() {
        test( "clear method should clear specified event handler", function() {

        });

        test( "clear method should clear all event handlers, if not specified", function() {

        });
      });

      suite( "dispatch method", function() {
        test( "dispatch method should fire event handler", function() {

        });
      });
    });
  });

})( window, document, window.System, window.sinon, window.chai.expect );
