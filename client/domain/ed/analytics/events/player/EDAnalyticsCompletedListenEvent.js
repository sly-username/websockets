/*jshint strict:false*/

import define from "domain/ed/define-properties";
import EDAnalyticsEvent from "domain/ed/analytics/events/EDAnalyticsEvent";

var eventKeys = [
  "trackId",
  "timecode"
];

export default class EDAnalyticsCompletedListenEvent extends EDAnalyticsEvent {
  static get TYPE() {
    return "completed-listen";
  }

  constructor( args ) {
    super( args );

    // Define Keys on this object
    define.enumReadOnly( this, eventKeys, args );
  }

  get valueKeys() {
    // returns a "clone"
    return eventKeys.slice();
  }
}
