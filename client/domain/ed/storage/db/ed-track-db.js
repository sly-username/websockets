/*jshint strict: false*/
// jscs:disable requirePaddingNewLinesInObjects

import PromisedDB from "domain/lib/storage/promised-db/PromisedDB";

// TODO UPDATE!
export default new PromisedDB( "track", 1, function( event ) {
  var objStore = this.createObjectStore( "objects", { keyPath: "id" });

  // create indexes
  objStore.createIndex( "type", "type", { unique: false });
  objStore.createIndex( "userId", "userId", { unique: false });
  objStore.createIndex( "profileId", "profileId", { unique: false });
});
