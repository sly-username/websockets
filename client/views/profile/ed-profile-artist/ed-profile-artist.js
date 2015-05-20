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

      polymer( "ed-profile-artist", {
        /* LIFECYCLE */
        ready: function() {
          // Get first model
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
        updateProfileModel: function() {
          if ( this[ "ed-id" ] ) {
            dataService.getArtistById( this[ "ed-id" ] )
              .then(function( edArtist ) {
                this.edArtist = edArtist;
                console.log( "profile artist got: %o", edArtist );
              }.bind( this ));
            userService.getStats()
              .then(function( response ) {
                this.songsRated = response.ratedTracks;
                this.yourRank = response.completedListens;
              }.bind( this ));
          }
        },
        attributeChanged: function( attrName ) {
          if ( attrName === "ed-id" ) {
            this.updateProfileModel();
          }
        }
      });
    });
})( window.Polymer, window.System );
