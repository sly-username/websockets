import EDWebSocket from "domain/ed/connection/EDWebSocket";
import checkRoute from "domain/ed/check-route-auth";

var edConnectionService, needsAuth,
  edSocket = new EDWebSocket(),
  parseSocketMessage = function( response ) {
    if ( typeof response.data === "string" ) {
      return JSON.parse( response.data );
    }

    return response.data;
  },
  joinData = function( dataObject, jsonObject ) {
    return Object.keys( dataObject ).reduce(( prevJson, currKey ) => {
      prevJson[ currKey ] = dataObject[ currKey ];
      return prevJson;
    }, jsonObject );
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

    if ( !checkRoute.needsAuth( route )) {
      json = joinData( data, json );
    }

    return this.formattedSend( json );
  },

  request( route, priority=0, data ) {
    var json = {
        action: {
          route,
          priority
        }
      };

    if ( !checkRoute.needsAuth( route )) {
      json = joinData( data, json );
    }

    return this.formattedRequest( json );
  },

  // these two functions mainly used by analytics send requests
  formattedSend( data ) {
    return edSocket.send( data ).then( parseSocketMessage );
  },

  formattedRequest( data ) {
    return edSocket.request( data ).then( parseSocketMessage );
  }
};
