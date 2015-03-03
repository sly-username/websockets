/* jshint strict:false */
var socket = Symbol( "socket" ); // jshint ignore:line

export default class HealingWebSocket {
  constructor( url, protocols ) {
    this[socket] = protocols != null ?
      new WebSocket( url, protocols ) :
      new WebSocket( url );
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

  set extensions( value ) {
    this[socket].extensions = value;
    return value;
  }

  get protocol() {
    return this[socket].protocol;
  }

  set protocol( value ) {
    this[socket].protocol = value;
    return value;
  }

  get url() {
    return this[socket].url;
  }

  close() {

  }

  send( data ) {
    if ( this[socket].isOpen &&
      ( data instanceof ArrayBuffer || data instanceof Blob ||  typeof data === "string" )) {
      this[socket].send( data );
    } else {
      this[socket].send( JSON.stringify( data ));
    }
  }

  on( event, handler ) {
    this[socket].addEventListener( event, handler );
  }

  off( event, handler ) {
    this[socket].removeEventListener( event, handler );
  }

  one( event, handler ) {
    this[socket].on( event, function( event ) {
      [ event + "listener" ].call( this, event );
      this.off( event, handler );
    });
  }

}
