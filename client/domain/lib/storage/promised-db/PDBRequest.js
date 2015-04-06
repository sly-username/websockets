/*jshint strict: false*/
var
  originalRequest = Symbol( "originalIDBRequest" );

export var symbols = {
  originalRequest: originalRequest
};

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
   * TODO wrap in PDBObjectStore?
   * @property result
   */
  get result() {
    return this[ originalRequest ].result;
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
    // todo wrap in PDBTransaction
    return this[ originalRequest ].transaction;
  }

  /**
   * @property readyState { DOMString }
   */
  get readyState() {
    return this[ originalRequest ].readyState;
  }
}
