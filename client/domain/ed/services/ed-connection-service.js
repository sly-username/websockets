import EDWebSocket from "domain/ed/connection/EDWebSocket";

var edConnectionService,
  edWebSocket = new EDWebSocket();

// todo remove for debug!
window.edWebSocket = edWebSocket;

export default edConnectionService = {
  send( route, priority=0, data ) {
    var json = {
        action: {
          route,
          priority
        }
      },
      prop;

    for ( prop in json ) {
      if ( json.hasOwnProperty( prop ) ) {
        data[ prop ] = json[ prop ];
      }
    }

    data = this.formatDataObject( data );

    return this.formattedSend( data );
  },

  request( route, priority=0, data ) {

    var json = {
        action: {
          route,
          priority
        }
      },
      prop,
      requestData;

    if ( !typeof data === "object" ) {
      requestData = JSON.parse( data );
    } else {
      requestData = data;
    }

    for ( prop in json ) {
      if ( json.hasOwnProperty( prop ) ) {
        requestData[ prop ] = json[ prop ];
      }
    }

    //requestData = this.formatDataObject( requestData );

    return this.formattedRequest( requestData );
  },

  formattedSend( data ) {
    return edWebSocket.send( data );
  },

  formattedRequest( data ) {
    return edWebSocket.request( data );
  },

  formatDataObject( data ) {
    // TODO could be a helper
    if ( !( data instanceof ArrayBuffer || data instanceof Blob || typeof data === "string" ) ) {
      data = JSON.stringify( data );
    }
    return data;
  }
};
