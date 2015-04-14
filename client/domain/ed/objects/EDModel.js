
import define from "domain/ed/define-properties";
import EventEmitter from "domain/lib/event/EventEmitter";

export default class EDModel extends EventEmitter {
  static get TYPE() {
    return "object";
  }

  constructor( args ) {
    if ( !( "id" in args ) ) {
      throw new TypeError( "EDModel id argument not found" );
    }

    if ( !( "type" in args ) ) {
      throw new TypeError( "EDModel type argument not found" );
    }

    // call super to initialize EventEmitter properties
    super();
    define.readOnly( this, [ "id", "type" ], args );
  }

/*
  // Not Currently Supported on any system :(
  get [ Symbol.toStringTag ]() {
    return "EDModel";
  }
*/
}
