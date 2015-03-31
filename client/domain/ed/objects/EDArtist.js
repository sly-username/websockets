import define from "domain/ed/define-properties";
import EDProfile from "domain/ed/objects/EDProfile";

export default class EDArtist extends EDProfile {
  constructor( args ) {
    super( args );
    define.readOnly( this, [
      "artistName",
      "yearFounded",
      "website"
    ], args );
  }
}
