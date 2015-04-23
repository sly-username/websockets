( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-data-service" )
    .then(function( imported ) {
      var dataService = imported.default,

      autoSubmitHandler = function() {
        this.editForm.submit();
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
          this.choosePhoto = this.shadowRoot.getElementById( "choose-photo" );
          this.takePhoto = this.shadowRoot.getElementById( "take-photo" );
          this.handler = {
            autoSubmit: autoSubmitHandler.bind( this )
          };
        },
        attached: function() {
          this.firstName.addEventListener( "blur", this.handler.autoSubmit );
          this.lastName.addEventListener( "blur", this.handler.autoSubmit );
          this.choosePhoto.addEventListener( "change", this.handler.autoSubmit );
          this.takePhoto.addEventListener( "change", this.handler.autoSubmit );
        },
        detached: function() {
          this.firstName.removeEventListener( "blur", this.handler.autoSubmit );
          this.lastName.removeEventListener( "blur", this.handler.autoSubmit );
          this.choosePhoto.removeEventListener( "change", this.handler.autoSubmit );
          this.takePhoto.removeEventListener( "change", this.handler.autoSubmit );
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


