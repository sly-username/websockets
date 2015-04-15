( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-data-service" )
    .then(function( imported ) {
      var dataService = imported.default;

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
        },
        attached: function() {
          this.firstName.addEventListener( "blur", this.autoSubmit.bind( this ) );
          this.lastName.addEventListener( "blur", this.autoSubmit.bind( this ) );
          this.choosePhoto.addEventListener( "change", this.autoSubmit.bind( this ) );
          this.takePhoto.addEventListener( "change", this.autoSubmit.bind( this ) );
        },
        detached: function() {
          this.firstName.removeEventListener( "blur", this.autoSubmit.bind( this ) );
          this.lastName.removeEventListener( "blur", this.autoSubmit.bind( this ) );
          this.choosePhoto.removeEventListener( "change", this.autoSubmit.bind( this ) );
          this.takePhoto.removeEventListener( "change", this.autoSubmit.bind( this ) );
        },
        "ed-idChanged": function() {
          this.attributeChanged( "ed-id" );
        },
        autoSubmit: function() {
          this.editForm.submit();
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


