/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDArtist from "domain/ed/objects/profile/EDArtist";

export default class EDArtistGroup extends EDArtist {
  static get TYPE() {
    return "profile-artist-group";
  }

  constructor( args ) {
    super( args );
    // TODO add artist group (band) only properties
//    define.readOnly( this, [], args );
  }
}
