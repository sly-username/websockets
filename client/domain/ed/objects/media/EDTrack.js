import define from "domain/ed/define-properties";
import EDMedia from "domain/ed/objects/media/EDMedia";
//import EDArtist from "domain/ed/objects/profile/EDArtist";
//import EDProfile from "domain/ed/objects/profile/EDProfile";
//import edDataService from "domain/ed/services/ed-data-service";

//TODO fake objects
var EDArtist = {},
  EDProfile = {},
  edDataService = {};

export default class EDTrack extends EDMedia {
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
    var json = {
      data: {
        userId: this.artistId
      }
    };

    return edDataService.getArtistById( json )
      .then( raw => {
        return new EDArtist( raw.data );
      })
      .catch( err => {
        throw err;
      });
  }

  getCreator() {
    var json = {
      data: {
        id: this.createdBy
      }
    };

    return edDataService.getProfileById( json )
      .then( raw => {
        return new EDProfile( raw.data );
      })
      .catch( err => {
        throw err;
      });
  }
}
