( function( Polymer ) {
  "use strict";

  Polymer( "file-drop", {
    /*** PROPERTIES ***/
    /*** END PROPERTIES ***/
    /*** LIFECYCLE ***/
    ready: function() {
      this.holder = this.shadowRoot.getElementById( "holder" );
    },
    attached: function() {
      // Listeners for dragEvents
      this.holder.addEventListener( "dragover", function() {
        this.holder.className = "hover";
        return false;
      }.bind( this ) );
      this.holder.addEventListener( "drop", function( event ) {
        event.stopPropagation();
        event.preventDefault();
      } );
      this.holder.addEventListener( "dragleave", function() {
        this.holder.className = "";
        return false;
      }.bind( this ) );
    }
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
