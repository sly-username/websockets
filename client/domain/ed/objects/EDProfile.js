import define from "domain/ed/define-properties";
import EDDataObject from "domain/ed/objects/EDDataObject";

export default class EDProfile extends EDDataObject {
  constructor( args ) {
    super( args );
    define.readOnly( this, [
      "userId",
      "email",
      "zipcode",
      "displayName",
      "createdDate",
      "modifiedDate"
    ], args );
    define.readOnlyDeep( this, "badgesEarned", args );
  }
}
