/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDProfile from "domain/ed/objects/profile/EDProfile";

export default class EDFan extends EDProfile {
  static get TYPE(){
    return EDProfile.TYPE + "-fan";
  }

  constructor ( args ) {
    if ( !( "type" in args ) ) {
      args.type = EDFan.TYPE;
    }

    super( args );
    define.readOnly( this, [
      "yearOfBirth"
    ], args );
  }
}
