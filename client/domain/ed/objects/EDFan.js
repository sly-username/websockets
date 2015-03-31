import define from "domain/ed/define-properties";
import EDProfile from "domain/ed/objects/EDProfile";

export default class EDFan extends EDProfile {
  constructor ( args ) {
    super( args );
    define.readOnly( this, [
      "birthday"
    ], args );
    define.readOnlyDeep( this, [ "name" ], args );
  }
}
