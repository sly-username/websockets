/*jshint strict: false*/
var originalStore = Symbol( "originalIDBObjectStore" );

import PDBRequest from "domain/lib/storage/promised-db/PDBRequest";
import PDBIndex from "domain/lib/storage/promised-db/PDBIndex";
import PDBTransaction from "domain/lib/storage/promised-db/PDBTransaction";
import PDBCursorWithValue from "domain/lib/storage/promised-db/PDBCursorWithValue";

export default class PDBObjectStore {
  constructor( idbObjectStore ) {
    this[ originalStore ] = idbObjectStore;
  }

  get name() {
    return this[ originalStore ].name;
  }

  get keyPath() {
    return this[ originalStore ].keyPath;
  }

  get indexNames() {
    return this[ originalStore ].indexNames;
  }

  get transaction() {
    // todo get/pass along original promisedDB object?
    return new PDBTransaction( this[ originalStore ].transaction );
  }

  get autoIncrement() {
    return this[ originalStore ].autoIncrement;
  }

  add( value, optionalKey ) {
    if ( optionalKey == null ) {
      return new PDBRequest( this[ originalStore ].add( value ), this );
    }

    return new PDBRequest( this[ originalStore ].add( value, optionalKey ), this );
  }

  clear() {
    return new PDBRequest( this[ originalStore ].clear(), this );
  }

  delete( key ) {
    return new PDBRequest( this[ originalStore ].delete( key ), this );
  }

  get( key ) {
    return new PDBRequest( this[ originalStore ].get( key ), this );
  }

  createIndex( name, keyPath, optionalParameters={} ) {
    return new PDBIndex( this[ originalStore ].createIndex(
      name,
      keyPath,
      optionalParameters
    ));
  }

  deleteIndex( indexName ) {
    return this[ originalStore ].deleteIndex( indexName );
  }

  index( indexName ) {
    return new PDBIndex( this[ originalStore ].index( indexName ) );
  }

  put( value, optionalKey ) {
    if ( optionalKey == null ) {
      return new PDBRequest( this[ originalStore ].put( value ), this );
    }

    return new PDBRequest( this[ originalStore ].put( value, optionalKey ), this );
  }

  // todo check if works for different arg combinations
  openCursor( range, direction ) {
    var request = new PDBRequest(
      this[ originalStore ].openCursor( range, direction ),
      this
    );

    return request.success.then( event => {
      return new PDBCursorWithValue( event.target.result, request );
    });
  }

  count( optionalKeyRange ) {
    if ( optionalKeyRange == null ) {
      return new PDBRequest( this[ originalStore ].count(), this );
    }

    return new PDBRequest( this[ originalStore ].count( optionalKeyRange ), this );
  }
}
