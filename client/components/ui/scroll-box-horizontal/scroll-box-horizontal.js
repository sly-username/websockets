( function( Polymer ) {
  "use strict";
  Polymer( "scroll-box-horizontal", {

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
    /*** LIFECYCLE ***/
    ready: function() {
      this.innerBox = this.shadowRoot.getElementsByClassName( "inner-box" )[0];
    },
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
    // Scroll Up
    scrollUp: function( value ) {
      var scrollPosition = this.innerBox.scrollTop;
      this.innerBox.scrollTop = scrollPosition - value.replace( /\D/g, "" );
    },
    // Scroll Down
    scrollDown: function( value ) {
      var scrollPosition = this.innerBox.scrollTop;
      this.innerBox.scrollTop = scrollPosition + value.replace( /\D/g, "" );
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
