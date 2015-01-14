( function( Polymer ) {
  "use strict";

  Polymer( "file-drop", {
    /*** PROPERTIES ***/
    /*** END PROPERTIES ***/
    /*** LIFECYCLE ***/
    ready: function() {
      this.holder = this.shadowRoot.getElementById( "holder" );
      this.hiddenInput = this.shadowRoot.getElementById( "hidden-input" );
    },
    attached: function() {
      // Listeners for dragEvents
      this.holder.addEventListener( "dragover", function( event ) {
        event.preventDefault();
      });
      this.holder.addEventListener( "dragenter", function( event ) {
        event.target.className = "hover";
      });
      this.holder.addEventListener( "dragleave", function( event ) {
        event.target.className = "";
      });
      this.holder.addEventListener( "drop", function( event ) {
        var files = event.dataTransfer.files;

        // prevents the default redirect
        event.stopPropagation();
        event.preventDefault();
        event.target.className = "";
        this.readFiles( files );
      }.bind( this ) );
    },
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
    readFiles: function( files ) {
      this.hiddenInput.files = files;
      console.log( this.hiddenInput.files );
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
