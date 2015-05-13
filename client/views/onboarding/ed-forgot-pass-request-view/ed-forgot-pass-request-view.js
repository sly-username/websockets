( function( polymer ) {
  "use strict";


  System.import( "domain/ed/services/ed-user-service" )
    .then(function( imported ) {
      var
        userService = imported.default,
        clickEvents = [ "mousedown", "touchstart" ];

    polymer( "ed-forgot-pass-request-view", {
      /* LIFECYCLE */
      ready: function() {
        this.submitButton = this.shadowRoot.querySelector( "#forgot-submit" );
        this.backButton = this.shadowRoot.querySelector( "#back-button" );
        this.emailInput = this.shadowRoot.querySelector( ".email" )
          .shadowRoot.querySelector( "input" );
        this.emailField = this.shadowRoot.querySelector( ".email" )
          .shadowRoot.querySelector( ".form-input-container" );
      },
      attached: function() {
        this.emailInput.setAttribute( "autofocus", "" );

        clickEvents.forEach( function( eventName ) {
          this.submitButton.addEventListener( eventName, this.validateEmail.bind( this ));
          this.backButton.addEventListener( eventName, this.goToBackToLogin.bind( this ));
        }.bind( this ));

        this.submitButton.addEventListener( "keypress", this.validateAfterEnter.bind( this ));
        this.backButton.addEventListener( "keypress", this.goToBackToLogin.bind( this ));
      },
      detached: function() {
        clickEvents.forEach( function( eventName ) {
          this.submitButton.removeEventListener( eventName, this.validateEmail.bind( this ));
          this.backButton.removeEventListener( eventName, this.enterToReturnToLogin.bind( this ));
        }.bind( this ));

        this.submitButton.removeEventListener( "keypress", this.validateAfterEnter.bind( this ));
        this.backButton.removeEventListener( "keypress", this.enterToReturnToLogin.bind( this ));
      },
      validateAfterEnter: function( event ) {
        event.preventDefault();

        if ( event.keyCode === 13 ) {
          this.validateEmail();
        }
      },
      enterToReturnToLogin: function( event ) {
        event.preventDefault();

        if ( event.keyCode === 13 ) {
          this.goToBackToLogin();
        }
      },
      checkEmailFormat: function() {
        var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;

        return this.emailInput.validity.valid && re.test( this.emailInput.value );
      },
      validateEmail: function() {
        var checkEmailFormat = this.checkEmailFormat();

        if ( this.emailInput.value === "" ) {
          this.emailField.classList.add( "invalid-field" );
        } else if ( !checkEmailFormat ) {
          this.emailField.classList.add( "invalid-field" );
        } else if ( checkEmailFormat ) {
          this.emailField.classList.remove( "invalid-field" );
          this.submitPasswordRequest();
        }
      },
      submitPasswordRequest: function() {
        var registeredEmail = this.emailInput.value;
        return userService.requestPasswordReset( registeredEmail )
          .then( function( response ) {
            console.log( response );

            if ( response !== null && response.status.code === 2 ) {
              this.router.go( "/forgot-pass/reset" );
            } else if ( response !== null && response.status.code === 10 ) {
              // todo when product/design team figures out what to do about this error
              this.emailField.classList.add( "invalid-field" );
            }
          }.bind( this ))
          .catch( function() {
            console.log( "password request did not go through" );
          });
      },
      goToBackToLogin: function() {
        this.router.go( "/login" );
      }
    });
  });
})( window.Polymer );
