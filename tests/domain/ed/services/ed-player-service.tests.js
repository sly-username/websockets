/*eslint-env mocha*/
/*global suite, test, console*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "edPlayerService", function() {
    var edPlayerService;

    suiteSetup( function( done ) {
      System.import( "domain/ed/services/ed-player-service" )
        .then( function( imported ) {
          edPlayerService = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'edPlayerService' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        }
      );
    });

    // Start Testing
    suite( "edPlayerService creation", function() {
      test( "currentStats have appropriate properties", function() {
        expect( edPlayerService.currentStats )
          .to.be.an( "object" )
          .to.contain.all.keys([ "playing", "time", "hours", "minutes", "seconds", "length" ]);
      });

      test( "queue property is an array", function() {
        expect( edPlayerService.queue )
          .to.be.an( "array" );
      });

      test( "isPlaying is a boolean", function() {
        expect( edPlayerService.isPlaying )
          .to.be.a( "boolean" );
      });

      test( "isPaused is a boolean", function() {
        expect( edPlayerService.isPaused )
          .to.be.a( "boolean" );
      });

      test( "isStopped is a boolean", function() {
        expect( edPlayerService.isStopped )
          .to.be.a( "boolean" );
      });

      test( "currentTime is a number", function() {
        expect( edPlayerService.currentTime )
          .to.be.a( "number" );
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
