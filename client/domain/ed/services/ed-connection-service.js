import EDWebSocket from "domain/ed/connection/EDWebSocket";

var edConnectionService,
  edSocket = new EDWebSocket();

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
      prop;

    for ( prop in json ) {
      if ( json.hasOwnProperty( prop ) ) {
        data[ prop ] = json[ prop ];
      }
    }

    data = this.formatDataObject( data );

    return this.formattedRequest( data );
  },

  formattedSend( data ) {
    return edSocket.send( data );
  },

  formattedRequest( data ) {
    return edSocket.request( data );
  },

  formatDataObject( data ) {
    // TODO could be a helper
    if ( !( data instanceof ArrayBuffer || data instanceof Blob || typeof data === "string" ) ) {
      data = JSON.stringify( data );
    }
    return data;
  }
};
