import EDSong from "domain/ed/objects/EDSong";
//import EDCollection from "domain/ed/objects/EDCollection";
import EventEmitter from "domain/lib/event/EventEmitter";
import createEvent from "domain/lib/event/create-event";
import edAnalyticsService from "domain/analytics/EDAnalytics";

var
  queue = [],
  audio = new Audio() || document.createElement( "audio" ),
  currentSong = null,
  setCurrentSong,
  edPlayerService;

// helpers
setCurrentSong = function( edSong ) {
  currentSong = edSong;
};

export default edPlayerService = {
  get currentStats() {
    return {
      playing: currentSong,
      time: this.formattedTime,
      hours: this.currentHours,
      minutes: this.currentMinutes,
      seconds: this.currentSeconds,
      length: this.songDuration
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
      return 488;
      // TODO fake current time
      // return audio.currentTime;
    }

    return 0;
  },

  set currentTime( val ) {
    return this.currentTime;
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

  get formattedTime() {
    var ss = this.currentSeconds,
      mm = this.currentMinutes,
      hh = this.currentHours;
    ss = ss < 10 ? "0" + ss : ss;
    mm = mm < 10 ? "0" + mm : mm;
    hh = hh < 10 ? "0" + hh : hh;

    if ( this.isPlaying || this.isPaused ) {
      if ( hh !== "00" ) {
        return `${ hh }:${ mm }:${ ss }`;
      }
      return `${ mm }:${ ss }`;
    }

    return "00:00";
  },

  get songDuration() {
    if ( currentSong != null ) {
      return 578;
      //return audio.duration;
    }

    return 0;
  },

  play: function( edSong ) {
    if ( !( edSong instanceof EDSong ) ) {
      throw new TypeError( "Song is not an EDSong object" );
    } else {
      audio.play();
      setCurrentSong( edSong );
      return true;
    }
  },

  pause: function( edSong ) {
    if ( this.isPlaying ) {
      audio.pause();
    }
    return this.isPaused;
  },

  stop: function( edSong ) {
    if ( this.isPlaying ) {
      audio.pause();
      audio.removeAttribute( "src" );
      currentSong = null;
    }
    return true;
  },

  enqueue: function( edSong ) {
    return this.queue.push( edSong );
  },

  enqueueNext: function( edSong ) {
    return this.queue.unshift( edSong );
  },

  dequeue: function() {
    return this.queue.shift();
  },

  next: function() {
    if ( this.queue.length ) {
      if ( this.isPlaying ) {
        audio.pause();
      }

      this.play( this.queue[ 0 ] );
    }
  },

  skipTo: function( index ) {
    var i, len = this.queue.length;

    if ( this.queue.length ) {
      for ( i = 0; i < len; i++ ) {
        if ( i === index ) {
          return this.play( len[ i ] );
        }
      }
    }
  }
};
