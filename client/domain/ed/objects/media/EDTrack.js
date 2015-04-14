/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDMedia from "domain/ed/objects/media/EDMedia";
import edDataService from "domain/ed/services/ed-data-service";

export default class EDTrack extends EDMedia {
  static get TYPE() {
    return "media-track";
  }

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
    return edDataService.getArtistById( this.artistId );
  }

  getCreator() {
    // TODO figure this one out if needed
    return edDataService.getByTypeAndId( "profile", this.createdBy );
  }
}
