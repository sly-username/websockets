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

      // this.addEventListener( "mousedown", this.startDragging );
    }
    // startDragging: function() {
    //  var rect = this.scrubberBox.getBoudingClientRect();
    //  var xOffset = window.pageXOffset;
    //  var cachedLeft = rect.left + xOffset;
    //  var cachedWidth = rect.width;
    //  var cachedTop = rect.top + yOffset;
    //  var cachedHeight = rect.height;
    // }
  });
})( window.Polymer );
