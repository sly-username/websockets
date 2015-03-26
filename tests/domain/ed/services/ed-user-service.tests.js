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

        test( "currentUser returns currently logged in EDUser object", function() {
          // test getter
        });

        test( "cannot be set via \"currentUser\" property", function() {
          edUserService.currentUser = "value";
          expect( edUserService )
            .to.have.property( "currentUser" )
            .that.equals( null );
        });
      });

      suite( "isOpenSession", function() {
        test( "isOpenSession default value is false", function() {
          expect( edUserService )
            .to.have.property( "isOpenSession" )
            .that.equals( false );
        });

        test( "isOpenSession returns true if there is a user logged in", function() {
          // test getter
        });

        test( "cannot be set via \"isOpenSession\" property", function() {
          edUserService.isOpenSession = true;
          expect( edUserService )
            .to.have.property( "isOpenSession" )
            .that.is.a( "boolean" )
            .that.equals( false );
        });
      });

      suite( "hasOnboarded", function() {
        test( "hasOnboarded default value is false", function() {
          expect( edUserService )
            .to.have.property( "hasOnboarded" )
            .that.equals( false );
        });

        test( "hasOnboarded returns true if user has already registered", function() {
          // test getter
        });

        test( "cannot be set via \"hasOnboarded\" property", function() {
          edUserService.hasOnboarded = true;
          expect( edUserService )
            .to.have.property( "hasOnboarded" )
            .that.is.a( "boolean" )
            .that.equals( false );
        });
      });
    });

    suite( "Events", function() {
      suite( "edLogin", function() {
        test( "edLogin should fire when login is successful", function( done ) {
        // TODO again how do we show that login was successful?
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

            done();
          });

          edUserService.logout();
        });
      });
    });

    suite( "Methods", function() {
      suite( "login", function() {
        // TODO need to figure out how to make login successful for this test
        suite( "successful login", function() {
          test( "should return user object", function() {
            var json = {
              action: {
                route: "user/login",
                priority: 10
              },
              auth: {
                email,
                password
              }
            },
            userServiceReturn = edUserService.login( json.auth.email, json.auth.password );

            expect( userServiceReturn )
              .to.be.an( "object" );
          });

          test( "", function() {
            var json = {
                action: {
                  route: "user/login",
                  priority: 10
                },
                auth: {
                  email,
                  password
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
                  email,
                  password
                }
              };

            edUserService.login( json.auth.email, json.auth.password );

            expect( edUserService )
              .to.have.property( "isOpenSession" )
              .that.is.a( "boolean" )
              .that.equals( true );
          });
        });

        suite( "unsuccessful login", function() {
          test( "should set currentUser to null", function() {
            var json = {
              action: {
                route: "user/login",
                priority: 10
              },
              auth: {
                email,
                password
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
                email,
                password
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
        test( "when fired, should reset properties to default values", function() {

        });

        test( "returns true on successful logout", function() {

        });

        test( "returns false if user is still logged in", function() {

        });
      });

      suite( "changeProfileImage", function() {
        test( "returns EDUser object with new image information", function() {

        });
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
