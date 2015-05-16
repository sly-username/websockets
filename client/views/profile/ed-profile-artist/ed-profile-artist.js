( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-data-service" ),
    System.import( "domain/ed/services/ed-player-service" )
  ]).then(function( imported ) {
      var
        dataService = imported[ 0 ].default,
        playerService = imported[ 1 ].default,
        modelObserver = function( changes ) {
          if ( changes.some(function( change ) { return change.name === "ed-id"; }) ) {
            this.updateProfileModel();
          }
        };

      polymer( "ed-profile-artist", {
        /* LIFECYCLE */
        ready: function() {
          // Get first model
          this.updateProfileModel();

          this.handlers = {
            modelObserver: modelObserver.bind( this )
          };
        },
        attached: function() {
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
            this.songsRated = playerService.userStats.ratedTracks;
            this.yourRank = playerService.userStats.completedListens;
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
