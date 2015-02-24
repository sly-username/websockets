( function( polymer ) {
  "use strict";
  polymer( "scroll-box-horizontal", {

    publish: {
      disabled: {
        value: false,
        reflect: true
      },
      showArrows: {
        value: false,
        reflect: true
      }
    },
    get showArrow() {
      if ( !null ) {
        return this._showArrow;
      }
    },
    set showArrow( value ) {
      if ( value !== null ) {
        this.setAttribute( "show-arrows", value );

        return ( this._showArrow = value );
      }
    },
    ready: function() {
      this.innerBox = this.shadowRoot.getElementsByClassName( "inner-box" )[ 0 ];
    },
    scrollBoxRight: function( value ) {
      var currentPosition = this.innerBox.scrollLeft;
      this.innerBox.scrollLeft = currentPosition + parseInt( value, 10 );
    },
    // Scroll Left
    scrollBoxLeft: function( value ) {
      var currentPosition = this.innerBox.scrollLeft;
      this.innerBox.scrollLeft = currentPosition - parseInt( value, 10 );
    },
    // Listens for disabled
    disabledChanged: function( oldVal, newVal ) {
      this.disabled = newVal;
      this.setAttribute( "disabled", newVal );
    },
    attributeChanged: function( attrName, oldVal, newVal ) {
      if ( newVal == null && ( /^(disabled|show-arrows)/ ).test( attrName ) ) {
        this[attrName] = this.publish[attrName].value;
        return;
      }
    }
    /* END FUNCTIONS */
  });
})( window.Polymer );
