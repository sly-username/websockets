import EDWebSocket from "domain/ed/connection/EDWebSocket";
import EventEmitter from "domain/lib/event/EventEmitter";

var edConnectionService,
  edSocket = new EDWebSocket(),
  parseSocketMessage = function( response ) {
    if ( typeof response.data === "string" ) {
      return JSON.parse( response.data );
    }

    return response.data;
  };

// todo remove for debug!
window.edSocket = edSocket;

export default edConnectionService = {
  authenticateConnection( email, password ) {
    return edSocket.authenticate( email, password )
      .then( parseSocketMessage )
      .then( parsedResponse => {
        // return dataBlock ( profileId, userId )
        return parsedResponse.data;
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
    return edSocket.send( data ).then( parseSocketMessage );
  },

  formattedRequest( data ) {
    return edSocket.request( data ).then( parseSocketMessage );
  }
};
