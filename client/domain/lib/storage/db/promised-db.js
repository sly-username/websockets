/*jshint strict: false*/

var
  indexedDB,
  createUpgradeHandler,
  createObjectStoreInDB,
  createIndexOnObjectStore;

// Find the right indexedDB reference
indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

import PromisedDB from "domain/lib/storage/db/PromisedDB";

// creates and returns an object store
createObjectStoreInDB = function( indexedDBInstance, storeName, optionalParameters={} ) {
  return indexedDBInstance.createObjectStore( storeName, optionalParameters );
};

// creates and returns an index
createIndexOnObjectStore = function( objectStore, indexName, keyPath, optionalParameters={} ) {
  return objectStore.createIndex( indexName, keyPath, optionalParameters );
};

// Generates a function that is used as the onupgradeneeded event handler
//  for the given config array and version number
createUpgradeHandler = function( currentVersion, configArray ) {
  return function( upgradeEvent ) {
    var idb = upgradeEvent.target.result;

    configArray.forEach(function( storeConfig, index ) {
      // check version
      if ( idb.version > index + 1 ) {
        // skip this version (it is already set up)
        console.log( "%s skipping version %d", idb.name, index + 1 );
        return;
      }

      // Iterate over store configuration, getting each store name
      Object.keys( storeConfig ).forEach(function( storeName ) {
        var currentStoreConfig = storeConfig[ storeName ],
          currentObjectStore =
            createObjectStoreInDB(
              idb,
              storeName,
              currentStoreConfig.options
            );

        // todo remove debug
        console.log( "created store: " + currentObjectStore.name );

        // Iterate over this store's index configuration, getting each index name
        Object.keys( currentStoreConfig.indexes || {} ).forEach(function( indexName ) {
          var indexConfig = currentStoreConfig.indexes[ indexName ],
            currentIndex =
              createIndexOnObjectStore(
                currentObjectStore,
                indexName,
                ...indexConfig
              );

          // todo remove debug
          console.log( `created index ${currentIndex.name} on store ${currentObjectStore.name}` );
        });
      });
    });
  };
};

export default {
  open( name, version, config ) {
    return new Promise(function( resolve, reject ) {
      var openRequest = indexedDB.open( name, version );

      // perform upgrade
      openRequest.onupgradeneeded = createUpgradeHandler( version, config );

      // reject if blocked?
      openRequest.onblocked = function( event ) {
        console.log( name + " version: " + version + " openRequest.onblocked %o", event );
        reject( event );
      };

      // create and resolve on success
      openRequest.onsuccess = function( event ) {
        console.log( name + " version: " + version + " openRequest.onsuccess %o", event );
        resolve( new PromisedDB( event.target.result ) );
      };

      // reject on error
      openRequest.onerror = function( event ) {
        console.warn( name + " version: " + version + " openRequest.onerror %o", event );
        reject( event );
      };
    })
      .catch( error => {
        console.log( "in promisedDB.open new promise catch" );
        console.error( error );
        // TODO?
        return null;
      });
  },
  deleteDatabase( name ) {
    return indexedDB.deleteDatabase( name );
  }
};
