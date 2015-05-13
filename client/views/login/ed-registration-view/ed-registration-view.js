( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-user-service" )
    .then(function( imported ) {
      var
        userService = imported.default,
        emailRegexPattern = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/,
        zipcodeRegexPattern = /^\d{5}(?:[-\s]\d{4})?$/,
        inputPropertyNameToValidGetter = function( inputName ) {
          var name = inputName[ 0 ].toUpperCase() + inputName.slice( 1 );
          return "valid" + name;
        },
        cleanupErrorHandler = function( event ) {
          this.cleanupErrors();
        };

      polymer( "ed-registration-view", {
        /* LIFECYCLE */
        ready: function() {
          this.submitButton = this.shadowRoot.querySelector( "#registration-submit" );

          // ed-form-inputs
          this.formInputs = {
            firstName: this.shadowRoot.querySelector( ".name-first" ),
            lastName: this.shadowRoot.querySelector( ".name-last" ),
            email: this.shadowRoot.querySelector( ".email" ),
            inviteCode: this.shadowRoot.querySelector( ".invite-code" ),
            yearOfBirth: this.shadowRoot.querySelector( ".birthday" ),
            zipcode: this.shadowRoot.querySelector( ".zipcode" ),
            password: this.shadowRoot.querySelector( "ed-paired-input" )
          };

          this.errorDivs = {
            firstName: this.shadowRoot.querySelector( "#errorFirstName" ),
            lastName: this.shadowRoot.querySelector( "#errorLastName" ),
            email: this.shadowRoot.querySelector( "#errorEmail" ),
            yearOfBirth: this.shadowRoot.querySelector( "#errorYearOfBirth" ),
            zipcode: this.shadowRoot.querySelector( "#errorZipcode" ),
            passwordShort: this.shadowRoot.querySelector( "#errorPasswordShort" ),
            passwordMismatch: this.shadowRoot.querySelector( "#errorPasswordMismatch" ),
            passwordWeak: this.shadowRoot.querySelector( "#errorPasswordWeak" ),
            // server side checks
            inviteCode: this.shadowRoot.querySelector( "#errorInviteCode" ),
            emailTaken: this.shadowRoot.querySelector( "#errorEmailTaken" )
          };

          this.registrationBodyDiv = this.shadowRoot.querySelector( ".ed-registration-body" );
          this.edformInputsArray = Array.prototype.slice.call( this.shadowRoot.querySelectorAll( "ed-form-input" ) );

          // TODO
          this.pairedInputsArray = [ this.passwordInput, this.passwordConfirmInput ];
          this.formInputsArray = this.edformInputsArray.concat( this.pairedInputsArray );

          // handlers
          this.handlers = {
            cleanup: cleanupErrorHandler.bind( this )
          };
        },
        attached: function() {
          this.submitButton.addEventListener( "click", this.handlers.submitCheck );
          this.registrationBodyDiv.addEventListener( "blur", this.handlers.cleanup, true );
        },
        detached: function() {
          this.submitButton.removeEventListener( "click", this.handlers.submitCheck );
          this.registrationBodyDiv.removeEventListener( "blur", this.handlers.cleanup );
        },

        // Pre Server Call Validity Check Getters
        get validFirstName() {
          return this.formInputs.firstName.value !== "";
        },
        get validLastName() {
          return this.formInputs.lastName.value !== "";
        },
        get validEmail() {
          return this.formInputs.email.validity.valid && emailRegexPattern.test( this.formInputs.email.value );
        },
        get validYearOfBirth() {
          return this.formInputs.yearOfBirth.validity.valid;
        },
        get validZipcode() {
          return zipcodeRegexPattern.test( this.formInputs.zipcode.value );
        },
        get validPassword() {
          return this.formInputs.password.isValid;
        },
        get validInviteCode() {
          return this.formInputs.inviteCode.value !== "";
        },

        // is form "submittable"
        get canSubmit() {
          return Object.keys( this.formInputs ).every(function( current ) {
            return this[ inputPropertyNameToValidGetter( current ) ];
          }, this );
        },

        postPasswordEarlyErrors: function() {
          if ( this.formInputs.password.value == null || this.formInputs.password.value.length < 8 ) {
            // post password to short
            this.errorDivs.passwordShort.classList.remove( "hidden" );
          }

          if ( !this.formInputs.password.inputMatchConfirm ) {
            // passwords don't match
            this.errorDivs.passwordMismatch.classList.remove( "hidden" );
          }

          if ( !this.formInputs.password.regexConfirm ) {
            // password to "weak"
            this.errorDivs.passwordWeak.classList.remove( "hidden" );
          }
        },

        cleanupPasswordErrors: function() {
          // TODO
        },

        postEarlyErrors: function() {
          Object.keys( this.formInputs ).forEach(function( current ) {
            if ( !this[ inputPropertyNameToValidGetter( current ) ] ) {
              if ( current === "password" ) {
                this.postPasswordEarlyErrors();
              } else {
                this.errorDivs[ current ].classList.remove( "hidden" );
                this.formInputs[ current ].classList.add( "invalid" );
              }
            }
          }, this );
        },

        cleanupErrors: function() {
          Object.keys( this.formInputs ).forEach(function( current ) {
            if ( this[ inputPropertyNameToValidGetter( current ) ] ) {
              if ( current === "password" ) {
                this.cleanupPasswordErrors();
              } else {
                this.errorDivs[ current ].classList.add( "hidden" );
                this.formInputs[ current ].classList.remove( "invalid" );
              }
            }
          }, this );
        },

        submitForm: function( event ) {
          event.preventDefault();

          if ( !this.canSubmit ) {
            this.postEarlyErrors();
            return;
          }

          userService.register({
            type: "fan",
            email: this.formInput.email.value,
            password: this.formInput.password.value,
            name: {
              first: this.formInput.firstName.value,
              last: this.formInput.lastName.value
            },
            inviteCode: this.formInput.inviteCode.value,
            yearOfBirth: this.formInput.yearOfBirth.value,
            zipcode: this.formInput.zipcode.value
          })
            .then(function( response ) {
              this.router.go( "/onboarding/like" );
              return response;
            }.bind( this ))
            .catch(function( error ) {
              error.invalidFields.forEach(function( invalidField ) {
                if ( invalidField.name === "inviteCode" ) {
                  this.errorDivs.inviteCode.classList.remove( "hidden" );
                  this.formInputs.inviteCode.classList.add( "invalid" );
                } else if ( invalidField.name === "email" ) {
                  this.errorDivs.emailTaken.classList.remove( "hidden" );
                  this.formInputs.email.classList.add( "invalid" );
                }
              }, this );

              return error;
            }.bind( this ));
        }
      });
    });
})( window.Polymer, window.System );
