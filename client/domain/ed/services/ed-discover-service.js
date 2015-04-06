// import edConnectionService from "domain/ed/services/ed-connection-service";
import EDGenre from "domain/ed/objects/EDGenre";

var currentProfileBlend = [],
  trackIDList = [],
  edDiscoverService,
  edConnectionService;

export default edDiscoverService = {

  get currentProfileBlend() {
    return currentProfileBlend;
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
      getBlendTracks();
    } else if ( data instanceof EDGenre ) {
      getGenreTracks();
    } else {
      throw Error;
    }
  },

  setCurrentProfileBlend( updatedProfileBlend ) {
    updatedProfileBlend = currentProfileBlend;

    return edConnectionService.request( currentProfileBlend )
      .then( msg => {
        trackIDList = msg;
      })
      .catch( error => {
        throw error;
      });
  }
};
