/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDModel from "domain/ed/objects/EDModel";

export default class EDBadge extends EDModel {
  static get TYPE() {
    return "badge";
  }

  constructor( args ) {
    super( args );
    define.readOnly( this, [
      "name",
      "badgeType"
    ], args );
  }
}
