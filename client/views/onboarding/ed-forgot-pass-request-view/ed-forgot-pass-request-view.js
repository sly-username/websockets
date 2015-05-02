( function( polymer ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-user-service" )
  ]).then(function( imported ) {
    var
      userService = imported[ 0 ].default,
      emailCheckHandler = function() {
      if ( this.emailInput.validity.valid ) {
        this.submitBtn.removeAttribute( "disabled" );
      } else {
        this.submitBtn.setAttribute( "disabled", "" );
      }
    },
      triggerSubmitHandler = function( event ) {
        event.preventDefault();

        userService.requestPasswordReset( this.emailInput.value )
          .then(function( response ) {
            console.log( response );
            this.router.go( "/forgot-pass/reset" );
            return response;
          }.bind( this ));
      };

    polymer( "ed-forgot-pass-request-view", {
      /* LIFECYCLE */
      ready: function() {
        this.submitBtn = this.shadowRoot.getElementById( "forgot-submit" );
        this.emailInput = this.shadowRoot.querySelector( ".email" )
          .shadowRoot.querySelector( "input" );
        this.handlers = {
          triggerSubmit: triggerSubmitHandler.bind( this ),
          emailCheck: emailCheckHandler.bind( this )
        };
      },
      attached: function() {
        this.submitBtn.addEventListener( "click", this.handlers.triggerSubmit );
        this.emailInput.addEventListener( "keyup", this.handlers.emailCheck );
      },
      detached: function() {
        this.submitBtn.removeEventListener( "click", this.handlers.triggerSubmit );
        this.emailInput.addEventListener( "keyup", this.handlers.emailCheck );
      }
    });
  });
})( window.Polymer );
