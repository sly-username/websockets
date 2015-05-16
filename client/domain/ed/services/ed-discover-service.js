import edConnectionService from "domain/ed/services/ed-connection-service";
import edUserService from "domain/ed/services/ed-user-service";
import EDGenre from "domain/ed/objects/EDGenre";
import edAnalyticsService from "domain/ed/analytics/ed-analytics-service";
import EDChart from "domain/ed/objects/EDChart";

var currentProfileBlend = {},
  trackIDList = [],
  edDiscoverService;

export default edDiscoverService = {

  get currentProfileBlend() {
    return currentProfileBlend;
  },

  getTracksForGenre( genreId ) {
    var tempGenreId, data;

    if ( genreId instanceof EDGenre ) {
      tempGenreId = genreId.id;
    } else {
      tempGenreId = genreId;
    }

    data = {
      id: edUserService.isOpenSession ? edUserService.currentProfile.id : null,
      genreId: tempGenreId,
      count: 100
    };

    return edConnectionService.request( "discover/list", 10, { data } )
      .then( response => {
        trackIDList = response.data.tracks;
        return trackIDList;
      })
      .catch( error => {
        throw error;
      });
  },

  getTracksForProfileBlend() {
    var data = {
      id: edUserService.isOpenSession ? edUserService.currentProfile.id : null,
      count: 100
    };

    return edConnectionService.request( "discover/blend/list", 10, { data } )
      .then( response => {
        trackIDList = response.data.tracks;
        return trackIDList;
      })
      .catch( error => {
        console.log( "no" );
        throw error;
      });
  },

  getDiscoverTrackList( data ) {
    if ( data === "profileBlend" ) {
      return this.getTracksForProfileBlend();
    } else if ( typeof data === "number" ) {
      return this.getTracksForGenre( data );
    } else {
      throw new Error( "Error getting track list in Discover Service" );
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
  },
  getLeaderboardCharts( chartName ) {
    return edConnectionService.request( "chart/list", 10, {
      data: {
        chartName
      }
    }).then( response => {
      return new EDChart( response.data );
    });
  }
};
