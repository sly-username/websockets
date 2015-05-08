( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-data-service" )
    .then(function( imported ) {
      var
        dataService = imported.default,
        triggerMenuHandler = function() {
          if ( this.edMenu.classList.contains( "show-menu" ) ) {
            this.edMenu.classList.remove( "show-menu" );
          }
        };

      polymer( "ed-side-menu", {
        /* LIFECYCLE */
        ready: function() {
          if ( this[ "ed-id" ] ) {
            dataService.getFanById( this[ "ed-id" ] )
              .then(function( edFan ) {
                this.edFan = edFan;
                console.log( "Fan got: %o", edFan );
                console.dir( this );
              }.bind( this ));
          }
          this.edMenu = document.getElementById( "side-menu" );
          this.router = document.getElementById( "root-app-router" );
          // handlers
          this.handlers = {
            triggerMenu: triggerMenuHandler.bind( this )
          };
        },
        attached: function() {
          this.router.addEventListener( "activate-route-end", this.handlers.triggerMenu );
        },
        detached: function() {
          this.router.removeEventListener( "activate-route-end", this.handlers.triggerMenu );
        },
        "ed-idChanged": function() {
          this.attributeChanged( "ed-id" );
        },
        attributeChanged: function( attrName ) {
          if ( attrName === "ed-id" ) {
            dataService.getFanById( this[ "ed-id" ] )
              .then(function( edFan ) {
                this.edFan = edFan;
              }.bind( this ));
          }
        }
      });
    });
})( window.Polymer, window.System );
