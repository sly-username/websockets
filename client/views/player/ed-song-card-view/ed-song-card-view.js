( function( polymer ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-player-service" ),
    System.import( "domain/lib/event/create-event" )
  ]).then(function( imported ) {
    var
      playerService = imported[ 0 ].default,
      intervalTime = 500,
      updateTimeHandler;

    // helpers
    updateTimeHandler = function( tempValue, scrubFlag ) {
      var currentValue;

      if ( scrubFlag ) {
        currentValue = playerService.scrubTo( tempValue );
      } else {
        currentValue = playerService.currentTime;
      }

      this.mainPlayer.setAttribute( "max", playerService.trackLength );
      this.mainPlayer.setAttribute( "value", currentValue );
    };

    // TODO remove
    window.playerService = playerService;

    polymer( "ed-song-card-view", {
      /* LIFECYCLE */
      playerService: playerService,
      ready: function() {
        // dom selectors
        this.mainPlayer = this.$[ "main-player" ];
        this.miniPlayer = this.$[ "mini-player" ];
        // this.rating = this.$[ "mini-player" ];

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
        }.bind( this );
      },
      attached: function() {
        // bind events
        this.addEventListener( "scrubberUpdate", this.playerServiceEventHandler );

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
