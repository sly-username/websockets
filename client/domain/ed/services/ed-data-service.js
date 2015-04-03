/*jshint strict: false*/
// jscs:disable requirePaddingNewLinesInObjects
import PromisedDB from "domain/lib/storage/PromisedDB/PromisedDB";

var
  dataService = {},
  profileDB = new PromisedDB( "profile", 1, function( event ) {
    var objStore = this.createObjectStore( "objects", { keyPath: "id" });

    var typeIndex = objStore.createIndex( "type", "type", { unique: false });
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

// TODO REMOVE DEBUG
window.edProfileDB = profileDB;
window.edDataService = dataService;
export default dataService;
