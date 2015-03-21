/*eslint env:"mocha"*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "CreateEvent", function() {
    var createEvent;

    suiteSetup( function( done ) {
      System.import( "domain/lib/event/CreateEvent" )
        .then( function( imported ) {
          createEvent = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'CreateEvent' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    // Tests begin
    suite( "Properties", function() {

      test( "instance of Event", function() {
        var descriptor = {},
          event = createEvent( "open", descriptor );

        expect( event )
          .to.be.an.instanceOf( Event );
      });

      test( "passing descriptor parameter creates detail property on event object", function() {
        var descriptor = {
            detail: {
              something: "for nothing"
            }
          },
          event = createEvent( "open", descriptor );

        expect( event )
          .to.have.property( "detail" )
          .to.deep.equal({
          something: "for nothing"
            });
      });

      test( "setting bubbles to true, makes event.bubbles = true", function() {
        var descriptor = {
            bubbles: true
          },
          event = createEvent( "open", descriptor );

        expect( event )
          .to.have.property( "bubbles" )
          .to.deep.equal( true );
      });

      test( "setting cancelable to true, makes event.cancelable = true", function() {
        var descriptor = {
            cancelable: true
          },
          event = createEvent( "open", descriptor );

        expect( event )
          .to.have.property( "cancelable" )
          .to.deep.equal( true );
      });
    });

    suite( "Acts like Native Event", function() {
      test( "can bubble through DOM", function() {
        // create event
        // add listener(spy) for event on window
        // dispatchEvent on some element
        // make sure window handler was calledOnce
        var descriptor = {
            bubbles: true
          },
          event = createEvent( "tesst", descriptor ),
          bodyHandler = function() {
            return;
          },
          windowHandler = function() {},
          windowSpy;

        window.addEventListener( event, windowHandler );

        windowSpy = sinon.spy( window, "" );

        document.addEventListener( event, bodyHandler );
        document.dispatchEvent( event );

        expect( windowSpy )
          .to.have.callCount( 1 )
          .and.to.have.been.calledWith( windowHandler );

        windowSpy.restore();
      });
      test( "cancelable calls stopPropagation and prevents bubbling", function() {
        // cancelable
          // create event
          // add listener to body that calls event.stopPropagation()
          // add listener(spy) to window
          // dispatch event on body
          // assert that window spy was not called
        var descriptor = {
            cancelable: true
          },
          event = createEvent( "click", descriptor ),
          eventHandler = function() {},
          cancelHandler = event.stopPropagation(),
          windowSpy = sinon.spy( window, eventHandler ),
          body;

        body.addEventListener( event, cancelHandler );
        body.addEventListener( event, eventHandler );
        body.dispatchEvent( event );

        expect( windowSpy )
          .to.have.callCount( 0 );

        windowSpy.restore();
      });
    });

    suite.skip( "browser support", function() {
      test( "when browser doesn't support CustomEvent constructor", function() {
        var descriptor = {
            detail: "something"
          },
          stub = sinon.stub( window, "CustomEvent", function() {
            throw new Error( "Throw all the things" );
          }),
          event = createEvent( "open", descriptor );

        expect( event )
          .to.be.an.instanceOf( Event );

        stub.restore();
      });

      test( "when browser supports CustomEvent constructor", function() {
        var descriptor = {
            detail: {
              something: true
            }
          },
          event = createEvent( "open", descriptor );

        expect( event )
          .to.be.an.instanceOf( Event );

        expect( event )
          .to.have.property( "detail" )
          .to.deep.equal({
            something: true
          });

      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
