( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-user-service" )
    .then( function( imported ) {
      var userService = imported.default,
        clickEvents = [ "mousedown", "touchstart" ];

      polymer( "ed-referral-view", {
        /* LIFECYCLE */
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
        submitFriendEmail: function( event ) {
          var friendEmail = this.emailInput.value;
          event.preventDefault();

          userService.referral( friendEmail );
          // todo change referralsRemaining number
        },
        attributeChanged: function( attrName, oldValue, newValue ) {}

      });
    });
})( window.Polymer, window.System );
