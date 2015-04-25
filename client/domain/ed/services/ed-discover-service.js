import edConnectionService from "domain/ed/services/ed-connection-service";
import EDGenre from "domain/ed/objects/EDGenre";

var currentProfileBlend = [],
  likedBlend = [],
  trackIDList = [],
  edDiscoverService;

export default edDiscoverService = {

  get currentProfileBlend() {
    return currentProfileBlend;
  },

  get likedBlend() {
    return likedBlend;
  },

  setLikedBlend( blend ) {
    if ( blend != null && Array.isArray( blend )) {
      likedBlend = blend;
      return true;
    }

    return false;
  },

  getGenreTracks( genreID ) {
    return edConnectionService.request( genreID )
      .then( msg => {
        trackIDList = msg;
        return trackIDList;
      })
      .catch( error => {
        throw error;
      });
  },

  getBlendTracks() {
    return edConnectionService.request( "profileBlend" )
      .then( msg => {
        trackIDList = msg;
        return trackIDList;
      })
      .catch( error => {
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
        console.log( error );
        throw error;
      });
  }
};
