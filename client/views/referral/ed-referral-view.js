( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-user-service" )
    .then( function( imported ) {
      var userService = imported.default,
        validateEmail = function( self ) {
          var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
          if ( this.emailInput.validity.valid && re.test( this.emailInput.value )) {
            this.submitCheck();
          } else {
            this.submitButton.setAttribute( "disabled", "" );
          }
        },
        clickEvents = [ "mousedown", "touchstart" ];

      polymer( "ed-referral-view", {
        /* LIFECYCLE */
        userService: userService,
        ready: function() {
          this.emailInput = this.shadowRoot.querySelector( "ed-form-input" ).shadowRoot.querySelector( "input" );
          this.submitButton = this.shadowRoot.getElementById( "referral-submit" );
        },
        attached: function() {
          this.emailInput.setAttribute( "autofocus", "" );

          clickEvents.forEach( function( eventName ) {
            this.submitButton.addEventListener( eventName, this.submitFriendEmail.bind( this ));
          }.bind( this ));

          this.triggerBtn.addEventListener( "tap", this.handlers.triggerMenu );
          this.emailInput.addEventListener( "keyup", validateEmail.bind( this ));
        },
        detached: function() {
          clickEvents.forEach( function( eventName ) {
            this.submitButton.removeEventListener( eventName, this.submitFriendEmail.bind( this ));
          }.bind( this ));

          this.triggerBtn.removeEventListener( "tap", this.handlers.triggerMenu );
          this.emailInput.removeEventListener( "keyup", validateEmail.bind( this ));
        },
        submitCheck: function() {
          if ( userService.referralsRemaining === 0 ) {
            this.submitButton.setAttribute( "disabled", "" );
          } else if ( userService.referralsRemaining > 0 ) {
            this.submitButton.removeAttribute( "disabled" );

            // todo, if you press tab and enter, it'll reload the page
            this.emailInput.addEventListener( "submit", function( event ) {
              if ( event.keyCode === 13 ) {
                event.preventDefault();
                this.submitFriendEmail( event );
              }
              return false;
            }.bind( this ));
          }
        },
        submitFriendEmail: function( event ) {
          var friendEmail = this.emailInput.value;
          event.preventDefault();

          return userService.referral( friendEmail )
            .then( function( response ) {
              this.referralsRemaining = response;
              this.emailInput.value = "";
            }.bind( this ));
        },
        attributeChanged: function( attrName, oldValue, newValue ) {}
      });
    });
})( window.Polymer, window.System );
