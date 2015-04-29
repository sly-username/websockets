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
        },
        triggerMenuHandler = function() {
          if ( this.edMenu.getAttribute( "class" ) === "show-menu" ) {
            this.edMenu.setAttribute( "class", "hide-menu" );
            this.appRouter.setAttribute( "class", "show-router" );
          } else {
            this.edMenu.setAttribute( "class", "show-menu" );
            this.appRouter.setAttribute( "class", "hide-router" );
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
          this.referralMessage = this.shadowRoot.getElementById( "referral-message" );
          this.edMenu = document.getElementById( "side-menu" );
          this.appRouter = document.getElementById( "animation-wrapper" );
          this.triggerBtn = this.shadowRoot.getElementById( "menu-trigger" );
          this.handlers = {
            triggerMenu: triggerMenuHandler.bind( this )
          };
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
          this.triggerBtn.addEventListener( "click", this.handlers.triggerMenu );
          this.triggerBtn.addEventListener( "tap", this.handlers.triggerMenu );
        },
        detached: function() {
          this.triggerBtn.removeEventListener( "click", this.handlers.triggerMenu );
          this.triggerBtn.removeEventListener( "tap", this.handlers.triggerMenu );
        },
        updateReferralCount: function() {
          var referralsRemaining;
          return userService.getReferrals()
            .then( function( response ) {
              referralsRemaining = response.data.count;
              return referralsRemaining;
            });
        },
        submitFriendEmail: function( event ) {
          var friendEmail = this.emailInput.value;
          event.preventDefault();

          return userService.referral( friendEmail )
            .then( function( response ) {
              this.referralsRemaining = response;
              this.emailInput.value = "";
            }.bind( this ));
          // todo change referralsRemaining number
        },
        attributeChanged: function( attrName, oldValue, newValue ) {}
      });
    });
})( window.Polymer, window.System );

