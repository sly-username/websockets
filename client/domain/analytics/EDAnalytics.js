export default class EDAnalytics {

  static get commonBlock() {
    var analyticsObj = {
      "common": {
        "device": {
          "type": "",
          "make": "",
          "model": "",
          "carrier": "",
          "OS": ""
        },
        "client-version": "001",
        "location": {
          "lat": 0,
          "lon": 0
        },
        "time": "",
        "user": 0,
        "view-route": "",
        "view-state": {
          "player-state": {
            "song-id": 0,
            "playing": true,
            "timecode": ""
          }
        },
        "session": {
          "duration": 0
        }
      }
    };

    this.analyticsObj = analyticsObj;
    return analyticsObj.common;

  }

  static get deviceBlock() {
    var cb = this.analyticsObj.common;
    return cb.device;
  }

  static get viewStateBlock() {
    var cb = this.analyticsObj.common;
    return cb["view-state"];
  }

  static get sessionBlock() {
    var cb = this.analyticsObj.common;
    return cb.session;
  }

  static get locationBlock() {
    var cb = this.analyticsObj.common;

    navigator.geolocation.getCurrentPosition (function ( pos ) {
      var coords = pos.coords;

      cb.location.lat = coords.latitude;
      cb.location.lon = coords.longitude;

    });

    console.log( cb );
    return cb.location;


  }

  static get version() {
    var cb = this.analyticsObj.common;
    return cb["client-version"];
  }

  static get time() {
    var date = new Date(),
      dd = date.getDate(),
      mm = date.getMonth()+1,
      yyyy = date.getFullYear(),
      now;

    if( dd < 10 ) dd = '0' + dd;
    if( mm < 10 ) mm = '0' + mm;

    //TODO add hh:mins:ss
    now = `${yyyy}-${mm}-${dd}`;

    return now;
  }

  static get user() {
    var cb = this.analyticsObj.common;
    return cb.user;
  }

  static get route() {
    var cb = this.analyticsObj.common;
    return cb["view-route"];
  }

  static send( edEvent ) {
    var json = this.analyticsObj;
    edEvent.commonBlock =  json.common;
    //return undefined;
  }

  static createEvent( eventName, constructorArgs ) {

  }

}
