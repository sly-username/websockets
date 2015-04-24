( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-user-service" )
    .then( function( imported ) {
      var userService = imported.default,
        clickEvents = [ "mousedown", "touchstart" ],
        validateEmail = function() {
          var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
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
          this.emailInput.setAttribute( "autofocus", "" );
        },
        attached: function() {
          clickEvents.forEach( function( eventName ) {
            this.submitButton.addEventListener( eventName, this.submitFriendEmail.bind( this ));
          }.bind( this ));
          // todo add return "keydown" event.keyCode === 13

          this.emailInput.addEventListener( "keyup", validateEmail.bind( this ));
        },
        detached: function() {},
        submitFriendEmail: function( event ) {
          var friendEmail = this.emailInput.value,
            self = this;
          event.preventDefault();

          return userService.referral( friendEmail )
            .then( function( response ) {
              console.log( response );
              self.referralsRemaining = response;
            });
          // todo change referralsRemaining number
        },
        attributeChanged: function( attrName, oldValue, newValue ) {}
      });
    });
})( window.Polymer, window.System );
