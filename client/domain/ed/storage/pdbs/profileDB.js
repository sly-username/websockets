/*jshint strict: false*/
// jscs:disable requirePaddingNewLinesInObjects

import promisedDB from "domain/lib/storage/PromisedDB/promisedDB";

export default promisedDB.open( "profile", 1, [{
  objects: {
    options: {
      keyPath: "id"
    },
    indexes: {
      type: [ "type", { unique: false }],
      userId: [ "userId", { unique: false }]
    }
  }
}]);
