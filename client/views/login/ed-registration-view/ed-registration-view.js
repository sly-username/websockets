( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/objects/model-type-checker" ),
    System.import( "domain/ed/services/ed-user-service" )
  ]).then(function( imported ) {
    var
      userService = imported[ 1 ].default,
      typeChecker = imported[ 0 ].default,
      validateFormInputValues;

    validateFormInputValues = function( self ) {
      var i,
        length = self.formInputs.length;

      for ( i = 0; i < length; i++) {
        var value = self.formInputs[ i ].shadowRoot.querySelector( "input" ).value;
        return value !== "";
      }

      return false;
    };

    polymer( "ed-registration-view", {
      /* LIFECYCLE */
      ready: function() {
        this.pairedInput = this.shadowRoot.querySelector( "ed-paired-input" );
        this.formContainer = this.shadowRoot.getElementById( "registration-form" );
        this.submitButton = this.shadowRoot.getElementById( "registration-submit" );
        // TODO maybe a better way to grab the form inputs
        this.formInputs = this.formContainer.querySelectorAll( "ed-form-input" );
      },
      attached: function() {
        // this.formContainer.addEventListener( "keyup", this.submitCheck.bind( this ) );
        this.formContainer.addEventListener( "keypress", this.handleEvent.bind( this ) );
        this.submitButton.addEventListener( "click", this.handleEvent.bind( this ), false);
      },
      handleEvent: function( event ) {
        if ( event.type === "keypress" && event.keyCode === 13) {
          this.submitForm( event );
        }

        if ( event.type === "click" ) {
          this.submitForm( event );
        }
      },
      submitCheck: function( event ) {
        if ( this.pairedInput.isValid ) {
          this.submitButton.removeAttribute( "disabled" );
        } else {
          this.submitButton.setAttribute( "disabled", "" );
        }
      },
      submitForm: function( event ) {
        var authBlock, registrationDataBlock, areValidInputs;
        // TODO remove debug
        event.preventDefault();

        areValidInputs = validateFormInputValues( this );

        if ( areValidInputs ) {
          // refactor these selectors...
          registrationDataBlock = {
            type: "user",
            email: this.formContainer.querySelector( "ed-form-input.email" ).shadowRoot.querySelector( "input" ).value,
            password: this.formContainer.querySelector( "ed-paired-input" ).shadowRoot.querySelector( "#primary-box" ).value,
            passwordConfirmation: this.formContainer.querySelector( "ed-paired-input" ).shadowRoot.querySelector( "#confirm-box" ).value,
            name: {
              first: this.formContainer.querySelector( "ed-form-input.name-first" ).shadowRoot.querySelector( "input" ).value,
              last: this.formContainer.querySelector( "ed-form-input.name-last" ).shadowRoot.querySelector( "input" ).value
            },
            inviteCode: this.formContainer.querySelector( "ed-form-input.invite-code" ).shadowRoot.querySelector( "input" ).value,
            yearOfBirth: this.formContainer.querySelector( "ed-form-input.birthday" ).shadowRoot.querySelector( "input" ).valueAsDate.getFullYear(),
            zipcode: this.formContainer.querySelector( "ed-form-input.zipcode" ).shadowRoot.querySelector( "input" ).value
          };

          // todo do artists also go through onboarding?
          userService.register( registrationDataBlock )
            .then(function() {
              this.router.go( "/onboarding/like" );
            }.bind( this ));
        }
      },
      detached: function() {},
      attributeChanged: function( attrName, oldValue, newValue ) {}
    });
  });
})( window.Polymer, window.System );
