import EDSong from "domain/ed/objects/EDSong";
//import EDCollection from "domain/ed/objects/EDCollection";
import EventEmitter from "domain/lib/eventEventEmitter";
import createEvent from "domain/lib/event/create-event";
import edAnalyticsService from "domain/analytics/EDAnalytics";
//import edConnectionService from "domain/ed/services/ed-connection-service";

var edPlayerService = new EventEmitter([
    "play",
    "pause",
    "stop",
    "enqueue",
    "enqueueNext",
    "next",
    "skip",
    "skipTo"
  ]),
  edConnectionService = {},
  currentStats = null,
  queue = [],
  audio = new Audio();

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

edPlayerService.play = function( edSong ) {
  if ( !( edSong instanceof EDSong ) ) {
    throw new TypeError( "Song is not an EDSong object" );
  } else {
    audio.play();
    return true;
  }
};

edPlayerService.pause = function( EDSong ) {
  if ( currentStats.playing ) {
    audio.pause();
  }

  return !currentStats.playing;
};

edPlayerService.stop = function( EDSong ) {
  if ( currentStats.playing ) {
    audio.pause();
    audio.removeAttribute( "src" );

    currentStats.playing = false;
  }
};

edPlayerService.enqueue = function( EDSong ) {};

edPlayerService.enqueueNext = function( EDSong ) {};

edPlayerService.next = function() {};

edPlayerService.skip = function() {};

edPlayerService.skipTo = function( index ) {};

export default edPlayerService;
