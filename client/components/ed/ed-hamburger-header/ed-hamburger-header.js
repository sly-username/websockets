( function( polymer ) {
  "use strict";
  var triggerMenuHandler = function() {
      if ( this.edMenu.getAttribute( "class" ) === "show-menu" ) {
        this.edMenu.setAttribute( "class", "hide-menu" );
        this.appRouter.setAttribute( "class", "show-router" );
      } else {
        this.edMenu.setAttribute( "class", "show-menu" );
        this.appRouter.setAttribute( "class", "hide-router" );
      }
    };

  polymer( "ed-hamburger-header", {
    /* LIFECYCLE */
    ready: function() {
      this.edMenu = document.getElementById( "side-menu" );
      this.appRouter = document.getElementById( "animation-wrapper" );
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
    /* PROPERTIES */
    /* METHODS */
  });

})( window.Polymer );
