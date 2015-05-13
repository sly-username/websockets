/*jshint strict: false*/

import EventEmitter from "domain/lib/event/EventEmitter";
import createEvent from "domain/lib/event/create-event";
import typeChecker from "domain/ed/objects/model-type-checker";
import { default as edDataService, updateModel } from "domain/ed/services/ed-data-service";
import edConnectionService from "domain/ed/services/ed-connection-service";
import EDUser from "domain/ed/objects/EDUser";
import EDFan from "domain/ed/objects/profile/EDFan"
import edAnalytics from "domain/ed/analytics/ed-analytics-service";

var
  edUserService = new EventEmitter([ "edLogin", "edLogout" ]),
  currentProfile = null,
  currentUserId = null,
  isOpenSession = false,
  hasOnboarded = false,
  sessionAuthJSON = null,
  loggedInDate = null,
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
  // todo should we keep this flag?
  // todo since we're using whether they have a currentProfileBlend as indication of onboarding
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
  },
  sessionDuration: {
    configurable: false,
    enumberable: false,
    get: function() {
      var now = new Date();

      if ( loggedInDate == null ) {
        return 0;
      }

      return now - loggedInDate;
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
    })
    .catch( error => {
      console.log( "the user has no referrals remaining" );
      referralsRemaining = 0;
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
      loggedInDate = new Date();

      edUserService.dispatch( createEvent( "edLogin", {
        detail: {
          userId: currentUserId,
          profile: currentProfile
        }
      }));

      // analytics
      edAnalytics.send( "login", {
        time: ( new Date() ).toISOString()
      });

      edUserService.getReferrals();

      return currentProfile;
    })
    .catch(( error ) => {
      console.error( error.stack );
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
      loggedInDate = null;
      referralsRemaining = 0;

      edUserService.dispatch( createEvent( "edLogout", {
        detail: {
          userId: oldUserId,
          profile: oldProfile
        }
      }));

      edAnalytics.send( "logout", {
        time: ( new Date() ).toISOString()
      });

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
  var json = {
    data: {
      // todo
      //userId: currentUserId,
      userId: parseInt( currentUserId, 10 ),
      email
    }
  };

  // todo need to prevent submitting when there are no referrals left
  return edConnectionService.request( "referral/create", 10, json )
    .then( response => {
      if ( response && response.status && response.status.code && response.status.code === 1 ) {

        edAnalytics.send( "invite", {
          // todo doesn't return invite code that is created by server
          code: response.data.inviteCode,
          recipient: response.data.email
        });

        referralsRemaining = response.data.referralsRemaining;
        return referralsRemaining;
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

        edAnalytics.send( "register", {
          code: response.data.inviteCode
        });

        return response;
      }

      if ( response && response.status && response.status.code && response.status.code === 10 ) {
        console.log( "response on error", response );
        let tError = new TypeError( "Problem with Registration" );
        tError.invalidFields = response.meta.invalidFields;
        throw tError;
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

edUserService.requestPasswordReset = function( email ) {
  var json = {
    data: {
      email
    }
  };

  return edConnectionService.request( "user/password/get", 10, json )
    .then( response => {
      return response;
    })
    .catch( error => {
      console.log( "forgot password email was not successfully sent" );
      console.log( error );
      throw error;
    });
};

edUserService.resetPassword = function( resetCode, password ) {
  var json = {
    data: {
      resetCode,
      password
    }
  };

  return edConnectionService.request( "user/password/set", 10, json )
    .then( response => {
      if ( response && response.status && response.status.code && response.status.code === 2 ) {
        console.log( "sucessful password/set", response );
        return response;
      }

      // TODO the code for this will be 11
      if ( response && response.status && response.status.code && response.status.code === 10 ) {
        let resetError = new TypeError( "Problem with Reseting the Password" );
        resetError = response.status.code;
        throw resetError;
      }
    })
    .catch( error => {
      console.log( "new password was not successfully sent" );
      console.log( error );
      throw error;
    });
};

edUserService.editProfile = function( args ) {
  var json = {};

  json.data = Object.assign({
    id: currentProfile == null ? null : currentProfile.id
  }, args );

  return edConnectionService.request( "profile/set", 10, json )
    .then( response => {
      return updateModel( response );
    })
    .catch( error => {
      console.warn( "profile update was not successfully sent" );
      console.error( error.stack );
      throw error;
    });
};

edUserService.getStats = function() {
  return edConnectionService.request( "user/stats/get", 10 )
    .then( response => {
      return response.data.stats;
    })
    .catch( error => {
      console.warn( "error retrieving user stats in user service" );
      console.log( error );
      throw error;
    });
};

export default edUserService;
