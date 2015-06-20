(function() {
  var edUserService;

  Promise.all([
    System.import( "domain/ed/services/ed-user-service" )
  ])
    .then(function( imported ) {
      edUserService = imported[ 0 ].default;

      return edUserService.restoreSession();
    })
    .then(function() {
      console.log( "Session Restored!" );

      return Promise.race([
        polymerReadyPromise,
        deviceReadyPromise
      ]);
    })
    .then(function() {
      var router = document.getElementById( "root-app-router" );

      // MAKE THEM ONBOARD!
      if ( !edUserService.hasOnboarded && router ) {
        router.go( "/onboarding/like", {
          replace: true
        });
      }
    })
    .catch(function( error ) {
      var router = document.getElementById( "root-app-router" );

      if ( router ) {
        router.go( "/login" );
      }

      console.warn( "Issue trying to restore session: " + error.message );
      console.error( error.stack );
    });
})();
