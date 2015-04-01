import EventEmitter from "domain/lib/event/EventEmitter";
import createEvent from "domain/lib/event/create-event";
import edAnalyticsService from "domain/analytics/EDAnalytics";

var edDiscoverService = new EventEmitter([ "edLogin", "edLogout" ]),
  userBlend = null;

Object.defineProperties( edDiscoverService, {
  userBlend: {
    configurable: false,
    enumerable: false,
    get: function() {
      return userBlend;
    }
  }
});

edDiscoverService.getDiscoverSongList = function( EDGenre | "blend" ) {

};

export default edUserService;
