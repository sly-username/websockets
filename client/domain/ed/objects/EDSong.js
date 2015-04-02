import define from "domain/ed/define-properties";
import EDMedia from "domain/ed/objects/EDMedia";
//import EDArtist from "domain/ed/objects/EDArtist";
//import EDProfile from "domain/ed/objects/EDProfile";
//import edDataService from "domain/ed/services/ed-data-service";

//TODO fake objects
var EDArtist = {},
  EDProfile = {},
  edDataService = {};

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
