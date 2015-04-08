/*
promisedDB.open( "testing-track-db", 1, [
  {
    storeName: {
      options: {
        keyPath: "id",
        autoIncrement: false
      },
      indexes: {
        type: [ "type", {
          unique: false,
          multiEntry: false
        }],
        userId: [ "userId", {
          unique: false,
          multiEntry: false
        }],
        profileId: [ "profileId", {
          unique: false,
          multiEntry: false
        }]
      }
    }
  }
]);
*/

var indexedDB = window.indexedDB ||
      window.webkitIndexedDB ||
      window.mozIndexedDB ||
      window.msIndexedDB,
  createObjectStoreInDB,
  createIndexOnObjectStore;

class PromisedDB {
  constructor( name, version, config ) {}
}

export default {
  open( name, version, config ) {
    var openRequest = indexedDB.open( name, version ),
      idb;

    openRequest.onupgradeneeded = function( upgradeEvent ) {
      console.log( "onupgradeneeded happened, %o %d %o", name, version, config );
      idb = upgradeEvent.target.result;

      // Iterates over the config array, index+1 == version number
      config.forEach(function( storeConfig, index ) {
        if ( version > index + 1 ) {
          // Skip set up for this config
          return;
        }

        // Iterates over store configuration, getting each store name
        Object.keys( storeConfig ).forEach(function( storeName ) {
          var currentStore = idb.createObjectStore( storeName, storeConfig[ storeName ].options || null );

          // Iterates over this store's index configuration, getting each index name
          Object.keys( storeConfig[ storeName ].indexes || {} ).forEach(function( indexName ) {
            console.log( currentStore.name + " " + indexName );
            console.dir( [ indexName ].concat( storeConfig[ storeName ].indexes[ indexName ] ));
            currentStore.createIndex.apply( currentStore, [ indexName ].concat( storeConfig[ storeName ].indexes[ indexName ]));
          });
        });
      });
    };






    return Promise.resolve({});
  },
  deleteDatabase( name ) {
    indexedDB.deleteDatabase( name );
  }
};
