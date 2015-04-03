/*jshint strict: false*/
var originalStore = Symbol( "originalIDBObjectStore" );

import PDBRequest from "domain/lib/storage/PromisedDB/PDBRequest";

export default class PDBObjectStore {
  constructor( idbObjectStore ) {
    this[ originalStore ] = idbObjectStore;
  }

  get indexNames() {
    return this[ originalStore ].indexNames;
  }

  get keyPath() {
    return this[ originalStore ].keyPath;
  }

  get name() {
    return this[ originalStore ].name;
  }

  get transaction() {
    // todo Wrap in PDBTransaction
    return this[ originalStore ].transaction;
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

  createIndex( objectIndexName, objectKeypath, optionalObjectParameters={} ) {
    // todo wrap in PDBIndex
    return this[ originalStore ].createIndex(
      objectIndexName,
      objectKeypath,
      optionalObjectParameters
    );
  }

  deleteIndex( indexName ) {
    return this[ originalStore ].deleteIndex( indexName );
  }

  index( indexName ) {
    // todo wrap in PDBIndex
    return this[ originalStore ].index( indexName );
  }

  put( value, optionalKey ) {
    if ( optionalKey == null ) {
      return new PDBRequest( this[ originalStore ].put( value ), this );
    }

    return new PDBRequest( this[ originalStore ].put( value, optionalKey ), this );
  }

  // todo check if works for different arg combinations
  openCursor( range, direction ) {
    return new PDBRequest(
      this[ originalStore ].openCursor( range, direction ),
      this
    );
  }

  count( optionalKeyRange ) {
    if ( optionalKeyRange == null ) {
      return new PDBRequest( this[ originalStore ].count(), this );
    }

    return new PDBRequest( this[ originalStore ].count( optionalKeyRange ), this );
  }
}
