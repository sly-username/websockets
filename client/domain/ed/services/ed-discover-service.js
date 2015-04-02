//import EDGenre from "domain/ed/objects/EDGenre";
import edAnalyticsService from "domain/analytics/EDAnalytics";

var UserBlend,
  edDiscoverService;


export default edDiscoverService = {

  get UserBlend() {
    return UserBlend;
  },

  set UserBlend( value ) {
    UserBlend = value;
  },

  getDiscoverSongList( songList ) {
    if ( songList instanceof EDGenre || songList === "blend" ) {
      // need to get songlist from server
      return songList;
    } else {
      throw new TypeError( "you did not provide a valid song list" );
    }
  },

  setUserBlend( EDGenre ) {
    return EDGenre;
  }
};
