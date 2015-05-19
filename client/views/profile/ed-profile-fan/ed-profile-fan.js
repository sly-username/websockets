( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-data-service" ),
    System.import( "domain/ed/services/ed-user-service" )
  ]).then(function( imported ) {
      var
        dataService = imported[ 0 ].default,
        userService = imported[ 1 ].default;

      polymer( "ed-profile-fan", {
        /* LIFECYCLE */
        ready: function() {
          this.iconContainer = this.shadowRoot.querySelector( ".icon-header" );
          this.editBtn = this.shadowRoot.querySelector( "#edit-btn" );
        },
        attached: function() {
          if ( this[ "ed-id" ] ) {
            dataService.getFanById( this[ "ed-id" ] )
              .then(function( edFan ) {
                this.edFan = edFan;
                console.log( "Fan got: %o", edFan );
                console.dir( this );
              }.bind( this ));
            userService.getStats()
              .then(function( response ) {
                this.songsRated = response.ratedTracks;
                this.yourRank = response.completedListens;
              }.bind( this ));

            if ( userService.currentProfile.id !== this[ "ed-id" ] ) {
              this.iconContainer.removeChild( this.editBtn );
            }
          }
        },
        detached: function() {},
        "ed-idChanged": function() {
          this.attributeChanged( "ed-id" );
        },
        attributeChanged: function( attrName ) {
          if ( attrName === "ed-id" ) {
            dataService.getFanById( this[ "ed-id" ] )
              .then(function( edFan ) {
                this.edFan = edFan;
              }.bind( this ));
            userService.getStats()
              .then(function( response ) {
                this.songsRated = response.ratedTracks;
                this.yourRank = response.completedListens;
              }.bind( this ));

            if ( userService.currentProfile.id !== this[ "ed-id" ] ) {
              this.iconContainer.removeChild( this.editBtn );
            }
          }
        }
      });
    });
})( window.Polymer, window.System );
