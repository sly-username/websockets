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
                this.updateProfileInView( edProfile );
                return edProfile;
              }.bind( this ));
          }
        },
        choosePhotoHandler = function( event ) {
          return userService.changeProfileImage( event.target.files[ 0 ] )
            .then(function( edProfile ) {
              this.updateProfileInView( edProfile );
            }.bind( this ));
        },
        loginHandler = function() {
          this.updateProfileInView( userService.currentProfile );
        };

      polymer( "ed-profile-edit", {
        /* LIFECYCLE */
        ready: function() {
          this.nameInputsWrapper = this.shadowRoot.querySelector( ".name-field" );
          this.choosePhoto = this.shadowRoot.getElementById( "choose-photo" );
          this.profileImage = this.shadowRoot.getElementById( "profile-image" );

          this.handler = {
            nameInput: nameInputHandler.bind( this ),
            choosePhoto: choosePhotoHandler.bind( this ),
            onLogin: loginHandler.bind( this )
          };
        },
        attached: function() {
          this.nameInputsWrapper.addEventListener( "blur", this.handler.nameInput, true );
          this.choosePhoto.addEventListener( "change", this.handler.choosePhoto );

          if ( userService.isOpenSession ) {
            this.updateProfileInView( userService.currentProfile );
          }

          userService.on( "edLogin", this.handler.onLogin );
        },
        detached: function() {
          this.nameInputsWrapper.removeEventListener( "blur", this.handler.nameInput );
          this.choosePhoto.removeEventListener( "change", this.handler.choosePhoto );

          userService.off( "edLogin", this.handler.onLogin );
        },
        // attributeChanged: function( attrName ) {}
        updateProfileInView: function( edProfile ) {
          this.edFan = edProfile;
          // TODO figure out why polymer isnt updating data binding
          this.profileImage.setAttribute( "src", edProfile.art.phoneLarge );
        },
        takePhoto: function() {
          var reader = new FileReader(),
            imageFile;

          reader.onloadend = function( event ) {
            return userService.changeProfileImage( event.target.result, imageFile )
              .then(function( edProfile ) {
                this.updateProfileInView( edProfile );
                return edProfile;
              }.bind( this ));
          }.bind( this );

          if ( window.Camera ) {
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
        goBack: function( event ) {
          event.preventDefault();
          window.history.back();
        }
      });
    });
})( window.Polymer, window.System );
