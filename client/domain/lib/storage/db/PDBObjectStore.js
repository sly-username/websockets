/*jshint strict:false */

import define from "domain/ed/define-properties";
import createEvent from "domain/lib/event/create-event";
import PDBIndex from "domain/lib/storage/db/PDBIndex";

var
  readTransaction = function( pdb, storeName, fnName, args ) {
    var t = pdb.read( storeName );
    return t.promise( t.objectStore( storeName )[ fnName ]( ...args ) );
  },
  writeTransaction = function( pdb, storeName, fnName, args ) {
    var t = pdb.write( storeName );
    return t.promise( t.objectStore( storeName )[ fnName ]( ...args ) );
  },
  createChangeEvent = function( objectStore, operation, input, result ) {
    return createEvent( "change", {
      detail: {
        objectStoreName: objectStore.name,
        inputKey: input[ 1 ] || input[ 0 ][ objectStore.keyPath ],
        inputValue: input[ 0 ],
        indexName: null,
        operation,
        result
      }
    });
  };

/** @class PDBObjectStore */
export default class PDBObjectStore {
  /**
   * @constructor
   * @param pdb { PDBDatabase }
   */
  constructor( pdb, storeName ) {
    var idbObjectStore = pdb.read( storeName ).objectStore( storeName );

    Object.defineProperty( this, "pdb", {
      configurable: false,
      enumerable: false,
      writeable: false,
      value: pdb
    });

    // Properties
    define.enumReadOnly( this, [ "keyPath", "name", "autoIncrement" ], idbObjectStore );
    define.enumReadOnlyDeep( this, [ "indexNames" ], idbObjectStore );

    // Indexes
    Array.from( idbObjectStore.indexNames ).forEach( indexName => {
      Object.defineProperty( this, indexName, {
        configurable: false,
        enumerable: true,
        writeable: false,
        value: new PDBIndex( this, indexName )
      });
    });
  }

  get( ...args ) {
    return readTransaction( this.pdb, this.name, "get", args );
  }

  count( ...args ) {
    return readTransaction( this.pdb, this.name, "count", args );
  }

  add( ...args ) {
    return writeTransaction( this.pdb, this.name, "add", args )
      .then( result => {
        this.pdb.dispatch( createChangeEvent( this, "add", args, result ) );
        return result;
      });
  }

  put( ...args ) {
    return writeTransaction( this.pdb, this.name, "put", args )
      .then( result => {
        this.pdb.dispatch( createChangeEvent( this, "put", args, result ) );
        return result;
      });
  }

  clear( ...args ) {
    return writeTransaction( this.pdb, this.name, "clear", args );
  }

  delete( ...args ) {
    return writeTransaction( this.pdb, this.name, "delete", args );
  }

  // TODO this need some work
  openCursor( ...args ) {
    return readTransaction( this.pdb, this.name, "openCursor", args );
  }
}
