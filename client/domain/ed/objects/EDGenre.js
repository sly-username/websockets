import define from "domain/ed/define-properties";
import EDDataObject from "domain/ed/objects/EDDataObject";

export default class EDGenre extends EDDataObject {
  static get TYPE() {
    return "genre";
  }

  constructor( args ) {
    if ( !( "type" in args ) ) {
      args.type = EDGenre.TYPE;
    }

    super( args );
    define.readOnly( this, [ "name" ], args );
  }
}
