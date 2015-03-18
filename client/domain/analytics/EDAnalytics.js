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
          "lat": 34.136620799999996,
          "lon": -118.39963999999999
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


    if( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(function ( pos ) {
        var coords = pos.coords;

        cb.location.lat = parseFloat( coords.latitude );
        cb.location.lon = parseFloat( coords.longitude );

      });
    }

    return cb.location;

  }

  static get version() {
    var cb = this.analyticsObj.common;
    return cb["client-version"];
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

    if( dd < 10 ) dd = '0' + dd;
    if( mm < 10 ) mm = '0' + mm;

    now = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;

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
    var json = this.analyticsObj,
      analyticsEvent;

    edEvent.commonBlock =  json.common;
    //analyticsEvent = new EDAnalyticsEvent( edEvent.event.type, edEvent );

    return;
  }

  static createEvent( eventName, constructorArgs ) {

    //TODO create custom event method
    //by passing in an eventName and constructors arguments
  }
}
