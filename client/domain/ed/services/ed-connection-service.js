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

export default edConnectionService = {};
