( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-user-service" )
  .then(function( imported ) {
    var
      userService = imported.default,
      eventNames = [ "mousedown", "touchstart" ],
      validateFormInputValues;

    validateFormInputValues = function( self ) {
      var i, value;

      for ( i = 0; i < self.edformInputsArray.length; i++) {
        value = self.edformInputsArray[ i ].shadowRoot.querySelector( "input" ).value;

        if ( value === "" ) {
          return false;
        }
      }
      return true;
    };

    polymer( "ed-registration-view", {
      /* LIFECYCLE */
      ready: function() {
        this.submitButton = this.shadowRoot.getElementById( "registration-submit" );

        this.firstNameInput = this.shadowRoot.querySelector( ".name-first" ).shadowRoot.querySelector( "input" );
        this.lastNameInput = this.shadowRoot.querySelector( ".name-last" ).shadowRoot.querySelector( "input" );
        this.emailInput = this.shadowRoot.querySelector( ".email" ).shadowRoot.querySelector( "input" );
        this.inviteCodeInput = this.shadowRoot.querySelector( ".invite-code" ).shadowRoot.querySelector( "input" );
        this.yearOfBirthInput = this.shadowRoot.querySelector( ".birthday" ).shadowRoot.querySelector( "input" );
        this.zipcodeInput = this.shadowRoot.querySelector( ".zipcode" ).shadowRoot.querySelector( "input" );

        this.pairedInput = this.shadowRoot.getElementsByTagName( "ed-paired-input" );
        this.passwordInput = this.shadowRoot.querySelector( ".password" )
          .shadowRoot.querySelector( "input#primary-box" );
        this.passwordConfirmInput = this.shadowRoot.querySelector( ".password" )
          .shadowRoot.querySelector( "input#confirm-box" );

        this.edformInputsArray = [].slice.call( this.shadowRoot.querySelectorAll( "ed-form-input" ));
        this.pairedInputsArray = [ this.passwordInput, this.passwordConfirmInput ];
        this.formInputsArray = this.edformInputsArray.concat( this.pairedInputsArray );
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

        this.formInputsArray.forEach( function( formInput ) {
          formInput.addEventListener( "blur", this.submitCheck.bind( this ));
        }.bind( this ));
      },
      submitCheck: function() {
        var areValidInputs = validateFormInputValues( this );

        if ( areValidInputs && this.pairedInput.isValid ) {
          this.submitButton.removeAttribute( "disabled" );
        } else {
          this.submitButton.setAttribute( "disabled", "" );
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

        // todo if artist goes to login, then his/her page
        // todo what if they are already registered?
        userService.register( registrationDataBlock )
          .then(function() {
            this.router.go( "/onboarding/like" );
          }.bind( this ));
      },
      detached: function() {
        this.formInputsArray.forEach( function( formInput ) {
          formInput.removeEventListener( "blur", this.submitCheck.bind( this ));
        }.bind( this ));
      },
      attributeChanged: function( attrName, oldValue, newValue ) {}
    });
  });
})( window.Polymer, window.System );
