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
  currentUserId = null,
  isOpenSession = false,
  hasOnboarded = false,
  sessionAuthJSON = null,
  referralsRemaining;

Object.defineProperties( edUserService, {
  currentProfile: {
    configurable: false,
    enumerable: false,
    get: function() {
      return currentProfile;
    }
  },
  currentUserId: {
    configurable: false,
    enumerable: false,
    get: function() {
      return currentUserId;
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
  },
  referralsRemaining: {
    configurable: false,
    enumberable: false,
    get: function() {
      return referralsRemaining;
    }
  }
});

// todo remove
window.edUserService = edUserService;

edUserService.getReferrals = function() {
  return edConnectionService.request( "referral/get", 10 )
    .then( response => {
      referralsRemaining = response.data.count;
      return referralsRemaining;
    });
};

edUserService.login = function( email, password ) {
  var
    json = {
      auth: {
        email,
        password
      }
    };

  return edConnectionService.authenticateConnection( email, password )
    .then( raw => {
      currentUserId = raw.userId;
      return edDataService.getProfileById( raw.profileId );
    })
    .then( edProfile => {
      currentProfile = edProfile;
      isOpenSession = true;
      sessionAuthJSON = json;

      edUserService.dispatch( createEvent( "edLogin", {
        detail: {
          userId: currentUserId,
          profile: currentProfile
        }
      }));

      edUserService.getReferrals();
      //console.log( this.referralsRemaining );

      // todo analytics
      // edAnalyticsService.send(
      //  edAnalyticsService.createEvent( "login", {
      //    timestamp: new Date()
      //  })
      // );
      return currentProfile;
    })
    .catch(( error ) => {
      console.error( error );
      currentProfile = null;
      currentUserId = null;
      isOpenSession = false;
      hasOnboarded = false;
      referralsRemaining = 0;
      // todo toast messages to user that login failed
      console.log( "this person was unable to login" );
    });
};

edUserService.logout = function() {
  // todo will integrate with settings page
  var oldUserId = currentUserId,
    oldProfile = currentProfile;

  return edConnectionService.deauthenticateSocket()
    .then( () => {
      currentProfile = null;
      currentUserId = null;
      isOpenSession = false;
      sessionAuthJSON = null;
      referralsRemaining = 0;

      edUserService.dispatch( createEvent( "edLogout", {
        detail: {
          userId: oldUserId,
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
   resolve( dataservice.getUserById( currentProfile ) )
   */

  // need to match new image to appropriate user
  return Promise.resolve( null );
};

edUserService.referral = function( email ) {
  // todo need to send userId, friend's email
  // todo save referral remaining information
  var json = {
    data: {
      // todo
      //userId: currentUserId,
      userId: parseInt( currentUserId, 10 ),
      email
    }
  };

  return edConnectionService.request( "referral/create", 10, json )
    .then( response => {
      console.log( response );
      if ( response && response.status && response.status.code && response.status.code === 1 ) {
        referralsRemaining = response.data.referralsRemaining;
        return referralsRemaining;
        // todo any notifications?36
      }
    })
    .catch( error => {
      console.log( "referral email was not successfully sent" );
      console.log( error );
      throw error;
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
