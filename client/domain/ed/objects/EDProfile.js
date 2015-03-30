import define from "domain/ed/define-properties";
import EDDataObject from "domain/ed/objects/EDDataObject";

export default class EDProfile extends EDDataObject {
  constructor( args ) {
    super( args );
    define.configRO( this, [
      "zipcode",
      "displayName",
      "birthday",
      "bio",
      "website",
      "yearFounded"
    ], args );
    define.configRODeep( this, [ "name" ], args );
    // should i define it this way to account for name having its own set of key/value pairs?
    define.readOnly( this, [ "userId", "createdDate" ], args );
    define.readOnlyDeep( this, [ "badgesEarned" ], args );
  }
}
