( function( polymer ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-user-service" )
  ]).then(function( imported ) {
    var
      userService = imported.default,
      emailCheckHandler = function() {
      if ( this.emailInput.validity.valid ) {
        this.submitBtn.removeAttribute( "disabled" );
      } else {
        this.submitBtn.setAttribute( "disabled", "" );
      }
    },
      triggerSubmitHandler = function( event ) {
        event.preventDefault();

        return userService.forgotPassword( this.emailInput.value )
          .then(function( response ) {
            console.log( response );
            return response;
          }.bind( this ));
      };

    polymer( "ed-forgot-pass-request-view", {
      /* LIFECYCLE */
      ready: function() {
        this.submitBtn = this.shadowRoot.getElementById( "forgot-submit" );
        this.emailInput = this.shadowRoot.querySelector( ".email" )
          .shadowRoot.querySelector( "input" );
        console.log( this.emailInput );
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
