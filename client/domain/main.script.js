(function( window, Promise, indexedDB ) {
  "use strict";

  // TODO REMOVE DEBUG
  // REMOVE DATABASES
  indexedDB.deleteDatabase( "profile" );
  indexedDB.deleteDatabase( "track" );

  Promise.all([
    System.import( "domain/ed/services/ed-data-service" ),
    System.import( "domain/ed/services/ed-connection-service" ),
    System.import( "domain/ed/services/ed-user-service" )
  ]).then( imports => {
    // TODO make polymer component?
    var
      animationWrapper = document.getElementById( "animation-wrapper" ),
      songCard = document.getElementById( "song-card" ),
      router = document.querySelector( "app-router" );

    router.addEventListener( "state-change", function( event ) {
      // TODO add additional routes
      if ( event.detail.path === "/" ) {
        songCard.classList.add( "hidden" );
        animationWrapper.classList.remove( "player-padding" );
      } else {
        songCard.classList.remove( "hidden" );

        if ( !songCard.classList.contains( "hidden" ) && !animationWrapper.classList.contains( "player-padding" )) {
          animationWrapper.classList.add( "player-padding" );
        }
      }
    });

    //need to init manually to ensure event binding
    router.init();

    console.log( "PromisedDB/edDataService Loaded %o", imports );
  })
  .catch( error => {
    console.error( error.message );
    console.error( error.stack );
  });
})( window, window.Promise, window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB );
