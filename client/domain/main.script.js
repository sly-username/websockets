(function( window, Promise ) {
  Promise.all(
    System.import( "domain/ed/services/ed-data-service" ),
    System.import( "domain/lib/storage/PromisedDB/PromisedDB" )
  ).then( imports => {
    console.log( "PromisedDB/edDataService Loaded" );
  })
  .catch( error => {
    console.error( error.message );
    console.error( error.stack );
  });
})( window, window.Promise );
