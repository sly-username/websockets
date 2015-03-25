import EventEmitter from "domain/lib/event/EventEmitter";

var edUserService = new EventEmitter([ "edLogin", "edLogout" ]),
  currentUser = null,
  isOpenSession = false,
  hasOnboarded = false;

Object.defineProperties( edUserService, {
  currentUser: {
    configurable: false,
    enumerable: false,
    get: function() { return currentUser; }
  },
  isOpenSession: {
    configurable: false,
    enumerable: false,
    get: function() { return isOpenSession; }
  },
  hasOnboarded: {
    configurable: false,
    enumerable: false,
    get: function() { return hasOnboarded; }
  }
});

// do more work

//export
export default edUserService;

//
//edLogin() {
//
//}
//
//edLogout() {
//
//}
//
//login( email, password ) {
//  var edUserLogin  = new Promise (
//    function( resolve, reject ) {
//      // if logged in, then return EDUser
//      resolve("ok");
//    }
//  ),
//    edLogoutEvent = createEvent( "edLogout", descriptor );
//
//  edUserService.dispatch( edLogoutEvent );
//}
//
//logout() {
//  var edUserLogout = new Promise (
//    function( resolve, reject ) {
//      return true;
//    }
//  )
//}

