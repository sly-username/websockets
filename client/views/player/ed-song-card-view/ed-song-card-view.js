( function( polymer ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-player-service" )
  ]).then(function( imported ) {
    var
      playerService = imported[ 0 ].default,
      intervalTime = 500,
      updateTimeHandler;

    // helpers
    updateTimeHandler = function( tempValue, isScrubbing ) {
      var currentValue;

      if ( isScrubbing ) {
        currentValue = playerService.scrubTo( tempValue );
      } else {
        currentValue = playerService.currentTime;
      }

      this.mainPlayer.setAttribute( "max", playerService.trackLength );
      this.mainPlayer.setAttribute( "value", currentValue );
    };

    polymer( "ed-song-card-view", {
      /* LIFECYCLE */
      playerService: playerService,
      ready: function() {
        // dom selectors
        this.mainPlayer = this.$[ "main-player" ];

        // Event Handler
        this.handler = {
          updateTime: updateTimeHandler.bind( this )
        };

        this.playerServiceEventHandler = function( event ) {
          var eventType = event.detail.name,
            currentVal = event.detail.currentVal;

          if ( eventType === "pause" || eventType === "stop" ) {
            playerService.pause();
            clearInterval( this.intervalId );
          }

          if ( eventType === "play" ) {
            playerService.play();
            this.intervalId = setInterval( this.handler.updateTime, intervalTime );
          }

          if ( eventType === "scrubStart" ) {
            this.handler.updateTime( currentVal, true );
          }

          if ( eventType === "rate" ) {
            playerService.rateSong( currentVal );
          }

          if ( eventType === "skip" ) {
            playerService.next();
          }
        }.bind( this );
      },
      attached: function() {
        // bind events
        this.addEventListener( "scrubberUpdate", this.playerServiceEventHandler );

        console.log( "playerService.genreTracks( 6 )", playerService.genreTracks( 6 ) );
      },
      detached: function() {
        clearInterval( this.intervalId );
      },
      attributeChanged: function( attrName, oldValue, newValue ) {

      }
      /* PROPERTIES */
      /* METHODS */
    });
  });
})( window.Polymer );
