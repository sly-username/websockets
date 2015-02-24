( function( polymer ) {
  "use strict";
  polymer( "scroll-box-horizontal", {

    /* PROPERTIES */
      // Disabled
    get disabled() {
      if ( !null ) {
        return this._disabled;
      }
    },
    set disabled( value ) {
      if ( value !== null ) {
        this.setAttribute( "disabled", value );

        return ( this._disabled = value );
      }
    },
    // Show Arrow
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
    /* END PROPERTIES */
    /* LIFECYCLE */
    ready: function() {
      this.innerBox = this.shadowRoot.getElementsByClassName( "inner-box" )[ 0 ];
    },
    /* END LIFECYCLE */
    /* FUNCTIONS */
    // Scroll Right
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

    // Listens for show-arrows, can't listen for disabled due to native disabled
    attributeChanged: function( attrName, oldVal, newVal ) {
      switch ( attrName ) {
        case "show-arrows":

          if ( newVal !== null ) {
            this.setAttribute( "show-arrows", newVal );
          }
          break;
        default:
          // do nothing
          break;
      }
    }
    /* END FUNCTIONS */
  });
})( window.Polymer );
