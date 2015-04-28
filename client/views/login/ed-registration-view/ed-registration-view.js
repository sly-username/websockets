( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-user-service" )
  .then(function( imported ) {
    var
      userService = imported.default,
      eventNames = [ "mousedown", "touchstart" ],

      validateEmail = function( self ) {
        var regexPattern = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;

        return self.emailInput.validity.valid && regexPattern.test( self.emailInput.value );
      },
      validateZipCode = function( self ) {
        var inputtedZip = /^(\d{5})?$/;

        return inputtedZip.test( self.zipcodeInput.value );
      },
      validateFormInputValues = function( self ) {
        var i, value;

        for ( i = 0; i < self.edformInputsArray.length; i++ ) {
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

        this.pairedInput = this.shadowRoot.querySelectorAll( "ed-paired-input" );
        this.passwordInput = this.shadowRoot.querySelector( ".password" )
          .shadowRoot.querySelector( "input#primary-box" );
        this.passwordConfirmInput = this.shadowRoot.querySelector( ".password" )
          .shadowRoot.querySelector( "input#confirm-box" );

        this.edformInputsArray = [].slice.call( this.shadowRoot.querySelectorAll( "ed-form-input" ));
        this.pairedInputsArray = [ this.passwordInput, this.passwordConfirmInput ];
        this.formInputsArray = this.edformInputsArray.concat( this.pairedInputsArray );

        this.emailField = this.shadowRoot.querySelector( ".email" )
          .shadowRoot.querySelector( ".form-input-container" );
        this.zipField = this.shadowRoot.querySelector( ".zipcode" )
          .shadowRoot.querySelector( ".form-input-container" );
      },
      attached: function() {
        this.submitButton.setAttribute( "disabled", "" );

        // submit form on mousedown and touchstart
        eventNames.forEach( function( event ) {
          this.submitButton.addEventListener( event, this.submitForm.bind( this ), false );
        }.bind( this ));

        // todo why isn't return working??
        // submit form on enter
        this.submitButton.addEventListener( "keydown", function( event ) {
          if ( event.keyCode === 13 ) {
            this.submitForm( event );
          }
          return false;
        }.bind( this ));

        // check inputs to see if they're empty before pressing submit
        this.formInputsArray.forEach( function( formInput ) {
          formInput.addEventListener( "keyup", this.submitCheck.bind( this ));
        }.bind( this ));

        // email and zip validation event handlers on blur
        this.emailInput.addEventListener( "blur", this.emailCheck.bind( this ));
        this.zipcodeInput.addEventListener( "blur", this.zipCheck.bind( this ));

      },
      submitCheck: function() {
        // todo why isn't pairedInputs.isValid working??
        var areValidInputs = validateFormInputValues( this ),
          validZip = validateZipCode( this ),
          validEmail = validateEmail( this );

        if ( areValidInputs && validZip && validEmail ) {
          this.submitButton.removeAttribute( "disabled" );
        } else {
          this.submitButton.setAttribute( "disabled", "" );
        }
      },
      emailCheck: function() {
        var errorEmail = this.shadowRoot.getElementById( "errorEmail" ),
          validEmail = validateEmail( this );

        if ( !validEmail ) {
          this.emailField.classList.add( "invalid-field" );
          errorEmail.innerHTML = "Please enter a valid email address";
        } else {
          this.emailField.classList.remove( "invalid-field" );
          errorEmail.innerHTML = "";
        }
      },
      zipCheck: function() {
        var errorZip = this.shadowRoot.getElementById( "errorZip" ),
          validZip = validateZipCode( this );

        if ( !validZip ) {
          this.zipField.classList.add( "invalid-field" );
          errorZip.innerHTML = "Please enter a valid zip code";
        } else {
          this.zipField.classList.remove( "invalid-field" );
          errorZip.innerHTML = "";
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

        userService.register( registrationDataBlock )
          .then( function( response ) {
            //var errorUsedEmail = this.shadowRoot.getElementById( "errorUsedEmail" ),
            //  errorReferralCode = this.shadowRoot.getElementById( "errorReferralCode" );
            //
            //if ( ( /invite/ ).test( response.message )) {
            //  errorReferralCode.innerHTML = "Please reenter your referral code";
            //} else if ( ( /email/ ).test( response.message )) {
            //  errorUsedEmail.innerHTML = "This email address has already been registered";
            //} else {
              this.router.go( "/referral" );
            //}
          }.bind( this ))
          .catch( function( error ) {
            this.router.go( "/registration" );
            return error;
          });
      },
      detached: function() {
        this.formInputsArray.forEach( function( formInput ) {
          formInput.removeEventListener( "keyup", this.submitCheck.bind( this ));
        }.bind( this ));
      },
      attributeChanged: function( attrName, oldValue, newValue ) {}
    });
  });
})( window.Polymer, window.System );
