( function( polymer ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-discover-service" ),
    System.import( "domain/ed/services/ed-user-service" )
  ]).then(function( imported ) {
    var
      discoverService = imported[ 0 ].default,
      userService = imported[ 1 ].default,
      bubbleCounter = 0,
      bubbleArray = [],
      triggerBubblesHandler = function( event ) {
        var i;
        event.preventDefault();
        bubbleArray = [];

        for ( i = 0; i < this.inputBubbles.length; i++ ) {
          if ( this.inputBubbles[i].hasAttribute( "checked" ) ) {
            bubbleArray.push( this.inputBubbles[i].getAttribute( "data-id" ) );
          }
        }

        return discoverService.setCurrentProfileBlend( { data: { id: userService.currentProfile.id, genresLiked: this.likedBubbles, genresDisliked: bubbleArray }} )
          .then(function( response ) {
            console.log( response );
            this.router.go( "/discover" );
          });
      },
      // hides bubbles on ready
      hideBubblesHandler = function( event ) {
        var self = this;

        this.likedBubbles.forEach(function( idNumber ) {
          var genre = self.shadowRoot.querySelector( "ed-bubble-select[data-id='" + idNumber + "']" );
          genre.style.visibility = "hidden";
          genre.setAttribute( "disabled", "" );
        });
      },
      triggerCounterHandler = function( event ) {
        if ( event.target.hasAttribute( "checked" ) &&
          event.target.hasAttribute( "data-id" ) &&
          bubbleCounter < 1 ) {
          bubbleCounter++;
        } else if ( !event.target.hasAttribute( "checked" ) &&
          !event.target.hasAttribute( "disabled" ) &&
          bubbleCounter !== 0 ) {
          bubbleCounter--;
        }

        return this.handlers.bubblesDisliked();
      },
      bubblesDislikedHandler = function( event ) {
        var i, j;

        if ( bubbleCounter < 1 ) {
          for ( i = 0; i < this.inputBubbles.length; i++ ) {
            if ( !this.inputBubbles[ i ].hasAttribute( "checked" ) ) {
              this.inputBubbles[ i ].removeAttribute( "disabled" );
            }
          }
        }

        if ( bubbleCounter === 1 ) {
          for ( j = 0; j < this.inputBubbles.length; j++ ) {
            if ( !this.inputBubbles[ j ].hasAttribute( "checked" ) ) {
              this.inputBubbles[ j ].setAttribute( "disabled", "" );
            }
          }
        }
      };

    polymer( "ed-disliked-view", {
      /* LIFECYCLE */
      ready: function() {
        this.inputBubbles     = this.shadowRoot.querySelectorAll( "ed-bubble-select" );
        this.nextBtn          = this.shadowRoot.getElementById( "next-button" );
        this.bubbleContainer  = this.shadowRoot.getElementById( "bubble-container" );
        this.likedBubbles     = discoverService.likedBlend;
      },
      attached: function() {
        // handlers
        this.handlers = {
          hideBubbles: hideBubblesHandler.bind( this ),
          triggerCounter: triggerCounterHandler.bind( this ),
          bubblesDisliked: bubblesDislikedHandler.bind( this ),
          triggerBubbles: triggerBubblesHandler.bind( this )
        };

        this.bubbleContainer.addEventListener( "click", this.handlers.triggerCounter );
        this.nextBtn.addEventListener( "click", this.handlers.triggerBubbles );
        this.handlers.hideBubbles();
      },
      detached: function() {
        this.nextBtn.removeEventListener( "click", this.handlers.triggerBubbles );
        this.bubbleContainer.removeEventListener( "click", this.handlers.triggerCounter );
      },
      attributeChanged: function( attrName, oldValue, newValue ) {}
      /* PROPERTIES */
      /* METHODS */
    });
  });
})( window.Polymer );
