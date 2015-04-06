/*jshint strict: false*/
var originalIndex = Symbol( "originalIDBIndex" );

import PDBObjectStore from "domain/lib/storage/promised-db/PDBObjectStore";
import PDBRequest from "domain/lib/storage/promised-db/PDBRequest";
import PDBCursor from "domain/lib/storage/promised-db/PDBCursor";
import PDBCursorWithValue from "domain/lib/storage/promised-db/PDBCursorWithValue";

export default class PDBIndex {
  constructor( idbIndex ) {
    this[ originalIndex ] = idbIndex;
  }

  get name() {
    return this[ originalIndex ].name;
  }

  get objectStore() {
    return new PDBObjectStore( this[ originalIndex ].objectStore );
  }

  get keyPath() {
    return this[ originalIndex ].keyPath;
  }

  get multiEntry() {
    return this[ originalIndex ].multiEntry;
  }

  get unique() {
    return this[ originalIndex ].unique;
  }

  count( key ) {
    if ( key == null ){
      return new PDBRequest( this[ originalIndex ].count(), this );
    }

    return new PDBRequest( this[ originalIndex ].count( key ), this );
  }

  get( key ) {
    return new PDBRequest( this[ originalIndex ].get( key ), this );
  }

  getKey( key ) {
    return new PDBRequest( this[ originalIndex ].getKey( key ), this );
  }

  // todo double check argument combinations
  openCursor( range, direction ) {
    var request = new PDBRequest( this[ originalIndex ].openCursor( range, direction ), this );

    return request.success.then( event => {
      return new PDBCursorWithValue( event.target.result, request );
    });
  }

  openKeyCursor( range, direction ) {
    var request = new PDBRequest( this[ originalIndex ].openKeyCursor( range, direction ), this );

    return request.success.then( event => {
      return new PDBCursor( event.target.result, request );
    });
  }
}
