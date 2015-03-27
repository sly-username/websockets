import define from "domain/ed/define-properties";
import EDDataObject from "domain/ed/objects/EDDataObject";

export default class EDSong extends EDDataObject {
  constructor( args ) {
    super( args );
    define.readOnly( this, [
      "artistId",
      "createdBy",
      "name",
      "playCount",
      "waveformImage",
      "createdDate"
    ], args );
  }

  getArtist() {
  }

  getCreator() {
  }
}
