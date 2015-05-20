( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-data-service" ),
    System.import( "domain/ed/services/ed-user-service" )
  ]).then(function( imported ) {
      var
        dataService = imported[ 0 ].default,
        userService = imported[ 1 ].default,
        modelObserver = function( changes ) {
          if ( changes.some(function( change ) { return change.name === "ed-id"; }) ) {
            this.updateProfileModel();
          }
        };

      polymer( "ed-profile-fan", {
        /* LIFECYCLE */
        ready: function() {
          this.iconContainer = this.shadowRoot.querySelector( ".icon-header" );
          this.editBtn = this.shadowRoot.querySelector( "#edit-btn" );
          this.handlers = {
            modelObserver: modelObserver.bind( this )
          };
        },
        attached: function() {
          this.updateProfileModel();
          Object.observe( this, this.handlers.modelObserver );
        },
        detached: function() {
          Object.unobserve( this, this.handlers.modelObserver );
        },
        "ed-idChanged": function() {
          this.attributeChanged( "ed-id" );
        },
        attributeChanged: function( attrName ) {
          if ( attrName === "ed-id" ) {
            this.updateProfileModel();
          }
        },
        updateProfileModel: function() {
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
            } else {
              this.iconContainer.appendChild( this.editBtn );
            }
          }
        }
      });
    });
})( window.Polymer, window.System );
