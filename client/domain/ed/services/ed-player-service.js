import EventEmitter from "domain/lib/eventEventEmitter";
import createEvent from "domain/lib/event/create-event";
import edAnalyticsService from "domain/analytics/EDAnalytics";
//import EDSong from "domain/ed/objects/EDSong";

var edPlayerService = new EventEmitter([
    "edPlay",
    "edPause",
    "edStop",
    "edEnqueue",
    "edEnqueueNext",
    "edNext",
    "edSkip",
    "edSkipTo"
  ]),
  playerStats = null,
  playerQueue = [];

Object.defineProperties( edPlayerService, {
  currentStats: {
    configurable: false,
    enumerable: false,
    get: function() {
      return playerStats;
    }
  },
  queue: {
    configurable: false,
    enumerable: false,
    get: function() {
      return playerQueue;
    }
  }
});

edPlayerService.play = function( edSong ) {
  return edConnectionService.formattedRequest( json )
    .then(function( raw ) {
      //return
    });
};
