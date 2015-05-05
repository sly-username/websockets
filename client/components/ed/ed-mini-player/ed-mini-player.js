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
      },
      playPauseEventHandler = function( event ) {
        var eventType = event.detail.type;

        if ( eventType === "play" ) {
          this.playIcon.setAttribute( "name", "pause" );
        }

        if ( eventType === "pause" ) {
          this.playIcon.setAttribute( "name", "play" );
        }
      };

    polymer( "ed-mini-player", {
      /* LIFECYCLE */
      ready: function() {
        this.playBtn = this.shadowRoot.getElementById( "play-btn" );
        this.playIcon = this.shadowRoot.getElementById( "play-icon" );

        // event handler
        this.handler = {
          swapIcon: swapIconHandler.bind( this ),
          playPauseEvent: playPauseEventHandler.bind( this )
        };
      },
      attached: function() {
        this.playBtn.addEventListener( "click", this.handler.swapIcon );

        playerService.emitter.on( "playerUpdate", this.handler.playPauseEvent )
      },
      detached: function() {
        this.playBtn.removeEventListener( "click", this.handler.swapIcon );

        playerService.emitter.off( "playerUpdate", this.handler.playPauseEvent )
      }
    });
  });
})( window.Polymer );
