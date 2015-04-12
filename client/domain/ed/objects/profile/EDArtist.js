/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDProfile from "domain/ed/objects/profile/EDProfile";

export default class EDArtist extends EDProfile {
  constructor( args ) {
    super( args );
    define.readOnly( this, [
      "yearFounded"
    ], args );
  }
}
