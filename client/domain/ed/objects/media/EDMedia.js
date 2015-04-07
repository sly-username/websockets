import define from "domain/ed/define-properties";
import EDDataObject from "domain/ed/objects/EDDataObject";

export default class EDMedia extends EDDataObject {
  constructor( args ) {
    super( args );
    define.readOnly( this, [ "original" ], args );
    define.readOnlyDeep( this, [ "phone", "tablet", "thumbnail" ], args );
  }
}
