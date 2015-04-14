import EventEmitter from "domain/lib/event/EventEmitter";
import createEvent from "domain/lib/event/create-event";
import edDataService from "domain/ed/services/ed-data-service";
import edConnectionService from "domain/ed/services/ed-connection-service";
import EDUser from "domain/ed/objects/EDUser";
//import edAnalyticsService from "domain/analytics/EDAnalytics";

var edUserService = new EventEmitter([ "edLogin", "edLogout" ]),
  currentUser = null,
  isOpenSession = false,
  hasOnboarded = false,
  sessionAuthJSON = null;

Object.defineProperties( edUserService, {
  currentUser: {
    configurable: false,
    enumerable: false,
    get: function() {
      return currentUser;
    }
  },
  isOpenSession: {
    configurable: false,
    enumerable: false,
    get: function() {
      return isOpenSession;
    }
  },
  hasOnboarded: { // TODO determine if this flag is needed
    configurable: false,
    enumerable: false,
    get: function() {
      return hasOnboarded;
    }
  },
  sessionAuthJSON: {
    configurable: false,
    enumerable: false,
    get: function() {
      return sessionAuthJSON;
    }
  }
});

edUserService.login = function( email, password ) {
  var json = {
    auth: {
      email,
      password
    }
  };

  return edConnectionService.authenticateConnection( email, password )
    .then( raw => {
      console.log( "raw", raw );
      edDataService.getByTypeAndId( "user", raw.profileId )
        .then( userResponse => {
          console.log( userResponse );
          currentUser = userResponse;
          isOpenSession = true;
          sessionAuthJSON = json;

          edUserService.dispatch( createEvent( "edLogin", {
            detail: {
              user: currentUser
            }
          }));

          //edAnalyticsService.send(
          //  edAnalyticsService.createEvent( "login", {
          //    timestamp: new Date()
          //  })
          //);

          return currentUser;
        });
    })
    .catch( error => {
      currentUser = null;
      isOpenSession = false;
      throw error;
      // TODO if error messages are needed, ex: toasts
    });
};

edUserService.logout = function() {
  var oldUser = currentUser;

  return edConnectionService.deauthenticateSocket()
    .then( () => {
      currentUser = null;
      isOpenSession = false;
      sessionAuthJSON = null;

      edUserService.dispatch( createEvent( "edLogout", {
       detail: {
         user: oldUser
       }
      }));

      //edAnalyticsService.send(
      // edAnalyticsService.createEvent( "logout", {
      //   timestamp: new Date()
      // })
      //);

      return true;
    })
    .catch( () => {
      return false;
    });
};

edUserService.changeProfileImage = function( image ) {
  /*
  // send "I'm going to send an image" -- ws.binaryType = "blob";
  send({
    "action":{ route:"profile/image/set" }
  });
  send( image );
  new Promise()
    "onmessage" --> check for a "image upload complete"
    resolve( dataservice.getUserById( currentUser.id ) )
  */

  // need to match new image to appropriate user
};

edUserService.register = function( args ) {
  return edConnectionService.request( args )
    .then( () => {
      hasOnboarded = true;
      return true;
    })
    .catch( error => {
      hasOnboarded = false;
      throw error;
      // TODO throw proper error object
    });
};

export default edUserService;
