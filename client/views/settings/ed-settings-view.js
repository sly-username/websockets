( function( polymer ) {
  "use strict";
  var triggerMenuHandler = function() {
    if ( this.edMenu.getAttribute( "class" ) === "show-menu" ) {
      this.edMenu.setAttribute( "class", "hide-menu" );
      this.setAttribute( "class", "show-settings" );
    } else {
      this.edMenu.setAttribute( "class", "show-menu" );
      this.setAttribute( "class", "hide-settings" );
    }
  },
    logOutTriggerHandler = function() {
      var reallyLogout = confirm( "Are you sure you want to log out?" );

      if ( reallyLogout ) {
        // reroute somewhere else
        console.log( "logout" );
      }
      return false;
  };

  polymer( "ed-settings-view", {
    /* LIFECYCLE */
    ready: function() {
      this.edMenu = document.getElementById( "side-menu" );
      this.triggerBtn = this.shadowRoot.getElementById( "menu-trigger" );
      this.logOut = this.shadowRoot.getElementById( "log-out-button" );
      this.handlers = {
        triggerMenu: triggerMenuHandler.bind( this ),
        logOutTrigger: logOutTriggerHandler.bind( this )
      };
    },
    attached: function() {
      this.triggerBtn.addEventListener( "click", this.handlers.triggerMenu );
      this.triggerBtn.addEventListener( "tap", this.handlers.triggerMenu );
      this.logOut.addEventListener( "tap", this.handler.logOutTrigger );
      this.logOut.addEventListener( "click", this.handler.logOutTrigger );
    },
    detached: function() {
      this.triggerBtn.removeEventListener( "click", this.handlers.triggerMenu );
      this.triggerBtn.removeEventListener( "tap", this.handlers.triggerMenu );
      this.logOut.removeEventListener( "tap", this.handler.logOutTrigger );
      this.logOut.removeEventListener( "click", this.handler.logOutTrigger );
    },
    attributeChanged: function( attrName, oldValue, newValue ) {}
    /* PROPERTIES */
    /* METHODS */
  });
})( window.Polymer );
