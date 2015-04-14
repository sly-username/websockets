( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-user-service" )
    .then( function( imported ) {
      var userService = imported.default;

      polymer( "ed-registration-view", {
        /* LIFECYCLE */
        ready: function() {
          this.pairedInput = this.shadowRoot.querySelector( "ed-paired-input" );
          this.formContainer = this.shadowRoot.getElementById( "registration-form" );
          this.submitButton = this.shadowRoot.getElementById( "registration-submit" );
          this.formInputs = this.formContainer.querySelectorAll( "ed-form-input" );
        },
        attached: function() {
          //this.formContainer.addEventListener( "keyup", this.submitCheck.bind( this ) );
          this.submitButton.addEventListener( "click", this.submitForm.bind( this ), false);
        },
        submitCheck: function() {
          if ( this.pairedInput.isValid ) {
            this.submitButton.removeAttribute( "disabled" );
          } else {
            this.submitButton.setAttribute( "disabled", "" );
          }
        },
        submitForm: function( event ) {
          event.preventDefault();


          var registrationBlock = {
              type: "user",
              email: this.formContainer.querySelector( "ed-form-input.email" ).shadowRoot.querySelector( "input" ).value,
              password: this.formContainer.querySelector("ed-paired-input").shadowRoot.querySelector( "#primary-box" ).value,
              passwordConfirmation: this.formContainer.querySelector("ed-paired-input").shadowRoot.querySelector( "#confirm-box" ).value,
              name: {
                first: this.formContainer.querySelector( "ed-form-input.name-first" ).shadowRoot.querySelector( "input" ).value,
                last: this.formContainer.querySelector( "ed-form-input.name-last" ).shadowRoot.querySelector( "input" ).value
              },
              inviteCode: this.formContainer.querySelector( "ed-form-input.invite-code" ).shadowRoot.querySelector( "input" ).value,
              yearOfBirth: this.formContainer.querySelector( "ed-form-input.birthday" ).shadowRoot.querySelector( "input" ).valueAsDate.getFullYear(),
              zipcode: this.formContainer.querySelector( "ed-form-input.zipcode" ).shadowRoot.querySelector( "input" ).value
            };

          console.log( "registrationBlock", registrationBlock );
          userService.register({ data: registrationBlock });

        },
        detached: function() {},
        attributeChanged: function( attrName, oldValue, newValue ) {}
        /* PROPERTIES */
        /* METHODS */
      });
    }, function( error ) {
      console.warn( "Could not import 'user service': ", error.message );
      console.error( error.stack );
    });
})( window.Polymer, window.System );
