import EventEmitter from "domain/lib/event/EventEmitter";
import createEvent from "domain/lib/event/create-event";
import edConnectionService from "domain/ed/services/ed-connection-service";
import EDUser from "domain/ed/objects/EDUser";
import edAnalyticsService from "domain/ed/analytics/edAnalyticsService";

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
  hasOnboarded: {
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
    action: {
      route: "user/login",
      priority: 10
    },
    auth: {
      email,
      password
    }
  };

  return edConnectionService.formattedRequest( json )
    .then( raw => {
      currentUser = new EDUser( raw.auth );
      isOpenSession = true;
      sessionAuthJSON = json;

      edUserService.dispatch( createEvent( "edLogin", {
        detail: {
          user: currentUser
        }
      }));

      edAnalyticsService.send(
        edAnalyticsService.createEvent( "login", {
          timestamp: new Date()
        })
      );

      return currentUser;
    })
    .catch( error => {
      currentUser = null;
      isOpenSession = false;
      throw error;
    });
};

edUserService.logout = function() {
  var json = {
    action: {
      route: "user/logout",
      priority: 10 // TODO what should the value actually be??
    }
  };

  return edConnectionService.formattedRequest( json )
    .then( () => {
      currentUser = null;
      isOpenSession = false;
      sessionAuthJSON = null;

      edUserService.dispatch( createEvent( "edLogout", {
       detail: {
         user: currentUser
       }
      }));

      edAnalyticsService.send(
       edAnalyticsService.createEvent( "logout", {
         timestamp: new Date()
       })
      );

      return true;
    })
    .catch( error => {
      // do nothing
      throw error;
    });
};

export default edUserService;
