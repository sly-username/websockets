import edConnectionService from "domain/ed/services/ed-connection-service";
import edUserService from "domain/ed/services/ed-user-service";
import EDGenre from "domain/ed/objects/EDGenre";
import EDAnalyticsEditDiscoverBlend from "domain/ed/analytics/events/user-profile/EDAnalyticsEditDiscoverBlend.js";

var currentProfileBlend = {},
  trackIDList = [],
  edDiscoverService;

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
      return this.getBlendTracks();
    } else if ( data instanceof EDGenre ) {
      return this.getGenreTracks();
    } else {
      throw Error;
    }
  },

  setCurrentProfileBlend( genresLiked, genresDisliked ) {
    return edConnectionService.request( "profile/blend/set", 10, {
      data: {
        id: edUserService.currentProfile.id,
        genresLiked,
        genresDisliked
      }
    }).then( response => {
      currentProfileBlend = {
        id: edUserService.currentProfile.id,
        genresLiked,
        genresDisliked
      };

      // analytics for discover blend changed
      EDAnalyticsEditDiscoverBlend.send( "editDiscoverBlend", {
        editDiscoverBlend: currentProfileBlend
      });

      return response;
    });
  }
};
