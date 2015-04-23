/*jshint strict: false*/

import EventEmitter from "domain/lib/event/EventEmitter";
import createEvent from "domain/lib/event/create-event";
import typeChecker from "domain/ed/objects/model-type-checker";
import edDataService from "domain/ed/services/ed-data-service";
import edConnectionService from "domain/ed/services/ed-connection-service";
import EDUser from "domain/ed/objects/EDUser";
import edAnalyticsService from "domain/analytics/EDAnalytics";

var
  edUserService = new EventEmitter([ "edLogin", "edLogout" ]),
  currentProfile = null,
  currentUser = null,
  isOpenSession = false,
  hasOnboarded = false,
  sessionAuthJSON = null;

Object.defineProperties( edUserService, {
  currentProfile: {
    configurable: false,
    enumerable: false,
    get: function() {
      return currentProfile;
    }
  },
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
  var
    json = {
      auth: {
        email,
        password
      }
    };

  return edConnectionService.authenticateConnection( email, password )
    .then( raw => edDataService.getProfileById( raw ))
    .then( edProfile => {
      currentProfile = edProfile.profileId;
      currentUser = edProfile.userId;
      isOpenSession = true;
      sessionAuthJSON = json;

      edUserService.dispatch( createEvent( "edLogin", {
        detail: {
          user: currentId,
          profile: currentProfile
        }
      }));

      // todo analytics
      // edAnalyticsService.send(
      //  edAnalyticsService.createEvent( "login", {
      //    timestamp: new Date()
      //  })
      // );
      return currentProfile;
    })
    .catch( () => {
      currentProfile = null;
      currentUser = null;
      isOpenSession = false;
      // todo toast messages to user that login failed
      console.log( "this person was unable to login" );
    });
};

edUserService.logout = function() {
  // todo will integrate with settings page
  var oldUser = currentUser,
    oldProfile = currentProfile;

  return edConnectionService.deauthenticateSocket()
    .then( () => {
      currentProfile = null;
      currentUser = null;
      isOpenSession = false;
      sessionAuthJSON = null;

      edUserService.dispatch( createEvent( "edLogout", {
        detail: {
          user: oldUser,
          profile: oldProfile
        }
      }));

      // todo analytics
      // edAnalyticsService.send(
      // edAnalyticsService.createEvent( "logout", {
      //   timestamp: new Date()
      // })
      // );

      return true;
    })
    .catch(() => {
      return false;
    });
};

edUserService.changeProfileImage = function( image ) {
  // todo a lot
  /*
   // send "I'm going to send an image" -- ws.binaryType = "blob";
   send({
   "action":{ route:"profile/image/set" }
   });
   send( image );
   new Promise()
   "onmessage" --> check for a "image upload complete"
   resolve( dataservice.getUserById( currentProfile.id ) )
   */

  // need to match new image to appropriate user
  return Promise.resolve( null );
};

edUserService.referral = function( args ) {
  // todo need to send userId, email
  // todo where do we store how many referrals they have left?
  // todo what information/status codes will we be getting back from the server?
  var data = {
    userId: args.currentUser,
    email: args.email
  };

  return edConnectionService.request( route, priority, data )
    .then( function() {

    });
};

edUserService.register = function( args ) {
  var authBlock = {
    email: args.email,
    password: args.password
  };

  return edConnectionService.request( "user/create", 10, { data: args } )
    .then( response => {
      // validate response
      if ( response && response.status && response.status.code && response.status.code === 1 &&
        typeof response.data.id === "string" ) {
        console.log( "response validated %o", response );

        return response;
      }
    })
    .catch( error => {
      console.log( "Error registering new user in User Service" );
      console.error( error );
      // TODO throw proper error object
      throw error;
    })
    .then( response => {
      return edUserService.login( authBlock.email, authBlock.password );
    });
};

export default edUserService;
