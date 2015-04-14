/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDModel from "domain/ed/objects/EDModel";

export default class EDMedia extends EDModel {
  static get TYPE() {
    return "media";
  }

  constructor( args ) {
    super( args );
    define.readOnly( this, [ "original" ], args );
    define.readOnlyDeep( this, [ "phone", "tablet", "thumbnail" ], args );
  }
}
