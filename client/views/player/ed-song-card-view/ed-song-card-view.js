( function( polymer ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-player-service" ),
    System.import( "domain/ed/objects/model-type-checker" )
  ]).then(function( imported ) {
    var
      playerService = imported[ 0 ].default,
      typeChecker = imported[ 1 ].default,
      interValId,
      intervalTime = 500;

    polymer( "ed-song-card-view", {
      /* LIFECYCLE */
      /* LIFECYCLE */
      ready: function() {

      },
      attached: function() {

      },
      detached: function() {

      },
      attributeChanged: function( attrName, oldValue, newValue ) {

      },
      playSong: function() {
        // Playing same song causes pause or resume
        if ( playerService.isPlaying ) {
          return playerService.pause();
        }

        if ( playerService.isPaused ) {
          playerService.play();
        }
      }
      /* PROPERTIES */
      /* METHODS */
    });
  });
})( window.Polymer );
