( function( polymer ) {
  "use strict";
  Promise.all([
    System.import( "domain/ed/services/ed-user-service" )
  ]).then(function( imported ) {
    var
      userService = imported[ 0 ].default,
      logOutTriggerHandler = function() {
        userService.logout();
        this.router.go( "/login" );
        return false;
      },
      redirectInAppHandler = function( event ) {
        if ( cordova && cordova.InAppBrowser && typeof cordova.InAppBrowser.open === "function" ) {
          switch ( event.target.id ) {
            case "Terms-button":
              cordova.InAppBrowser.open( "http://www.eardish.com/terms", "_blank" );
              break;
            case "About-button":
              cordova.InAppBrowser.open( "http://www.eardish.com/privacy", "_blank" );
              break;
            case "Support-button":
              cordova.InAppBrowser.open( "http://www.eardish.com/support", "_blank" );
              break;
            default:
              // do nothing
              break;
          }
        }
      };

    polymer( "ed-settings-view", {
      ready: function() {
        this.logOut = this.shadowRoot.getElementById( "log-out-button" );
        this.termsBtn = this.shadowRoot.getElementById( "Terms-button" );
        this.aboutBtn = this.shadowRoot.getElementById( "About-button" );

        this.handlers = {
          logOutTrigger: logOutTriggerHandler.bind( this ),
          redirectInApp: redirectInAppHandler.bind( this )
        };
      },
      attached: function() {
        this.logOut.addEventListener( "touchstart", this.handlers.logOutTrigger );
        this.termsBtn.addEventListener( "touchstart", this.handlers.redirectInApp );
        this.aboutBtn.addEventListener( "touchstart", this.handlers.redirectInApp );
      },
      detached: function() {
        this.logOut.removeEventListener( "touchstart", this.handlers.logOutTrigger );
        this.termsBtn.removeEventListener( "touchstart", this.handlers.redirectInApp );
        this.aboutBtn.removeEventListener( "touchstart", this.handlers.redirectInApp );
      }
    });
  });
})( window.Polymer );
