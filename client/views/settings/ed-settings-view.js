( function( polymer ) {
  "use strict";
  var
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
      this.logOut = this.shadowRoot.getElementById( "log-out-button" );
      this.handlers = {
        logOutTrigger: logOutTriggerHandler.bind( this )
      };
    },
    attached: function() {
      this.logOut.addEventListener( "click", this.handlers.logOutTrigger );
      this.logOut.addEventListener( "tap", this.handlers.logOutTrigger );
    },
    detached: function() {
      this.logOut.removeEventListener( "click", this.handlers.logOutTrigger );
      this.logOut.removeEventListener( "tap", this.handlers.logOutTrigger );
    }
  });
})( window.Polymer );
