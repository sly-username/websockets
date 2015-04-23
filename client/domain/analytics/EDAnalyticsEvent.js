import define from "domain/ed/define-properties";

export default class EDAnalyticsEvent {
  constructor( args ) {
    define.readOnly( this, ["type", "eventBlock"], args );
  }
}
