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
          this.emailInput = this.shadowRoot.querySelector( "ed-form-input" )
            .shadowRoot.querySelector( "input" );
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

          this.submitButton.removeEventListener( "keypress", this.validateAfterEnter.bind( this ));
        },
        validateAfterEnter: function( event ) {
          event.preventDefault();
          if ( event.keyCode === 13 ) {
            this.validateEmail();
          }
        },
        checkEmailFormat: function() {
          var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;

          return this.emailInput.validity.valid && re.test( this.emailInput.value );
        },
        validateEmail: function() {
          var checkEmailFormat = this.checkEmailFormat();
          if ( this.emailInput.value === "" ) {
            this.emailField.classList.add( "invalid-field" );
          } else if ( !checkEmailFormat ) {
            this.emailField.classList.add( "invalid-field" );
          } else if ( checkEmailFormat ) {
            this.emailField.classList.remove( "invalid-field" );
            this.submitFriendEmail();
          }
        },
        submitFriendEmail: function() {
          var friendEmail = this.emailInput.value;
          return userService.referral( friendEmail )
            .then( function( response ) {
              this.referralsRemaining = response;
              this.emailInput.value = "";
            }.bind( this ))
            .catch( function() {
            });
        },
        attributeChanged: function( attrName, oldValue, newValue ) {}
      });
    });
})( window.Polymer, window.System );
