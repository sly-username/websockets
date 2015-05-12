( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-user-service" )
    .then( function( imported ) {
      var userService = imported.default,
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

          this.emailField = this.shadowRoot.querySelector( ".email" )
            .shadowRoot.querySelector( ".form-input-container" );

          clickEvents.forEach( function( eventName ) {
            this.submitButton.addEventListener( eventName, this.validateEmail.bind( this ));
          }.bind( this ));

          this.submitButton.addEventListener( "keypress", this.validateAfterEnter.bind( this ));
        },
        detached: function() {
          clickEvents.forEach( function( eventName ) {
            this.submitButton.removeEventListener( eventName, this.validateEmail.bind( this ));
          }.bind( this ));
        },
        validateAfterEnter: function( event ) {
          event.preventDefault();
          if ( event.keyCode === 13 ) {
            this.validateEmail();
          }
        },
        validateEmail: function() {
          // todo do we also need to check if it has the syntax of a valid email?
          if ( this.emailInput.value === "" ) {
            this.emailField.classList.add( "invalid-field" );
          } else if ( this.emailInput.value !== "" ) {
            this.emailField.classList.remove( "invalid-field" );
            console.log( "does it know to get here?" );
            this.submitFriendEmail();
          }
        },
        submitFriendEmail: function() {
          var friendEmail = this.emailInput.value;
          return userService.referral( friendEmail )
            .then( function( response ) {
              console.log( "walking?" );
              this.referralsRemaining = response;
              this.emailInput.value = "";
            }.bind( this ))
            .catch( function() {
              console.log( "referral request was unsuccesful" );
            });
        },
        attributeChanged: function( attrName, oldValue, newValue ) {}
      });
    });
})( window.Polymer, window.System );
