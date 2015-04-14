import EDWebSocket from "domain/ed/connection/EDWebSocket";
import EventEmitter from "domain/lib/event/EventEmitter";

var edConnectionService = new EventEmitter([ "authenticated" ]),
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

        // return dataBlock ( profileId, userId )
        return responseData.data;
      }).catch(( error ) => {
        console.warn( "Issue authenticating in connection service" );
        console.error( error );
        throw error;
      });
  },

  deauthenticateSocket( ) {
    edSocket.close( 4000 );
  },

  send( route, priority=0, data ) {
    var json = {
        action: {
          route,
          priority
        }
      };

    // TODO create function for this
    json = Object.keys( data ).reduce(( prevJson, currKey ) => {
      prevJson[ currKey ] = data[ currKey ];
      return prevJson;
    }, json );

    return this.formattedSend( json );
  },

  request( route, priority=0, data ) {
    var json = {
        action: {
          route,
          priority
        }
      };

    json = Object.keys( data ).reduce(( prevJson, currKey ) => {
      prevJson[ currKey ] = data[ currKey ];
      return prevJson;
    }, json );

    return this.formattedRequest( json );
  },

  formattedSend( data ) {
    return edSocket.send( data );
  },

  formattedRequest( data ) {
    return edSocket.request( data );
  }
};
