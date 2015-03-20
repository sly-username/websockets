/*eslint env:"mocha"*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "CustomEvents", function() {
    var createEvent;

    suiteSetup( function( done ) {
      System.import( "domain/lib/event/CreateEvent" )
        .then( function( imported ) {
          createEvent = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'createEvent' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    // Tests begin
    suite( "Properties", function() {
      // instanceof Event
      test( "instance of Event", function() {

      });
      // passing detail, makes detail on event obj
      // passing bubbles false, makes event.bubbles = false
      // cancelable
    });

    suite( "Acts like Native Event", function() {
      test( "can bubble through DOM", function() {
        // create event
        // add listener(spy) for event on window
        // dispatchEvent on some element
        // make sure window handler was calledOnce
      });
      // cancelable
        // create event
        // add listener to body that calls event.stopPropagation()
        // add listener(spy) to window
        // dispatch event on body
        // assert that window spy was not called
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
