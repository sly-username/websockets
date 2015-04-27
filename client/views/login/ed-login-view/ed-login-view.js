( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/objects/model-type-checker" ),
    System.import( "domain/ed/services/ed-user-service" )
  ])
    .then( function( imported ) {
      var
        userService = imported[ 1 ].default,
        typeChecker = imported[ 0 ].default;

      polymer( "ed-login-view", {
        /* LIFECYCLE */
        ready: function() {
          this.emailInput = this.shadowRoot.querySelector( "ed-form-input" ).shadowRoot.querySelectorAll( "input" )[0];
          this.passwordInput = this.shadowRoot.querySelectorAll( "ed-form-input" )[1].shadowRoot.querySelector( "input" );
          this.submitButton = this.shadowRoot.getElementById( "login-submit" );
          this.signUpButton = this.shadowRoot.getElementById( "sign-up-button" );
          this.clickEvents = [ "mousedown", "touchstart" ];
        },
        attached: function() {
          this.clickEvents.forEach(function( eventName ) {
            this.submitButton.addEventListener( eventName, this.submitForm.bind( this ));
            this.signUpButton.addEventListener( eventName, this.goToSignUpPage.bind( this ));
          }.bind( this ));

          this.submitButton.addEventListener( "keydown", function( event ) {
            if ( event.keyCode === 13 ) {
              this.submitForm( event );
            }

            return false;
          }.bind( this ));
        },
        validateFields: function() {
          if ( this.emailInput !== "" && this.passwordInput !== "" ) {
            this.submitButton.removeAttribute( "disabled" );
          } else {
            this.submitButton.setAttribute( "disabled", "" );
          }
        },
        submitForm: function( event ) {
          event.preventDefault();

          var
            email = this.emailInput.value,
            password = this.passwordInput.value;

          this.validateFields();

          userService.login( email, password )
            .then(function( edProfile ) {
              var redirectTo;

              if ( typeChecker.isArtist( edProfile ) ) {
                redirectTo = "/artist/" + edProfile.id;
              // todo needs to check if fan has onboarded
              } else if ( typeChecker.isFan( edProfile ) && this.hasOnboarded ) {
                redirectTo = "/fan/" + edProfile.id;
              } else if ( typeChecker.isFan( edProfile ) && !this.hasOnboarded ) {
                redirectTo = "/onboarding/like";
              }

              this.router.go( redirectTo );
            }.bind( this ));
        },
        goToSignUpPage: function() {
          this.router.go( "/register" );
        },
        detached: function() {},
        attributeChanged: function( attrName, oldValue, newValue ) {}
        /* PROPERTIES */
        /* METHODS */
      });
    });
})( window.Polymer, window.System );
