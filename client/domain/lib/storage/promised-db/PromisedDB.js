/*jshint strict:false */
// jscs:disable requirePaddingNewLinesInObjects
var indexedDB = window.indexedDB ||
      window.webkitIndexedDB ||
      window.mozIndexedDB ||
      window.msIndexedDB,
  db = Symbol( "originalIDBDatabase" );

if ( !indexedDB ) {
  throw new Error( "This Environment doesn't support IndexedDB" );
}

import PDBObjectStore from "domain/lib/storage/promised-db/PDBObjectStore";
import PDBOpenDBRequest from "domain/lib/storage/promised-db/PDBOpenDBRequest";
import PDBTransaction from "domain/lib/storage/promised-db/PDBTransaction";

/********
TODOs
 Account for "onabort"
 Do more for "onblocked"?
 PDBTransaction property: "db"
********/

export default class PromisedDB {
  constructor( dbName, versionNumber, onUpgradeNeeded=function() {} ) {
    var openRequest = new PDBOpenDBRequest( indexedDB.open( dbName, versionNumber ), this);

    this[ db ] = {
      name: dbName,
      version: versionNumber
    };

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

  get originalDB() {
    return this[ db ];
  }

  get name() {
    return this[ db ].name;
  }

  get version() {
    return this[ db ].version;
  }

  get objectStoreNames() {
    return this[ db ].objectStoreNames;
  }

  close() {
    if ( this[ db ] && typeof this[ db ].close === "function" ) {
      this[ db ].close();
      return;
    }

    this.openedPromise.then( () => {
      this[ db ].close();
    });
  }

  createObjectStore( name, parameters ) {
    if ( parameters == null ) {
      return new PDBObjectStore( this[ db ].createObjectStore( name ) );
    }

    return new PDBObjectStore( this[ db ].createObjectStore( name, parameters ) );
  }

  deleteObjectStore( name ) {
    return this[ db ].deleteObjectStore( name );
  }

  transaction( storeNames, accessMode ) {
    return new PDBTransaction( this[ db ].transaction( storeNames, accessMode ), this );
  }

  deleteDatabase() {
    return this.openedPromise.then( () => {
      this.close();

      return new PDBOpenDBRequest(
        indexedDB.deleteDatabase( this[ db ].name ),
        this
      );
    });
  }
}
