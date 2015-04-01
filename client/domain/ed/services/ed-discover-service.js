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
    // array of EDGenre-s
  }
});

edDiscoverService.getDiscoverSongList = function( EDGenre="blend" ) {
  userBlend = [ EDGenre ];
};

export default edDiscoverService;
