( function( Polymer ) {
  "use strict";

  var copyAttributes = function( elemFrom, elemTo, attrs ) {
    attrs.forEach( function( attr ) {
      if ( elemFrom.hasAttribute( attr ) ) {
        elemTo.setAttribute( attr, elemFrom.getAttribute( attr ) );
      } else {
        elemTo.removeAttribute( attr );
      }
    });
  };

  Polymer( "ed-scrubber", {
    ready: function() {
      this.scrubberBox = this.shadowRoot.getElementById( "scrubber-box" );
    },
    attached: function() {
      copyAttributes( this, this.scrubberBox, [ "min", "max", "format", "type" ] );
      this.scrubberBox.addEventListener( "mousedown", this.createScrubber );
      this.scrubberDiv = document.createElement( "INPUT" );
    },
    createScrubber: function() {
      this.scrubberDiv.setAttribute( "type", "range" );
      this.scrubberDiv.id = "scrubber-progress";
    }
  });
})( window.Polymer );
