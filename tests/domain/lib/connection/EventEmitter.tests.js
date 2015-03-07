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
      test( "on should attach event handler", function() {
            var eventName = "something",
        eer = new EventEmitter( eventName, handler ),
            eventTarget = this,
            handler = "the handler";



      });
    });
  });

})( window, document, window.System, window.sinon, window.chai.expect );
