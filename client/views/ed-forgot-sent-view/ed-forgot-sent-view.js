( function( polymer ) {
  "use strict";

  polymer( "ed-forgot-sent-view", {
    /* LIFECYCLE */
    ready: function() {
      this.pairedInput = this.shadowRoot.querySelector( "ed-paired-input" );
      this.formContainer = this.shadowRoot.getElementById( "forgot-form" );
      this.submitButton = this.shadowRoot.getElementById( "forgot-submit" );
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
    }
  });
})( window.Polymer );
