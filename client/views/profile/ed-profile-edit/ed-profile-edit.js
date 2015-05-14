( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-user-service" )
  ]).then(function( imported ) {
      var
        userService = imported[ 0 ].default,
        updateProfileName = function( nameKey, nameValue ) {
          var nameData = {};
          nameData[ nameKey ] = nameValue;
          return userService.editProfile({
            name: nameData
          });
        },
        nameInputHandler = function( event ) {
          var target = event.target;

          if ( target.tagName === "ED-FORM-INPUT" && target.value !== "" && ( /^(first|last)-name$/ ).test( target.id ) ) {
            updateProfileName( target.id.split( "-" )[0], target.value )
              .then(function( edProfile ) {
                /* do any view updates if needed like perhaps */
                this.edFan = edProfile;
                return edProfile;
              }.bind( this ));
          }
        },
        uploadPhotoHandler = function( event ) {
          userService.changeProfileImage( event.target.files[ 0 ] );
        },
        takePhotoHandler = function( event ) {
          // TODO use cordova to handle image capturing
          // navigator.camera.getPicture( function() {
          //  userService.changeProfileImage( event.target.files[ 0 ] );
          // }, cameraError, cameraOptions );
        };

      polymer( "ed-profile-edit", {
        /* LIFECYCLE */
        ready: function() {
          this.nameInputsWrapper = this.shadowRoot.querySelector( ".name-field" );

          this.choosePhoto = this.shadowRoot.getElementById( "choose-photo" );
          this.takePhoto = this.shadowRoot.getElementById( "take-photo" );

          this.handler = {
            nameInput: nameInputHandler.bind( this ),
            takePhoto: takePhotoHandler.bind( this )
          };
        },
        attached: function() {
          if ( userService.isOpenSession ) {
            this.edFan = userService.currentProfile;
          } else {
            userService.once( "edLogin", function() {
              this.edFan = userService.currentProfile;
            }.bind( this ));
          }

          this.nameInputsWrapper.addEventListener( "blur", this.handler.nameInput, true );

          this.choosePhoto.addEventListener( "change", uploadPhotoHandler );
          this.takePhoto.addEventListener( "change", this.handler.takePhoto );
        },
        detached: function() {
          this.nameInputsWrapper.removeEventListener( "blur", this.handler.nameInput );

          this.choosePhoto.removeEventListener( "change", uploadPhotoHandler );
          this.takePhoto.removeEventListener( "change", this.handler.takePhoto );
        },
        attributeChanged: function( attrName ) {}
      });
    });
})( window.Polymer, window.System );
