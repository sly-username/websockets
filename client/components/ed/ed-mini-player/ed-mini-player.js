( function( polymer ) {
  "use strict";

  polymer( "ed-mini-player", {
    /* LIFECYCLE */
    ready: function() {
      this.playBtn = this.shadowRoot.getElementById( "play-btn" );
      this.icon = this.shadowRoot.getElementById( "play-icon" );
    },
    attached: function() {
      this.playBtn.addEventListener( "click", this.swapIcon.bind( this ) );
      this.playBtn.addEventListener( "tap", this.swapIcon.bind( this ) );
    },
    attributeChanged: function( attrName, oldValue, newValue ) {},
    swapIcon: function() {
      if ( this.icon.getAttribute( "name" ) === "play" ) {
        this.icon.setAttribute( "name", "pause" );
      } else {
        this.icon.setAttribute( "name", "play" );
      }
    }
    /* PROPERTIES */
    /* METHODS */
  });
})( window.Polymer );
