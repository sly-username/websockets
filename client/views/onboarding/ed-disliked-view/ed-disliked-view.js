( function( polymer ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-discover-service" )
  ]).then(function( imported ) {
    var
      discoverService = imported[ 0 ].default,
      bubbleCounter = 0,
      bubbleArray = [],
      triggerBubblesHandler = function( event ) {
        var i;
        event.preventDefault();

        // clear array
        bubbleArray = [];

        for ( i = 0; i < this.inputBubbles.length; i++ ) {
          if ( this.inputBubbles[i].hasAttribute( "checked" ) ) {
            bubbleArray.push( this.inputBubbles[i].getAttribute( "data-id" ) );
          }
        }

        return discoverService.setCurrentProfileBlend( { data: { id: 10, genresLiked: this.likedBubbles, genresDisliked: bubbleArray }} )
          .then(function( response ) {
            console.log( response );
            //this.router.go( "/onboarding/dislike" );

          });
      },
      hideBubblesHandler = function( event ) {
        var self = this;

        this.likedBubbles.forEach(function( idNumber ) {
          var genre = self.shadowRoot.querySelector( "ed-bubble-select[data-id='"+ idNumber + "']" );
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
        var i, j, k;

        // so many for loops ugh
        if ( bubbleCounter < 1 ) {
          for ( i = 0; i < this.inputBubbles.length; i++ ) {
            if ( !this.inputBubbles[ i ].hasAttribute( "checked" ) ) {
              this.inputBubbles[ i ].removeAttribute( "disabled" );
            }
          }
        }

        if ( bubbleCounter === 1 ) {
          for ( j = 0; j < this.inputBubbles.length; j++ ) {
            this.inputBubbles[ j ].setAttribute( "disabled", "" );
          }

          for ( k = 0; k < this.inputBubbles.length; k++ ) {
            if ( this.inputBubbles[ k ].hasAttribute( "checked" ) ) {
              this.inputBubbles[ k ].removeAttribute( "disabled" );
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
