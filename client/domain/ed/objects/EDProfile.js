import define from "domain/ed/define-properties";
import EDDataObject from "domain/ed/objects/EDDataObject";

export default class EDProfile extends EDDataObject {
  constructor( args ) {
    super( args );

    define.readOnly( this, [
      "id",
      "userId",
      "bio",
      "email",
      "zipcode",
      "displayName",
      "createdDate",
      "modifiedDate"
    ], args );
    define.readOnlyDeep( this, [ "name", "badgesEarned" ], args );
  }
}
