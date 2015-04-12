/*jshint strict: false*/
// jscs:disable requirePaddingNewLinesInObjects

import promisedDB from "domain/lib/storage/PromisedDB/promisedDB";

import edProfileDB from "domain/ed/storage/db/ed-profile-db";
import edTrackDB from "domain/ed/storage/db/ed-track-db";

import EDLRUCache from "domain/ed/storage/EDLRUCache";

import EDDataSyncController from "domain/ed/storage/EDDataSyncController";

import EDArtist from "domain/ed/objects/profile/EDArtist";
import EDFan from "domain/ed/objects/profile/EDFan";

import EDTrack from "domain/ed/objects/media/EDTrack";

var dataService = {},
  profileSyncCtrl,
  trackSyncCtrl,
  profileLRU = new EDLRUCache( 100 ),
  trackLRU = new EDLRUCache( 100 );


edProfileDB.then( profileDB => {
  dataService.profileDB = profileDB;
  profileSyncCtrl = new EDDataSyncController( profileDB, profileLRU, function( data ) {
    if ( data.type === "artist" ) {
      return new EDArtist( data );
    } else if ( data.type === "fan" ) {
      return new EDFan( data );
    }

    return data;
  });
});

edTrackDB.then( trackDB => {
  dataService.trackDB = trackDB;
  trackSyncCtrl = new EDDataSyncController( trackDB, trackLRU, data => new EDTrack( data ));
});

// TODO REMOVE DEBUG
window.promisedDB = promisedDB;
window.edDataService = dataService;
dataService.profileLRU = profileLRU;
dataService.trackLRU = trackLRU;

export default dataService;
