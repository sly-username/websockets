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
          this.miniPlayer.classList.remove( "hide-mini" );
          this.miniPlayer.classList.add( "show-mini" );

          this.songCardWrapper.classList.remove( "show-main" );
          this.songCardWrapper.classList.add( "hide-main" );
          break;
        case "mini-player":
          this.songCardWrapper.classList.remove( "hide-main" );
          this.songCardWrapper.classList.add( "show-main" );

          this.miniPlayer.classList.remove( "show-mini" );
          this.miniPlayer.classList.add( "hide-mini" );
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

        this.songCardWrapper = this.$[ "song-card-wrapper" ];

        this.miniPlayer = this.$[ "mini-player-wrapper" ];

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
      },
      detached: function() {
        clearInterval( this.intervalId );

        this.removeEventListener( "scrubberUpdate", this.handler.playerServiceEvent );
      },
      attributeChanged: function( attrName, oldValue, newValue ) {

      }
      /* PROPERTIES */
      /* METHODS */
    });
  });
})( window.Polymer );
