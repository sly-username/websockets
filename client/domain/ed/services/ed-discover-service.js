// import EDGenre from "domain/ed/objects/EDGenre";
import edAnalyticsService from "domain/analytics/EDAnalytics";

var userBlend = [],
  getDiscoverSongList,
  edDiscoverService;

Object.defineProperties( edDiscoverService, {
  userBlend: {
    configurable: false,
    enumerable: false,
    get: function() {
      return userBlend;
    }
  }
});

getDiscoverSongList = function( EDGenre or "blend" ) {
  // get user's desired blend of genres - via id or name? from where?
  // get id's of the genres from EDGenre
  // userBlend is an array of these EDGenres
  return userBlend;
}

export default edDiscoverService;
