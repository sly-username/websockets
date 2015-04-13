
import define from "domain/ed/define-properties";
import EventEmitter from "domain/lib/event/EventEmitter";

export default class EDDataObject extends EventEmitter {
  static get TYPE() {
    return "object";
  }

  constructor( args ) {
    if ( !( "id" in args ) ) {
      throw new TypeError( "EDDataObject id argument not found" );
    }

    if ( !( "type" in args ) ) {
      throw new TypeError( "EDDataObject type argument not found" );
    }

    // call super to initialize EventEmitter properties
    super();
    define.readOnly( this, [ "id", "type" ], args );
  }

/*
  // Not Currently Supported on any system :(
  get [ Symbol.toStringTag ]() {
    return "EDDataObject";
  }
*/
}
