/*jshint strict: false*/
// jscs:disable requirePaddingNewLinesInObjects
import PromisedDB from "domain/lib/storage/promised-db/PromisedDB";
import edProfileDB from "domain/ed/storage/db/ed-profile-db";
import edTrackDB from "domain/ed/storage/db/ed-track-db";

var dataService = {};

/*
var profileDB = new PromisedDB( "profile-test", 1, function( event ) {
  var objStore = this.createObjectStore( "objects", { keyPath: "id" }),
    typeIndex = objStore.createIndex( "type", "type", { unique: false });

  objStore.createIndex( "userId", "userId", { unique: false });

  console.log( "type index: %o", typeIndex );

  objStore.put({
    id: 0,
    type: "profile-artist",
    userId: 1,
    name: "Metallica"
  })
    .success.then( event => {
      console.log( "Metallica Added, event: %o", event );
    });
});
*/

// TODO REMOVE
dataService.profileDB = edProfileDB;
dataService.trackDB = edTrackDB;

// TODO REMOVE DEBUG
window.PromisedDB = PromisedDB;
window.edDataService = dataService;

export default dataService;
