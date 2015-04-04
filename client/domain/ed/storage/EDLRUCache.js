import EDDataObject from "domain/ed/objects/EDDataObject";
import ObservableLRUCache from "domain/lib/storage/ObservableLRUCache";

export default class EDLRUCache extends ObservableLRUCache {
  constructor( limit ) {
    super( limit );
  }

  set( edDataObject ) {
    if ( !( edDataObject instanceof EDDataObject ) ) {
      throw new TypeError( "cannot pass a non-EDArtist instance" );
    }
  }
}
