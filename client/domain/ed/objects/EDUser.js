/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDModel from "domain/ed/objects/EDModel";

export default class EDUser extends EDModel {
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
