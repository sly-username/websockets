var edUserService = new EventEmitter([ "edLogin", "edLogout" ]),
  currentUser = null;

// you then define functions/props on the instance
// something like:
Object.defineProperty( edUserService, "currentUser", {
  configurable: false,
  enumerable: false,
  get: function(){ return currentUser; }
});

Object.defineProperty( edUserService, "isOpenSession", {
  configurable: false,
  enumerable: false,
  get: function(){ return this.isOpenSession; }
});

Object.defineProperty( edUserService, "hasOnboarded", {
  configurable: false,
  enumerable: false,
  get: function(){ return this.hasOnboarded; }
});

// do more work

//export
export default edUserService;


edLogin() {

}

edLogout() {

}

login( email, password ) {
  var edUserLogin  = new Promise (
    function( resolve, reject ) {
      // if logged in, then return EDUser
      return edUser;
    }
  )
}

logout() {
  var edUserLogout = new Promise (
    function( resolve, reject ) {
      return true;
    }
  )
}

