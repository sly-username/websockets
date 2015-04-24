/*jshint strict: false*/

import define from "domain/ed/define-properties";
import EDModel from "domain/ed/objects/EDModel";

export default class EDUser extends EDModel {
  static get MODEL_TYPE() {
    return "user";
  }

  constructor( args ) {
    super( args );
    define.readOnly( this, [ "username", "email", "birthday" ], args );
    define.readOnlyDeep( this, [ "name" ], args );
  }
}
