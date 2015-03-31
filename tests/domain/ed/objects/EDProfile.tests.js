
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
        test( "EDProfile should have the following properties: 'id', 'userId', 'bio', 'email', 'zipcode', 'displayName', 'modifiedDate', and 'name'",
          function() {
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

            expect( edProfile )
              .to.have.property( "name" );
          });

        suite( "badgesEarned", function() {
          test( "has property badgesEarned", function() {
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
              .to.have.property( "badgesEarned" );
          });

          test( "badgesEarned is an array of badgePair objects", function() {
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

            console.log( edProfile.badgesEarned );

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

            expect( edProfile.badgesEarned )
              .to.be.an( "array" );

          });
        });
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
