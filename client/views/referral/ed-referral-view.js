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

          this.submitButton = this.shadowRoot.querySelector( "#referral-submit" );

          this.emailError = this.shadowRoot.querySelector( "#errorEmail" );

          this.handlers = {
            cleanup: cleanupErrorHandler.bind( this )
          };
        },
        attached: function() {
          //this.emailInput.focus();
          this.emailInput.addEventListener( "blur", this.handlers.cleanup, true );

          this.referrals = userService.referralsRemaining;
          console.log( this.referrals );

          if ( this.referrals === 1 ) {
            this.invite = "invite";
          } else {
            this.invite = "invites";
          }
        },
        detached: function() {
          this.emailInput.removeEventListener( "blur", this.handlers.cleanup );
        },
        get validEmail() {
          return this.emailInput.validity.valid && emailRegexPattern.test( this.emailInput.value );
        },
        cleanupErrors: function() {
          this.emailError.classList.add( "hidden" );
          this.emailInput.classList.remove( "invalid" );
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
              this.emailInput.value = "";
              this.emailError.classList.add( "hidden" );
              this.emailInput.classList.remove( "invalid" );
              console.log( response );
              this.test = userService.getReferrals();
              console.log( this.test );
              if ( this.referrals !== response ) {
                this.referrals = response;
              }
            }.bind( this ))
            .catch( function() {
              console.log( "referral request did not go through" );
            });
        },
        updateReferralCount: function() {
          return userService.getReferrals()
            .then( function() {})
        },
        attributeChanged: function( attrName, oldValue, newValue ) {}
      });
    });
})( window.Polymer, window.System );
