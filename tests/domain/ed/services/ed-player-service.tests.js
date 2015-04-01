/*eslint-env mocha*/
/*global suite, test, console*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "edPlayerService", function() {
    var edPlayerService, EDSong;

    suiteSetup(function( done ) {
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

      System.import( "domain/ed/objects/EDSong" )
        .then(function( imported ) {
          EDSong = imported.default;
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

      test( "currentSeconds is a number", function() {
        expect( edPlayerService.currentSeconds )
          .to.be.a( "number" );
      });

      test( "currentMinutes is a number", function() {
        expect( edPlayerService.currentMinutes )
          .to.be.a( "number" );
      });

      test( "currentHours is a number", function() {
        expect( edPlayerService.currentHours )
          .to.be.a( "number" );
      });

      test( "formattedTime is a string", function() {
        expect( edPlayerService.formattedTime )
          .to.be.a( "string" );
      });

      test( "songLength is a number", function() {
        expect( edPlayerService.songLength )
          .to.be.a( "number" );
      });
    });

    suite( "play method", function() {
      test( "if a song instance is passed, then should return true", function() {
        var songData = {
            name: "baby got back"
          },
          song = new EDSong( songData ),
          playSpy = sinon.spy( edPlayerService, "play" );

        expect( edPlayerService.play( song ) )
          .to.equal( true );

        expect( playSpy )
          .to.have.callCount( 1 );

        playSpy.restore();
      });

      test( "if a non song instance is passed, then should throw typeError", function() {
        var songData = {
            name: "baby got back"
          };

        expect(function() {
          edPlayerService.play( songData );
        }).to.throw( "Song is not an EDSong object" );
      });
    });

    suite( "pause method", function() {
      test( "if a song instance is passed, then should return true", function() {
        var songData = {
            name: "baby got back"
          },
          song = new EDSong( songData ),
          pauseSpy = sinon.spy( edPlayerService, "pause" ),
          isPaused;

        isPaused = edPlayerService.pause( song );

        expect( pauseSpy )
          .to.have.callCount( 1 );

        expect( isPaused )
          .to.equal( false );

        pauseSpy.restore();
      });
    });

    suite( "stop method", function() {
      test( "if a song instance is passed, then should return true", function() {
        var songData = {
            name: "baby got back"
          },
          song = new EDSong( songData ),
          stopSpy = sinon.spy( edPlayerService, "stop" );

        edPlayerService.stop( song );

        expect( stopSpy )
          .to.have.callCount( 1 );

        expect( edPlayerService.stop( song ) )
          .to.equal( true );

        stopSpy.restore();
      });
    });

    suite( "enqueue method", function() {
      test( "enqueue should add song to the queue", function() {
        var songData = {
            name: "baby got back"
          },
          oldLength = edPlayerService.queue.length,
          newLength,
          song = new EDSong( songData ),
          song2 = new EDSong( songData ),
          enqueueSpy = sinon.spy( edPlayerService, "enqueue" );

        edPlayerService.enqueue( song );

        newLength = edPlayerService.queue.length;

        expect( enqueueSpy )
          .to.have.callCount( 1 );

        expect( newLength )
          .to.be.above( oldLength );

        edPlayerService.dequeue();

        enqueueSpy.restore();
      });
    });

    suite( "enqueueNext method", function() {
      test( "enqueue should add song to the queue", function() {
        var songData = {
            name: "baby got back"
          },
          song = new EDSong( songData ),
          song2 = new EDSong( songData ),
          enqueueNextSpy = sinon.spy( edPlayerService, "enqueueNext" );

        edPlayerService.enqueueNext( song );
        edPlayerService.enqueueNext( song2 );

        expect( enqueueNextSpy )
          .to.have.callCount( 2 );

        expect( edPlayerService.queue[ 0 ] )
          .to.equal( song2 );

        edPlayerService.dequeue();
        edPlayerService.dequeue();

        enqueueNextSpy.restore();
      });
    });

    suite( "dequeue method", function() {
      test( "remove next song to the queue", function() {
        var songData = {
            name: "baby got back"
          },
          song = new EDSong( songData ),
          song2 = new EDSong( songData ),
          dequeueSpy = sinon.spy( edPlayerService, "dequeue" );

        edPlayerService.enqueue( song );
        edPlayerService.enqueue( song2 );

        edPlayerService.dequeue();

        expect( dequeueSpy )
          .to.have.callCount( 1 );

        expect( edPlayerService.queue.length )
          .to.equal( 1 );

        edPlayerService.dequeue();
        edPlayerService.dequeue();

        dequeueSpy.restore();
      });
    });

    suite( "next method", function() {
      test( "plays next song in the queue", function() {
        var songData = {
            name: "baby got back"
          },
          song = new EDSong( songData ),
          song2 = new EDSong( songData ),
          nextSpy = sinon.spy( edPlayerService, "next" );

        edPlayerService.enqueue( song );
        edPlayerService.enqueue( song2 );

        edPlayerService.next();

        expect( nextSpy )
          .to.have.callCount( 1 );

        expect( edPlayerService.currentStats.playing )
          .to.equal( song );

        edPlayerService.dequeue();
        edPlayerService.dequeue();

        nextSpy.restore();
      });
    });

    suite( "skipTo method", function() {
      test( "plays targeted song in the queue", function() {
        var songData = {
            name: "baby got back"
          },
          song = new EDSong( songData ),
          song2 = new EDSong( songData ),
          skipToSpy = sinon.spy( edPlayerService, "skipTo" );

        edPlayerService.enqueue( song );
        edPlayerService.enqueue( song2 );

        edPlayerService.skipTo( 1 );

        expect( skipToSpy )
          .to.have.callCount( 1 );

        expect( edPlayerService.currentStats.playing )
          .to.equal( song2 );

        skipToSpy.restore();
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
