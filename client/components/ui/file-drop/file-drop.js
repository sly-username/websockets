( function( Polymer ) {
  "use strict";

  Polymer( "file-drop", {
    droppedFiles: {},
    /*** PROPERTIES ***/
    /*** END PROPERTIES ***/
    /*** LIFECYCLE ***/
    ready: function() {
      //this._acceptable = this.accepts.split( ", " );
      //console.log( this._acceptable );
      //this.holder = this.shadowRoot.getElementById( "holder" );
      this.hiddenInput = this.shadowRoot.getElementById( "hidden-input" );
    },
    attached: function() {
      // Listeners for dragEvents
      this.addEventListener( "drop", function( event ) {
        this.hiddenInput.dispatchEvent( event );
      });
      this.hiddenInput.addEventListener( "drop", function( event ) {
        event.stopPropagation();
      });

      /*this.holder.addEventListener( "dragover", function( event ) {
        event.preventDefault();
      });
      this.holder.addEventListener( "dragenter", function( event ) {
        event.target.className = "hover";
      });
      this.holder.addEventListener( "dragleave", function( event ) {
        event.target.className = "";
      });
      this.holder.addEventListener( "drop", function( event ) {
        var i, j;
        this.droppedFiles = Array.from( event.dataTransfer.files );

        console.log( 1, this.droppedFiles );
        // prevents the default redirect
        event.stopPropagation();
        event.preventDefault();
        event.target.className = "";

        // filters for acceptable types
        for ( i = 0; i < this.droppedFiles.length; i++ ) {
         //search the string for match instead of looping over accepts again.
          for ( j = 0; j < this._acceptable.length; j++ ) {
            if ( this.droppedFiles[i].type === this._acceptable[j] ) {
              break;
            } else if ( j === this._acceptable.length - 1 ) {
              this.droppedFiles.splice( i, 1 );
              i--;
            }
          }
        }
        console.log(2, this.droppedFiles );

      }.bind( this ) );*/
    }
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
