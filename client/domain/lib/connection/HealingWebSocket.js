/* jshint strict:false */
var socket = Symbol( "socket" ), // jshint ignore:line
  heal = Symbol( "heal" ); // jshint ignore:line

export default class HealingWebSocket {
  constructor( url, protocols ) {
    this.oldUrl = url;
    this.oldProtocols = protocols;
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
    this[socket].close();
  }

  send( data ) {
    if ( !( data instanceof ArrayBuffer || data instanceof Blob || typeof data === "string" ) ) {
      data = JSON.stringify( data );
    }

    if ( this[socket].isOpen ) {
      this[socket].send( data );
    } else {
      this.one( "open", ( event ) =>
        this[socket].send( data ));
    }
  }

  on( event, handler ) {
    this[socket].addEventListener( event, handler );
  }

  off( event, handler ) {
    this[socket].removeEventListener( event, handler );
  }

  one( event, handler ) {
    //this.on( event, ( event ) => {
      //handler();
      this.off( event, handler );
    //});
  }

  [heal]( data ) {
    this[socket] = this.oldProtocols != null ?
      new WebSocket( this.oldUrl, this.oldProtocols ) :
      new WebSocket( this.oldUrl );

    this[socket].one( "open", event =>
      this[socket].send( data ) )
  }

}
