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
            this.miniPlayerWrapper.classList.remove( "show-mini" );
            this.mainPlayerWrapper.classList.remove( "hide-main" );
            this.songCardWrapper.classList.remove( "minimized" );
          }
        };

      polymer( "ed-discover-view", {
        ready: function() {
          this.discoverList = this.shadowRoot.getElementsByClassName( "discover-list" )[0];
          this.edPlayer = document.getElementById( "song-card" );
          this.songCardWrapper = this.edPlayer.shadowRoot.getElementById( "song-card-wrapper" );
          this.mainPlayerWrapper = this.edPlayer.shadowRoot.getElementById( "main-player-wrapper" );
          this.miniPlayerWrapper = this.edPlayer.shadowRoot.getElementById( "mini-player-wrapper" );
          // handler
          this.handlers = {
            discoverGenre: discoverGenreHandler.bind( this )
          };
        },
        attached: function() {
          this.discoverList.addEventListener( "click", this.handlers.discoverGenre );
        },
        detached: function() {
          this.discoverList.removeEventListener( "click", this.handlers.discoverGenre );
        },
        attributeChanged: function( attrName, oldValue, newValue ) {}
      });
    });
})( window.Polymer, window.System );
