( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDProfile", function() {
    var EDProfile;

    this.timeout( 5000 );

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
        test( "EDProfile should have the following properties:", function() {
          var args = {},
            edProfile = new EDProfile( args );

          expect( edProfile )
            .to.have.property( "id" );

          expect( edProfile )
            .to.have.property( "userId" );

          expect( edProfile )
            .to.have.property( "bio" );

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
        });
      });

      suite( "BadgesEarned", function() {
        test( "has property badgesEarned, which is an array", function() {
          var args = {
              badgesEarned: [
                {
                  BadgePair: {
                    badgeId: 1,
                    dataAcquired: Date
                  }
                },
                {
                  BadgePair: {
                    badgeId: 2,
                    dataAcquired: Date
                  }
                }
              ]
            },
            edProfile = new EDProfile( args );

          expect( edProfile )
            .to.have.property( "badgesEarned" )
            .that.is.an( "array" );
        });

        test( "badgesEarned is an array of badgePairs", function() {
          var args = {
              badgesEarned: [
                {
                  BadgePair: {
                    badgeId: 1,
                    dataAcquired: Date
                  }
                }
              ]
            },
            edProfile = new EDProfile( args );

          expect( edProfile )
            .to.have.property( "badgesEarned" )
            .that.deep.equals([
              {
                BadgePair: {
                  badgeId: 1,
                  dataAcquired: Date
                }
              }
            ]);
        });
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
