( function( polymer ) {
  "use strict";
  Promise.all([
    System.import( "domain/ed/services/ed-user-service" )
  ]).then(function( imported ) {
    var
      userService = imported[ 0 ].default,
      logOutTriggerHandler = function() {
        var reallyLogout = confirm( "Are you sure you want to log out?" );

        if ( reallyLogout ) {
          userService.logout();
          this.router.go( "/login" );
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
      },
      detached: function() {
        this.logOut.removeEventListener( "click", this.handlers.logOutTrigger );
      },
      attributeChanged: function( attrName, oldValue, newValue ) {}
      /* PROPERTIES */
      /* METHODS */
    } );
  });
})( window.Polymer );
