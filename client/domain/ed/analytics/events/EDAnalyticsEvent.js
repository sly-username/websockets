import define from "domain/ed/define-properties";

export default class EDAnalyticsEvent {
  constructor( args ) {
    define.enumReadOnly( this, [
      "type"
    ], args );
  }

  get values() {
    return this.valueKeys.reduce(function( json, currKey ) {
      json[ currKey ] = this[ currKey ];
      return json;
    }, {});
  }

  get eventBlock() {
    return {
      type: this.type,
      values: this.values
    };
  }
}
