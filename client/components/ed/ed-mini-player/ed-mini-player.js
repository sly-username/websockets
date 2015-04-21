( function( polymer ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-player-service" ),
    System.import( "domain/lib/event/create-event" )
  ]).then(function( imported ) {
    var
      playerService = imported[ 0 ].default,
      createEvent = imported[ 1 ].default,
      createUpdateEvent = function( name, detail ) {
        detail = detail || {};
        detail.name = name;

        return createEvent( "scrubberUpdate", {
          detail: detail
        });
      },
      swapIconHandler = function() {
        var state = this.playIcon.getAttribute( "name" );

        if ( this.playIcon.getAttribute( "name" ) === "play" ) {
          this.playIcon.setAttribute( "name", "pause" );
        } else {
          this.playIcon.setAttribute( "name", "play" );
        }

        this.dispatchEvent( createUpdateEvent( state ));
      };

    polymer( "ed-mini-player", {
      /* LIFECYCLE */
      ready: function() {
        this.playBtn = this.shadowRoot.getElementById( "play-btn" );
        this.playIcon = this.shadowRoot.getElementById( "play-icon" );
        this.handlers = {
          swapIcon: swapIconHandler.bind( this )
        };

        this.playPauseEventHandler = function( event ) {
          var eventType = event.detail.type;

          if ( eventType === "play" ) {
            this.playIcon.setAttribute( "name", "pause" );
          }

          if ( eventType === "pause" ) {
            this.playIcon.setAttribute( "name", "play" );
          }
        }.bind( this );
      },
      attached: function() {
        this.playBtn.addEventListener( "click", this.handlers.swapIcon );
        this.playBtn.addEventListener( "tap", this.handlers.swapIcon );

        playerService.emitter.on( "playerUpdate", this.playPauseEventHandler )
      },
      detached: function() {
        this.playBtn.removeEventListener( "click", this.handlers.swapIcon );
        this.playBtn.removeEventListener( "tap", this.handlers.swapIcon );
      }
    });
  });
})( window.Polymer );
