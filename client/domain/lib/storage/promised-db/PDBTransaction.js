
var originalTransaction = Symbol( "originalIDBTransaction" );

import PDBObjectStore from "domain/lib/storage/promised-db/PDBObjectStore";

export default class PDBTransaction {
  // TODO Take in actual promisedDB instance?
  constructor( idbTransaction, db ) {
    this[ originalTransaction ] = idbTransaction;

    Object.defineProperties( this, {
      complete: {
        configurable: false,
        enumerable: false,
        writeable: false,
        value: new Promise(( resolve, reject ) => {
          idbTransaction.oncomplete = resolve;
          idbTransaction.onerror = reject;
          idbTransaction.onabort = reject;
        })
      }
    });
  }

  get db() {
    // todo return orignal promiseddb object
    return this[ originalTransaction ].db;
  }

  get error() {
    return this[ originalTransaction ].error;
  }

  get mode() {
    return this[ originalTransaction ].mode;
  }

  objectStore( name ) {
    return new PDBObjectStore( this[ originalTransaction ].objectStore( name ) );
  }

  abort() {
    this[ originalTransaction ].abort();
  }
}
