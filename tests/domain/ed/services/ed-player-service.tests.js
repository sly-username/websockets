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

      test.skip( "currentTime is a number", function() {
        edPlayerService.isPlaying;

        expect( edPlayerService.currentTime )
          .to.be.a( "number" );
      });

      test( "currentSeconds is a number", function() {
        edPlayerService.isPlaying;

        expect( edPlayerService.currentSeconds )
          .to.be.a( "number" );
      });

      test( "currentMinutes is a number", function() {
        edPlayerService.isPlaying;

        expect( edPlayerService.currentMinutes )
          .to.be.a( "number" );
      });

      test( "currentHours is a number", function() {
        edPlayerService.isPlaying;

        expect( edPlayerService.currentHours )
          .to.be.a( "number" );
      });

      test( "formattedTime is a string", function() {
        console.log( edPlayerService.isPaused );

        expect( edPlayerService.formattedTime )
          .to.be.a( "string" );
      });

      test( "songDuration is a number", function() {
        edPlayerService.isPlaying;

        expect( edPlayerService.songDuration )
          .to.be.a( "number" );
      });
    });

    suite( "play method", function() {
      test( "should return true", function() {
        var songData = {
            name: "baby got back"
          },
          EDsong = function() {},
          song = new EDSong( songData ),
          playSpy = sinon.spy( edPlayerService, "play" );
          edPlayerService.play( song );

        expect( playSpy )
          .to.have.callCount( 1 );

        console.log( "yoooo" );
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
