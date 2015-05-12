( function( polymer ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-player-service" ),
    System.import( "domain/lib/event/create-event" )
  ]).then(function( imported ) {
    var
      playerService = imported[ 0 ].default,
      createEvent = imported[ 1 ].default,
      triggerRatingHandler,
      playerUpdateHandler;

    // helpers
    triggerRatingHandler= function( event ) {
      switch ( event.target.id ) {
        case "rate1":
          if ( this.fifthInput.checked || this.forthInput.checked || this.thirdInput.checked || this.secondInput.checked ) {
            break;
          }
          this.transformOverlap( -80 );
          break;
        case "rate2":
          if ( this.fifthInput.checked || this.forthInput.checked || this.thirdInput.checked ) {
            break;
          }
          this.transformOverlap( -60 );
          break;
        case "rate3":
          if ( this.fifthInput.checked || this.forthInput.checked ) {
            break;
          }
          this.transformOverlap( -40 );
          break;
        case "rate4":
          if ( this.fifthInput.checked ) {
            break;
          }
          this.transformOverlap( -20 );
          break;
        case "rate5":
          this.transformOverlap( 0 );
          break;
        default:
          // do nothing
          break;
      }

      this.dispatchEvent( createEvent( "scrubberUpdate", {
        detail: {
          name: "rate",
          currentVal: event.target.getAttribute( "value" )
        }
      }));
    };

    playerUpdateHandler = function( event ) {
      if ( event.type === "playerUpdate" ) {
        this.$[ "track-name" ].innerText = playerService.currentStats.playing.name;
        this.$[ "track-name" ].classList.remove( "loading" );

        if ( event.detail.type === "artistUpdate" ) {
          this.$[ "artist-name" ].classList.remove( "loading" );
          this.$[ "artist-name" ].innerText = playerService.currentStats.currentArtist.displayName;
        }
      }
    };

    polymer( "ed-star-rating", {
      /* LIFECYCLE */
      disable: false,
      playerService: playerService,
      ready: function() {
        this.handlers = {
          triggerRating: triggerRatingHandler.bind( this ),
          playerUpdate: playerUpdateHandler.bind( this )
        };
        this.inputField = this.shadowRoot.getElementById( "input-field" );
        this.overlapField = this.shadowRoot.getElementById( "overlap-field" );
        this.secondInput = this.shadowRoot.getElementById( "rate2" );
        this.thirdInput = this.shadowRoot.getElementById( "rate3" );
        this.forthInput = this.shadowRoot.getElementById( "rate4" );
        this.fifthInput = this.shadowRoot.getElementById( "rate5" );
      },
      attached: function() {
        this.inputField.addEventListener( "click", this.handlers.triggerRating );
        this.inputField.addEventListener( "mouseover", this.handlers.triggerRating );

        // bind player updates through the service
        playerService.emitter.on( "playerUpdate", this.handlers.playerUpdate );
      },
      detached: function() {
        this.inputField.removeEventListener( "click", this.handlers.triggerRating );
        this.inputField.removeEventListener( "mouseover", this.handlers.triggerRating );

        playerService.emitter.off( "playerUpdate", this.handlers.playerUpdate );
      },

      transformOverlap: function( percent ) {
        this.overlapField.style.transform = "translateX(" + percent + "%)";
        this.overlapField.style.webkitTransform = "translateX(" + percent + "%)";
        this.overlapField.style.msTransform = "translateX(" + percent + "%)";
      }
    });
  });
})( window.Polymer );
