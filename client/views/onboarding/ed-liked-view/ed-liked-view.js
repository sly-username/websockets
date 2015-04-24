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
        console.log( bubbleArray );
      };

    polymer( "ed-liked-view", {
      /* LIFECYCLE */
      ready: function() {
        this.handlers = {
          triggerBubbles: triggerBubblesHandler.bind( this )
        };
        this.inputBubbles = this.shadowRoot.querySelectorAll( "ed-bubble-select" );
        this.nextBtn = this.shadowRoot.getElementById( "next-button" );
      },
      attached: function() {
        this.nextBtn.addEventListener( "click", this.handlers.triggerBubbles );
      },
      detached: function() {
        this.nextBtn.removeEventListener( "click", this.handlers.triggerBubbles );
      },
      attributeChanged: function( attrName, oldValue, newValue ) {}
      /* PROPERTIES */
      /* METHODS */
    });
  });
})( window.Polymer );
