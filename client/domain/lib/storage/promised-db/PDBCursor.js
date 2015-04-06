
var originalCursor = Symbol( "originalIDBCursor" );

export var symbols = {
  "originalCursor": originalCursor
};

import PDBRequest from "domain/lib/storage/promised-db/PDBRequest";

export default class PDBCursor {
  constructor( idbCursor, source=null ) {
    this[ originalCursor ] = idbCursor;

    Object.defineProperties( this, {
      source: {
        configurable: false,
        enumerable: false,
        writeable: false,
        value: source
      }
    });
  }

  get direction() {
    return this[ originalCursor ].direction;
  }

  get key() {
    return this[ originalCursor ].key;
  }

  get primaryKey() {
    return this[ originalCursor ].primaryKey;
  }

  advance( count=1 ) {
    this[ originalCursor ].advance( count );
  }

  continue( key ) {
    if ( key == null ) {
      this[ originalCursor ].continue();
      return;
    }

    this[ originalCursor ].continue( key );
  }

  delete() {
    return new PDBRequest( this[ originalCursor ].delete(), this );
  }

  update( value ) {
    return new PDBRequest( this[ originalCursor ].update( value ), this );
  }
}
