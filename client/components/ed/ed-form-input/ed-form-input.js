( function( polymer ) {
  "use strict";

  polymer( "ed-form-input", {
    /* LIFECYCLE */
    publish: {
      wide: {
        reflect: true
      },
      high: {
        reflect: true
      },
      min: {
        reflect: true
      },
      max: {
        reflect: true
      }
    },
    get value() {
      return this.$.input.value;
    },
    ready: function() {},
    attached: function() {},
    detached: function() {},
    attributeChanged: function( attrName, oldValue, newValue ) {}
    /* PROPERTIES */
    /* METHODS */
  });
})( window.Polymer );
