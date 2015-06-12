/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDModel from "domain/ed/objects/EDModel";
import EDBadge from "domain/ed/objects/EDBadge";

export default class EDProfile extends EDModel {
  static get MODEL_TYPE() {
    return "profile";
  }

  constructor( args ) {

    args.badges = args.badges.map( badge => new EDBadge( badge ));

    super( args );

    define.enumReadOnly( this, [
      "userId",
      "artId",
      "artUrl",
      "contactId",
      "displayName",
      "bio",
      "website",
      "hometown"
    ], args );

    define.enumReadOnlyDeep( this, [
      "name",
      "art",
      "address",
      "socialLinks",
      "badges"
    ], args );
  }

  get fullName() {
    return `${this.name.first} ${this.name.last}`;
  }
}
