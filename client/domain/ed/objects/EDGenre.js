import EDDataObject from "domain/ed/objects/EDDataObject";
import define from "domain/ed/define-properties";

export default class EDGenre extends EDDataObject {
  constructor( args ) {
    super( args );
    define.readOnly( this, [ "id", "type", "name" ], args );
  }
}
