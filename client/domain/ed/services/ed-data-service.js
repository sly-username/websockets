/*jshint strict: false*/
// jscs:disable requirePaddingNewLinesInObjects

import promisedDB from "domain/lib/storage/PromisedDB/promisedDB";

import edProfileDB from "domain/ed/storage/pdbs/profileDB";
import edTrackDB from "domain/ed/storage/pdbs/trackDB";

import EDLRUCache from "domain/ed/storage/EDLRUCache";
import EDDataSyncController from "domain/ed/storage/EDDataSyncController";

import EDArtist from "domain/ed/objects/profile/EDArtist";
import EDFan from "domain/ed/objects/profile/EDFan";
import EDTrack from "domain/ed/objects/media/EDTrack";

import connectionService from "domain/ed/services/ed-connection-service";

var
  dataService = {},
  syncControllers = {},
  pdbMap = {},
  lruMap = {
    profile: new EDLRUCache( 250 ),
    track: new EDLRUCache( 300 )
  };

// Setup Profile DB
edProfileDB.then( profileDB => {
  pdbMap.profile = profileDB;
  syncControllers.profile =
    new EDDataSyncController(
      profileDB,
      lruMap.profile,
      function( data ) {
        switch ( data.type ) {
          case "artist":
            return new EDArtist( data );
          case "fan":
            return new EDFan( data );
          default:
            break;
        }

        return data;
      }
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
    );
});

dataService.getByTypeAndId = function( type, id, priority=1 ) {

  connectionService.request( route, priority,  )
  return Promise.resolve({ type, id });
};

dataService.getArtistById = function( id ) {
  return dataService.getByTypeAndId( EDArtist.TYPE, id );
};

dataService.getFanById = function( id ) {
  return dataService.getByTypeAndId( EDFan.TYPE, id );
};


// TODO REMOVE DEBUG
dataService.lruMap = lruMap;
dataService.pdbMap = pdbMap;

window.promisedDB = promisedDB;
window.edDataService = dataService;

export default dataService;
