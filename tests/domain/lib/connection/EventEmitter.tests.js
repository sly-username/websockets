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
    suite( "handlermap check", function() {
      test( "check handler map to see if it contains specified event", function() {
        var ever = new EventEmitter( [ "open" ] ),
            handlerMap = {
              open: [
                function() {}
              ]
            };

        ever.isInHandlerMap( handlerMap, [ "close" ] );

        expect( ever.isInHandlerMap )
          .to.equal( false );
      });

      test( "if handler map doesn't include specified event, add it", function() {
        var ever = new EventEmitter( [ "close" ] ),
            handlerMap = {
              open: [
                function() {}
              ]
            },
            test = ever.isInHandlerMap( handlerMap, [ "close" ] );

        test();

        expect( handlerMap )
          .to.include( "close" );
      });
    });

    suite( "Instance Methods", function() {
      test( "on method should attach handler to the specified event", function() {
        var ever = new EventEmitter( [ "open" ] ),
            openListener = function() {},
            openListenerAgain = function() {},
            addEventSpy;

        this.handlerMap = {
          open: [
            openListener
          ]
        };

        addEventSpy = sinon.spy( this.handlerMap.open, "push" );

        ever.on( "open", openListenerAgain );

        expect( addEventSpy )
          .to.have.callCount( 1 )
          .to.have.been.calledWith( "open", openListenerAgain );

        addEventSpy.restore();
      });

      test( "off method should remove event from handler map", function() {
        var ever = new EventEmitter( [ "open" ] ),
            openListener = function() {},
            removeEventSpy;

        console.dir( ever );

        ever.on( "open", openListener );

        removeEventSpy = sinon.spy( this.handlerMap.open, "filter" );

        ever.off( "open", openListener );

        expect( removeEventSpy )
          .to.have.callCount( 1 )
          .to.have.been.calledWith( "open", openListenerAgain );

        removeEventSpy.restore();
      });

      test( "once method should run on method first, and then off method", function() {

      });

      test( "dispatch method should fire event handler", function() {

      });
    });
  });

})( window, document, window.System, window.sinon, window.chai.expect );
