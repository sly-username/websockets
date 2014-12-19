( function( Polymer ) {
  "use strict";
  Polymer( "scroll-box-vertical", {

    /*** PROPERTIES ***/
    // Show Arrow
    get showArrow() {
      return this._showArrow;
    },
    set showArrow( value ) {
      this.setAttribute( "show-arrows", value );

      return ( this._showArrow = value );
    },
    /*** END PROPERTIES ***/
    /*** FUNCTIONS ***/
    // Scroll Up
    scrollUp: function( value ) {
      var innerBox = this.shadowRoot.getElementsByClassName( "inner-box" )[0];
      innerBox.scrollTop = parseInt( value, 10 );
    },
    // Scroll Down
    scrollDown: function( value ) {
      var innerBox = this.shadowRoot.getElementsByClassName( "inner-box" )[0];
      console.log( innerBox.scrollHeight );
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
          this.setAttribute( "show-arrows", newVal );
          break;
        default:
          // do nothing
          break;
      }
    }
    /*** END FUNCTIONS ***/

  });
})( window.Polymer );
