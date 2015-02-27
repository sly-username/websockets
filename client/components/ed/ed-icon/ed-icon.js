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
    rotationChanged: function( oldValue, newValue ) {
      switch ( newValue ) {
        case 0:
        case 90:
        case 180:
        case 270:
          break;
        default:
          this.rotation = 0;
      }
    }
  });
})( window.Polymer );
