/*jshint strict:false*/
var
  edAnalyticsService,
  lastKnownLocation = {
    lat: 0,
    long: 0
  },
  updateLocation = function() {
    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(function( pos ) {
        lastKnownLocation.lat = pos.coords.latitude;
        lastKnownLocation.long = pos.coords.longitude;
      });
    }
  };

import EDAnalyticsEvent from "domain/ed/analytics/events/EDAnalyticsEvent";
import edConnectionService from "domain/ed/services/ed-connection-service";
import edUserService from "domain/ed/services/ed-user-service";
import edPlayerService from "domain/ed/services/ed-player-service";

updateLocation();

export default edAnalyticsService = {
  get commonBlock() {
    return {
      device: this.deviceBlock,
      "client-version": this.version,
      location: this.locationBlock,
      time: this.formattedTime,
      user: edUserService.currentUserId,
      "view-route": window.location.pathname,
      "view-state": this.viewStateBlock,
      session: this.sessionBlock
    };
  },

  get deviceBlock() {
    // TODO to be pulled in by cordova
    return {
      type: window.navigator.userAgent,
      make: "",
      model: "",
      carrier: "",
      OS: window.navigator.platform
    };
  },

  get viewStateBlock() {
    var currentPlayerStats = edPlayerService.currentStats;

    return {
      "player-state": {
        trackId: currentPlayerStats.playing.id,
        playing: edPlayerService.isPlaying,
        timecode: currentPlayerStats.time,
        queueLength: edPlayerService.queue.length
      }
    };
  },

  get sessionBlock() {
    // TODO use session service for this
    return {
      duration: edUserService.sessionDuration
    };
  },

  get locationBlock() {
    updateLocation();
    return lastKnownLocation;
  },

  get version() {
    return "0.0.1";
  },

  get time() {
    /*
    let date = new Date(),
      dd = date.getDate(),
      mm = date.getMonth() + 1,
      yyyy = date.getFullYear(),
      hh = date.getHours(),
      min = date.getMinutes(),
      ss = date.getSeconds();

    if ( dd < 10 ) {
      dd = "0" + dd;
    }

    if ( mm < 10 ) {
      mm = "0" + mm;
    }

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
    */
    return ( new Date() ).toISOString();
  },

  /**
   * @method send
   */
  send( ...args ) {
    var event;

    if ( args.length === 1 && args[0] instanceof EDAnalyticsEvent ) {
      event = args[ 0 ];
    } else {
      event = this.createEvent( ...args );
    }

    edConnectionService.formattedSend({
      analytics: {
        common: this.commonBlock,
        event: event.eventBlock
      }
    });
  },

  createEvent( eventName, constructorArgs ) {
    // TODO create custom event method
  }
};
