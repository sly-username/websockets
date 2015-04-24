/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDModel from "domain/ed/objects/EDModel";

export default class EDMedia extends EDModel {
  static get MODEL_TYPE() {
    return "media";
  }

  constructor( args ) {
    super( args );

    define.readOnly( this, [
      "profileId",
      "artId",
      "name",
      "genre",
      "original"
    ], args );

    define.readOnlyDeep( this, [ "phone", "tablet", "thumbnail" ], args );
  }
}
