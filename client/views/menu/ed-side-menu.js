( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-data-service" )
    .then(function( imported ) {
      var
        dataService = imported.default,
        triggerMenuHandler = function( event ) {
          if ( event.target.hasAttribute( "href" ) ) {
            this.edMenu.classList.toggle( "show-menu" );
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
          this.menuList = this.shadowRoot.getElementById( "menu-list" );
          this.edMenu = document.getElementById( "side-menu" );

          // handlers
          this.handlers = {
            triggerMenu: triggerMenuHandler.bind( this )
          };
        },
        attached: function() {
          this.menuList.addEventListener( "click", this.handlers.triggerMenu );
        },
        detached: function() {
          this.menuList.removeEventListener( "click", this.handlers.triggerMenu );
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
