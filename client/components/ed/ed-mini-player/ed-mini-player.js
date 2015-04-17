( function( polymer ) {
  "use strict";

  var swapIconHandler = function() {
    if ( this.playIcon.getAttribute( "name" ) === "play" ) {
      this.playIcon.setAttribute( "name", "pause" );
    } else {
      this.playIcon.setAttribute( "name", "play" );
    }
  };

  polymer( "ed-mini-player", {
    /* LIFECYCLE */
    ready: function() {
      this.playBtn = this.shadowRoot.getElementById( "play-btn" );
      this.playIcon = this.shadowRoot.getElementById( "play-icon" );
      this.handlers = {
        swapIcon: swapIconHandler.bind( this )
      };
    },
    attached: function() {
      this.playBtn.addEventListener( "click", this.handlers.swapIcon );
      this.playBtn.addEventListener( "tap", this.handlers.swapIcon );
    },
    detached: function() {
      this.playBtn.removeEventListener( "click", this.handlers.swapIcon );
      this.playBtn.removeEventListener( "tap", this.handlers.swapIcon );
    }
  });
})( window.Polymer );
