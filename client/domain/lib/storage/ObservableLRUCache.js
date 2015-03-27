var observers = Symbol( "observers" ); // jshint ignore:line

import { default as LRUCache, symbols } from "domain/lib/storage/LRUCache";

/*
  TODO remove observers?
  should observe fns get removed when item is dropped from cache?
  should there be a flag to set this option?
  default, remove observers with item
  also allow observers to live after their associated key has been removed?
*/
/** @class ObservableLRUCache */
export default class ObservableLRUCache extends LRUCache {
  /**
   * @constructor
   * @param limit { Number }
   */
  constructor( limit ) {
    super( limit );

    this[ observers ] = {};
  }

  observe( key, callback, acceptList ) {
    callback.acceptList = Array.isArray( acceptList ) ? acceptList : [ "set", "remove" ];

    if ( key in this[ observers ] ) {
      this[ observers ][ key ].push( callback );
    } else {
      this[ observers ][ key ] = [ callback ];
    }
  }

  unobserve( key, callback ) {
    var tmpObserverList;

    if ( key in this[ observers ] ) {
      tmpObserverList = this[ observers ][ key ].filter( cb => cb !== callback );

      if ( tmpObserverList.length === 0 ) {
        delete this[ observers ][ key ];
      } else {
        this[ observers ][ key ] = tmpObserverList;
      }
    }
  }

  set( key, data ) {
    var returnValue,
      change = {
        name: key,
        object: data,
        type: "set",
        oldValue: this.peek( key )
      };

    returnValue = super.set( key, data );

    if ( key in this[ observers ] ) {
      this[ observers ][ key ].forEach( function( cb ) {
        if ( cb.acceptList.some( value => value === "set" ) ) {
          cb( [ change ] );
        }
      });
    }

    return returnValue;
  }

  shift() {
    var change = {
      name: this[ symbols.head ].key,
      object: null,
      type: "remove",
      oldValue: super.shift()
    };

    if ( change.name in this[ observers ] ) {
      this[ observers ][ change.name ].forEach( function( cb ) {
        if ( cb.acceptList.some( value => value === "remove" ) ) {
          cb( [ change ] );
        }
      });
    }

    return change.oldValue;
  }

  remove( key ) {
    var change = {
      name: key,
      object: null,
      type: "remove",
      oldValue: super.remove( key )
    };

    if ( key in this[ observers ] ) {
      this[ observers ][ key ].forEach( function( cb ) {
        if ( cb.acceptList.some( value => value === "remove" ) ) {
          cb( [ change ] );
        }
      });
    }

    return change.oldValue;
  }

  clear() {
    // todo
    // go through all key in observers, perform "remove" notification
  }

  get [ Symbol.toStringTag ]() {
    return "ObservableLRUCache";
  }
}
