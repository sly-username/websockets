( function( polymer ) {
  "use strict";

  polymer( "ed-song-card-view", {
    /* LIFECYCLE */
    ready: function() {
      this.miniPlayer = this.shadowRoot.getElementById( "mini-player" );
      this.mainPlayer = this.shadowRoot.getElementById( "main-player" );
    },
    attached: function() {
      this.miniPlayer.addEventListener( "click", this.swapIcon.bind( this ) );
      this.mainPlayer.addEventListener( "click", this.swapIcon.bind( this ) );
    },
    swapIcon: function() {
      if ( this.miniPlayer.getAttribute( "icon" ) && this.mainPlayer.getAttribute( "icon" ) === "play" ) {
        this.miniPlayer.setAttribute( "icon", "pause" );
        this.mainPlayer.setAttribute( "icon", "pause" );
      } else {
        this.miniPlayer.setAttribute( "icon", "play" );
        this.mainPlayer.setAttribute( "icon", "play" );
      }
    }
  });
})( window.Polymer );
