import define from "domain/ed/define-properties";
import EventEmitter from "domain/lib/connection/EventEmitter";

export default class EDDataObject extends EventEmitter {
  constructor( args ) {
    define.readOnly( this, [ "id", "type" ], args );
  }

  get [ Symbol.toStringTag ]() {
    return "EDDataObject";
  }
}


