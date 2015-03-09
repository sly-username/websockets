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
      test( "check handler map to see if it contains specified event", function() {

      });

      test( "if handler map doesn't include specified event, add it", function() {

      });

      test( "on method should attach handler array to the event", function() {
        var eventName = "open",
        eer = new EventEmitter( eventName, handler ),
            eventTarget = this,
            handler = "the handler";



      });

      test( "off method should remove event from handler map", function() {

      });

      test( "once method should first run on and then off methods", function() {

      });

      test( "dispatch method should fire event handler", function() {

      });
    });
  });

})( window, document, window.System, window.sinon, window.chai.expect );
