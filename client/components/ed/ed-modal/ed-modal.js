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

  Polymer( "ed-modal", {
    get clickOff() {
      return this._format;
    },
     set clickOff( value ) {
       this.attributes.clickOff.value = value;
       this._format = value;
       return value;
     },
    ready: function() {
    },
    attached: function() {
      copyAttributes( this, this, [ "trigger", "clickOff", "closeButton" ]);
      this.addEventListener( "click", this.closeButton.bind( this ) );
    },
    closeButton: function() {

    }
  });
})( window.Polymer );
