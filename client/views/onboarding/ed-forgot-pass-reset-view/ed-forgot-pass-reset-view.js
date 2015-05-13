( function( polymer ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-user-service" )
  ]).then(function( imported ) {
    var
      userService = imported[ 0 ].default,
      clickEvents = [ "mousedown", "touchstart" ];

    polymer( "ed-forgot-pass-reset-view", {
      /* LIFECYCLE */
      ready: function() {
        this.submitButton = this.shadowRoot.querySelector( "#forgot-submit" );

        this.pairedInput = this.shadowRoot.querySelector( "ed-paired-input" );
        this.primaryBox = this.shadowRoot.querySelector( ".password" )
          .shadowRoot.querySelector( ".ed-paired-input-primary-wrapper" );
        this.confirmBox = this.shadowRoot.querySelector( ".password" )
          .shadowRoot.querySelector( ".ed-paired-input-confirm-wrapper" );
        this.confirmInput = this.shadowRoot.querySelector( ".password" )
          .shadowRoot.querySelector( "input#confirm-box" );

        // todo change to .value
        this.resetCodeInput = this.shadowRoot.querySelector( ".reset-code" )
          .shadowRoot.querySelector( "input" );
        this.resetCodeBox = this.shadowRoot.querySelector( ".reset-code" )
          .shadowRoot.querySelector( ".form-input-container" );

        this.resetCodeError = this.shadowRoot.querySelector( ".reset-code-error" );
        this.matchError = this.shadowRoot.querySelector( ".match-error" );
        this.patternError = this.shadowRoot.querySelector( ".pattern-error" );
      },
      attached: function() {
        clickEvents.forEach( function( eventName ) {
          this.submitButton.addEventListener( eventName, this.submitCheck.bind( this ) );
        }.bind( this ));

        this.submitButton.addEventListener( "keypress", this.validateAfterEnter.bind( this ) );
      },
      detached: function() {
        clickEvents.forEach( function( eventName ) {
          this.submitButton.removeEventListener( eventName, this.submitCheck.bind( this ) );
        }.bind( this ));

        this.submitButton.removeEventListener( "keypress", this.validateAfterEnter.bind( this ) );
      },
      validateCodeInput: function() {
        if ( this.resetCodeInput.value !== "" ) {
          this.resetCodeBox.classList.remove( "invalid-field" );
          return true;
        } else if ( this.resetCodeInput.value === "" ) {
          this.resetCodeBox.classList.add( "invalid-field" );
          this.resetCodeError.innerHTML = "Wrong. Please check your reset code and try again."
          return false;
        }
      },
      validatePasswordPair: function() {
        if ( this.pairedInput.inputMatchConfirm ) {
          this.primaryBox.classList.remove( "invalid-field" );
          this.confirmBox.classList.remove( "invalid-field" );
          return true;
        } else if ( !this.pairedInput.inputMatchConfirm ) {
          this.primaryBox.classList.add( "invalid-field" );
          this.confirmBox.classList.add( "invalid-field" );
          this.matchError.innerHTML = "Wrong. Passwords Do Not Match.";
          return false;
        }
      },
      validateRegexPattern: function() {
        if ( this.pairedInput.regexConfirm ) {
          console.log( this.primaryBox );
          this.primaryBox.classList.remove( "invalid-field" );
          return true;
        } else if ( !this.pairedInput.regexConfirm ) {
          this.primaryBox.classList.add( "invalid-field" );
          this.patternError.innerHTML = "Wrong. Password Must Be At Least 8 Characters.";
          return false;
        }
      },
      validateAfterEnter: function( event ) {
        event.preventDefault();

        if ( event.keyCode === 13 ) {
          this.validatePasswordPair();
          this.validateRegexPattern();
          this.validateCodeInput();
        }
      },
      submitCheck: function() {
        var validateCode = this.validateCodeInput(),
        validatePassword = this.validatePasswordPair(),
        validateRegex = this.validateRegexPattern();
        if ( validateCode && validatePassword && validateRegex ) {
          console.log( "test" );
          this.submitResetPassword();
        }
      },
      submitResetPassword: function() {
        return userService.resetPassword( this.resetCodeInput.value, this.confirmInput.value )
          .then( function( response ) {
            return response;
          });
      }
    });
  });
})( window.Polymer );
