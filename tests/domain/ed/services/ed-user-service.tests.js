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
          // not sure how to write this test.
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
          // not sure how you know if a user is logged in.
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
          // how do we know if a user has already registered?
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
        test( "should fire when login method is called with valid username and password", function() {
          edUserService.login();

          //expect( edUserService )
            //.to.
        });

        test( "should NOT fire when login actions are silently performed by EDWebSocket re-authentication", function() {

        });
      });

      suite( "edLogout", function() {
        test( "should fire when user logs out", function () {

        });
      });
    });

    suite( "Methods", function() {
      suite( "login", function() {
        test( "should store authentication information for EDWebSocket re-authentication", function() {

        });

        test( "should return EDUser object with successful login", function() {

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
