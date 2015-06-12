(function() {
  Promise.all([
    System.import( "domain/ed/services/ed-user-service" )
  ])
    .then(function( imported ) {
      var edUserService = imported[ 0 ].default;

      Promise.all([
        edUserService.restoreSession(),
        polymerReadyPromise
      ])
        .then(function() {
          var router = document.getElementById( "root-app-router" );

          // MAKE THEM ONBOARD!
          if ( !edUserService.hasOnboarded ) {
            router.go( "/onboarding/like", {
              replace: true
            });
          }
        })
        .catch(function( error ) {
          console.warn( "Issue trying to restore session: " + error.message );
          console.error( error.stack );

          router.go( "/login" );
        });
    });
})();
