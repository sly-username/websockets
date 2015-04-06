/*eslint-env mocha*/
/*global suite, test, console*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDSong", function() {
    var EDSong;

    suiteSetup( function( done ) {
      System.import( "domain/ed/objects/EDSong" )
        .then( function( imported ) {
          EDSong = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'EDSong' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    suite.skip( "EDSong creation", function() {
      test( "constructor has expected properties", function() {
        var songObj = {
            artistId: "001",
            createdBy: "Joe",
            name: "Piper",
            playCount: 0,
            waveformImage: "https://static.gearslutz.com/board/imgext.php?u=http%3A%2F%2Fdaveshort.org%2Fmusic%2Floudness%2Fmetallica_big.png&h=067a1a9b3aa501c5f0ac43f4851235bb",
            createdDate: Date.now()
          },
          song = new EDSong( songObj );

        expect( song )
          .to.have.property( "artistId" );

        expect( song )
          .to.have.property( "createdBy" );

        expect( song )
          .to.have.property( "name" );

        expect( song )
          .to.have.property( "playCount" );

        expect( song )
          .to.have.property( "waveformImage" );

        expect( song )
          .to.have.property( "createdDate" );
      });
    });

    suite.skip( "getArtist Method", function() {
      test( "returns a promise", function() {
        var songObj = {
            artistId: "001",
            createdBy: "Joe",
            name: "Piper",
            playCount: 0,
            waveformImage: "https://static.gearslutz.com/board/imgext.php?u=http%3A%2F%2Fdaveshort.org%2Fmusic%2Floudness%2Fmetallica_big.png&h=067a1a9b3aa501c5f0ac43f4851235bb",
            createdDate: Date.now()
          },
          song = new EDSong( songObj );
      });
    });

    suite.skip( "getCreator", function() {
      test( "returns a promise", function() {
        var songObj = {
            artistId: "001",
            createdBy: "Joe",
            name: "Piper",
            playCount: 0,
            waveformImage: "https://static.gearslutz.com/board/imgext.php?u=http%3A%2F%2Fdaveshort.org%2Fmusic%2Floudness%2Fmetallica_big.png&h=067a1a9b3aa501c5f0ac43f4851235bb",
            createdDate: Date.now()
          },
          song = new EDSong( songObj );
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
