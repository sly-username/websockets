( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-discover-service" ),
    System.import( "domain/ed/services/ed-data-service" ),
    System.import( "domain/ed/services/ed-player-service" )
  ]).then(function( imported ) {
      var
        discoverService = imported[ 0 ].default,
        dataService = imported[ 1 ].default,
        playerService = imported[ 2 ].default,
        clickEvents = [ "mousedown", "touchstart" ],
        triggerMenuHandler = function() {
          if ( this.edMenu.getAttribute( "class" ) === "show-menu" ) {
            this.edMenu.setAttribute( "class", "hide-menu" );
            this.appRouter.setAttribute( "class", "show-router" );
          } else {
            this.edMenu.setAttribute( "class", "show-menu" );
            this.appRouter.setAttribute( "class", "hide-router" );
          }
        },
        discoverGenreHandler = function( event ) {
          var tmpId = parseInt( event.target.getAttribute( "data-id" ), 10 );

          console.log( typeof tmpId );

          if ( tmpId != null ) {
            playerService.queueTracksAndPlay( tmpId );
          }
        };

      polymer( "ed-discover-view", {
        ready: function() {
          this.edMenu = document.getElementById( "side-menu" );
          this.appRouter = document.getElementById( "animation-wrapper" );
          this.triggerBtn = this.shadowRoot.getElementById( "menu-trigger" );
          this.discoverList = this.shadowRoot.getElementsByClassName( "discover-list" )[0];

          // handler
          this.handlers = {
            triggerMenu: triggerMenuHandler.bind( this ),
            discoverGenre: discoverGenreHandler.bind( this )
          };
        },
        attached: function() {
          this.triggerBtn.addEventListener( "click", this.handlers.triggerMenu );
          this.triggerBtn.addEventListener( "tap", this.handlers.triggerMenu );
          this.triggerBtn.addEventListener( "tap", this.handlers.triggerMenu );

          this.discoverList.addEventListener( "click", this.handlers.discoverGenre );
        },
        detached: function() {
          this.triggerBtn.removeEventListener( "click", this.handlers.triggerMenu );
          this.triggerBtn.removeEventListener( "tap", this.handlers.triggerMenu );
        },
        attributeChanged: function( attrName, oldValue, newValue ) {}
      });
    });
})( window.Polymer, window.System );
