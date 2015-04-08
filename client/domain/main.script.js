(function( window, Promise ) {
  // TODO REMOVE DEBUG
  // REMOVE DATABASES
  indexedDB.deleteDatabase( "profile" );
  indexedDB.deleteDatabase( "track" );

  Promise.all(
    System.import( "domain/ed/services/ed-data-service" ),
    System.import( "domain/lib/storage/promised-db/PromisedDB" )
  ).then( imports => {
    console.log( "PromisedDB/edDataService Loaded" );
  })
  .catch( error => {
    console.error( error.message );
    console.error( error.stack );
  });
})( window, window.Promise );
