/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDProfile from "domain/ed/objects/profile/EDProfile";

export default class EDArtist extends EDProfile {
  static get TYPE() {
    return EDProfile.TYPE + "-artist";
  }

  constructor( args ) {
    if ( !( "type" in args ) ) {
      args.type = EDArtist.TYPE;
    }

    super( args );
    define.readOnly( this, [
      "yearFounded"
    ], args );
  }
}
