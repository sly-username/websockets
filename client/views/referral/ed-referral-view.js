( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-user-service" )
    .then( function( imported ) {
      var userService = imported.default,
        validateEmail = function() {
          var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
          if ( this.emailInput.validity.valid && re.test( this.emailInput.value )) {
            this.submitButton.removeAttribute( "disabled" );
          } else {
            this.submitButton.setAttribute( "disabled", "" );
          }
        };

      polymer( "ed-referral-view", {
        /* LIFECYCLE */
        userService: userService,
        ready: function() {
          this.emailInput = this.shadowRoot.querySelector( "ed-form-input" ).shadowRoot.querySelector( "input" );
          this.submitButton = this.shadowRoot.getElementById( "referral-submit" );
          this.clickEvents = [ "mousedown", "touchstart" ];
          this.triggerList = [ this.emailInput, this.submitButton ];
        },
        attached: function() {
          userService.getReferrals();
          this.emailInput.setAttribute( "autofocus", "" );

          this.clickEvents.forEach( function( eventName ) {
            this.submitButton.addEventListener( eventName, this.submitFriendEmail.bind( this ));
          }.bind( this ));

          this.emailInput.addEventListener( "keyup", validateEmail.bind( this ));

          this.triggerList.forEach( function( trigger ) {
            trigger.addEventListener( "keydown", function( event ) {
              if ( event.keyCode === 13 ) {
                this.submitFriendEmail( event );
              }

              return false;
            }.bind( this ));
          }.bind( this ));
        },
        detached: function() {},
        updateReferralCount: function() {
          return userService.getReferrals()
            .then( function( response) {
              console.log( response );
            });
        },
        submitFriendEmail: function( event ) {
          var friendEmail = this.emailInput.value,
            self = this;
          event.preventDefault();

          return userService.referral( friendEmail )
            .then( function( response ) {
              this.emailInput.value = "";
              console.log( response );
              self.referralsRemaining = response;
            }.bind( this ));
          // todo change referralsRemaining number
        },
        attributeChanged: function( attrName, oldValue, newValue ) {}
      });
    });
})( window.Polymer, window.System );
