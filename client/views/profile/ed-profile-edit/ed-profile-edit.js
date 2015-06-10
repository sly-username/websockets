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
          userService.changeProfileImage( event.target.files[ 0 ]);
        };

      polymer( "ed-profile-edit", {
        /* LIFECYCLE */
        ready: function() {
          this.nameInputsWrapper = this.shadowRoot.querySelector( ".name-field" );
          this.choosePhoto = this.shadowRoot.getElementById( "choose-photo" );

          this.handler = {
            nameInput: nameInputHandler.bind( this )
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
        },
        detached: function() {
          this.nameInputsWrapper.removeEventListener( "blur", this.handler.nameInput );
          this.choosePhoto.removeEventListener( "change", uploadPhotoHandler );
        },
        // attributeChanged: function( attrName ) {}
        takePhoto: function() {
          var reader = new FileReader(),
            imageFile;

          reader.onloadend = function( event ) {
            userService.changeProfileImage( event.target.result, imageFile );
          };

          if ( Camera ) {
            navigator.camera.getPicture(function( url ) {
              window.resolveLocalFileSystemURL( url, function( fileObj ) {
                fileObj.file(function( data ) {
                  imageFile = data;
                  reader.readAsArrayBuffer( data );
                });
              });
            });
          }
        },
        goBack: function() {
          navigator.app.backHistory();
        }
      });
    });
})( window.Polymer, window.System );
