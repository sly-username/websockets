/*jshint strict: false*/
var originalIndex = Symbol( "originalIDBIndex" );

import PDBObjectStore from "domain/lib/storage/PromisedDB/PDBObjectStore";
import PDBRequest from "domain/lib/storage/PromisedDB/PDBRequest";

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

  // todo figure out to wrap cursor (it is in the request objs success event)
  // todo double check argument combinations
  openCursor( range, direction ) {
    return new PDBRequest( this[ originalIndex ].openCursor( range, direction ), this );
  }

  openKeyCursor( range, direction ) {
    return new PDBRequest( this[ originalIndex ].openKeyCursor( range, direction ), this );
  }

}
