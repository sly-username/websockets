import EDWebSocket from "domain/ed/connection/EDWebSocket";

var
  edConnectionService,
  formatDataObject,
  edSocket = new EDWebSocket();

// helpers
formatDataObject = data => {
  if ( !( data instanceof ArrayBuffer || data instanceof Blob || typeof data === "string" ) ) {
    data = JSON.stringify( data );
  }
  return data;
};

export default edConnectionService = {
  send( data ) {
    return edSocket.send( data );
  },

  request( data ) {
    return edSocket.request( data );
  },

  formattedSend( data ) {
    data = formatDataObject( data );
    return this.send( data );
  },

  formattedRequest( data ) {
    data = formatDataObject( data );
    return this.request( data );
  }
};
