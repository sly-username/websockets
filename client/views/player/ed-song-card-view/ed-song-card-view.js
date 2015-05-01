( function( polymer ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-player-service" )
  ]).then(function( imported ) {
    var
      playerService = imported[ 0 ].default,
      intervalTime = 500,
      updateTimeHandler,
      playerServiceEventHandler,
      togglePlayerHandler;

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

    playerServiceEventHandler = function( event ) {
      var eventType = event.detail.name,
        currentVal = event.detail.currentVal;

      if ( eventType === "pause" || eventType === "stop" ) {
        playerService.pause();
        clearInterval( this.intervalId );
      }

      if ( eventType === "play" ) {
        playerService.play();
        this.intervalId = setInterval( this.handler.updateTime, intervalTime );
        this.mainPlayer.setAttribute( "image", playerService.currentStats.playing.art.original );
        this.miniPlayer.setAttribute( "image", playerService.currentStats.playing.art.original );
        this.bioText.innerText = playerService.currentStats.currentArtist.bio;
      }

      if ( eventType === "scrubStart" ) {
        this.handler.updateTime( currentVal, true );
      }

      if ( eventType === "rate" ) {
        //playerService.rateSong( currentVal );
      }

      if ( eventType === "skip" ) {
        playerService.next();
      }
    };

    togglePlayerHandler = function( event ) {
      var tmpId = event.target.id;

      switch( tmpId ) {
        case "minify-icon":
          this.mainPlayerWrapper.setAttribute( "class", "hidden" );
          this.miniPlayerWrapper.setAttribute( "class", "active" );
          break;
        case "mini-player":
          this.mainPlayerWrapper.setAttribute( "class", "active" );
          this.miniPlayerWrapper.setAttribute( "class", "hidden" );
          break;
        default:
          break;
      }
    };

    polymer( "ed-song-card-view", {
      /* LIFECYCLE */
      playerService: playerService,
      ready: function() {
        // dom selectors
        this.mainPlayer = this.$[ "main-player" ];
        this.mainPlayerWrapper = this.$[ "main-player-wrapper" ];

        this.miniPlayer = this.$[ "mini-player" ];
        this.miniPlayerWrapper = this.$[ "mini-player-wrapper" ];

        this.bioText = this.$[ "bio-copy" ];

        // Event Handler
        this.handler = {
          updateTime: updateTimeHandler.bind( this ),
          playerServiceEvent: playerServiceEventHandler.bind( this ),
          togglePlayer: togglePlayerHandler.bind( this )
        };
      },
      attached: function() {
        // bind events
        this.addEventListener( "scrubberUpdate", this.handler.playerServiceEvent );

        this.$[ "minify-icon" ].addEventListener( "click", this.handler.togglePlayer );
        this.$[ "mini-player-wrapper" ].addEventListener( "click", this.handler.togglePlayer );

        playerService.startMusicDiscovery( "profileBlend" );
      },
      detached: function() {
        clearInterval( this.intervalId );

        this.$[ "minify-icon" ].removeEventListener( "click", this.handler.togglePlayer );
        this.$[ "mini-player-wrapper" ].removeEventListener( "click", this.handler.togglePlayer );

        this.removeEventListener( "scrubberUpdate", this.handler.playerServiceEvent );
      },
      attributeChanged: function( attrName, oldValue, newValue ) {

      }
      /* PROPERTIES */
      /* METHODS */
    });
  });
})( window.Polymer );
