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
          //this.inputFieldsArray.forEach( function( field ) {
          //  field.classList.remove( "invalid-field" );
          //});
          this.emailInput.setAttribute( "autofocus", "" );

          clickEvents.forEach(function( eventName ) {
            this.submitButton.addEventListener( eventName, this.validateFields.bind( this ));
            this.signUpButton.addEventListener( eventName, this.goToSignUpPage.bind( this ));
          }.bind( this ));

          // enter key event listener
          this.submitButton.addEventListener( "keypress", function( event ) {
            if ( event.keycode === 13 ) {
              this.validateFields.bind( this );
            }
          }.bind( this ));
        },
        validateFields: function() {
          if ( this.emailInput.value !== "" && this.passwordInput.value !== "" ) {
            this.inputFieldsArray.forEach( function( field ) {
              field.classList.remove( "invalid-field" );
            });
            this.submitForm();
          }

          if ( this.emailInput.value === "" ) {
            console.log( "something" );
            this.emailField.classList.add( "invalid-field" );
          }

          if ( this.passwordInput.value === "" ) {
            console.log( "other thing" );
            this.passwordField.classList.add( "invalid-field" );
          }
          // todo will there be a problem changing the field back to valid if
          // the user updates the fields?
        },
        //confirmOnboarding: function() {
        //  if ( userService.hasOnboarded === false ) {
        //    this.router.go( "/onboarding/like" );
        //  } else {
        //    this.router.go( "/discover" );
        //  }
        //},
        submitForm: function() {
          var
            email = this.emailInput.value,
            password = this.passwordInput.value;

          return userService.login( email, password )
            .then( function() {
              this.confirmOnboarding();
            }.bind( this ))
            .catch( function() {
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

          // enter key event listener
          this.submitButton.removeEventListener( "keypress", function( event ) {
            if ( event.keycode === 13 ) {
              this.validateFields.bind( this );
            }
          }.bind( this ));
        },
        attributeChanged: function( attrName, oldValue, newValue ) {}
      });
    });
})( window.Polymer, window.System );
