( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-data-service" ),
    System.import( "domain/ed/services/ed-user-service" )
  ]).then(function( imported ) {
      var
        dataService = imported[ 0 ].default,
        userService = imported[ 1 ].default,
        updateProfileName = function( nameKey, nameValue ) {
          var nameData = {};
          nameData[ nameKey ] = nameValue;
          return userService.editProfile({
            name: nameData
          });
        },
        nameInputHandler = function( event ) {
          var
            self = this,
            target = event.target,
            targetInput = event.target.shadowRoot.querySelector( "input" );

          if ( targetInput.tagName === "INPUT" && targetInput.value !== "" && ( /^(first|last)-name$/ ).test( target.id ) ) {
            updateProfileName( target.id.split( "-" )[0], targetInput.value )
              .then(function( edProfile ) {
                /* do any view updates if needed like perhaps */
                self.edProfile = edProfile;
                return edProfile;
              });
          }
        };
      polymer( "ed-profile-edit", {
        /* LIFECYCLE */
        ready: function() {
          if ( this[ "ed-id" ] ) {
            dataService.getFanById( this[ "ed-id" ] )
              .then(function( edFan ) {
                this.edFan = edFan;
                console.log( "artist got: %o", edFan );
                console.dir( this );
              }.bind( this ));
          }
          this.firstName = this.shadowRoot.getElementById( "first-name" );
          this.lastName = this.shadowRoot.getElementById( "last-name" );
          this.choosePhoto = this.shadowRoot.getElementById( "choose-photo" );
          this.takePhoto = this.shadowRoot.getElementById( "take-photo" );
          this.handler = {
            nameInput: nameInputHandler.bind( this )
          };
        },
        attached: function() {
          this.firstName.addEventListener( "blur", this.handler.nameInput, true );
          this.lastName.addEventListener( "blur", this.handler.nameInput, true );
//          this.choosePhoto.addEventListener( "change", this.handler.autoSubmit );
//          this.takePhoto.addEventListener( "change", this.handler.autoSubmit );
        },
        detached: function() {
          this.firstName.removeEventListener( "blur", this.handler.nameInput, true );
          this.lastName.removeEventListener( "blur", this.handler.nameInput, true );
//          this.choosePhoto.removeEventListener( "change", this.handler.autoSubmit );
//          this.takePhoto.removeEventListener( "change", this.handler.autoSubmit );
        },
        "ed-idChanged": function() {
          this.attributeChanged( "ed-id" );
        },
        attributeChanged: function( attrName ) {
          if ( attrName === "ed-id" ) {
            dataService.getFanById( this[ "ed-id" ] )
              .then(function( edFan ) {
                this.edFan = edFan;
              }.bind( this ));
          }
        }
      });
    });
})( window.Polymer, window.System );


