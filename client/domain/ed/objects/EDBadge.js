/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDModel from "domain/ed/objects/EDModel";

export default class EDBadge extends EDModel {
  static get MODEL_TYPE() {
    return "badge";
  }

  constructor( args ) {
    super( args );

    // TODO where does "dateAquired" go?

    define.readOnly( this, [
      "name",
      "badgeType"
    ], args );
  }
}
