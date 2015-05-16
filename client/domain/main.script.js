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
      System.import( "domain/ed/analytics/ed-analytics-service" )
    ])
      .then( imports => {
        var
          [
            dataService,
            connectionService,
            userService,
            playerService,
            analyticsService
          ] = imports.map( imported => imported.default ),
          animationWrapper = document.getElementById( "animation-wrapper" ),
          songCard = document.getElementById( "song-card" ),
          router = document.querySelector( "#root-app-router" );

        router.addEventListener( "state-change", function( event ) {
          console.log( "in state-change event: %o", event.detail );

          if ( !playerService.isPlaying || needToHidePlayerForRoute( event.detail.path ) ) {
            animationWrapper.classList.remove( "player-padding" );
          } else {
            if ( !animationWrapper.classList.contains( "player-padding" )) {
              animationWrapper.classList.add( "player-padding" );
            }
          }
        });

        router.addEventListener( "activate-route-end", function( event ) {
          // remove "router" from event model since is causes a circular reference
          var
            params = Object.keys( event.detail.model )
              .reduce(function( accumulator, key ) {
                if ( key === "router" ) {
                  return accumulator;
                }

                accumulator[ key ] = event.detail.model[ key ];
                return accumulator;
              }, {});

          analyticsService.send( "routeRequest", {
            route: event.detail.path,
            params
          });
        });

        // need to init manually to ensure event binding
        router.init();
      })
      .catch( error => {
        console.error( "Problem in main script" );
        console.error( error.stack );
      });
  });
})( window, window.Promise );
