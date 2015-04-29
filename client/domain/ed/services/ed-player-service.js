import EDTrack from "domain/ed/objects/media/EDTrack";
import EDCollection from "domain/ed/storage/EDCollection";

import edAnalyticsService from "domain/ed/analytics/ed-analytics-service";
import edConnectionService from "domain/ed/services/ed-connection-service";
import edDiscoverService from "domain/ed/services/ed-discover-service";
import edDataService from "domain/ed/services/ed-data-service";

import EventEmitter from "domain/lib/event/EventEmitter";
import createEvent from "domain/lib/event/create-event";

var
  queue = [],
  currentTrack = null,
  emitter = new EventEmitter([ "play", "pause", "stop", "skip" ]),
  //audio = new Audio( "http://mediaelementjs.com/media/AirReview-Landmarks-02-ChasingCorporate.mp3" ) || document.createElement( "audio" ),
  audio = new Audio() || document.createElement( "audio" ),
  setCurrentTrack,
  edPlayerService,
  rateCurrentlyPlaying,
  getTracksQueue,
  trackCollection;

audio.setAttribute( "id", "hiddenAudioPlayer" );
audio.setAttribute( "preload", "auto" );

audio.style.display = "none";
audio.style.visibility = "hidden";

// helpers
setCurrentTrack = function( edTrack ) {
  currentTrack = edTrack;
};

rateCurrentlyPlaying = function( number ) {
  if ( number != null ) {
    return currentTrack.rate( number )
      .then(function( response ) {
        // adding in fake ID for now
        edAnalyticsService.send( "rate", {
          trackId: currentTrack.id || 10,
          timecode: currentTrack.currentTime,
          rating: number
        });

        return response;
      });
  }
};

getTracksQueue = function() {

};

export default edPlayerService = {
  get emitter() {
    return emitter;
  },

  get currentStats() {
    return {
      playing: currentTrack,
      time: this.formattedTime,
      hours: this.currentHours,
      minutes: this.currentMinutes,
      seconds: this.currentSeconds,
      length: this.trackLength
    };
  },

  get queue() {
    return queue;
  },

  get isPlaying() {
    if ( currentTrack != null ) {
      return !currentTrack.paused;
    }

    return false;
  },

  get isPaused() {
    if ( currentTrack != null ) {
      return currentTrack.paused && !!currentTrack.src;
    }

    return false;
  },

  get isStopped() {
    return currentTrack.paused && !currentTrack.src;
  },

  get currentTime() {
    if ( this.isPlaying || this.isPaused ) {
      return currentTrack.currentTime;
    }

    return 0;
  },

  set currentTime( value ) {
    return currentTrack.currentTime;
  },

  get currentSeconds() {
    return Math.floor( this.currentTime % 60 );
  },

  get currentMinutes() {
    return Math.floor( this.currentTime / 60 );
  },

  get currentHours() {
    return Math.floor( 60 / this.currentTime );
  },

  get formattedTimeDisplay() {
    return this.formattedTime + " / " + this.formattedLength;
  },

  get formattedTime() {
    var ss = this.currentSeconds,
      mm = this.currentMinutes,
      hh = this.currentHours;
    ss = ss < 10 ? "0" + ss : ss;
    mm = mm < 10 ? "0" + mm : mm;
    hh = hh < 10 ? "0" + hh : hh;

    if ( this.isPlaying || this.isPaused ) {
      //if ( hh !== "00" ) {
      //  return `${ hh }:${ mm }:${ ss }`;
      //}
      return `${ mm }:${ ss }`;
    }

    return "00:00";
  },

  get formattedLength() {
    return this.formatTime( this.trackLength );
  },

  get trackLength() {
    if ( currentTrack != null ) {
      return currentTrack.duration;
    }

    return 0;
  },

  // To be removed once integrated with player service
  formatTime: function( time ) {
    var ss = Math.floor( time % 60 ),
      mm = Math.floor( time / 60 );
    ss = ss < 10 ? "0" + ss : ss;
    mm = mm < 10 ? "0" + mm : mm;

    return mm + ":" + ss;
  },

  play: function( edTrack ) {
    if ( !edTrack instanceof EDTrack ) {
      throw new TypeError( "Track is not an EDTrack object" );
    }

    return edTrack.getUrl()
      .then(( response ) => {
        console.log( "play response", response );
        //audio.src = response;
        audio.play();

        this.emitter.dispatch( createEvent( "playerUpdate", {
          detail: {
            type: "play"
          }
        }));

        setCurrentTrack( audio );

        edAnalyticsService.send( "play", {
          trackId: currentTrack.id || 10,
          timecode: currentTrack.currentTime
        });

        return response;
      });
  },

  pause: function() {
    this.emitter.dispatch( createEvent( "playerUpdate", {
      detail: {
        type: "pause"
      }
    }));

    currentTrack.pause();

    edAnalyticsService.send( "pause", {
      trackId: currentTrack.id || 10,
      timecode: currentTrack.currentTime
    });

    return this.isPaused;
  },

  stop: function() {
    if ( this.isPlaying ) {
      currentTrack.pause();
      currentTrack.removeAttribute( "src" );
      currentTrack = null;
    }

    edAnalyticsService.send( "quit", {
      trackId: currentTrack.id || 10,
      timecode: currentTrack.currentTime,
      action: "stop"
    });
    return true;
  },

  scrubTo: function( value ) {
    var scrubFrom = currentTrack.currentTime;
    currentTrack.currentTime = value;

    edAnalyticsService.send( "scrub", {
      trackId: currentTrack.id || 10,
      timeStart: scrubFrom,
      timeEnd: value
    });
  },

  enqueue: function( edTrack ) {
    return this.queue.push( edTrack );
  },

  enqueueNext: function( edTrack ) {
    return this.queue.unshift( edTrack );
  },

  dequeue: function() {
    return this.queue.shift();
  },

  next: function() {
    if ( this.queue.length ) {
      if ( this.isPlaying || this.isPaused ) {
        audio.pause();
      }
      return this.play( this.dequeue() );
    }

    edAnalyticsService.send( "quit", {
      trackId: currentTrack.id || 10,
      timecode: currentTrack.currentTime,
      action: "skip"
    });
  },

  skipTo: function( index ) {
    var i, len = this.queue.length;

    if ( this.queue.length ) {
      for ( i = 0; i < len; i++ ) {
        if ( i === index ) {
          return this.play( this.queue[ i ] );
        }
      }
    }
  },

  rateSong: function( number ) {
    return rateCurrentlyPlaying( number );
  },

  queueTracksAndPlay: function( track, show ) {
    if ( show ) {
      document.getElementById( "main-player-wrapper" ).setAttribute( "class", "active" );
      document.getElementById( "mini-player" ).setAttribute( "class", "hidden" );
    }

    return edDiscoverService.getBlendTracks()
      .then(( response ) => {
        trackCollection = new EDCollection( EDTrack.MODEL_TYPE, response );
        console.log( "tracker", trackCollection.get( 0 ) );
        //this.play( trackCollection.ids[ 0 ] );

        return response;
      })
      .catch(( error ) => {
        console.warn( "Error getting tracks in player service" );
        console.error( error );
      });
  }
};

// TODO remove debug
window.playerService = edPlayerService;
window.edDiscoverService = edDiscoverService;
