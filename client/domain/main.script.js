(function( window, Promise, indexedDB ) {
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

  Promise.all([
    System.import( "domain/ed/services/ed-data-service" ),
    System.import( "domain/ed/services/ed-connection-service" ),
    System.import( "domain/ed/services/ed-user-service" ),
    System.import( "domain/ed/services/ed-player-service" )
  ]).then( imports => {
    var
      [
        dataService,
        connectionService,
        userService,
        playerService
      ] = imports.map( imported => imported.default ),
      animationWrapper = document.getElementById( "animation-wrapper" ),
      songCard = document.getElementById( "song-card" ),
      router = document.querySelector( "app-router" );

    router.addEventListener( "state-change", function( event ) {
      console.log( "in state-change event: %o", event.detail );

      if ( !playerService.isPlaying || needToHidePlayerForRoute( event.detail.path ) ) {
        songCard.classList.add( "hidden" );
        animationWrapper.classList.remove( "player-padding" );
      } else {
        songCard.classList.remove( "hidden" );

        if ( !songCard.classList.contains( "hidden" ) && !animationWrapper.classList.contains( "player-padding" )) {
          animationWrapper.classList.add( "player-padding" );
        }
      }
    });

    // need to init manually to ensure event binding
    router.init();
  })
  .catch( error => {
    console.error( "Problem in main script" );
    console.error( error.stack );
  });
})( window, window.Promise, window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB );
