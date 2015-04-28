/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDModel from "domain/ed/objects/EDModel";

export default class EDProfile extends EDModel {
  static get MODEL_TYPE() {
    return "profile";
  }

  constructor( args ) {
    super( args );

    define.enumReadOnly( this, [
      "userId",
      "artId",
      "artUrl",
      "contactId",
      "bio",
      "website",
      "hometown"
    ], args );

    define.enumReadOnlyDeep( this, [
      "name",
      "art",
      "address",
      "socialLinks",
      "badgesEarned"
    ], args );
  }
}
