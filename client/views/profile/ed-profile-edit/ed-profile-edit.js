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
        if ( this.innerFirst.value !== "" && this.innerLast.value !== "" ) {
          userService.editProfile( this.innerFirst.value, this.innerLast.value )
            .then(function( response ) {
              // TODO do something on a successful client response?
              console.log( response );
              return response;
            }.bind( this ));
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
          this.editForm = this.shadowRoot.getElementById( "edit-form" );
          this.firstName = this.shadowRoot.getElementById( "first-name" );
          this.lastName = this.shadowRoot.getElementById( "last-name" );
          this.innerFirst = this.shadowRoot.getElementById( "first-name" ).shadowRoot.querySelector( "input" );
          this.innerLast = this.shadowRoot.getElementById( "last-name" ).shadowRoot.querySelector( "input" );
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


