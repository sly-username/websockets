( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDUserService", function() {
    var edUserService, EventEmitter, createEvent;

    suiteSetup( function( done ) {
      Promise.all([
        System.import( "domain/ed/services/ed-user-service" ),
        System.import( "domain/lib/event/EventEmitter" ),
        System.import( "domain/lib/event/create-event" )
      ])
        .then( function( imported ) {
          edUserService = imported[0].default;
          EventEmitter = imported[1].default;
          createEvent = imported[2].default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'user-service' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

// Tests begin
    suite( "Properties", function() {
      suite( "currentUser", function() {
        test( "currentUser default value is null", function() {
          expect( edUserService )
            .to.have.property( "currentUser" )
            .that.equals( null );
        });

        test( "cannot be set via \"currentUser\" property", function() {
          var setCurrentUser = function() {
            edUserService.currentUser = "value";
          };
          expect( setCurrentUser )
            .to.throw( TypeError );
        });
      });

      suite( "isOpenSession", function() {
        test( "isOpenSession default value is false", function() {
          expect( edUserService )
            .to.have.property( "isOpenSession" )
            .that.equals( false );
        });

        test( "cannot be set via \"isOpenSession\" property", function() {
          var setOpenSession = function() {
            edUserService.isOpenSession = true;
          };
          expect( setOpenSession )
            .to.throw( TypeError );
        });
      });

      suite( "hasOnboarded", function() {
        test( "hasOnboarded default value is false", function() {
          expect( edUserService )
            .to.have.property( "hasOnboarded" )
            .that.equals( false );
        });

        test( "hasOnboarded returns true after user registers", function() {
          // TODO need to wait until connection service is created
          edUserService.register();

          expect( edUserService )
            .to.have.property( "hasOnboarded" )
            .that.equals( true );
        });

        test( "cannot be set via \"hasOnboarded\" property", function() {
          var setOnboarded = function() {
            edUserService.hasOnboarded = true;
          };

          expect( setOnboarded )
            .to.throw( TypeError );
        });
      });
    });

    suite( "Events", function() {
      suite( "edLogin", function() {
        test( "edLogin should fire when login is successful", function( done ) {
        // TODO how do we show that login was successful?
          edUserService.on( "edLogin", function( event ) {
            expect( event )
              .to.be.an.instanceof( CustomEvent )
              .to.have.property( "type", "edLogin" );

            expect( event )
              .to.have.property( "detail" )
              .to.deep.equal( {
                user: currentUser
              });

            done();
          });

          edUserService.login( "email", "password" );
        });
      });

      suite( "edLogout", function() {
        test( "edLogout should fire when user successfully logs out", function( done ) {
          edUserService.on( "edLogout", function( event ) {
            expect( event )
              .to.be.an.instanceof( CustomEvent )
              .to.have.property( "type", "edLogout" );

            expect( event )
              .to.have.property( "detail" )
              .to.deep.equal( {
                user: null
              });

            done();
          });

          edUserService.logout();
        });
      });
    });

    suite( "Methods", function() {
      suite( "login", function() {
        // TODO need to figure out how to make login successful for this test
        suite( "on a successful login", function() {
          test( "should return user object", function() {
            var json = {
              action: {
                route: "user/login",
                priority: 10
              },
              auth: {
                email: "email",
                password: "password"
              }
            },
            userServiceReturn = edUserService.login( json.auth.email, json.auth.password );

            expect( userServiceReturn )
              .to.be.an( "object" );
          });

          test( "sessionAuthJSON property should store authentication information", function() {
            var json = {
                action: {
                  route: "user/login",
                  priority: 10
                },
                auth: {
                  email: "email",
                  password: "password"
                }
              };

            edUserService.login( json.auth.email, json.auth.password );

            expect( edUserService )
              .to.have.property( "sessionAuthJSON" )
              .that.equals( json );
          });

          test( "\"isOpen\" property should be set to true", function() {
            var json = {
                action: {
                  route: "user/login",
                  priority: 10
                },
                auth: {
                  email: "email",
                  password: "password"
                }
              };

            edUserService.login( json.auth.email, json.auth.password );

            expect( edUserService )
              .to.have.property( "isOpenSession" )
              .that.is.a( "boolean" )
              .that.equals( true );
          });
        });

        suite( "when login is not successful", function() {
          test( "should set currentUser to null", function() {
            var json = {
              action: {
                route: "user/login",
                priority: 10
              },
              auth: {
                email: "email",
                password: "password"
              }
            };

            edUserService.login( json.auth.email, json.auth.password );

            expect( edUserService )
              .to.have.property( "currentUser" )
              .that.equals( null );
          });

          test( "should set isOpenSession to false", function() {
            var json = {
              action: {
                route: "user/login",
                priority: 10
              },
              auth: {
                email: "email",
                password: "password"
              }
            };

            edUserService.login( json.auth.email, json.auth.password );

            expect( edUserService )
              .to.have.property( "isOpenSession" )
              .that.is.a( "boolean" )
              .that.equals( false );
          });

          test( "should throw an error", function() {

          });
        });
      });

      suite( "logout", function() {
        suite( "on successful logout", function() {
          test( "should reset properties to default values", function() {
            edUserService.logout();

            expect( edUserService )
              .to.have.property( "isOpenSession" )
              .that.is.a( "boolean" )
              .that.equals( false );

            expect( edUserService )
              .to.have.property( "currentUser" )
              .that.equals( null );

            expect( edUserService )
              .to.have.property( "sessionAuthJSON" )
              .that.equals( null );
          });

          test( "returns true", function() {
            var edLogoutReturn = edUserService.logout();

            expect( edLogoutReturn )
              .to.equal( true );
          });
        });

        suite( "when logout is not successful", function() {
          test( "returns false", function() {
            var edLogoutReturn = edUserService.logout();

            expect( edLogoutReturn )
              .to.equal( false );
          });
        });
      });

      // TODO will come back to this when we figure out how we're going to do file uploads and such
      suite.skip( "changeProfileImage", function() {
        test( "sends image file", function() {
          var image = "fjsldkfjsdlkfj"; /* not sure what form this will take */

          edUserService.changeProfileImage( image );

          expect( image )
            .to.be.instanceof( "File" ); /* or do we test instanceof Blob */
            // will it always be instance of file and/or blob?
        });

        test( "returns EDUser object with new image information", function() {
          // is this test even needed?
          var image = "fjsldkfjsdlkfj";

          edUserService.changeProfileImage( image );

          expect( edUserService.changeProfileImage )
            .to.equal( /* whatever was returned - however the image data is supposed to be formatted */ );
        });

        test( "returns EDUser object with updated image information", function() {
          // needs to match the updated image info to the correct user id
          var image = "fjsldkfjsdlkfj";

          edUserService.changeProfileImage( image );
        });
      });

      suite( "register", function() {
        // TODO need to wait until connection service is coded
        test( "if successful, returns true", function() {
          // how does the test know if it was successful / promise fulfilled?
          edUserService.register();

          expect( edUserService.register )
            .to.equal( true );
        });

        test( "if unsuccessful, will reject with proper error object", function() {
          // how do i tell the test that it failed?
          edUserService.register();

          expect( edUserService.register )
            .to.throw( Error );

          // TODO do we need to be more specific about the error in this test?
        });
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
