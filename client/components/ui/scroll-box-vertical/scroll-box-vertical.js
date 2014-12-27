( function( Polymer ) {
  "use strict";
  Polymer( "scroll-box-vertical", {
    /*** PROPERTIES ***/
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
    /*** END PROPERTIES ***/
    /*** LIFECYCLE ***/
    ready: function() {
      this.innerBox = this.shadowRoot.getElementsByClassName( "inner-box" )[0];
    },
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
    // Scroll Up
    scrollUp: function( value ) {
      var scrollPosition = this.innerBox.scrollTop;
      this.innerBox.scrollTop = scrollPosition - parseInt( value, 10 );
    },
    // Scroll Down
    scrollDown: function( value ) {
      var scrollPosition = this.innerBox.scrollTop;
      this.innerBox.scrollTop = scrollPosition + parseInt( value, 10 );
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
    /*** END FUNCTIONS ***/

  });
})( window.Polymer );
