(function( window, Promise, indexedDB ) {
  "use strict";

  // TODO REMOVE DEBUG
  // REMOVE DATABASES
  indexedDB.deleteDatabase( "profile" );
  indexedDB.deleteDatabase( "track" );

  Promise.all([
    System.import( "domain/ed/services/ed-data-service" ),
    System.import( "domain/ed/services/ed-connection-service" )
  ]).then( imports => {
    console.log( "PromisedDB/edDataService Loaded %o", imports );
    imports[1].default.authenticateConnection( "intdev@eardish.com", "intdevpass" );
  })
  .catch( error => {
    console.error( error.message );
    console.error( error.stack );
  });
})( window, window.Promise, window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB );
