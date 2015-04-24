
import define from "domain/ed/define-properties";
import EventEmitter from "domain/lib/event/EventEmitter";

export default class EDModel extends EventEmitter {
  static get MODEL_TYPE() {
    return "base";
  }

  constructor( args ) {
    if ( !( "id" in args ) ) {
      throw new TypeError( "EDModel id argument not found" );
    }

    if ( !( "type" in args ) ) {
      throw new TypeError( "EDModel type argument not found" );
    }

    if ( !( "modelType" in args ) ) {
      throw new TypeError( "EDModel modelType argument not found" );
    }

    // call super to initialize EventEmitter properties
    super();
    define.readOnly( this, [ "id", "type", "modelType" ], args );

    // TODO REMOVE WHEN STANDARDIZED
    // This is for catching any data that might slip through the cracks
    define.readOnlyDeep( this, [ "raw" ], {
      raw: args
    });
  }

/*
  // Not Currently Supported on any system :(
  get [ Symbol.toStringTag ]() {
    return "EDModel";
  }
*/
}
