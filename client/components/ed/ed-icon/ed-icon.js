( function( Polymer ) {
  "use strict";

  Polymer( "ed-icon", {
    /* PROPERTIES */
    _nameList: [ "add189", "alarm52", "basic14", "basic15", "basic16", "basic17", "etc..." ],
    // nameList
    get nameList() {
      return this._nameList;
    },
    /* END PROPERTIES */
    /* FUNCTIONS */
    nameChanged: function( oldVal, newVal ) {
      this.name = newVal;
      this.setAttribute( "name", newVal );
    },
    rotationChanged: function( oldVal, newVal ) {
      this.rotation = newVal;
      this.setAttribute( "rotation", newVal );
    }
    /* END FUNCTIONS */
  });
})( window.Polymer );
