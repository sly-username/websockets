( function( Polymer ) {
  "use strict";

  Polymer( "flip-box", {
    get trigger() {
      return this._trigger;
    },
    set trigger( value ) {
      this.setAttribute( "trigger", value );
      this._trigger = value;
      return value;
    },
    /*** LIFECYCLE ***/
    ready: function() {

    },
    attached: function() {

    },

    /*** FUNCTIONS ***/

    /* ATTRIBUTE CHANGE */
    attributeChanged: function( attrName, oldVal, newVal ) {

      if ( attrName === "trigger" ) {
        //this.triggerListener( "remove" );
        this.trigger = newVal;
        //this.triggerListener( "add" );
      } else {
        this[attrName] = newVal === "";
      }

      if ( attrName === "closebutton" ) {
        this.modalButton.classList[ !newVal && newVal !== "" ? "add" : "remove" ]( "hidden" );
      }
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
