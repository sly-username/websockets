( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDProfile", function() {
    var EDProfile,
      profileProperties = [
        "id",
        "userId",
        "bio",
        "email",
        "zipcode",
        "displayName",
        "createdDate",
        "modifiedDate",
        "name"
      ];

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
        profileProperties.forEach( function( value ) {
          suite( value, function() {
            test( "should have '" + value + "' property", function() {
              var args = {},
                edProfile = new EDProfile( args );

              expect( edProfile )
                .to.have.property( value );
            });

            test( "should not be able to set '" + value + "' property", function() {
              var args = {},
                inputtedValue = "string value I inputted",
                edProfile = new EDProfile( args ),
                setProperty = function() {
                  edProfile[ value ] = inputtedValue;
                };

              expect( setProperty )
                .to.throw( TypeError );
            });
          });
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

          test( "should not be able to set 'badgesEarned' property", function() {
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
              edProfile = new EDProfile( args ),
              setProperty = function() {
                edProfile.badgesEarned = [
                  {
                    BadgePair: {
                      badgeId: 4,
                      dataAcquired: Date
                    }
                  }
                ];
              };

            expect( setProperty )
              .to.throw( TypeError );
          });
        });
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
