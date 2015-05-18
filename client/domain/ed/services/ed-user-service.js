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

/**
 * @method getReferrals
 */
edUserService.getReferrals = function() {
  return edConnectionService.request( "referral/get", 10 )
    .then( response => {
      referralsRemaining = response.data.referralsRemaining;
      return referralsRemaining;
    })
    .catch( error => {
      console.log( "the user has no referrals remaining" );
      referralsRemaining = 0;
      return referralsRemaining;
    });
};

/**
 * @method login
 */
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
      hasOnboarded = ( raw.onboarded === "t" );
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

      return edUserService.getReferrals()
        .then(function() {
          // analytics
          edAnalytics.send( "login", {
            time: ( new Date() ).toISOString()
          });

          return currentProfile;
        });
    })
    .catch(( error ) => {
      console.error( error.stack );
      currentProfile = null;
      currentUserId = null;
      isOpenSession = false;
      hasOnboarded = false;
      referralsRemaining = 0;
      console.log( "this person was unable to login" );
    });
};

/**
 * @method logout
 */
edUserService.logout = function() {
  // todo will integrate with settings page
  var oldUserId = currentUserId,
    oldProfile = currentProfile;

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

  edConnectionService.deauthenticateSocket();

  return true;
};

/**
 * @method changeProfileImage
 */
edUserService.changeProfileImage = function( image ) {
  return edConnectionService.request( "aws/token/get", 10 )
    .then( awsToken => {
      var
        json,
        s3 = new AWS.S3({
          accessKeyId: awsToken.data.id,
          secretAccessKey: awsToken.data.key,
          region: awsToken.data.region
        });

      return new Promise(function( resolve, reject ) {
        s3.upload({
          Key: "profile/" + currentProfile.id + "/profile/avatar/temp/" + image.name,
          ContentType: image.type,
          Body: image,
          Bucket: "eardish.dev.images",
          CopySource: "eardish.dev.images/" + image.name
        }, function( error, data ) {
          if ( error != null ) {
            console.warn( "Issue uploading image to AWS" );
            reject( error );
            return;
          }

          json = {
            data: {
              profileId: currentProfile.id,
              title: image.name,
              url: data.Location,
              type: "avatar"
            }
          };

          return resolve( edConnectionService.request( "profile/art/create", 10, json ));
        }); // end S3 callbac
      })
      .catch(function( error ) {
        console.warn( "image upload was not successfully completed" );
        console.error( error.stack );
        throw error;
      });
    });
};

/**
 * @method referral
 */
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

/**
 * @method register
 */
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

/**
 * @method requestPasswordReset
 */
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

/**
 * @method resetPassword
 */
edUserService.resetPassword = function( resetCode, password ) {
  var json = {
    data: {
      resetCode,
      password
    }
  };

  return edConnectionService.request( "user/password/set", 10, json )
    .then( response => {
      if ( response && response.status && response.status.code && response.status.code === 1 ) {
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
      console.log( "new password was not successfully set" );
      console.log( error );
      throw error;
    })
    .then( response => {
      return edUserService.login( response.data.email, json.data.password );
    });
};

/**
 * @method editProfile
 */
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

/**
 * @method getStats
 */
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
