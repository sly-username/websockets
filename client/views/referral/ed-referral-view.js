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
          this.emailInput = this.shadowRoot.getElementsByTagName( "input" )[0];
          this.submitButton = this.shadowRoot.getElementById( "referral-submit" );
        },
        attached: function() {
          clickEvents.forEach( function( eventName ) {
            this.submitButton.addEventListener( eventName, this.submitFriendEmail.bind( this ));
          }.bind( this ));
          // todo add return "keydown" event.keyCode === 13
        },
        detached: function() {},
        validateFriendEmail: function() {
          if ( this.emailInput.valid ){
            this.submitButton.removeAttribute( "disabled" );
          } else {
            this.submitButton.setAttribute( "disabled", "" );
          }
        },
        submitFriendEmail: function( event ) {
          var friendEmail = this.emailInput.value,
            self = this;
          event.preventDefault();

          return userService.referral( friendEmail )
            .then( function( response ) {
              self.referralsRemaining = response;
            });
          // todo change referralsRemaining number
        },
        attributeChanged: function( attrName, oldValue, newValue ) {}

      });
    });
})( window.Polymer, window.System );
