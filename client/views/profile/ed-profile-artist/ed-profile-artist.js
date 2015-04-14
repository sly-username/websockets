( function( polymer, System ) {
  "use strict";

  Promise.all([
   System.import( "domain/ed/services/ed-data-service" ),

  ])
  .then(function( imported ) {
    var dataService = imported.default;

    polymer( "ed-profile-artist", {
      /* LIFECYCLE */
      ready: function() {
        dataService.getArtistById( this.attributes[ "ed-id" ].value ).then(function( edArtist ){
          this.edArtist = edArtist;
        }.bind( this ));
      },
      attached: function() {},
      detached: function() {},
      attributeChanged: function() {
        dataService.getArtistById( this.attributes[ "ed-id" ].value ).then(function( edArtist ){
          this.edArtist = edArtist;
        }.bind( this ));
      }
    });
  });
})( window.Polymer, window.System );
