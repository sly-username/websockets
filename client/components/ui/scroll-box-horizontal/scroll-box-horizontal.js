( function( Polymer ) {
  "use strict";
  Polymer( "scroll-box-horizontal", {

    /*** PROPERTIES ***/
    // Show Arrow
    get showArrows() {
      return this._showArrows;
    },
    set showArrows( value ) {
      this.setAttribute( "show-arrows", value );

      return ( this._showArrows = value );
    },
    /*** END PROPERTIES ***/
    /*** LIFECYCLE ***/
    ready: function() {
      this.innerBox = this.shadowRoot.getElementsByClassName( "inner-box" )[0];
    },
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
    // Scroll Right
    myScrollRight: function( value ) {
      var currentPosition = this.innerBox.scrollLeft;
      this.innerBox.scrollLeft = currentPosition + parseInt( value, 10 );
    },
    // Scroll Left
    myScrollLeft: function( value ) {
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
