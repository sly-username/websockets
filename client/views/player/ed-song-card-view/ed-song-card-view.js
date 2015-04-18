( function( polymer ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-player-service" ),
    System.import( "domain/ed/objects/model-type-checker" )
  ]).then(function( imported ) {
    var
      playerService = imported[ 0 ].default,
      typeChecker = imported[ 1 ].default,
      intervalId,
      intervalTime = 500;

    polymer( "ed-song-card-view", {
      /* LIFECYCLE */
      playerService: playerService,
      ready: function() {
        // dom selectors
        this.mainPlayer = this.$[ "main-player" ];
        this.miniPlayer = this.$[ "mini-player" ];

        // just for now
        this.playBtn = this.mainPlayer.shadowRoot.getElementById( "play-btn" );
        // this.rating = this.$[ "mini-player" ];

        this.playerServiceEventHandler = function( event ) {
          var eventType = event.detail.type;

          if ( eventType === "pause" || eventType === "stop" ) {
            clearInterval( intervalId );
          }

          if ( eventType === "play" ) {
            intervalId = setInterval( this.playerServiceEventHandler, intervalTime );
          }
        }.bind( this );
      },
      attached: function() {
        // bind events
        this.playBtn.addEventListener( "click", this.handleEvents.bind( this ));

        // attach play/pause/stop event handlers
        playerService.emitter.on( "update", this.playerServiceEventHandler );

        // setup interval
        // only if playing
        //intervalId = setInterval( this.updateScrub.bind( this ), 500 );
      },
      detached: function() {
        clearInterval( intervalId );

        // remove play/pause/stop event handlers
        playerService.emitter.off( "update", this.playerServiceEventHandler );
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
      },
      handleEvents: function( event ) {
        var self = this,
          tempId = event.target.getAttribute( "id" );

        if ( event.type === "click" ||  event.type === "tap" && tempId === "play-icon" ) {
          //this.swapIcon();
          this.playSong();
          //this.updateScrub();
        }
      }
      /* PROPERTIES */
      /* METHODS */
    });
  });
})( window.Polymer );
