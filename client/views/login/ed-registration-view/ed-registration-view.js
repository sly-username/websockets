( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-user-service" )
  .then(function( imported ) {
    var
      userService = imported.default,
      eventNames = [ "mousedown", "touchstart" ];,
      validateFormInputValues;

    validateFormInputValues = function( self ) {
      var i, value,
        length = self.formInputs.length;

      for ( i = 0; i < length; i++ ) {
        value = self.formInputs[ i ].shadowRoot.querySelector( "input" ).value;
        return value !== "";
      }

      return false;
    };

    polymer( "ed-registration-view", {
      /* LIFECYCLE */
      ready: function() {
        this.submitButton = this.shadowRoot.getElementById( "registration-submit" );

        this.formInputs = this.shadowRoot.querySelectorAll( "ed-form-input" );
        this.firstNameInput = this.shadowRoot.querySelector( ".name-first" ).shadowRoot.querySelector( "input" );
        this.lastNameInput = this.shadowRoot.querySelector( ".name-last" ).shadowRoot.querySelector( "input" );
        this.emailInput = this.shadowRoot.querySelector( ".email" ).shadowRoot.querySelector( "input" );
        this.inviteCodeInput = this.shadowRoot.querySelector( ".invite-code" ).shadowRoot.querySelector( "input" );
        this.yearOfBirthInput = this.shadowRoot.querySelector( ".birthday" ).shadowRoot.querySelector( "input" );
        this.zipcodeInput = this.shadowRoot.querySelector( ".zipcode" ).shadowRoot.querySelector( "input" );

        this.pairedInput = this.shadowRoot.querySelector( "ed-paired-input" );
        this.passwordInput = this.shadowRoot.querySelector( ".password" )
          .shadowRoot.querySelector( "input#primary-box" );
        this.passwordConfirmInput = this.shadowRoot.querySelector( ".password" )
          .shadowRoot.querySelector( "input#confirm-box" );
      },
      attached: function() {
        this.submitButton.setAttribute( "disabled", "" );

        eventNames.forEach( function( event ) {
          this.submitButton.addEventListener( event, this.submitForm.bind( this ), false );
        }.bind( this ));

        this.submitButton.addEventListener( "keydown", function( event ) {
          if ( event.keyCode === 13 ) {
            this.submitForm( event );
          }

          return false;
        }.bind( this ));
      },
      submitCheck: function() {
        var areValidInputs = validateFormInputValues( this );
        if ( areValidInputs ) {
          this.submitButton.removeAttribute( "disabled" );
        }
      },
      submitForm: function( event ) {
        var registrationDataBlock;
        // TODO remove debug
        event.preventDefault();

        registrationDataBlock = {
          type: "fan",
          email: this.emailInput.value,
          password: this.passwordInput.value,
          passwordConfirmation: this.passwordConfirmInput.value,
          name: {
            first: this.firstNameInput.value,
            last: this.lastNameInput.value
          },
          inviteCode: this.inviteCodeInput.value,
          yearOfBirth: this.yearOfBirthInput.value,
          zipcode: this.zipcodeInput.value
        };

        // todo do artists also go through onboarding?
        userService.register( registrationDataBlock )
          .then(function() {
            this.router.go( "/onboarding/like" );
          }.bind( this ));
      },
      detached: function() {},
      attributeChanged: function( attrName, oldValue, newValue ) {}
    });
  });
})( window.Polymer, window.System );
