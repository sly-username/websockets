import EDArtist from "domain/ed/objects/EDArtist";
import ObservableLRUCache from "domain/lib/storage/ObservableLRUCache";

export default class EDArtistLRU extends ObservableLRUCache {
  constructor( limit ) {
    super( limit );
  }

  set( edArtist ) {}
}
