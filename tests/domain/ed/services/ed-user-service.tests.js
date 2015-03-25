( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "userService", function() {
    var userService;

    suiteSetup( function( done ) {
      System.import( "domain/lib/event/user-service" )
        .then( function( imported ) {
                 userService = imported.default;
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

        });

        test( "currentUser returns currently logged in EDUser object", function() {

        });

        test( "cannot be set via \"currentUser\" property", function() {


          userService.currentUser = "value";
          expect( userService )
            .to.have.property( "currentUser" )
            .that.equals( null );
        });
      });


      suite( "isOpenSession", function() {
        test( "isOpenSession default value is false", function() {

        });

        test( "isOpenSession returns true if there is a user logged in", function() {

        });

        test( "cannot be set via \"isOpenSession\" property", function() {


          userService.isOpenSession = true;
          expect( userService )
            .to.have.property( "isOpenSession" )
            .that.is.a( "boolean" )
            .that.equals( false );
        });
      });

      suite( "hasOnboarded", function() {
        test( "hasOnboarded default value is false", function() {

        });

        test( "hasOnboarded returns true if user has already registered", function() {

        });

        test( "cannot be set via \"hasOnboarded\" property", function() {


          userService.hasOnboarded = true;
          expect( userService )
            .to.have.property( "hasOnboarded" )
            .that.is.a( "boolean" )
            .that.equals( false );
        });
      });
    });

    suite( "Events", function() {
      suite( "edLogin", function() {
        test( "should fire when login method is called with valid username and password", function() {

        });

        test( "should NOT fire when login actions are silently performed by EDWebSocket re-authentication", function() {

        });
      });

      suite( "edLogout", function () {
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
