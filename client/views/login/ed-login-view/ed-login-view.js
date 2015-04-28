( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/objects/model-type-checker" ),
    System.import( "domain/ed/services/ed-user-service" ),
    System.import( "domain/ed/analytics/ed-analytics-service" )
  ])
    .then( function( imported ) {
      var
        typeChecker = imported[ 0 ].default,
        userService = imported[ 1 ].default,
        edAnalytics = imported[ 2 ].default,
        clickEvents = [ "mousedown", "touchstart" ];

      polymer( "ed-login-view", {
        /* LIFECYCLE */
        ready: function() {
          this.emailInput = this.shadowRoot.querySelector( ".email" ).shadowRoot.querySelector( "input" );
          this.passwordInput = this.shadowRoot.querySelector( ".password" ).shadowRoot.querySelector( "input" );
          this.inputsArray = [ this.emailInput, this.passwordInput ];
          this.submitButton = this.shadowRoot.getElementById( "login-submit" );
          this.signUpButton = this.shadowRoot.getElementById( "sign-up-button" );
          this.errorDiv = this.shadowRoot.getElementById( "errorDiv" );
        },
        attached: function() {
          this.emailInput.setAttribute( "autofocus", "" );
          this.submitButton.setAttribute( "disabled", "" );

          // check inputs to see if they're empty before pressing submit
          this.inputsArray.forEach( function( formInput ) {
            formInput.addEventListener( "keyup", this.validateFields.bind( this ));
          }.bind( this ));

          clickEvents.forEach(function( eventName ) {
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
          if ( this.emailInput.value !== "" && this.passwordInput.value !== "" ) {
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

          userService.login( email, password )
            .then(function( edProfile ) {
              var redirectTo;

              // analytics
              edAnalytics.send( "login", {
                time: ( new Date() ).toISOString()
              });

              if ( typeChecker.isArtist( edProfile ) ) {
                redirectTo = "/artist/" + edProfile.id;
              // todo needs to check if fan has onboarded
              } else if ( typeChecker.isFan( edProfile ) && userService.hasOnboarded ) {
                redirectTo = "/fan/" + edProfile.id;
              } else if ( typeChecker.isFan( edProfile ) && !userService.hasOnboarded ) {
                redirectTo = "/onboarding/like";
              }

              this.router.go( redirectTo );
            }.bind( this ))
          .catch( function() {
            this.errorDiv.innerHTML = "Wrong login credentials. Please check you email/password and try again.";
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
