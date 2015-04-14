/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDMedia from "domain/ed/objects/media/EDMedia";
import edDataService from "domain/ed/services/ed-data-service";

// TODO fake objects
var EDArtist = {},
  EDProfile = {};

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
    return edDataService.getByTypeAndId( this.createdBy );
  }
}
