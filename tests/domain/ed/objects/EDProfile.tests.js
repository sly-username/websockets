( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDProfile", function() {
    var EDProfile;

    suiteSetup( function( done ) {
      System.import( "domain/ed/objects/EDProfile" )
        .then( function( imported ) {
          EDProfile = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'EDProfile' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    suite( "EDProfile creation", function() {
      suite( "Properties", function() {
        test( "EDProfile has the properties specified in the constructor", function() {
          var args = {
              badgesEarned: {
                test: null
              }
            },
            edProfile = new EDProfile( args );

          expect( edProfile )
            .to.have.property( "userId" );

          expect( edProfile )
            .to.have.property( "email" );

          expect( edProfile )
            .to.have.property( "zipcode" );

          expect( edProfile )
            .to.have.property( "displayName" );

          expect( edProfile )
            .to.have.property( "createdDate" );

          expect( edProfile )
            .to.have.property( "modifiedDate" );

          expect( edProfile )
            .to.have.property( "badgesEarned" );
        });
      });

      suite( "BadgesEarned", function() {
        test( "badgesEarned is an array", function() {
          var args = {},
            edProfile = new EDProfile( args );

          expect( edProfile )
            .to.have.property( "badgesEarned" )
            .that.is.an( "array" );
        });

        test( "BadgePair is an object", function() {
          var args = {},
            BadgePair = {
              badgeId: 1,
              dataAcquired: Date
            },
            edProfile = new EDProfile( args );

          expect( edProfile )
            .to.have.property( "badgesEarned" )
            .that.deep.equals( "BadgePair" )
            .that.is.an( "object" );
        });
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
