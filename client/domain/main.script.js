(function( window, Promise ) {
  "use strict";

  var
    hidePlayerRoutes = [
      "/",
      "/login",
      "/register",
      "/registration"
    ],
    needToHidePlayerForRoute = function( route ) {
      return hidePlayerRoutes.some( hideRoute => {
        return hideRoute === route;
      });
    };

  window.addEventListener( "polymer-ready", function( readyEvent ) {
    Promise.all([
      System.import( "domain/ed/services/ed-data-service" ),
      System.import( "domain/ed/services/ed-connection-service" ),
      System.import( "domain/ed/services/ed-user-service" ),
      System.import( "domain/ed/services/ed-player-service" ),
      System.import( "domain/ed/analytics/ed-analytics-service" ),
      System.import( "domain/ed/cordova/ed-admob" )
    ])
      .then( imports => {
        var
          loginData,
          // destructing the default imports to their associated name
          [
            dataService,
            connectionService,
            userService,
            playerService,
            analyticsService,
            edAdMob
          ] = imports.map( imported => imported.default ),
          animationWrapper = document.getElementById( "animation-wrapper" ),
          songCard = document.getElementById( "song-card" ),
          router = document.querySelector( "#root-app-router" );

        // Fires before the app router does anything regarding a route change
        // Check if open session, if not, route back to login page
        // This should solve all "in the app but no session" issues
        router.addEventListener( "state-change", function( event ) {
          console.log( "in state-change: %o", event );

          if ( !userService.isOpenSession && !( /\/(login|register|registration|forgot-pass)/i ).test( event.detail.path )) {
            console.log( "no open session, going to login page" );
            event.preventDefault();
            router.go( "/login", {
              replace: true
            });
          }
        });

        // Fires before the new route is imported or rendered, manages song card visibility
        router.addEventListener( "activate-route-start", function( event ) {
          if ( !playerService.isPlaying || needToHidePlayerForRoute( event.detail.path ) ) {
            animationWrapper.classList.remove( "player-padding" );
          } else {
            if ( !animationWrapper.classList.contains( "player-padding" )) {
              animationWrapper.classList.add( "player-padding" );
            }
          }
        });

        // Fires at end of route load and render process, sends analytics "routeRequest" event
        router.addEventListener( "activate-route-end", function( event ) {
          // remove "router" from event model since is causes a circular reference
          // which throws an error during JSON serialization
          var
            params = Object.keys( event.detail.model )
              .reduce(function( accumulator, key ) {
                if ( key !== "router" ) {
                  accumulator[ key ] = event.detail.model[ key ];
                }

                return accumulator;
              }, {});

          analyticsService.send( "routeRequest", {
            route: event.detail.path,
            params
          });
        });

        // need to init manually to ensure event binding
        router.init();

        if ( localStorage ) {
          loginData = localStorage.getItem( "edLoginInfo" );

          if ( loginData ) {
            loginData = JSON.parse( loginData );

            if ( loginData.password && loginData.email ) {
              userService.login( loginData.email, loginData.password )
                .then(function() {
                  if ( userService.hasOnboarded ) {
                    router.go( "/discover", {
                      replace: true
                    });
                  } else {
                    router.go( "/onboarding/like", {
                      replace: true
                    });
                  }
                })
                .catch(function() {
                  localStorage.removeItem( "edLoginInfo" );
                  router.go( "/login" );
                });
            }
          }
        }
      })
      .catch( error => {
        console.error( "Problem in main script: " + error.message );
        console.error( error.stack );
      });
  });
})( window, window.Promise );
