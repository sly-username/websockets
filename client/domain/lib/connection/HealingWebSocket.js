/* jshint strict:false */
var socket = Symbol( "socket" ), // jshint ignore:line
  heal = Symbol( "heal" ); // jshint ignore:line

export default class HealingWebSocket {
  constructor( url, protocols ) {
    this[socket] = protocols == null ?
      new WebSocket( url ) :
      new WebSocket( url, protocols );
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
    this[socket].close();
  }

  send( data ) {
    if ( !( data instanceof ArrayBuffer || data instanceof Blob || typeof data === "string" ) ) {
      data = JSON.stringify( data );
    }

    if ( this[socket].isOpen ) {
      this[socket].send( data );
    } else {
      this[heal]( data );
    }
  }

  on( event, handler ) {
    this[socket].addEventListener( event, handler );
  }

  off( event, handler ) {
    this[socket].removeEventListener( event, handler );
  }

  one( eventName, handler ) {
    this.on( eventName, ( event ) => {
      this.off( eventName, handler );
      handler( event );
    });
  }

  [heal]( data ) {
    this[socket] = this[socket].protocols == null ?
      new WebSocket( this[socket].url ) :
      new WebSocket( this[socket].url, this[socket].protocols );

    this[socket].one( "open", event =>
      this[socket].send( data ) )
  }
}
