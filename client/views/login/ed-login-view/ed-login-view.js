( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-user-service" )
    .then(function( imported ) {
      var
        userService = imported.default,
        emailRegexPattern = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/,
        passwordRegexPattern = /^\w{8,}/,
        inputPropertyNameToValidGetter = function( inputName ) {
          var name = inputName[ 0 ].toUpperCase() + inputName.slice( 1 );
          return "valid" + name;
        },
        cleanupErrorHandler = function( event ) {
          this.cleanupErrors();
        };

    polymer( "ed-login-view", {
      /* LIFECYCLE */
      ready: function() {
        this.submitButton = this.shadowRoot.querySelector( "#login-submit" );
        this.loginBody = this.shadowRoot.querySelector( ".ed-login-body" );
        this.errorServer = this.shadowRoot.querySelector( "#errorServer" );

        this.formInputs = {
          email: this.shadowRoot.querySelector( ".email" ),
          password: this.shadowRoot.querySelector( ".password" )
        };

        this.errorDivs = {
          email: this.shadowRoot.querySelector( "#errorEmail" ),
          password: this.shadowRoot.querySelector( "#errorPassword" )
        };

        this.handlers = {
          cleanup: cleanupErrorHandler.bind( this )
        };
      },
      attached: function() {
        this.formInputs.email.setAttribute( "autofocus", "" );
        this.loginBody.addEventListener( "blur", this.handlers.cleanup, true );

      },
      detached: function() {
        this.loginBody.removeEventListener( "blur", this.handlers.cleanup, true );
      },

      get validEmail() {
        return this.formInputs.email.validity.valid && emailRegexPattern.test( this.formInputs.email.value );
      },
      get validPassword() {
        return passwordRegexPattern.test( this.formInputs.password.value );
      },
      get canSubmit() {
        return Object.keys( this.formInputs ).every(function( current ) {
          return this[ inputPropertyNameToValidGetter( current ) ];
        }, this );
      },

      postEarlyErrors: function() {
        Object.keys( this.formInputs ).forEach(function( current ) {
          if ( !this[ inputPropertyNameToValidGetter( current ) ] ) {
            this.errorDivs[ current ].classList.remove( "hidden" );
            this.formInputs[ current ].classList.add( "invalid" );
          }
        }, this );
      },

      cleanupErrors: function() {
        Object.keys( this.formInputs ).forEach(function( current ) {
          if ( this[ inputPropertyNameToValidGetter( current ) ] ) {
            this.errorDivs[ current ].classList.add( "hidden" );
            this.formInputs[ current ].classList.remove( "invalid" );
          }
        }, this );
      },

      submitForm: function() {
        event.preventDefault();

        var
          email = this.formInputs.email.value,
          password = this.formInputs.password.value,
          errorServer = this.errorServer;

        if ( !this.canSubmit ) {
          this.postEarlyErrors();
          window.scrollTo( 0, 0 );
          return;
        }

        userService.login( email, password )
          .then( function( response ) {
            if ( userService.hasOnboarded === true ) {
              this.router.go( "/discover" );
              // todo need to do the has onboarded check
            } else if ( userService.hasOnboarded === false ) {
              this.router.go( "/onboarding/like" );
            }
          })
          .catch( function( error ) {
            errorServer.classList.remove( "hidden" );
            window.scrollTo( 0, 0 );
            return error;
          }, this );
      },
      attributeChanged: function( attrName, oldValue, newValue ) {}
    });
  });
})( window.Polymer, window.System );
