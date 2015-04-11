
var
  dbSymbol = Symbol( "internalDB" ),
  openReadTransaction,
  openWriteTransaction,
  resolveToRequestViaTransaction;

import define from "domain/ed/define-properties";

// TODO DRY OUT open and reslove functions
// we need to create a new transaction to interact with the database
// this generates a "readonly" transaction on the idb, for the given store name
openReadTransaction = function( idb, storeName, indexName ) {
  var transaction = idb.transaction( storeName, "readonly" );

  return {
    transaction,
    index: transaction.objectStore( storeName ).index( indexName )
  };
};

// same as above but creates a "readwrite" transaction
openWriteTransaction = function( idb, storeName, indexName ) {
  var transaction = idb.transaction( storeName, "readwrite" );

  return {
    transaction,
    index: transaction.objectStore( storeName ).index( indexName )
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

export default class PDBIndex {
  constructor( idbIndex ) {
    Object.defineProperties( this, {
      [ dbSymbol ]: {
        configurable: false,
        enumerable: false,
        writeable: false,
        value: idbIndex.objectStore.transaction.db
      },
      objectStoreName: {
        configurable: false,
        enumerable: false,
        writeable: false,
        value: idbIndex.objectStore.name
      }
    });

    define.readOnly( this, [ "name", "keyPath", "multiEntry", "unique" ], idbIndex );

    console.log( "in PDBIndex[[construct]] %o, %o", idbIndex, this );
  }

  get( key ) {
    return new Promise(( resolve, reject ) => {
      var request,
        { transaction, index } = openReadTransaction( this[ dbSymbol ], this.objectStoreName, this.name );

      request = index.get( key );
      resolveToRequestViaTransaction( transaction, request, resolve, reject );
    });
  }

  count( key ) {
    return new Promise(( resolve, reject ) => {
      var request,
        { transaction, index } = openReadTransaction( this[ dbSymbol ], this.objectStoreName, this.name );

      request = index.count( key );
      resolveToRequestViaTransaction( transaction, request, resolve, reject );
    });
  }

  getKey( key ) {
    return new Promise(( resolve, reject ) => {
      var request,
        { transaction, index } = openReadTransaction( this[ dbSymbol ], this.objectStoreName, this.name );

      request = index.getKey( key );
      resolveToRequestViaTransaction( transaction, request, resolve, reject );
    });
  }

  openCursor( range, direction ) {
    return new Promise(( resolve, reject ) => {
      var request,
        { transaction, index } = openReadTransaction( this[ dbSymbol ], this.objectStoreName, this.name );

      request = index.openCursor( range, direction );
      resolveToRequestViaTransaction( transaction, request, resolve, reject );
    });
  }

  openKeyCursor( range, direction ) {
    return new Promise(( resolve, reject ) => {
      var request,
        { transaction, index } = openReadTransaction( this[ dbSymbol ], this.objectStoreName, this.name );

      request = index.openKeyCursor( range, direction );
      resolveToRequestViaTransaction( transaction, request, resolve, reject );
    });
  }

  /* maybe future methods (according to mdn)
  getAll() {}
  getAllKeys() {}
  */
}
