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
    get format() {
      return this._format;
    },
    set format( value ) {
      this.attributes.format.value = value;
      this._format = value;
      return value;
    },
    ready: function() {
      this.scrubberWrapper = this.shadowRoot.getElementById( "scrubber-wrapper" );
      this.scrubberInput = this.shadowRoot.getElementById( "scrubber-input" );
      this.valBox = this.shadowRoot.getElementById( "val-box" );
    },
    attached: function() {
      copyAttributes( this, this.scrubberInput, [ "min", "max", "format" ]);
      copyAttributes( this, this.scrubberWrapper, [ "type" ]);
    },
    showVal: function() {
      var inputValue = this.scrubberInput.value,
          valPercent = parseInt( ( (inputValue - this.scrubberInput.min ) / ( this.scrubberInput.max - this.scrubberInput.min ) * 100 ), 10 ) + "%",
          valTime = inputValue + " seconds";

      this.valBox.innerHTML = this.format === "percent" ? valPercent : valTime;
    }
  });
})( window.Polymer );
