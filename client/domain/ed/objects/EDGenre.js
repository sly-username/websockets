import define from "domain/ed/define-properties";
import EDDataObject from "domain/ed/objects/EDDataObject";

export default class EDGenre extends EDDataObject {
  constructor( args ) {
    super( args );
    define.readOnly( this, [ "name" ], args );
  }
}
