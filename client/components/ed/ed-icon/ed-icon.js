( function( polymer ) {
  "use strict";

  var nameList = [ "add189", "alarm52", "basic14", "basic15", "basic16", "basic17", "etc..." ];

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
    get nameList() {
      return nameList;
    },
    rotationChanged: function( oldVal, newVal ) {

      if ( newVal !== 0 | 90 | 180 | 270 ) {
        this.rotation = 0;
      }
    }
  });
})( window.Polymer );
