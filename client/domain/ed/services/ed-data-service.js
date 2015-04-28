/*jshint strict: false*/
// jscs:disable requirePaddingNewLinesInObjects

import edProfileDB from "domain/ed/storage/pdbs/profileDB";
import edTrackDB from "domain/ed/storage/pdbs/trackDB";

import EDLRUCache from "domain/ed/storage/EDLRUCache";
import EDDataSyncController from "domain/ed/storage/EDDataSyncController";

import typeChecker from "domain/ed/objects/model-type-checker";

import EDModel from "domain/ed/objects/EDModel";
import EDGenre from "domain/ed/objects/EDGenre";
import EDUser from "domain/ed/objects/EDUser";
import EDProfile from "domain/ed/objects/profile/EDProfile";
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
    media: new EDLRUCache( 300 ),
    genre: new EDLRUCache( 50 )
  },
  dbsReadyPromise = Promise.all([
    edProfileDB,
    edTrackDB
  ]),
  loadGenres,
  getDBAndLRUForType,
  getQueryRouteForType,
  dataSyncTransform;

// Looks up the pdb and lru instances for a given modelType
getDBAndLRUForType = function( modelType ) {
  try {
    let objType = { modelType };

    if ( typeChecker.isProfileType( objType ) ) {
      return {
        lru: lruMap.profile,
        pdb: pdbMap.profile
      };
    }

    if ( typeChecker.isMediaType( objType ) ) {
      return {
        lru: lruMap.media,
        pdb: pdbMap.media
      };
    }

    if ( typeChecker.isGenreType( objType ) ) {
      return {
        lru: lruMap.genre,
        pdb: null
      };
    }
  } catch ( error ) {
    console.warn( "Error while type checking" );
    console.error( error.stack );
  }

  return {
    lru: null,
    pdb: null
  };
};

// TODO this should be somehwere else, a "routing" module perhaps
getQueryRouteForType = function( modelType ) {
  try {
    let objType = { modelType };

    if ( typeChecker.isProfileType( objType ) ) {
      return "profile/get";
    }

    if ( typeChecker.isMediaType( objType )) {
      return "track/get";
    }
  } catch ( error ) {
    console.warn( "Error while type checking" );
    console.error( error.stack );
  }

  return "";
};

dataSyncTransform = function( data ) {
  // TODO Standardize types
  try {
    if ( typeChecker.hasValidType( data ) ) {
      return new typeChecker.constructorMap[ data.modelType ]( data );
    }
  } catch ( error ) {
    console.warn( "Error while type checking" );
    console.error( error.stack );
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

// Populate Genre LRU
loadGenres = function() {
  return connectionService.request( "genre/list", 10 )
    .then(function( response ) {
      if ( response.status && response.status.code === 1 ) {
        response.data.genres.forEach( function( genreData ) {
          // Polyfill type and modelType
          genreData.type = EDGenre.MODEL_TYPE;
          genreData.modelType = EDGenre.MODEL_TYPE;

          lruMap.genre.set( new EDGenre( genreData ) );
        });
        return true;
      }

      throw new TypeError( "genre/list resolved with error status code" );
    })
    .catch( function( error ) {
      console.warn( "There was a problem getting the list of genres" );
      console.error( error.stack );
    });
};

loadGenres();

/* Start Service Functions */
// Main function for getting data object from server
dataService.getByTypeAndId = function( type, id, priority=10 ) {
//  console.log( "getByTypeAndId %o", arguments );
  var
    route,
    json = {
      data: {
        id
      }
    },
    { pdb, lru } = getDBAndLRUForType( type );

  route = getQueryRouteForType( type );

  if ( lru.has( id ) ) {
    console.log( `id: ${id} already found in lru: %o`, lru );
    return Promise.resolve( lru.get( id ) );
  }

  if ( route === "" ) {
    return Promise.reject( new TypeError( `Could not find route associated with ${type} in dataService` ) );
  }

  return dbsReadyPromise.then( dbsLoaded => {
    if ( pdb == null ) {
      console.log( "pdb was not ready when getByType was called, re-setting pdb" );
      pdb = getDBAndLRUForType( type ).pdb;
    }

    return connectionService.request( route, priority, json );
  })
    .then(function( response ) {
      if ( false && response.status.code ) {
        // todo add check for proper status code
      }

      if ( response && response.data && response.meta && response.meta.modelType ) {
        response.data.modelType = response.meta.modelType;
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

// Alias Functions
dataService.getProfileById = function( id, priority=10 ) {
  return dataService.getByTypeAndId( EDProfile.MODEL_TYPE, id, priority );
};

dataService.getArtistById = function( id, priority=10 ) {
  return dataService.getByTypeAndId( EDArtist.MODEL_TYPE, id, priority );
};

dataService.getFanById = function( id, priority=10 ) {
  return dataService.getByTypeAndId( EDFan.MODEL_TYPE, id, priority );
};

dataService.getTrackById = function( id, priority=10 ) {
  return dataService.getByTypeAndId( EDTrack.MODEL_TYPE, id, priority );
};

dataService.getGenreById = function( id, priority=10 ) {
  if ( lruMap.genre.has( id ) ) {
    return Promise.resolve( lruMap.genre.get( id ) );
  }

  return loadGenres().then(function() {
    return lruMap.genres.get( id );
  });
};

dataService.getAllGenres = function() {
  if ( lruMap.genre.size !== 0 ) {
    return Promise.resolve( lruMap.genre.toArray().map( node => node.data ));
  }

  return loadGenres().then(function() {
    return dataService.getAllGenres();
  });
};

updateModel = function( newModel ) {
  var
    json,
    oldModel,
    { pdb, lru } = getDBAndLRUForType( newModel.modelType );

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
