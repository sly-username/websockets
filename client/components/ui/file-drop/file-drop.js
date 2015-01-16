( function( Polymer ) {
  "use strict";

  Polymer( "file-drop", {
    files: [],
    /*** PROPERTIES ***/
    /*** END PROPERTIES ***/
    /*** LIFECYCLE ***/
    ready: function() {
      this.hiddenInput = this.shadowRoot.getElementById("hidden-input");
      this.holder = this.shadowRoot.getElementById( "holder" );
      // Listeners for dragEvents
    },
    attached: function() {
      this.holder.addEventListener( "dragover", function( event ) {
        event.stopPropagation();
        event.preventDefault();
      });
      this.holder.addEventListener( "drop", function( event ) {
        event.stopPropagation();
        event.preventDefault();
        this.files = Array.from( event.dataTransfer.files ).filter( function( file ) {
          var compare = new RegExp( file.type );
          console.log( compare.test( this.accepts ) );
          return compare.test( this.accepts );
        }.bind( this ) );
        console.log( this.files );
      }.bind( this ) );
    }
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
