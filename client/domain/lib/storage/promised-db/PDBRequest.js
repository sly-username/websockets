/*jshint strict: false*/
var
  originalRequest = Symbol( "originalIDBRequest" );

export var symbols = {
  originalRequest: originalRequest
};

import PDBObjectStore from "domain/lib/storage/promised-db/PDBObjectStore";
import PDBTransaction from "domain/lib/storage/promised-db/PDBTransaction";

/** @class PDBRequest */
export default class PDBRequest {
  /**
   * @constructor
   * @param idbRequest { IDBRequest }
   * @param source { PromisedDB | PDBOpenDBRequest }
   */
  constructor( idbRequest, source=null ) {
    this[ originalRequest ] = idbRequest;

    Object.defineProperties( this, {
      success: {
        configurable: false,
        enumerable: false,
        writeable: false,
        value: new Promise(( resolve, reject ) => {
          idbRequest.onsuccess = resolve;
          idbRequest.onerror = reject;
        })
      },
      source: {
        configurable: false,
        enumerable: false,
        writeable: false,
        value: source
      }
    });
  }

  /**
   * @property result { PDBObjectStore }
   */
  get result() {
    return new PDBObjectStore( this[ originalRequest ].result );
  }

  /**
   * @property error { DOMError }
   */
  get error() {
    return this[ originalRequest ].error;
  }

  /**
   * @property transaction { PDBTransaction }
   */
  get transaction() {
    // todo get/pass along original promisedDB object?
    return new PDBTransaction( this[ originalRequest ].transaction );
  }

  /**
   * @property readyState { DOMString }
   */
  get readyState() {
    return this[ originalRequest ].readyState;
  }
}
