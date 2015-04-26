( function( polymer ) {
  "use strict";
  var triggerMenuHandler = function() {
    if ( !this.edMenu.hasAttribute( "class" ) ) {
      this.edMenu.setAttribute( "class", "show-menu" );
      this.referralTitle.style.opacity = 0;
    } else {
      this.edMenu.removeAttribute( "class" );
      this.referralTitle.style.opacity = 1;
    }
  };

  polymer( "ed-referral-view", {
    /* LIFECYCLE */
    ready: function() {
      this.edMenu = document.getElementById( "side-menu" );
      this.triggerBtn = this.shadowRoot.getElementById( "menu-trigger" );
      this.referralTitle = this.shadowRoot.getElementById( "referral-title" );
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
