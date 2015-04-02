//import EDGenre from "domain/ed/objects/EDGenre";
import edAnalyticsService from "domain/analytics/EDAnalytics";

var UserBlend = [],
  edDiscoverService;

export default edDiscoverService = {

  get UserBlend() {
    return UserBlend;
  },

  set UserBlend( value ) {
    UserBlend = value;
  },

  getDiscoverSongList( EDGenre ) {
    return UserBlend;
  },

  setUserBlend( EDGenre ) {
    return EDGenre;
  }
};
