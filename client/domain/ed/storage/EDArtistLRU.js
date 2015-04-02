import EDArtist from "domain/ed/objects/EDArtist";
import ObservableLRUCache from "domain/lib/storage/ObservableLRUCache";

export default class EDArtistLRU extends ObservableLRUCache {
  constructor( limit ) {
    super( limit );
  }

  set( edArtist ) {
    if ( !( edArtist instanceof EDArtist ) ) {
      throw new TypeError( "cannot pass a non-EDArtist instance" );
    }
  }
}
