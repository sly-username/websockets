( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-discover-service" ),
    System.import( "domain/ed/services/ed-player-service" )
  ]).then(function( imported ) {
      var
        discoverService = imported[ 0 ].default,
        playerService = imported[ 1 ].default,
        discoverGenreHandler = function( event ) {
          var tmpId = parseInt( event.target.getAttribute( "data-id" ), 10 );

          if ( tmpId != null ) {
            playerService.startMusicDiscovery( tmpId );
          }
        };

      polymer( "ed-discover-view", {
        ready: function() {
          this.discoverList = this.shadowRoot.getElementsByClassName( "discover-list" )[0];
          // handler
          this.handlers = {
            discoverGenre: discoverGenreHandler.bind( this )
          };
        },
        attached: function() {
          this.triggerBtn.addEventListener( "tap", this.handlers.triggerMenu );
          this.discoverList.addEventListener( "click", this.handlers.discoverGenre );
        },
        detached: function() {
          this.triggerBtn.removeEventListener( "tap", this.handlers.triggerMenu );
          this.discoverList.removeEventListener( "click", this.handlers.discoverGenre );
        },
        attributeChanged: function( attrName, oldValue, newValue ) {}
      });
    });
})( window.Polymer, window.System );
