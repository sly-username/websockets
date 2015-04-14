/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDDataObject from "domain/ed/objects/EDDataObject";

export default class EDProfile extends EDDataObject {
  static get TYPE() {
    return "profile";
  }

  constructor( args ) {
    super( args );

    define.readOnly( this, [
      "userId",
      "artId",
      "contactId",
      "bio",
      "email",
      "zipcode",
      "website",
      "hometown",
      "createdDate",
      "modifiedDate"
    ], args );

    define.readOnlyDeep( this, [ "name", "socialLinks", "badgesEarned" ], args );
  }
}
