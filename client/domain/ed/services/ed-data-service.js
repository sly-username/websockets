/*jshint strict: false*/
// jscs:disable requirePaddingNewLinesInObjects

import promisedDB from "domain/lib/storage/PromisedDB/promisedDB";
// TODO Remove ^^

import edProfileDB from "domain/ed/storage/pdbs/profileDB";
import edTrackDB from "domain/ed/storage/pdbs/trackDB";

import EDLRUCache from "domain/ed/storage/EDLRUCache";
import EDDataSyncController from "domain/ed/storage/EDDataSyncController";

import typeMap from "domain/ed/objects/type-to-constructor";

import EDArtist from "domain/ed/objects/profile/EDArtist";
import EDFan from "domain/ed/objects/profile/EDFan";
import EDTrack from "domain/ed/objects/media/EDTrack";

import connectionService from "domain/ed/services/ed-connection-service";

var
  dataService = {},
  syncControllers = {},
  updateModel,
  pdbMap = {},
  lruMap = {
    profile: new EDLRUCache( 250 ),
    [ EDTrack.TYPE ]: new EDLRUCache( 300 )
  },
  isProfileType = function( type ) {
    switch ( type ) {
      case "profile":
      case EDArtist.TYPE:
      case EDFan.TYPE:
        return true;
      default:
        return false;
    }
  },
  getDBAndLRUForType = function( type ) {
    if ( isProfileType( type ) ) {
      return {
        lru: lruMap.profile,
        pdb: pdbMap.profile
      };
    } else if ( type === EDTrack.TYPE ) {
      return {
        lru: lruMap[ EDTrack.TYPE ],
        pdb: pdbMap[ EDTrack.TYPE ]
      };
    }

    return false;
  },
  dataSyncTransform = function( data ) {
    // TODO Standardize types
    if ( data.type in typeMap ) {
      return new typeMap[ data.type ]( data );
    }

    return data;
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
  pdbMap.track = trackDB;
  syncControllers.track =
    new EDDataSyncController(
      trackDB,
      lruMap.track,
      data => new EDTrack( data )
//      dataSyncTransform
    );
});

// Start Service Functions
dataService.getByTypeAndId = function( type, id, priority=1 ) {
  var
    route = "",
    json = {
      data: {
        id
      }
    },
    { pdb, lru } = getDBAndLRUForType( type );

  switch ( type ) {
    case EDTrack.TYPE:
      route = "track/detail/get";
      break;

    case "profile":
    case EDArtist.TYPE:
    case EDFan.TYPE:
      route = "profile/get";
      break;

    default:
      throw new TypeError( `Unknown route for type: ${type}` );
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

dataService.getArtistById = function( id, priority ) {
  return dataService.getByTypeAndId( EDArtist.TYPE, id, priority );
};

dataService.getFanById = function( id, priority ) {
  return dataService.getByTypeAndId( EDFan.TYPE, id, priority );
};

dataService.getTrackById = function( id, priority ) {
  return dataService.getByTypeAndId( EDTrack.TYPE, id, priority );
};

updateModel = function( type, newModel ) {
  var
    json,
    oldModel,
    { pdb, lru } = getDBAndLRUForType( type );

  if ( !isProfileType( type ) && type !== EDTrack.TYPE ) {
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

window.promisedDB = promisedDB;
window.edDataService = dataService;

export default dataService;
