import define from "domain/ed/define-properties";
import EDMedia from "domain/ed/objects/EDMedia";

export default class EDSong extends EDMedia {
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
