( function( polymer ) {
  "use strict";

  polymer( "ed-registration-view", {
    /* LIFECYCLE */
    ready: function() {
      this.pairedInput = this.shadowRoot.querySelector( "ed-paired-input" );
      this.formContainer = this.shadowRoot.getElementById( "registration-form" );
      this.submitButton = this.shadowRoot.getElementById( "registration-submit" );
    },
    attached: function() {
      this.formContainer.addEventListener( "keyup", this.submitCheck.bind( this ) );
    },
    submitCheck: function() {
      if ( this.pairedInput.isValid ) {
        this.submitButton.removeAttribute( "disabled" );
      } else {
        this.submitButton.setAttribute( "disabled", "" );
      }
    },
    detached: function() {},
    attributeChanged: function( attrName, oldValue, newValue ) {}
    /* PROPERTIES */
    /* METHODS */
  });
})( window.Polymer );
