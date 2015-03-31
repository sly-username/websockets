//import EDSong from "domain/ed/objects/EDSong";
//import EDCollection from "domain/ed/objects/EDCollection";
import EventEmitter from "domain/lib/eventEventEmitter";
import createEvent from "domain/lib/event/create-event";
import edAnalyticsService from "domain/analytics/EDAnalytics";
//import edConnectionService from "domain/ed/services/ed-connection-service";

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
  currentStats = null,
  queue = [];

Object.defineProperties( edPlayerService, {
  currentStats: {
    configurable: false,
    enumerable: false,
    get: function() {
      return currentStats;
    }
  },
  queue: {
    configurable: false,
    enumerable: false,
    get: function() {
      return queue;
    }
  }
});

edPlayerService.play = function( EDSong ) {
  if ( !currentStats.playing ) {
    EDSong.play();
    currentStats.playing = true;
  }
};

edPlayerService.pause = function( EDSong ) {
  if ( currentStats.playing ) {
    EDSong.pause();
    currentStats.playing = false;
  }
};

edPlayerService.stop = function( EDSong ) {
  if ( currentStats.playing ) {
    EDSong.stop();
    currentStats.playing = false;
  }
};

edPlayerService.enqueue = function( EDSong ) {};

edPlayerService.enqueueNext = function( EDSong ) {};

edPlayerService.next = function() {};

edPlayerService.skip = function() {};

edPlayerService.skipTo = function( index ) {};
