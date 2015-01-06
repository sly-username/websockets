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
      this.scrubberWrapper = this.shadowRoot.getElementById( "scrubberWrapper" );
      this.scrubberInput = this.shadowRoot.getElementById( "scrubberInput" );
      this.valBox = this.shadowRoot.getElementById( "valBox" );
    },
    attached: function() {
      copyAttributes( this, this.scrubberInput, [ "min", "max", "format" ]);
      copyAttributes( this, this.scrubberWrapper, [ "type" ]);
    },
    showVal: function() {
      this.valBox.innerHTML = this.scrubberInput.value;
    }
  });
})( window.Polymer );
