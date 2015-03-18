var EDApp = {
    version: "001"
  },
  edSessionService = {
    currentId: 0
  },
  routeProvider = {
    currentRoute: ""
  };

export default class EDAnalytics {

  static get commonBlock() {
    return {
      device: this.deviceBlock,
      "client-version": EDApp.version,
      location: this.locationBlock,
      time: this.formattedTime,
      user: edSessionService.currentId,
      "view-route": routeProvider.currentRoute,
      "view-state": this.viewStateBlock,
      session: this.sessionBlock
    }
  }

  static get deviceBlock() {
    return {
      "type": "",
      "make": "",
      "model": "",
      "carrier": "",
      "OS": ""
    };
  }

  static get viewStateBlock() {
    return {
      "player-state": {
        "song-id": 0,
        "playing": true,
        "timecode": ""
      }
    };
  }

  static get sessionBlock() {
    //TODO use session service for this
    return {
      duration: 0
    };
  }

  static get locationBlock() {
    let loc = {
      "lat": 0,
      "lon": 0
    };

    if( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(function ( pos ) {
        var coords = pos.coords;

        loc.lat = coords.latitude;
        loc.lon = coords.longitude;
      });
    }

    return loc;

  }

  static get version() {
    return EDApp.version;
  }

  static get time() {
    let date = new Date(),
      dd = date.getDate(),
      mm = date.getMonth()+1,
      yyyy = date.getFullYear(),
      hh = date.getHours(),
      min = date.getMinutes(),
      ss = date.getSeconds(),
      now;

    if( dd < 10 ) {
      dd = '0' + dd;
    }

    if( mm < 10 ) {
      mm = '0' + mm;
    }

    now = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;

    return now;
  }

  static get user() {
    return edSessionService.currentId;
  }

  static get route() {
    return routeProvider.currentRoute;
  }

  static send( edEvent ) {
    var json = {
      "common": this.commonBlock,
      "event": edEvent.eventBlock
    };

    console.log( json );

    return;
  }

  static createEvent( eventName, constructorArgs ) {
    //TODO create custom event method
    //by passing in an eventName and constructors arguments
  }
}
