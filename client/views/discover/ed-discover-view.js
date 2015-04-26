( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-discover-service" )
    .then(function( imported ) {
      var
        discoverService = imported.default,
        triggerMenuHandler = function() {
          if ( !this.edMenu.hasAttribute( "class" ) ) {
            this.edMenu.setAttribute( "class", "show-menu" );
          } else {
            this.edMenu.removeAttribute( "class" );
          }
        }

      polymer( "ed-discover-view", {
        ready: function() {
          this.edMenu = document.getElementById( "side-menu" );
          this.triggerBtn = this.shadowRoot.getElementById( "menu-trigger" );
          this.handlers = {
            triggerMenu: triggerMenuHandler.bind( this )
          };
        },
        attached: function() {
          this.triggerBtn.addEventListener( "click", this.handlers.triggerMenu );
          this.triggerBtn.addEventListener( "tap", this.handlers.triggerMenu );
        },
        detached: function() {
          this.triggerBtn.removeEventListener( "click", this.handlers.triggerMenu );
          this.triggerBtn.removeEventListener( "tap", this.handlers.triggerMenu );
        },
        attributeChanged: function( attrName, oldValue, newValue ) {}
      });
    });
})( window.Polymer, window.System );
