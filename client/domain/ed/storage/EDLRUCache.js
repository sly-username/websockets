import EDDataObject from "domain/ed/objects/EDDataObject";
import ObservableLRUCache from "domain/lib/storage/ObservableLRUCache";

var checkKeyType;

// helpers
checkKeyType = function( tmpKey ) {
  tmpKey = tmpKey instanceof EDDataObject ? tmpKey.id : tmpKey;

  return tmpKey;
};

export default class EDLRUCache extends ObservableLRUCache {
  constructor( limit ) {
    super( limit );
  }

  observe( key, callback, acceptList ) {
    key = checkKeyType( key );

    return super.observe( key, callback, acceptList );
  }

  unobserve( key, callback ) {
    key = checkKeyType( key );

    return super.unobserve( key, callback );
  }

  set( key, data ) {
    if ( key instanceof EDDataObject ) {
      key = key.id;
      data = key;
    }

    return super.set( key, data );
  }

  get( key ) {
    key = checkKeyType( key );

    return super.get( key );
  }

  peek( key ) {
    key = checkKeyType( key );

    return super.peek( key );
  }

  has( key ) {
    key = checkKeyType( key );

    return super.has( key );
  }

  remove( key ) {
    key = checkKeyType( key );

    return super.remove( key );
  }
}
