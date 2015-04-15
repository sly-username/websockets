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
    observe: {
      name: "changeSVG"
    },
    ready: function() {
      this.triggerSVG = this.shadowRoot.getElementById( "svg-use" );
      this.getUrl = "/assets/icons/svg.svg#" + this.name;
    },
    attached: function() {
      this.shadowRoot.querySelector( "svg" ).onload = console.log.bind(console);
      this.triggerSVG.setAttributeNS( "http://www.w3.org/1999/xlink", "xlink:href", this.getUrl );
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
    },
    changeSVG: function() {
      this.getUrl = "/assets/icons/svg.svg#" + this.name;
      this.triggerSVG.setAttributeNS( "http://www.w3.org/1999/xlink", "xlink:href", this.getUrl );
    }
  });
})( window.Polymer );
