( function( Polymer ) {
  "use strict";

  Polymer( "img-placeholder", {
    /*** FUNCTIONS ***/
    typeChanged: function( oldVal, newVal ) {
      this.name = newVal;
      this.setAttribute( "type", newVal );
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
