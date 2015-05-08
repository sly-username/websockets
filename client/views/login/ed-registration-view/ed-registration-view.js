( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-user-service" )
    .then(function( imported ) {
      var
        userService = imported.default,
        validateEmail = function( self ) {
          var regexPattern = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;

          return self.emailInput.validity.valid && regexPattern.test( self.emailInput.value );
        },
        validateZipCode = function( self ) {
          var inputtedZip = /^\d{5}(?:[-\s]\d{4})?$/;

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
        },
        submitCheckHandler = function() {
          var
            areValidInputs = validateFormInputValues( this ),
            validZip = validateZipCode( this ),
            validEmail = validateEmail( this );

          // Check all inputs on submit
          this.emailCheck();
          this.zipCheck();
          this.validateRegexPassword();
          this.validateKeyPassword();
          this.checkForEmptyValue( "errorFirstName", this.firstNameInput, this.firstNameField, "First Name" );
          this.checkForEmptyValue( "errorLastName", this.lastNameInput, this.lastNameField, "Last Name" );
          this.checkForEmptyValue( "errorDate", this.yearOfBirthInput, this.dateField, "Birth Date" );
          this.checkForEmptyValue( "errorInvite", this.inviteCodeInput, this.inviteField, "Referral Code" );

          if ( areValidInputs && validZip && validEmail && this.pairedInput.isValid ) {
            this.submitForm();
          }
        };


      polymer( "ed-registration-view", {
        /* LIFECYCLE */
        ready: function() {
          this.submitButton = this.shadowRoot.querySelector( "#registration-submit" );

          this.firstNameInput = this.shadowRoot.querySelector( ".name-first" )
            .shadowRoot.querySelector( "input" );
          this.lastNameInput = this.shadowRoot.querySelector( ".name-last" )
            .shadowRoot.querySelector( "input" );
          this.emailInput = this.shadowRoot.querySelector( ".email" )
            .shadowRoot.querySelector( "input" );
          this.inviteCodeInput = this.shadowRoot.querySelector( ".invite-code" )
            .shadowRoot.querySelector( "input" );
          this.yearOfBirthInput = this.shadowRoot.querySelector( ".birthday" )
            .shadowRoot.querySelector( "input" );
          this.zipcodeInput = this.shadowRoot.querySelector( ".zipcode" )
            .shadowRoot.querySelector( "input" );

          this.pairedInput = this.shadowRoot.querySelectorAll( "ed-paired-input" )[0];
          this.passwordInput = this.shadowRoot.querySelector( ".password" )
            .shadowRoot.querySelector( "input#primary-box" );
          this.passwordConfirmInput = this.shadowRoot.querySelector( ".password" )
            .shadowRoot.querySelector( "input#confirm-box" );

          this.emailField = this.shadowRoot.querySelector( ".email" )
            .shadowRoot.querySelector( ".form-input-container" );
          this.zipField = this.shadowRoot.querySelector( ".zipcode" )
            .shadowRoot.querySelector( ".form-input-container" );
          this.firstNameField = this.shadowRoot.querySelector( ".name-first" )
            .shadowRoot.querySelector( ".form-input-container" );
          this.lastNameField = this.shadowRoot.querySelector( ".name-last" )
            .shadowRoot.querySelector( ".form-input-container" );
          this.dateField = this.shadowRoot.querySelector( ".birthday" )
            .shadowRoot.querySelector( ".form-input-container" );
          this.inviteField = this.shadowRoot.querySelector( ".invite-code" )
            .shadowRoot.querySelector( ".form-input-container" );

          this.edformInputsArray = [].slice.call( this.shadowRoot.querySelectorAll( "ed-form-input" ));
          this.pairedInputsArray = [ this.passwordInput, this.passwordConfirmInput ];
          this.formInputsArray = this.edformInputsArray.concat( this.pairedInputsArray );

          // handlers
          this.handlers = {
            submitCheck: submitCheckHandler.bind( this )
          };
        },
        attached: function() {
          this.submitButton.addEventListener( "click", this.handlers.submitCheck );
        },
        // checks whether all fields are filled in before enabling submit button
        // or allowing submit on enter
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
        validateRegexPassword: function() {
          var errorPass = this.shadowRoot.getElementById( "errorPassword" );

          if ( this.passwordInput.validity.valid && this.passwordInput.value !== "" ) {
            errorPass.innerHTML = "";
            this.pairedInput.removeAttribute( "invalid-primary" );
          } else {
            errorPass.innerHTML = "Password is not 8 characters long";
            this.pairedInput.setAttribute( "invalid-primary", "" );
          }
        },
        validateKeyPassword: function() {
          var errorConf = this.shadowRoot.getElementById( "errorConfirm" );

          if ( this.pairedInput.isValid && this.passwordInput !== "" && this.passwordConfirmInput !== "" ) {
            errorConf.innerHTML = "";
            this.pairedInput.removeAttribute( "invalid-confirm" );
          } else {
            errorConf.innerHTML = "Passwords must match";
            this.pairedInput.setAttribute( "invalid-confirm", "" );
          }
        },
        checkForEmptyValue: function( element, valueInput, fieldWrapper, message ) {
          var elem = this.shadowRoot.getElementById( element );

          if ( valueInput.value === "" ) {
            elem.innerHTML = message + "is Required";
            fieldWrapper.classList.add( "invalid-field" );
          } else {
            elem.innerHTML = "";
            fieldWrapper.classList.remove( "invalid-field" );
          }
        },
        submitForm: function() {
          var registrationDataBlock;
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
//              // todo error messages for invalid referral code and already registered email
//              var errorUsedEmail = this.shadowRoot.getElementById( "errorUsedEmail" ),
//                errorReferralCode = this.shadowRoot.getElementById( "errorReferralCode" );
//
//              if ( ( /invite/ ).test( response.message )) {
//                errorReferralCode.innerHTML = "Please reenter your referral code";
//              } else if ( ( /email/ ).test( response.message )) {
//                errorUsedEmail.innerHTML = "This email address has already been registered";
//              } else {
//                this.router.go( "/onboarding/like" );
//              }
            }.bind( this ))
            .catch( function( error ) {
              this.router.go( "/registration" );
              return error;
            });
        },
        detached: function() {
          this.submitButton.removeEventListener( "click", this.handlers.submitCheck );
        }
      });
  });
})( window.Polymer, window.System );
