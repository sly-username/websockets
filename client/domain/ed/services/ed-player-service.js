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
  audio = new Audio() || document.createElement( "audio" ),
  setCurrentTrack,
  edPlayerService,
  rateCurrentlyPlaying,
  tracksCollection;

audio.setAttribute( "id", "hiddenAudioPlayer" );
audio.setAttribute( "preload", "auto" );

audio.style.display = "none";
audio.style.visibility = "hidden";

// helpers
setCurrentTrack = function( edTrack ) {
  currentTrack = edTrack;
};

//rateCurrentlyPlaying = function( number ) {
//  if ( number != null && currentTrack ) {
//    return currentTrack.rate( number )
//      .then(function( response ) {
//        // adding in fake ID for now
//        edAnalyticsService.send( "rate", {
//          trackId: currentTrack.id || 10,
//          timecode: currentTrack.currentTime,
//          rating: number
//        });
//
//        return response;
//      });
//  }
//};

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
    return !audio.paused;
  },

  get isPaused() {
    return audio.paused && !!audio.src;
  },

  get isStopped() {
    return audio.paused && !audio.src;
  },

  get currentTime() {
    if ( this.isPlaying || this.isPaused ) {
      return audio.currentTime;
    }

    return 0;
  },

  set currentTime( value ) {
    return audio.currentTime;
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
      return audio.duration;
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
      console.warn( "not an instance of edTrack" );
      //throw new TypeError( "Track is not an EDTrack object" );
    }

    return edTrack.getUrl()
      .then(( response ) => {
        console.log( "play response", response.data.url );
        audio.src = response.data.url;
        audio.play();

        this.emitter.dispatch( createEvent( "playerUpdate", {
          detail: {
            type: "play"
          }
        }));

        setCurrentTrack( edTrack );

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

    audio.pause();

    edAnalyticsService.send( "pause", {
      trackId: currentTrack.id || 10,
      timecode: audio.currentTime
    });

    return this.isPaused;
  },

  stop: function() {
    if ( this.isPlaying ) {
      audio.pause();
      audio.removeAttribute( "src" );
      currentTrack = null;
    }

    edAnalyticsService.send( "quit", {
      trackId: currentTrack.id || 10,
      timecode: audio.currentTime,
      action: "stop"
    });
    return true;
  },

  scrubTo: function( value ) {
    var scrubFrom = currentTrack.currentTime;
    audio.currentTime = value;

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
      timecode: audio.currentTime,
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

  retrieveDiscoverTracks: function( type ) {
    return edDiscoverService.getDiscoverTrackList( type )
      .then(( response ) => {
        tracksCollection = new EDCollection( EDTrack.MODEL_TYPE, response );

        this.queueTracksAndPlay( tracksCollection );

        return response;
      })
      .catch(( error ) => {
        console.warn( "Error getting tracks in player service" );
        console.error( error );
      });
  },

  queueTracksAndPlay: function( tracks, show ) {
    if ( show ) {
      document.getElementById( "main-player-wrapper" ).setAttribute( "class", "active" );
      document.getElementById( "mini-player" ).setAttribute( "class", "hidden" );
    }

    return tracks.get( 0 ).then(( edTrack ) => {
      this.play( edTrack );

      return edTrack;
    });
  }
};

// TODO remove debug
window.playerService = edPlayerService;
window.edDiscoverService = edDiscoverService;
