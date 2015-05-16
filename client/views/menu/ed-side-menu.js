( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-user-service" )
    .then(function( imported ) {
      var
        userService = imported.default,
        triggerMenuHandler = function() {
          if ( this.edMenu.classList.contains( "show-menu" ) ) {
            this.edMenu.classList.remove( "show-menu" );
          }
        };

      polymer( "ed-side-menu", {
        /* LIFECYCLE */
        ready: function() {
          this.edMenu = document.getElementById( "side-menu" );
          this.router = document.getElementById( "root-app-router" );
          // handlers
          this.handlers = {
            triggerMenu: triggerMenuHandler.bind( this )
          };

          if ( userService.isOpenSession ) {
            this.edFan = userService.currentProfile;
          }
          userService.on( "edLogin", function() {
            this.edFan = userService.currentProfile;
          }.bind( this ) );
        },
        attached: function() {
          this.router.addEventListener( "activate-route-end", this.handlers.triggerMenu );
        },
        detached: function() {
          this.router.removeEventListener( "activate-route-end", this.handlers.triggerMenu );
        },
        attributeChanged: function( attrName ) {
        }
      });
    });
})( window.Polymer, window.System );
