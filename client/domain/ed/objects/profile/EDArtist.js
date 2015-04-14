/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDProfile from "domain/ed/objects/profile/EDProfile";

export default class EDArtist extends EDProfile {
  static get TYPE() {
    return "profile-artist-solo";
  }

  constructor( args ) {
    super( args );
    define.readOnly( this, [
      "genreId",
      "influencedBy",
      "displayName",
      "yearFounded"
    ], args );
  }
}
