import EventEmitter from "domain/lib/event/EventEmitter";
import createEvent from "domain/lib/event/create-event";

var edUserService = new EventEmitter([ "edLogin", "edLogout" ]),
  currentUser = null,
  isOpenSession = false,
  hasOnboarded = false;

Object.defineProperties( edUserService, {
  currentUser: {
    configurable: false,
    enumerable: false,
    get: function() { return currentUser; },
    set: function( value ) { return currentUser; }
  },
  isOpenSession: {
    configurable: false,
    enumerable: false,
    get: function() { return isOpenSession; },
    set: function( value ) { return isOpenSession; }
  },
  hasOnboarded: {
    configurable: false,
    enumerable: false,
    get: function() { return hasOnboarded; },
    set: function( value ) { return hasOnboarded; }
  }
});

edUserService.login = function( email, password ) {
  var userLoginPromise = new Promise(
    function( resolve, reject ) {
      if ( "logged in" ) {
        resolve( "ok" );
      } else {
        reject( Error( "we were not able to log you in" ) );
      }
    }),
    descriptor = {},
    edLogoutEvent = createEvent( "edLogout", descriptor );

  userLoginPromise.then( function() {
    return EDUser;
  }, function( err ) {
    console.log( err );
  });

  edUserService.dispatch( edLogoutEvent );
};

edUserService.logout = function() {
  var userLogoutPromise = new Promise (
    function( resolve, reject ) {
      if ( "logged out" ) {
        resolve( true );
      } else {
        reject( Error( "please login to logout" ));
      }
    }
  );

  userLogoutPromise.then( function() {
    // return true if successfully logged out
  });
};







export default edUserService;
