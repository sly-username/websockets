/* jshint strict:false */

import EventEmitter from "domain/lib/event/EventEmitter";

var socket = Symbol( "socket" ), // jshint ignore:line
  heal = Symbol( "heal" ), // jshint ignore:line
  socketEvents = [ "open", "close", "message", "error" ],
  createSocket = function( url, protocols ) {
    // TODO MAKE ACTUALLY WORK
    this[socket] = protocols == null ?
      new WebSocket( url ) :
      new WebSocket( url, protocols );

    EventEmitter.bindToEventTarget( this, this[ socket ], socketEvents );
  };

export default class HealingWebSocket extends EventEmitter {
  constructor( url, protocols ) {
    super( [ "heal", ...socketEvents ] );

    createSocket.call( this, url, protocols );
  }

  get isOpen() {
    return this[socket].readyState === WebSocket.OPEN;
  }

  get readyState() {
    return this[socket].readyState;
  }

  get binaryType() {
    return this[socket].binaryType;
  }

  set binaryType( value ) {
    this[socket].binaryType = value;
    return value;
  }

  get bufferedAmount() {
    return this[socket].bufferedAmount;
  }

  get extensions() {
    return this[socket].extensions;
  }

  get protocol() {
    return this[socket].protocol;
  }

  get url() {
    return this[socket].url;
  }

  close() {
    this[socket].close();
  }

  send( data ) {
    if ( !( data instanceof ArrayBuffer || data instanceof Blob || typeof data === "string" ) ) {
      data = JSON.stringify( data );
    }

//    console.log( "send called, %s - %o", this.readyState, data );

    if ( this.isOpen ) {
      this[socket].send( data );
    } else if ( this.readyState === WebSocket.CONNECTING ) {
      this.one( "open", ( event ) => {
        this.send( data );
      });
    } else {
      this[heal]( data );
    }
  }

  [heal]( data ) {
    console.log( "healing: %o", this );

    this[socket] = this[socket].protocols == null ?
      new WebSocket( this[socket].url ) :
      new WebSocket( this[socket].url, this[socket].protocols );

    this.one( "open", event => {
      this.send( data )
    });
  }

}
