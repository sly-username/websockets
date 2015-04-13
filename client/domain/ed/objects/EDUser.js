/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDDataObject from "domain/ed/objects/EDDataObject";

export default class EDUser extends EDDataObject {
  static get TYPE() {
    return "user";
  }

  constructor( args ) {
    if ( !( "type" in args ) ) {
      args.type = EDUser.TYPE;
    }

    super( args );
    define.readOnly( this, [ "username", "email", "birthday" ], args );
    define.readOnlyDeep( this, [ "name" ], args );
  }
}
