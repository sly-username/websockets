import EDTrack from "domain/ed/objects/media/EDTrack";
//import EDCollection from "domain/ed/storage/EDCollection";
import edAnalyticsService from "domain/analytics/EDAnalytics";
import edConnectionService from "domain/ed/services/ed-connection-service";
import EventEmitter from "domain/lib/event/EventEmitter";
import createEvent from "domain/lib/event/create-event";

var
  queue = [],
  currentTrack = null,
  setCurrentTrack,
  edPlayerService,
  emitter = new EventEmitter([ "play", "pause", "stop", "skip" ]),
  // http://picosong.com/XFk6/
  audio = new Audio( "http://mediaelementjs.com/media/AirReview-Landmarks-02-ChasingCorporate.mp3" ) || document.createElement( "audio" );

audio.setAttribute('id', 'hiddenAudioPlayer');
audio.setAttribute('preload', 'auto');

audio.style.display     = 'none';
audio.style.visibility  = 'hidden';

// helpers
setCurrentTrack = function( edTrack ) {
  currentTrack = edTrack;
};

window.audioTest = audio;

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
    //if ( !( edTrack instanceof EDTrack ) ) {
    //  throw new TypeError( "Track is not an EDTrack object" );
    //}

    audio.play();

    this.emitter.dispatch( createEvent( "update", {
      detail: {
        type: "play"
      }
    }));

    setCurrentTrack( audio );
    return true;
  },

  pause: function( edTrack ) {
    audio.pause();

    //this.emitter.dispatch( createEvent( "update", {
    //  detail: {
    //    type: "pause"
    //  }
    //}));

    return this.isPaused;
  },

  stop: function( edTrack ) {
    if ( this.isPlaying ) {
      audio.pause();
      audio.removeAttribute( "src" );
      currentTrack = null;
    }
    return true;
  },

  scrubTo: function( value ) {
    audio.currentTime = value;
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
  }
};
