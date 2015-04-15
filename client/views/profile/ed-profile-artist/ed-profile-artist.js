( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-data-service" )
    .then(function( imported ) {
      var dataService = imported.default;

      polymer( "ed-profile-artist", {
        /* LIFECYCLE */
        ready: function() {
          if ( this[ "ed-id" ] ) {
            dataService.getArtistById( this[ "ed-id" ] )
              .then(function( edArtist ) {
                this.edArtist = edArtist;
                console.log( "artist got: %o", edArtist );
                console.dir( this );
              }.bind( this ));
          }
        },
        attached: function() {},
        detached: function() {},
        "ed-idChanged": function() {
          this.attributeChanged( "ed-id" );
        },
        attributeChanged: function( attrName ) {
          if ( attrName === "ed-id" ) {
            dataService.getArtistById( this[ "ed-id" ] )
              .then(function( edArtist ) {
                this.edArtist = edArtist;
              }.bind( this ));
          }
        }
      });
    });
})( window.Polymer, window.System );
