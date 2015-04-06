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
    attached: function() {
      this.shadowRoot.querySelector( "svg" ).onload = console.log.bind(console);
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
