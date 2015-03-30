import define from "domain/ed/define-properties";
import EDDataObject from "domain/ed/objects/EDDataObject";

export default class EDProfile extends EDDataObject {
  constructor( args ) {
    super( args );
    define.configRO( this, [
      "userId",
      "name", // how do i account for the first and last name?
      "zipcode",
      "displayName",
      "birthday",
      "bio",
      "website",
      "yearFounded"
    ], args );
    define.readOnly( this, [ "createdDate" ], args )
    define.readOnlyDeep( this, [ "badgesEarned" ], args );
  }
}
