( function( polymer ) {
  "use strict";

  var logOutTriggerHandler = function() {
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
      this.logOut = this.shadowRoot.getElementById( "log-out-button" );
      this.handler = {
        logOutTrigger: logOutTriggerHandler.bind( this )
      };
    },
    attached: function() {
      this.logOut.addEventListener( "tap", this.handler.logOutTrigger );
      this.logOut.addEventListener( "click", this.handler.logOutTrigger );
    },
    detached: function() {
      this.logOut.removeEventListener( "tap", this.handler.logOutTrigger );
      this.logOut.removeEventListener( "click", this.handler.logOutTrigger );
    },
    attributeChanged: function( attrName, oldValue, newValue ) {}
    /* PROPERTIES */
    /* METHODS */
  });
})( window.Polymer );
