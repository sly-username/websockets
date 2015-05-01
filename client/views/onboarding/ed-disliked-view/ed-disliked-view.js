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
        event.preventDefault();

        bubbleArray = Array.from( this.inputBubbles )
          .filter(function( element ) {
            return element.hasAttribute( "checked" );
          })
          .map(function( element ) {
            return element.getAttribute( "data-id" );
          });

        console.log( "trigger bubbles handler %o, %o", this.likedBubbles, bubbleArray );
        return discoverService.setCurrentProfileBlend( this.likedBubbles, bubbleArray )
          .then(function( response ) {
            console.log( response );
            // todo go to song card and start playing discover blend
          }.bind( this ));
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
        this.likedBubbles     = this.getUrlVar();
        // handlers
        this.handlers = {
          hideBubbles: hideBubblesHandler.bind( this ),
          triggerCounter: triggerCounterHandler.bind( this ),
          bubblesDisliked: bubblesDislikedHandler.bind( this ),
          triggerBubbles: triggerBubblesHandler.bind( this )
        };
      },
      attached: function() {
        this.bubbleContainer.addEventListener( "click", this.handlers.triggerCounter );
        this.nextBtn.addEventListener( "click", this.handlers.triggerBubbles );
        this.handlers.hideBubbles();
      },
      detached: function() {
        this.nextBtn.removeEventListener( "click", this.handlers.triggerBubbles );
        this.bubbleContainer.removeEventListener( "click", this.handlers.triggerCounter );
      },
      getUrlVar: function() {
        var query = location.hash.substr( 1 ),
           result = [];

        query.split( "?" ).forEach(function( part ) {
          var item = part.split( "=" );
          result[item[0]] = decodeURIComponent( item[1] );
        });

        return result.genresliked.split( "," );
      }
      /* PROPERTIES */
      /* METHODS */
    });
  });
})( window.Polymer );
