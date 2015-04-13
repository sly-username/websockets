import EDDataObject from "domain/ed/objects/EDDataObject";
import define from "domain/ed/define-properties";

export default class EDBadge extends EDDataObject {
  static get TYPE() {
    return "badge";
  }

  constructor( args ) {
    if ( !( "type" in args ) ) {
      args.type = EDBadge.TYPE;
    }

    super( args );
    define.readOnly( this, [ "name", "badgeType" ], args );
  }

  static get TYPE() {
    return "badge";
  }
}
