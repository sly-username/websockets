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
    get min() {
      return this.min;
    },
    set min( value ) {
      this.setAttribute( "min", value );
      this.min = value;
      return value;
    },
    get max() {
      return this.max;
    },
    set max( value ) {
      this.setAttribute( "max", value );
      this.max = value;
      return value;
    },
    get format() {
      return this.format;
    },
    set format( value ) {
      this.setAttribute( "format", value );
      this.format = value;
      return value;
    },
    get type() {
      return this.type;
    },
    set type( value ) {
      this.setAttribute( "type", value );
      this.type = value;
      return value;
    },
    ready: function() {
      this.scrubberBox = this.shadowRoot.getElementById( "scrubber-box" );
    },
    attached: function() {
      copyAttributes( this, this.scrubberBox, [ "min", "max", "format", "type" ] );
    }
  });
})( window.Polymer );
