( function( polymer ) {
  "use strict";
  var triggerMenuHandler = function() {
    if ( this.edMenu.hasAttribute( "hide" ) ) {
      this.edMenu.removeAttribute( "hide" );
      this.edTitle.style.opacity = 0;
    } else {
      this.edMenu.setAttribute( "hide", "" );
      this.edTitle.style.opacity = 1;
    }
  }

  polymer( "ed-settings-view", {
    /* LIFECYCLE */
    ready: function() {
      this.edMenu = document.getElementById( "side-menu" );
      this.edTitle = this.shadowRoot.getElementById( "settings-title" );
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
