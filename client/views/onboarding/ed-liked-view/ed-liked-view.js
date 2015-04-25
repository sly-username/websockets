( function( polymer ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-discover-service" )
  ]).then(function( imported ) {
    var
      discoverService = imported[ 0 ].default,
      bubbleCounter = 0,
      bubbleArray = [],
      i,
      triggerBubblesHandler = function( event ) {
        for ( i = 0; i < this.inputBubbles.length; i++ ) {
          if ( this.inputBubbles[i].hasAttribute( "checked" ) ) {
            bubbleArray.push( this.inputBubbles[i].getAttribute( "data-id" ) );
          }
        }
      },
      triggerCounterHandler = function( event ) {
        var i;
        for ( i = 0; i < this.inputBubbles.length; i++ ) {
          if ( this.inputBubbles[i].hasAttribute( "checked" ) ) {
            bubbleCounter++;
          }
          if ( bubbleCounter > 3 ) {
            latestcheck.checked = false;
          }
        }
        //if ( event.target.hasAttribute( "checked" ) && bubbleCounter !== 3 ) {
        //  bubbleCounter++;
        //} else if ( !event.target.hasAttribute( "checked" ) && bubbleCounter < 4 ) {
        //  event.target.removeAttribute( "disabled" );
        //  bubbleCounter--;
        //}
        //
        //if ( bubbleCounter === 3 ) {
        //  for ( i = 0; i < this.inputBubbles.length; i++ ) {
        //    this.inputBubbles[ i ].setAttribute( "disabled", "" );
        //
        //    if ( this.inputBubbles[ i ].hasAttribute( "checked" ) ) {
        //      this.inputBubbles[ i ].removeAttribute( "disabled" );
        //      console.log( this.inputBubbles[ i ] );
        //    }
        //  }
        //}
        //
        //console.log( "event.target", event.target );
        //console.log( "bubbleCounter", bubbleCounter );
      };

    polymer( "ed-liked-view", {
      /* LIFECYCLE */
      ready: function() {
        this.handlers = {
          triggerBubbles: triggerBubblesHandler.bind( this ),
          triggerCounter: triggerCounterHandler.bind( this )
        };
        this.inputBubbles = this.shadowRoot.querySelectorAll( "ed-bubble-select" );
        this.nextBtn = this.shadowRoot.getElementById( "next-button" );
        this.bubbleContainer = this.shadowRoot.getElementById( "bubble-container" );
        console.log( this.inputBubbles[0].shadowRoot.getElementsByTagName( "input" ));
      },
      attached: function() {
        this.nextBtn.addEventListener( "click", this.handlers.triggerBubbles );
        this.bubbleContainer.addEventListener( "click", this.handlers.triggerCounter );
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
