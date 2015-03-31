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
  edConnectionService = {},
  EDCollection = {},
  currentStats = null,
  queue = EDCollection;

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
  return edConnectionService.formattedRequest( EDSong )
    .then(function( song ) {
      if ( !currentStats.playing ) {
        // TODO not sure where the audio file will be
        song.audio.play();
        currentStats.playing = true;

        edAnalyticsService.send(
          edAnalyticsService.createEvent( "play", {
            timestamp: new Date()
          })
        );
      }
    })
    .catch(function( err ) {
      currentStats.playing = false;
      throw err;
    });
};

edPlayerService.pause = function( EDSong ) {
  return edConnectionService.formattedRequest( EDSong )
    .then(function( song ) {
      if ( currentStats.playing ) {
        // TODO not sure where the audio file will be
        song.audio.pause();
        currentStats.playing = false;

        edAnalyticsService.send(
          edAnalyticsService.createEvent( "pause", {
            timestamp: new Date()
          })
        );
      }
    })
    .catch(function( err ) {
      throw err;
    });
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

export default edPlayerService;
