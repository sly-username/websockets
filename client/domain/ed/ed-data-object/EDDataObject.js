import define from "domain/ed/define-properties";

var toStringTag = Symbol( "toStringTag" ); // jshint ignore:line

export default class EDDataObject {
  constructor( args, id, type ) {
    this.args = args;
    args.id = id;
    args.type = type;
  }
}

export class EDDataObject extends EventEmitter {
  constructor( args ) {
    define.readOnly( this, [ "id", "name" ], args );
    define.readOnly( this, [ "type", "object" ], args );

    this[ toStringTag ] = args;
  }
}
