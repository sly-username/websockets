import edConnectionService from "domain/ed/services/ed-connection-service";
import edUserService from "domain/ed/services/ed-user-service";
import EDGenre from "domain/ed/objects/EDGenre";
import edAnalyticsService from "domain/ed/analytics/ed-analytics-service";

var currentProfileBlend = {},
  trackIDList = [],
  edDiscoverService;

export default edDiscoverService = {

  get currentProfileBlend() {
    return currentProfileBlend;
  },

  getGenreTracks( genreID ) {
    var data = {
      id: 115,
      genreID,
      count: 10
    };

    return edConnectionService.request( "discover/list", 10, { data } )
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
      id: edUserService.currentProfile.id,
      count: 100
    };

    return edConnectionService.request( "discover/blend/list", 10, { data } )
      .then( response => {
        trackIDList = response.data.tracks;
        // todo when route gets updated remove this line
        trackIDList = trackIDList.map( obj => obj.trackId );
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
      edAnalyticsService.send( "editDiscoverBlend", {
        editDiscoverBlend: currentProfileBlend
      });

      return response;
    });
  }
};
