( function( polymer ) {
  "use strict";

  polymer( "revolv-osel", {
    showButtons: false,
    publish: {
      loop: {
        value: true,
        reflect: true
      },
      pagination: {
        value: true,
        reflect: true
      },
      visible: {
        reflect: true
      }
    },
    ready: function() {},

    attributeChanged: function( attrName, oldValue, newValue ) {},

    loopChanged: function( oldValue, newValue ) {},
    visibileChange: function( oldValue, newValue ) {}
  });
})( window.Polymer );
