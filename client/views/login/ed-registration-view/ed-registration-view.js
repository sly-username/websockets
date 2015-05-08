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

        this.edformInputsArray = [].slice.call( this.shadowRoot.querySelectorAll( "ed-form-input" ));
        this.pairedInputsArray = [ this.passwordInput, this.passwordConfirmInput ];
        this.formInputsArray = this.edformInputsArray.concat( this.pairedInputsArray );
      },

      attached: function() {
        // this.submitButton.setAttribute( "disabled", "" );

        // submit form on mousedown and touchstart events
        eventNames.forEach( function( event ) {
          this.submitButton.addEventListener( event, this.submitCheck.bind( this ), false );
        }.bind( this ));

        // submit check happens on keyup of all input fields
        //this.formInputsArray.forEach( function( formInput ) {
        //  formInput.addEventListener( "keyup", this.submitCheck.bind( this ));
        //}.bind( this ));

        // email and zip validation happens on blur of each of these fields
        //this.emailInput.addEventListener( "blur", this.emailCheck.bind( this ));
        //this.zipcodeInput.addEventListener( "blur", this.zipCheck.bind( this ));
        //this.passwordInput.addEventListener( "blur", this.validateRegexPassword.bind( this ));
        //this.passwordConfirmInput.addEventListener( "blur", this.validateKeyPassword.bind( this ));
      },

      // checks whether all fields are filled in before enabling submit button
      // or allowing submit on enter
      submitCheck: function() {
        var areValidInputs = validateFormInputValues( this ),
          validZip = validateZipCode( this ),
          validEmail = validateEmail( this );

        // Check all inputs on submit
        this.emailCheck();
        this.zipCheck();
        this.validateRegexPassword();
        this.validateKeyPassword();
        this.firstNameCheck();
        this.lastNameCheck();
        this.dateCheck();

        if ( areValidInputs && validZip && validEmail && this.pairedInput.isValid ) {
          // this.submitButton.removeAttribute( "disabled" );
          console.log( "hit" );
          // submit happens on enter
          this.formInputsArray.forEach( function( formInput ) {
            formInput.addEventListener( "keyup", function( event ) {
              if ( event.keyCode === 13 ) {
                this.submitForm( event );
              }
              return false;
            }.bind( this ));
          }.bind( this ));
        }
        // else {
        //  this.submitButton.setAttribute( "disabled", "" );
        // }
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

      validateRegexPassword: function() {
        var errorPass = this.shadowRoot.getElementById( "errorPassword" );

        if ( this.passwordInput.validity.valid ) {
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
      firstNameCheck: function() {
        var errorFirst = this.shadowRoot.getElementById( "errorFirstName" );

        if ( this.firstNameInput.value === "" ) {
          errorFirst.innerHTML = "First Name is Required"
          this.firstNameField.classList.add( "invalid-field" );
        } else {
          errorFirst.innerHTML = "";
          this.firstNameField.classList.remove( "invalid-field" );
        }
      },
      lastNameCheck: function() {
        var errorLast = this.shadowRoot.getElementById( "errorLastName" );

        if ( this.lastNameInput.value === "" ) {
          errorLast.innerHTML = "Last Name is Required";
          this.lastNameField.classList.add( "invalid-field" );
        } else {
          errorLast.innerHTML = "";
          this.lastNameField.classList.remove( "invalid-field" );
        }
      },
      dateCheck: function() {
        var errorDate = this.shadowRoot.getElementById( "errorDate" );

        if ( this.yearOfBirthInput.value === "" ) {
          errorDate.innerHTML = "Birth Date is Required";
          this.dateField.classList.add( "invalid-field" );
        } else {
          errorDate.innerHTML = "";
          this.dateField.classList.remove( "invalid-field" );
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

            // todo error messages for invalid referral code and already registered email
            //var errorUsedEmail = this.shadowRoot.getElementById( "errorUsedEmail" ),
            //  errorReferralCode = this.shadowRoot.getElementById( "errorReferralCode" );
            //
            //if ( ( /invite/ ).test( response.message )) {
            //  errorReferralCode.innerHTML = "Please reenter your referral code";
            //} else if ( ( /email/ ).test( response.message )) {
            //  errorUsedEmail.innerHTML = "This email address has already been registered";
            //} else {
              this.router.go( "/onboarding/like" );
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
