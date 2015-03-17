
import define from "domain/ed/define-properties";
import EventEmitter from "domain/lib/event/EventEmitter";

export default class EDDataObject extends EventEmitter {
  static get TYPE() {
    return "object";
  }

  constructor( args ) {
    if ( !( "type" in args ) ) {
      args.type = EDDataObject.TYPE;
    }

    // call super to initialize EventEmitter properties
    super();
    define.readOnly( this, [ "id", "type" ], args );
  }

  /**
   * Not Currently Supported on any system :(
   */
  get [ Symbol.toStringTag ]() {
    return "EDDataObject";
  }
}
