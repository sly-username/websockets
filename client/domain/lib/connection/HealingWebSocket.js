
var socket = Symbol( "socket" );

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
}
