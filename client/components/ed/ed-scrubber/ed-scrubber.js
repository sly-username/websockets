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


  var isDown = false;
  var scrubberDiv;
  var offset;
  var mousePosition;

  Polymer( "ed-scrubber", {
    ready: function() {
      this.scrubberBox = this.shadowRoot.getElementById( "scrubber-box" );
    },
    attached: function() {
      copyAttributes( this, this.scrubberBox, [ "min", "max", "format", "type" ] );

      this.addEventListener( "mousedown", this.startDragging );
      this.addEventListener( "mousemove", this.dragging );
      this.addEventListener( "mouseup", this.stopDragging );
    },
    createScrubberDiv: function() {
      scrubberDiv = document.createElement( "div" );

      // create div
      this.appendChild( scrubberDiv );
    },
    startDragging: function( event ) {
      isDown = true;
      offset = scrubberDiv.offsetLeft - event.clientX;
    },
    dragging: function( event ) {
      event.preventDefault();

      if ( isDown ) {
        mousePosition = event.clientX;
        scrubberDiv.style.left = ( mousePosition.x + offset[0] ) + "px";
      }
    },
    stopDragging: function() {
      isDown = false;
    }
  });
})( window.Polymer );
