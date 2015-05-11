( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-data-service" ),
    System.import( "domain/ed/services/ed-user-service" )
  ]).then(function( imported ) {
    var
      dataService = imported[ 0 ].default,
      userService = imported[ 1 ].default,
      autoSubmitHandler = function() {
        this.editForm.submit();
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
        if ( this[ "ed-id" ] ) {
          dataService.getFanById( this[ "ed-id" ] )
            .then(function( edFan ) {
              this.edFan = edFan;
              console.log( "artist got: %o", edFan );
              console.dir( this );
            }.bind( this ));
        }

        this.editForm = this.shadowRoot.getElementById( "edit-form" );
        this.firstName = this.shadowRoot.getElementById( "first-name" );
        this.lastName = this.shadowRoot.getElementById( "last-name" );
        this.choosePhoto = this.shadowRoot.getElementById( "choose-photo-input" );
        this.takePhoto = this.shadowRoot.getElementById( "take-photo" );

        this.handler = {
          autoSubmit: autoSubmitHandler.bind( this ),
          uploadPhoto: uploadPhotoHandler.bind( this ),
          takePhoto: takePhotoHandler.bind( this )
        };
      },
      attached: function() {
        this.firstName.addEventListener( "blur", this.handler.autoSubmit );
        this.lastName.addEventListener( "blur", this.handler.autoSubmit );
        this.choosePhoto.addEventListener( "change", this.handler.uploadPhoto );
        this.takePhoto.addEventListener( "change", this.handler.takePhoto );
      },
      detached: function() {
        this.firstName.removeEventListener( "blur", this.handler.autoSubmit );
        this.lastName.removeEventListener( "blur", this.handler.autoSubmit );
        this.choosePhoto.removeEventListener( "change", this.handler.uploadPhoto );
        this.takePhoto.removeEventListener( "change", this.handler.takePhoto );
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


