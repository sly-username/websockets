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
      },
      required: {
        value: false,
        reflect: true
      }
    },
    get value() {
      return this.$.input.value;
    },
    set value( value ) {
      this.$.input.value = value;
      return value;
    },
    get validity() {
      return this.$.input.validity;
    },
    focus: function() {
      return this.$.input.focus();
    },
    ready: function() {},
    attached: function() {},
    detached: function() {},
    attributeChanged: function( attrName, oldValue, newValue ) {}
    /* PROPERTIES */
    /* METHODS */
  });
})( window.Polymer );
