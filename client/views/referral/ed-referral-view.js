( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-user-service" )
    .then( function( imported ) {
      var userService = imported.default,
        emailRegexPattern = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/,
        cleanupErrorHandler = function() {
          this.cleanupErrors();
        };

      polymer( "ed-referral-view", {
        /* LIFECYCLE */
        userService: userService,
        ready: function() {
          this.emailInput = this.shadowRoot.querySelector( ".email" );
          this.emailField = this.shadowRoot.querySelector( ".email" )
            .shadowRoot.querySelector( ".form-input-container" );

          this.submitButton = this.shadowRoot.querySelector( "#referral-submit" );

          this.emailError = this.shadowRoot.querySelector( "#errorEmail" );

          this.handlers = {
            cleanup: cleanupErrorHandler.bind( this )
          };
        },
        attached: function() {
          this.emailInput.focus();
          this.emailInput.addEventListener( "blur", this.handlers.cleanup, true );
        },
        detached: function() {
          this.emailInput.removeEventListener( "blur", this.handlers.cleanup );
        },
        get validEmail() {
          return this.emailInput.validity.valid && emailRegexPattern.test( this.emailInput.value );
        },
        cleanupErrors: function() {
          this.emailError.classList.add( "hidden" );
          this.emailField.classList.remove( "invalid" );
        },
        submitFriendEmail: function( event ) {
          event.preventDefault();

          if ( !this.validEmail ) {
            this.emailInput.classList.add( "invalid" );
            this.emailError.classList.remove( "hidden" );
            window.scrollTo( 0, 0 );
            return;
          }

          return userService.referral( this.emailInput.value )
            .then( function( response ) {
              this.referralsRemaining = response;
              this.emailInput.value = "";
              this.emailError.classList.add( "hidden" );
              this.emailInput.classList.remove( "invalid" );
            }.bind( this ))
            .catch( function() {
              console.log( "referral request did not go through" );
            });
        },
        attributeChanged: function( attrName, oldValue, newValue ) {}
      });
    });
})( window.Polymer, window.System );
