( function( polymer ) {
  "use strict";
  var triggerMenuHandler = function() {
    this.edMenu.classList.toggle( "show-menu" );
    this.appRouter.classList.toggle( "hide-router" );
  };

  polymer( "ed-menu-button", {
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
      this.triggerBtn.addEventListener( "mouseup", this.handlers.triggerMenu );
    },
    detached: function() {
      this.triggerBtn.removeEventListener( "mouseup", this.handlers.triggerMenu );
    },
    attributeChanged: function( attrName, oldValue, newValue ) {}
    /* PROPERTIES */
    /* METHODS */
  });

})( window.Polymer );
