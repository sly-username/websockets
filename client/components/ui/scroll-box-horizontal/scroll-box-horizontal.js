( function( Polymer ) {
  "use strict";
  Polymer( "scroll-box-horizontal", {

    /*** PROPERTIES ***/
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
      // Disabled
//    get disabled() {
//      if ( !null ) {
//        return this._disabled;
//      }
//    },
//    set disabled( value ) {
//      if ( value !== null ) {
//        this.setAttribute( "disabled", value );
//
//        return ( this._disabled = value );
//      }
//    },
    // Show Arrow
//    get showArrow() {
//      if ( !null ) {
//        return this._showArrow;
//      }
//    },
//    set showArrow( value ) {
//      if ( value !== null ) {
//        this.setAttribute( "show-arrows", value );
//
//        return ( this._showArrow = value );
//      }
//    },
    /*** END PROPERTIES ***/
    /*** LIFECYCLE ***/
    ready: function() {
      this.innerBox = this.shadowRoot.getElementsByClassName( "inner-box" )[ 0 ];
    },
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
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
      if ( newVal == null && ( /^(disabled|show-arrows)/ ).test( attrName ) ) {
        this[attrName] = this.publish[attrName].value;
        return;
      }
//      switch ( attrName ) {
//        case "show-arrows":
//
//          if ( newVal !== null ) {
//            this.setAttribute( "show-arrows", newVal );
//          }
//          break;
//        case "disabled":
//
//        default:
//          // do nothing
//          break;
//      }
    }
    /*** END FUNCTIONS ***/

  });
})( window.Polymer );
