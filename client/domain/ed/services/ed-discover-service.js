import EDGenre from "domain/ed/objects/EDGenre";
import edAnalyticsService from "domain/analytics/EDAnalytics";
// import edConnectionService from "domain/ed/services/ed-connection-service";

var currentProfileBlend = [],
  edDiscoverService,
  edConnectionService;

export default edDiscoverService = {

  get currentProfileBlend() {
    return currentProfileBlend;
  },

  getSongIDs( genreID ) {
    edConnectionService.request( genreID )
      .then( function() {
        // we receive the list of song IDs, but how do I javascript that?
        // I was thinking I should name the array. then return it.
        return genreSongList;
      })
      .catch( function() {
        // throw error
      });
  },

  getGenreIDs() {
    edConnectionService.request( "profileBlend" )
      .then( function() {
        // name list of genreIDs = currentProfileBlend;
        return currentProfileBlend;
      })
      .catch( function() {
        // throw error
      });
  },

  getDiscoverSongList( something ) {
    if ( something === "profileBlend" ) {
      getGenreIDs();
      currentProfileBlend.forEach( getSongIDs );
    } else if ( something instanceof EDGenre ) {
      getSongIDs();
    }
  },

  setUserBlend( EDGenre ) {
    return EDGenre;
    // this songList is now the currentProfileBlend
  }
};
