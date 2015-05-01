( function( polymer ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-user-service" )
  ]).then(function( imported ) {
    var
      userService = imported[ 0 ].default,
      passwordCheckHandler = function() {
        if ( this.pairedInput.isValid ) {
          this.submitButton.removeAttribute( "disabled" );
        } else {
          this.submitButton.setAttribute( "disabled", "" );
        }
      },
      submitCheckHandler = function() {
        event.preventDefault();

        return userService.forgotPasswordSet( this.resetCodeInput.value, this.passwordConfirmInput.value )
          .then(function( response ) {
            console.log( response );
            return response;
          }.bind( this ));
      };

    polymer( "ed-forgot-pass-reset-view", {
      /* LIFECYCLE */
      ready: function() {
        this.pairedInput = this.shadowRoot.querySelector( "ed-paired-input" );
        this.formContainer = this.shadowRoot.getElementById( "forgot-form" );
        this.submitButton = this.shadowRoot.getElementById( "forgot-submit" );
        this.passwordConfirmInput = this.shadowRoot.querySelector( ".password" )
          .shadowRoot.querySelector( "input#confirm-box" );
        this.resetCodeInput = this.shadowRoot.querySelector( ".reset-code" )
          .shadowRoot.querySelector( "input" );
        this.handlers = {
          submitCheck: submitCheckHandler.bind( this ),
          passwordCheck: passwordCheckHandler.bind( this )
        };
      },
      attached: function() {
        this.formContainer.addEventListener( "keyup", this.handlers.passwordCheck );
        this.submitButton.addEventListener( "click", this.handlers.submitCheck );
      },
      detached: function() {
        this.formContainer.removeEventListener( "keyup", this.handlers.passwordCheck );
        this.submitButton.removeEventListener( "click", this.handlers.submitCheck );
      }
    });
  });
})( window.Polymer );
