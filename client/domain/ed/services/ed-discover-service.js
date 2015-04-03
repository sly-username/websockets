import EDGenre from "domain/ed/objects/EDGenre";
import edAnalyticsService from "domain/analytics/EDAnalytics";

var currentProfileBlend = [],
  edDiscoverService;

export default edDiscoverService = {

  get currentProfileBlend() {
    return currentProfileBlend;
  },

  getGenreIds() {

  }

  getDiscoverSongList( something ) {
    if ( something === "blend" ) {
      // get genreId from server, profileBlend
    }

    if ( something instanceof EDGenre ) {
      // get genreId
    }

    // with genreId return songId
  },

  setUserBlend( EDGenre ) {
    return EDGenre;
    // this songList is now the currentProfileBlend
  }
};
