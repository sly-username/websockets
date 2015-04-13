( function( polymer ) {
  "use strict";

  polymer( "ed-mini-player", {
    /* LIFECYCLE */
    observe: {
      icon: "changeSVG"
    },
    ready: function() {
      this.playBtn = this.shadowRoot.getElementById( "play-btn" );
      this.playIcon = this.shadowRoot.getElementById( "play-icon" );
    },
    attached: function() {
      this.playBtn.addEventListener( "click", this.swapIcon.bind( this ) );
      this.playBtn.addEventListener( "tap", this.swapIcon.bind( this ) );
      this.playIcon.setAttribute( "name", this.icon );
    },
    attributeChanged: function( attrName, oldValue, newValue ) {},
    swapIcon: function() {
      if ( this.playIcon.getAttribute( "name" ) === "play" ) {
        this.playIcon.setAttribute( "name", "pause" );
      } else {
        this.playIcon.setAttribute( "name", "play" );
      }
    },
    changeSVG: function() {
      this.playIcon.setAttribute( "name", this.icon );
    }
    /* PROPERTIES */
    /* METHODS */
  });
})( window.Polymer );
