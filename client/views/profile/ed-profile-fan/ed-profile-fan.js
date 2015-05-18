( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-data-service" ),
    System.import( "domain/ed/services/ed-player-service" )
  ]).then(function( imported ) {
      var
        dataService = imported[ 0 ].default,
        playerService = imported[ 1 ].default;

      polymer( "ed-profile-fan", {
        /* LIFECYCLE */
        ready: function() {
        },
        attached: function() {
          if ( this[ "ed-id" ] ) {
            dataService.getFanById( this[ "ed-id" ] )
              .then(function( edFan ) {
                this.edFan = edFan;
                console.log( "Fan got: %o", edFan );
                console.dir( this );
              }.bind( this ));
            this.songsRated = playerService.userStats.ratedTracks;
            this.yourRank = playerService.userStats.completedListens;
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
            this.songsRated = playerService.userStats.ratedTracks;
            this.yourRank = playerService.userStats.completedListens;
          }
        }
      });
    });
})( window.Polymer, window.System );
