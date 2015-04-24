/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDMedia from "domain/ed/objects/media/EDMedia";
import edDataService from "domain/ed/services/ed-data-service";
import edConnectionService from "domain/ed/services/ed-connection-service";
import edUserService from "domain/ed/services/ed-user-service";

export default class EDTrack extends EDMedia {
  static get MODEL_TYPE() {
    return EDMedia.MODEL_TYPE + "-track";
  }

  constructor( args ) {
    super( args );

    define.readOnly( this, [
      "length",
      "rating",
      "averageRating",
      "createdBy",
      "playCount",
      "waveformImage"
    ], args );
  }

  hasBeenRated() {
    return this.rating !== -1;
  }

  getArtist() {
    return edDataService.getArtistById( this.profileId );
  }

  getCreator() {
    // TODO figure this one out if needed
    return edDataService.getByTypeAndId( "profile", this.createdBy );
  }

  rate( rating ) {
    return edConnectionService.send( "track/rate/set", 10, {
      data: {
        profileId: edUserService.currentProfile.id,
        trackId: this.id,
        rating
      }
    });
  }
}
