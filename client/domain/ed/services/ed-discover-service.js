import edConnectionService from "domain/ed/services/ed-connection-service";
import edUserService from "domain/ed/services/ed-user-service";
import EDGenre from "domain/ed/objects/EDGenre";

var currentProfileBlend = [],
  trackIDList = [],
  edDiscoverService;

export default edDiscoverService = {

  get currentProfileBlend() {
    return currentProfileBlend;
  },

  getGenreTracks( genreID ) {
    return edConnectionService.request( "discover/list", 10, genreID )
      .then( msg => {
        trackIDList = msg;
        return trackIDList;
      })
      .catch( error => {
        throw error;
      });
  },

  getBlendTracks() {
    var data = {
      data: {
        id: 115
      }
    };

    return edConnectionService.request( "profile/blend/get", 10, data )
      .then( msg => {
        trackIDList = msg;
        return trackIDList;
      })
      .catch( error => {
        console.log( "no" );
        throw error;
      });
  },

  getDiscoverTrackList( data ) {
    if ( data === "profileBlend" ) {
      return this.getBlendTracks();
    } else if ( data instanceof EDGenre ) {
      return this.getGenreTracks();
    } else {
      throw Error;
    }
  },

  setCurrentProfileBlend( updatedProfileBlend ) {
    currentProfileBlend = updatedProfileBlend;

    return edConnectionService.request( "profile/blend/set", 10, currentProfileBlend )
      .then( msg => {
        trackIDList = msg;
        return trackIDList;
      })
      .catch( error => {
        throw error;
      });
  }
};
