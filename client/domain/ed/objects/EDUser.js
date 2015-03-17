
import define from "domain/ed/define-properties";
import EDDataObject from "domain/ed/objects/EDDataObject";

export default class EDUser extends EDDataObject {
  static get TYPE() {
    return "user";
  }

  constructor( args ) {
    super();
    define.readOnly( this, [ "username", "email" ], args );
  }
}
