import EDWebSocket from "domain/ed/connection/EDWebSocket";

var edConnectionService,
  edSocket = new EDWebSocket();

export default edConnectionService = {
  send( data ) {
    return edSocket.send( data );
  },

  request( data ) {
    return edSocket.request( data );
  },

  formattedSend( data ) {
    data = this.formatDataObject( data );
    return this.send( data );
  },

  formattedRequest( data ) {
    data = this.formatDataObject( data );
    return this.request( data );
  },

  formatDataObject( data ) {
    // TODO could be a helper function?
    if ( !( data instanceof ArrayBuffer || data instanceof Blob || typeof data === "string" ) ) {
      data = JSON.stringify( data );
    }
    return data;
  }
};
