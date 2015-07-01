(function() {
  var edUserService;

  Promise.all([
    System.import( "domain/ed/services/ed-user-service" )
  ])
    .then(function( imported ) {
      edUserService = imported[ 0 ].default;

      return edUserService.restoreSession();
    })
    .then(function( edProfile ) {
      console.log( "Session Restored!" );
      return edProfile;
    })
    .catch(function( error ) {
      console.warn( "Issue trying to restore session: " + error.message );

      if ( !(/could not restore session/gi).test( error.message )) {
        console.error( error.stack );
      }
    });
})();
