( function( polymer ) {
  "use strict";

  polymer( "ed-icon", {
    publish: {
      rotation: {
        value: 0,
        reflect: true
      },
      name: {
        reflect: true
      }
    },
    _nameList: [ "add189", "alarm52", "basic14", "basic15", "basic16", "basic17", "etc..." ],
    get nameList() {
      return this._nameList;
    },
    rotationChanged: function( oldVal, newVal ) {

      if ( newVal !== 0 | 90 | 180 | 270 ) {
        this.rotation = 0;
      }
    }
  });
})( window.Polymer );
