( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-discover-service" ),
    System.import( "domain/ed/services/ed-user-service" )
  ])
    .then( function( imported ) {
      var
        discoverService = imported[ 0 ].default,
        userService = imported[ 1 ].default,
        clickEvents = [ "mousedown", "touchstart" ];

      polymer( "ed-login-view", {
        /* LIFECYCLE */
        ready: function() {
          this.emailInput = this.shadowRoot.querySelector( ".email" )
            .shadowRoot.querySelector( "input" );
          this.passwordInput = this.shadowRoot.querySelector( ".password" )
            .shadowRoot.querySelector( "input" );
          this.inputFieldsArray = [ this.emailInput, this.passwordInput ];
          this.submitButton = this.shadowRoot.getElementById( "login-submit" );
          this.signUpButton = this.shadowRoot.getElementById( "sign-up-button" );
          this.errorDiv = this.shadowRoot.getElementById( "errorDiv" );

          this.emailField = this.shadowRoot.querySelector( ".email" )
            .shadowRoot.querySelector( ".form-input-container" );
          this.passwordField = this.shadowRoot.querySelector( ".password" )
            .shadowRoot.querySelector( ".form-input-container" );
        },
        attached: function() {
          this.emailInput.setAttribute( "autofocus", "" );

          clickEvents.forEach(function( eventName ) {
            this.submitButton.addEventListener( eventName, this.validateFields.bind( this ));
            this.signUpButton.addEventListener( eventName, this.goToSignUpPage.bind( this ));
          }.bind( this ));

          // enter key event listeners
          this.submitButton.addEventListener( "keypress", this.validateAfterEnter.bind( this ));
          this.signUpButton.addEventListener( "keypress", this.enterToSignUp.bind( this ));

        },
        validateAfterEnter: function( event ) {
          event.preventDefault();
          if ( event.keyCode === 13 ) {
            this.validateFields();
          }
        },
        enterToSignUp: function( event ) {
          event.preventDefault();
          if ( event.keyCode === 13 ) {
            this.goToSignUpPage();
          }
        },
        validateFields: function() {
          if ( this.emailInput.value === "" ) {
            this.emailField.classList.add( "invalid-field" );
          } else if ( this.emailInput.value !== "" ) {
            this.emailField.classList.remove( "invalid-field" );
          }

          if ( this.passwordInput.value === "" ) {
            this.passwordField.classList.add( "invalid-field" );
          } else if ( this.passwordInput.value !== "" ) {
            this.passwordField.classList.remove( "invalid-field" );
          }

          if ( this.emailInput.value !== "" && this.passwordInput.value !== "" ) {
            this.inputFieldsArray.forEach( function( field ) {
              field.classList.remove( "invalid-field" );
            });
            this.submitForm();
          }
        },
        submitForm: function() {
          var
            email = this.emailInput.value,
            password = this.passwordInput.value;

          return userService.login( email, password )
            .then( function( response ) {
              this.nothing();
            }.bind( this ))
            .catch( function( error ) {
              this.errorDiv.innerHTML = "Wrong.";
            }.bind( this ));
        },
        goToSignUpPage: function() {
          this.router.go( "/register" );
        },
        detached: function() {
          clickEvents.forEach(function( eventName ) {
            this.submitButton.removeEventListener( eventName, this.validateFields.bind( this ));
            this.signUpButton.removeEventListener( eventName, this.goToSignUpPage.bind( this ));
          }.bind( this ));

          // enter key event listeners
          this.submitButton.removeEventListener( "keypress", this.validateAfterEnter.bind( this ));
          this.signUpButton.removeEventListener( "keypress", this.enterToSignUp.bind( this ));
        },
        attributeChanged: function( attrName, oldValue, newValue ) {}
      });
    });
})( window.Polymer, window.System );
