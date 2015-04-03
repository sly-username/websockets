/*eslint-env mocha*/
/*global suite, test, console*/
(function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "edConnectionService", function() {
    var edConnectionService;

    suiteSetup(function( done ) {
      System.import( "domain/ed/services/ed-connection-service" )
        .then( function( imported ) {
          edConnectionService = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'edConnectionService' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        }
      );
    });

    // Start Testing
    suite( "edConnectionService creation", function() {
      test( "edConnectionService have appropriate properties", function() {
        expect( edConnectionService.send )
          .to.be.an( "function" );

        expect( edConnectionService.request )
          .to.be.an( "function" );

        expect( edConnectionService.formattedSend )
          .to.be.a( "function" );

        expect( edConnectionService.formattedRequest )
          .to.be.a( "function" );

      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
