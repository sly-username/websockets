import EventEmitter from "domain/lib/event/EventEmitter";
import createEvent from "domain/lib/event/create-event";
import edAnalyticsService from "domain/analytics/EDAnalytics";
// import EDGenre from "domain/ed/objects/EDGenre";

var edDiscoverService = new EventEmitter(),
  userBlend = [];

Object.defineProperties( edDiscoverService, {
  userBlend: {
    configurable: false,
    enumerable: false,
    get: function() {
      return userBlend;
    }
  }
});

edDiscoverService.getDiscoverSongList = function( EDGenre="blend" ) {
  // get user's desired blend of genres - via id or name? from where?
  // get id's of the genres from EDGenre
  // userBlend is an array of these EDGenres
  return userBlend;
};

export default edDiscoverService;
