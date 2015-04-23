/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDMedia from "domain/ed/objects/media/EDMedia";
import edDataService from "domain/ed/services/ed-data-service";
import edConnectionService from "domain/ed/services/ed-connection-service";

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

  rate( number ) {
    var json = {
      profileId: 102, // fake profile id
      trackId: 103, // fake id
      rating: number
    };
    return edConnectionService.send( "track/rate/create", 10,  { data: json });
  }
}
