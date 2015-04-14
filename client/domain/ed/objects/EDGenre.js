import define from "domain/ed/define-properties";
import EDModel from "domain/ed/objects/EDModel";

export default class EDGenre extends EDModel {
  static get TYPE() {
    return "genre";
  }

  constructor( args ) {
    super( args );
    define.readOnly( this, [ "name" ], args );
  }
}
