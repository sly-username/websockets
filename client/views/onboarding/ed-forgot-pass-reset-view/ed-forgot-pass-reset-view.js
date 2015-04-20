( function( polymer ) {
  "use strict";

  var submitCheckHandler = function() {
    if ( this.pairedInput.isValid ) {
      this.submitButton.removeAttribute( "disabled" );
    } else {
      this.submitButton.setAttribute( "disabled", "" );
    }
  };

  polymer( "ed-forgot-pass-reset-view", {
    /* LIFECYCLE */
    ready: function() {
      this.pairedInput = this.shadowRoot.querySelector( "ed-paired-input" );
      this.formContainer = this.shadowRoot.getElementById( "forgot-form" );
      this.submitButton = this.shadowRoot.getElementById( "forgot-submit" );
      this.handler = {
        submitCheck: submitCheckHandler.bind( this )
      };
    },
    attached: function() {
      this.formContainer.addEventListener( "keyup", this.handler.submitCheck );
    },
    detached: function() {
      this.formContainer.removeEventListener( "keyup", this.handler.submitCheck );
    }
  });
})( window.Polymer );
