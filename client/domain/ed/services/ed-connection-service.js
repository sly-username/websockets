import EDWebSocket from "domain/ed/connection/EDWebSocket";

var edConnectionService,
  edSocket = new EDWebSocket();

// todo remove for debug!
window.edSocket = edSocket;

export default edConnectionService = {
  authenticateConnection( email, password ) {
    return edSocket.authenticate( email, password )
      .then(( response ) => {
        var responseData;

        try {
          responseData = JSON.parse( response.data );
        } catch ( error ) {
          console.warn( "error in request handler" );
          console.error( error );
          responseData = response.data;
        }

        return responseData.message.data;
      }).catch(( error ) => {
        console.warn( "Issue authenticating in connection service" );
        console.error( error );
        throw error;
      });
  },

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
      requestData,
      prop;

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

    // doesn't like stringified data
    //requestData = this.formatDataObject( requestData );

    return this.formattedRequest( requestData );
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
