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

var
  dbSymbol = Symbol( "internalDB" ),
  objectStoreSymbol = Symbol( "internalObjectStore" ),
  indexedDB,
  createUpgradeHandler,
  createObjectStoreInDB,
  createIndexOnObjectStore;

// Find the right indexedDB reference
indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

// PDBObjectStore wrapping the IDBObjectStore
class PDBObjectStore {
  constructor( idbObjectStore ) {
    Object.defineProperties( this, {
      [dbSymbol]: {
        configurable: false,
        enumerable: false,
        writeable: false,
        value: idbObjectStore.transaction.db
      },
      [objectStoreSymbol]: {
        configurable: false,
        enumerable: false,
        writeable: false,
        value: idbObjectStore
      }
    });

    console.log( "in PDBOjectStore[[construct]] %o", this );
  }

  get indexNames() {
    return this[ objectStoreSymbol ].indexNames;
  }

  get keyPath() {
    return this[ objectStoreSymbol ].keyPath;
  }

  get name() {
    return this[ objectStoreSymbol ].name;
  }

  get transaction() {
    return this[ objectStoreSymbol ].transaction;
  }

  get autoIncrement() {
    return this[ objectStoreSymbol ].autoIncrement;
  }

  add( value, key ) {
    return new Promise(( resolve, reject ) => {
      var request;

      if ( arguments.length === 2 ) {
        request = this[ objectStoreSymbol ].add( value, key );
      } else {
        request = this[ objectStoreSymbol ].add( value );
      }

      request.onsuccess = function( event ) {
        console.log( "add success, %o", event );
        resolve( event.target.result );
      };

      request.onerror = function( event ) {
        reject( event );
      };
    });
  }

  clear() {
    return new Promise(( resolve, reject ) => {
      var request = this[ objectStoreSymbol ].clear();

      request.onsuccess = function( event ) {
        console.log( "clear success, %o", event );
        resolve( event.target.result );
      };

      request.onerror = function( event ) {
        reject( event );
      };
    });
  }

  delete( key ) {
    return new Promise(( resolve, reject ) => {
      var request = this[ objectStoreSymbol ].delete( key );

      request.onsuccess = function( event ) {
        console.log( "delete success, %o", event );
        resolve( event.target.result );
      };

      request.onerror = function( event ) {
        reject( event );
      };
    });
  }

  get( key ) {
    return new Promise(( resolve, reject ) => {
      var request = this[ objectStoreSymbol ].get( key );

      request.onsuccess = function( event ) {
        console.log( "get success, %o", event );
        resolve( event.target.result );
      };

      request.onerror = function( event ) {
        reject( event );
      };
    });
  }

  index( name ) {
    return this[ objectStoreSymbol ].index( name );
  }

  put( value, optionalKey ) {
    return new Promise(( resolve, reject ) => {
      var request;

      if ( arguments.length === 2 ) {
        request = this[ objectStoreSymbol ].put( value, optionalKey );
      } else {
        request = this[ objectStoreSymbol ].put( value );
      }

      request.onsuccess = function( event ) {
        console.log( "put success, %o", event );
        resolve( event.target.result );
      };

      request.onerror = function( event ) {
        reject( event );
      };
    });
  }

  openCursor( range, direction ) {
    return new Promise(( resolve, reject ) => {
      var request = this[ objectStoreSymbol ].openCursor( range, direction );

      request.onsuccess = function( event ) {
        resolve( event.target.result );
      };

      request.onerror = function( event ) {
        reject( event );
      };
    });
  }

  count( range ) {
    var request;

    if ( range != null ) {
      request = this[ objectStoreSymbol ].count( range );
    } else {
      request = this[ objectStoreSymbol ].count();
    }

    request.onsuccess = function( event ) {
      resolve( event.target.result );
    };

    request.onerror = function( event ) {
      reject( event );
    };
  }
}

// Main class for PromisedDB instance
class PromisedDB {
  constructor( db ) {
    Object.defineProperty( this, dbSymbol, {
      configurable: false,
      enumerable: false,
      writeable: false,
      value: db
    });

    Array.from( db.objectStoreNames ).forEach( storeName => {
      Object.defineProperty( this, storeName, {
        configurable: false,
        enumberable: false,
        writeable: false,
        value: new PDBObjectStore(
          db.transaction( storeName, "readwrite" ).objectStore( storeName )
        )
      });
    });
  }

  get name() {
    return this[ dbSymbol ].name;
  }

  get version() {
    return this[ dbSymbol ].version;
  }

  get objectStoreNames() {
    return this[ dbSymbol ].objectStoreNames;
  }

  close() {
    return this[ dbSymbol ].close();
  }
}

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
          console.log( "created index " + currentIndex.name + " on store " + currentObjectStore.name );
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
