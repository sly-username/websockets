import EDDataObject from "domain/ed/objects/EDDataObject";
import define from "domain/ed/define-properties";

export default class EDBadge extends EDDataObject {
  constructor( args ) {
    super( args );
    define.readOnly( this, [ "id", "name", "badgeType" ], args );
  }

  static get TYPE() {
    return "badge";
  }
}
