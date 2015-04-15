/*jshint strict: false*/
// jscs:disable requirePaddingNewLinesInObjects

import edProfileDB from "domain/ed/storage/pdbs/profileDB";
import edTrackDB from "domain/ed/storage/pdbs/trackDB";

import EDLRUCache from "domain/ed/storage/EDLRUCache";
import EDDataSyncController from "domain/ed/storage/EDDataSyncController";

import typeChecker from "domain/ed/objects/model-type-checker";

import EDModel from "domain/ed/objects/EDModel";
import EDUser from "domain/ed/objects/EDUser";
import EDProfile from "domain/ed/objects/profile/EDProfile";
import EDArtist from "domain/ed/objects/profile/EDArtist";
import EDFan from "domain/ed/objects/profile/EDFan";
import EDTrack from "domain/ed/objects/media/EDTrack";

import connectionService from "domain/ed/services/ed-connection-service";

// TODO DEBUG
// connectionService.authenticateConnection( "intdev@eardish.com", "intdevpass" );

var
  dataService = {},
  syncControllers = {},
  updateModel,
  pdbMap = {},
  lruMap = {
    profile: new EDLRUCache( 250 ),
    media: new EDLRUCache( 300 )
  },
  getDBAndLRUForType = function( type ) {
    try {
      if ( typeChecker.isProfileType({ type }) ) {
        return {
          lru: lruMap.profile,
          pdb: pdbMap.profile
        };
      } else if ( typeChecker.isMediaType({ type }) ) {
        return {
          lru: lruMap.media,
          pdb: pdbMap.media
        };
      }
    } catch ( error ) {
      console.warn( "Error while type checking" );
      console.error( error );
    }

    return {
      lru: null,
      pdb: null
    };
  },
  // TODO this should be somehwere else, a "routing" module perhaps
  getQueryRouteForType = function( type ) {
    try {
      let objType = { type };

      if ( typeChecker.isProfileType( objType ) ) {
        return "profile/get";
      }

      if ( typeChecker.checkForInstanceOfType( EDTrack.TYPE, objType )) {
        return "track/detail/get";
      }
    } catch ( error ) {
      console.warn( "Error while type checking" );
      console.error( error );
    }

    return "";
  },
  dataSyncTransform = function( data ) {
    // TODO Standardize types
    try {
      if ( typeChecker.hasValidType( data ) ) {
        return new typeChecker.constructorMap[ data.type ]( data );
      }
    } catch ( error ) {
      console.warn( "Error while type checking" );
      console.error( error );
    }

    // fallback to base object
    return new EDModel( data );
  };

// Setup Profile DB
edProfileDB.then( profileDB => {
  pdbMap.profile = profileDB;
  syncControllers.profile =
    new EDDataSyncController(
      profileDB,
      lruMap.profile,
      dataSyncTransform
    );
});

// Setup Track DB
edTrackDB.then( trackDB => {
  pdbMap.media = trackDB;
  syncControllers.track =
    new EDDataSyncController(
      trackDB,
      lruMap.media,
      data => new EDTrack( data )
//      dataSyncTransform
    );
});

// Start Service Functions
dataService.getByTypeAndId = function( type, id, priority=10 ) {
  console.log( "getByTypeAndId %o", arguments );

  var
    route,
    json = {
      data: {
        id
      }
    },
    { pdb, lru } = getDBAndLRUForType( type );

  route = getQueryRouteForType( type );

  if ( route === "" ) {
    return Promise.reject( new TypeError( `Could not find route associated with ${type} in dataService` ) );
  }

  return connectionService.request( route, priority, json)
    .then(function( response ) {
      if ( false && response.status.code ) {
        // todo add check for proper status code
      }

      return pdb.objects.put( response.data );
    })
    .then(function( dbResponse ) {
      console.log( "db response %o", dbResponse );
      return lru.get( id );
    })
    .catch(function( error ) {
      console.log( "Some kind of error in dataService.getByTypeAndId" );
      console.error( error );
      throw error;
    });
};

dataService.getProfileById = function( id, priority=10 ) {
  return dataService.getByTypeAndId( EDProfile.TYPE, id, priority );
};

dataService.getArtistById = function( id, priority=10 ) {
  return dataService.getByTypeAndId( EDArtist.TYPE, id, priority );
};

dataService.getFanById = function( id, priority=10 ) {
  return dataService.getByTypeAndId( EDFan.TYPE, id, priority );
};

dataService.getTrackById = function( id, priority=10 ) {
  return dataService.getByTypeAndId( EDTrack.TYPE, id, priority );
};

updateModel = function( newModel ) {
  var
    json,
    oldModel,
    { pdb, lru } = getDBAndLRUForType( newModel.type );

  if ( !typeChecker.isProfileType( newModel ) && !typeChecker.isMediaType( newModel )) {
    throw new TypeError( "Do not recognize type passed to dataService updateModel function" );
  }

  return pdb.objects.get( newModel.id )
    .then( retrievedModel => {
      oldModel = retrievedModel;
      return pdb.objects.put( newModel );
    })
    .catch( error => {
      console.log( "Error adding model update to DB: " + pdb.name );
      throw error;
    })
    .then(() => {
      // TODO FIGURE OUT WHAT JSON SHOULD BE
      return connectionService.formattedRequest( json );
    })
    .then( response => {
      // todo status check
      if ( response.status && response.status.code ) {
        // all good
        return lru.get( newModel.id );
      }

      // revert model
      return pdb.objects.put( oldModel ).then( id => lru.get( id ) );
    });
};

// TODO REMOVE DEBUG
dataService.lruMap = lruMap;
dataService.pdbMap = pdbMap;
window.edDataService = dataService;

export default dataService;
