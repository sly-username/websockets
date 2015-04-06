/*jshint strict:false */
// jscs:disable requirePaddingNewLinesInObjects
var indexedDB = window.indexedDB ||
      window.webkitIndexedDB ||
      window.mozIndexedDB ||
      window.msIndexedDB,
  IDBTransaction = window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.msIDBTransaction,
  IDBKeyRange = window.IDBKeyRange ||
    window.webkitIDBKeyRange ||
    window.msIDBKeyRange,
  db = Symbol( "db" );

if ( !indexedDB ) {
  throw new Error( "This Environment doesn't support IndexedDB" );
}

import PDBObjectStore from "/PDBObjectStore";
import PDBOpenDBRequest from "/PDBOpenDBRequest";

/********
TODOs
********/

// todo export default
class PromisedDB {
  constructor( dbName, versionNumber, onUpgradeNeeded=function() {} ) {
    var openRequest = new PDBOpenDBRequest( indexedDB.open( dbName, versionNumber ), this);

    openRequest.upgradeNeeded
      .then(
        event => {
          console.log( "on upgrade needed: %o", event );
          this[ db ] = event.target.result;
          onUpgradeNeeded.call( this, event );
          return event;
        },
        event => {
          // todo handle onblocked?
          console.warn( `The indexedDB "${dbName}" is currently in use and cannot be upgraded` );
          return Promise.reject( event );
        }
      );

    Object.defineProperties( this, {
      openedPromise: {
        configurable: false,
        enumerable: false,
        writeable: false,
        value: openRequest.success.then( event => {
          this[ db ] = event.target.result;
          return event;
        })
      }
    });
  }

  // todo remove?
  get originalDB() {
    return this[ db ];
  }

  get objectStoreNames() {
    return this[ db ].objectStoreNames;
  }

  close() {
    return this[ db ].close();
  }

  createObjectStore( name, parameters={ autoIncrement: false } ) {
    return new PDBObjectStore( this[ db ].createObjectStore( name, parameters ) );
  }

  deleteObjectStore(){}

  transaction( objectStores, access ) {
    // TODO Wrap in PDBTransaction?
    return this[ db ].transaction( objectStores, access );
  }

  deleteDatabase() {
    return new Promise(( resolve, reject ) => {
      var deleteRequest = indexedDB.deleteDatabase( this[ db ].name );

//      deleteRequest.onsuccess = resolve;
      deleteRequest.onsuccess = function( event ) {
        console.log( "should resolve" );
        resolve( event );
      };

//      deleteRequest.onerror = reject;
      deleteRequest.onerror = function( event ) {
        console.log( "should reject" );
        reject( event );
      };

      this.close();
    });
  }
}

// TODO DEBUG REMOVE
window.PromisedDB = PromisedDB;

export default PromisedDB;
