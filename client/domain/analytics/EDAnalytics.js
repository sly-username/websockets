var EDApp = {
    version: "001"
  },
  edSessionService = {
    currentId: 0
  },
  routeProvider = {
    currentRoute: ""
  },
  edAnalyticsService;

export default edAnalyticsService = {
  get commonBlock() {
    return {
      device: this.deviceBlock,
      "client-version": EDApp.version,
      location: this.locationBlock,
      time: this.formattedTime,
      user: edSessionService.currentId,
      "view-route": routeProvider.currentRoute,
      "view-state": this.viewStateBlock,
      session: this.sessionBlock
    };
  },

  get deviceBlock() {
    // TODO to be pulled in by cordova
    return {
      type: "",
      make: "",
      model: "",
      carrier: "",
      OS: ""
    };
  },

  get viewStateBlock() {
    return {
      "player-state": {
        "song-id": 0,
        playing: true,
        timecode: ""
      }
    };
  },

  get sessionBlock() {
    // TODO use session service for this
    return {
      duration: 0
    };
  },

  get locationBlock() {
    let loc = {
      lat: 0,
      lon: 0
    };

    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition( function( pos ) {
        var coords = pos.coords;

        loc.lat = coords.latitude;
        loc.lon = coords.longitude;
      } );
    }

    return loc;
  },

  get version() {
    return EDApp.version;
  },

  get time() {
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
  },

  send( edEvent ) {
    var json = {
      common: this.commonBlock,
      event: edEvent.eventBlock
    };

    return;
  },

  createEvent( eventName, constructorArgs ) {
    // TODO create custom event method
  }
};
