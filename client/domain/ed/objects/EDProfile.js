import define from "domain/ed/define-properties";
import EDDataObject from "domain/ed/objects/EDDataObject";

export default class EDProfile extends EDDataObject {
  constructor( args ) {
    super( args );

    var badgesEarned = [],
      Struct = BadgePair => {
        Object.keys( BadgePair ).forEach( key => {
          Object.defineProperty( this, key, {
            value: BadgePair[ key ]
          });
          badgesEarned.push( key );
        });
        return new Struct( BadgePair );
      };

    define.readOnly( this, [
      "userId",
      "email",
      "zipcode",
      "displayName",
      "createdDate",
      "modifiedDate"
    ], args );
    define.readOnlyDeep( this, badgesEarned, args );
  }
}
