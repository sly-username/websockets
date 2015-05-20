/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDProfile from "domain/ed/objects/profile/EDProfile";
import EDTrack from "domain/ed/objects/media/EDTrack";
import EDCollection from "domain/ed/storage/EDCollection";
import connectionService from "domain/ed/services/ed-connection-service";

export default class EDArtist extends EDProfile {
  static get MODEL_TYPE() {
    return EDProfile.MODEL_TYPE + "-artist-solo";
  }

  constructor( args ) {
    var argsCopy = Object.assign( {}, args );

    super( args );

    if ( args.yearFounded ) {
      argsCopy.yearFounded = new Date( args.yearFounded );
    }

    define.enumReadOnly( this, [
      "genreId",
      "influencedBy",
      "yearFounded"
    ], argsCopy );
  }

  getTracks() {
    // todo cache promise result?
    return connectionService.request( "track/list", 10, {
      data: {
        artistId: this.id
      }
    }).then( response => new EDCollection( EDTrack.MODEL_TYPE, response.data.tracks ));
  }
}
