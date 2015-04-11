
var
  dbSymbol = Symbol( "internalDB" ),
  objectStoreSymbol = Symbol( "internalObjectStore" ),
  openReadTransaction,
  openWriteTransaction,
  resolveToRequestViaTransaction;

import define from "domain/ed/define-properties";
import PDBIndex from "domain/lib/storage/db/PDBIndex";

// we need to create a new transaction to interact with the database
// this generates a "readonly" transaction on the idb, for the given store name
openReadTransaction = function( idb, storeName ) {
  var transaction = idb.transaction( storeName, "readonly" );

  return {
    transaction,
    objectStore: transaction.objectStore( storeName )
  };
};

// same as above but creates a "readwrite" transaction
openWriteTransaction = function( idb, storeName ) {
  var transaction = idb.transaction( storeName, "readwrite" );

  return {
    transaction,
    objectStore: transaction.objectStore( storeName )
  };
};

// this is a helper for resolving Promises to request.result data on "transactioncomplete"
resolveToRequestViaTransaction = function( transaction, request, resolve, reject ) {
  transaction.oncomplete = function( event ) {
    console.log( "transaction complete: %o", event );
    resolve( request.result );
  };

  transaction.onerror = function( event ) {
    console.log( "transaction errored: %o", event );
    reject( event );
  };

  request.onsuccess = function( event ) {
    console.log( "request success, %o", event );
  };

  request.onerror = function( event ) {
    console.log( "request error: %o", event );
  };
};

/** @class PDBObjectStore */
export default class PDBObjectStore {
  /**
   * @constructor
   * @param idbObjectStore { IDBObjectStore }
   */
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

    define.readOnly( this, [ "keyPath", "name", "autoIncrement" ], idbObjectStore );
    define.readOnlyDeep( this, [ "indexNames" ], idbObjectStore );

    Array.from( idbObjectStore.indexNames ).forEach( indexName => {
      Object.defineProperty( this, indexName, {
        configurable: false,
        enumerable: false,
        writeable: false,
        value: new PDBIndex( idbObjectStore.index( indexName ) )
      });
    });

    // TODO REMVOE DEBUG
    console.log( "in PDBOjectStore[[construct]] %o", this );
  }

  add( value, key ) {
    return new Promise(( resolve, reject ) => {
      var request,
        { transaction, objectStore } = openWriteTransaction( this[ dbSymbol ], this.name );

      if ( arguments.length === 2 ) {
        request = objectStore.add( value, key );
      } else {
        request = objectStore.add( value );
      }

      resolveToRequestViaTransaction( transaction, request, resolve, reject );
    });
  }

  clear() {
    return new Promise(( resolve, reject ) => {
      var request,
        { transaction, objectStore } = openWriteTransaction( this[ dbSymbol ], this.name );

      request = objectStore.clear();
      resolveToRequestViaTransaction( transaction, request, resolve, reject );
    });
  }

  delete( key ) {
    return new Promise(( resolve, reject ) => {
      var request,
        { transaction, objectStore } = openWriteTransaction( this[ dbSymbol ], this.name );

      request = objectStore.delete( key );
      resolveToRequestViaTransaction( transaction, request, resolve, reject );
    });
  }

  get( key ) {
    return new Promise(( resolve, reject ) => {
      var request,
        { transaction, objectStore } = openReadTransaction( this[ dbSymbol ], this.name );

      request = objectStore.get( key );
      resolveToRequestViaTransaction( transaction, request, resolve, reject );
    });
  }

  // todo need?
  index( name ) {
    return this[ objectStoreSymbol ].index( name );
  }

  put( value, optionalKey ) {
    return new Promise(( resolve, reject ) => {
      var request,
        { transaction, objectStore } = openWriteTransaction( this[ dbSymbol ], this.name );

      if ( arguments.length === 2 ) {
        request = objectStore.put( value, optionalKey );
      } else {
        request = objectStore.put( value );
      }

      resolveToRequestViaTransaction( transaction, request, resolve, reject );
    });
  }

  // TODO this need some work
  openCursor( range, direction ) {
    return new Promise(( resolve, reject ) => {
      var request,
        { transaction, objectStore } = openReadTransaction( this[ dbSymbol ], this.name );

      request = objectStore.openCursor( range, direction );
      resolveToRequestViaTransaction( transaction, request, resolve, reject );
    });
  }

  count( range ) {
    return new Promise(( resolve, reject ) => {
      var request,
        { transaction, objectStore } = openReadTransaction( this[ dbSymbol ], this.name );

      if ( range == null ) {
        request = objectStore.count();
      } else {
        request = objectStore.count( range );
      }

      resolveToRequestViaTransaction( transaction, request, resolve, reject );
    });
  }
}
