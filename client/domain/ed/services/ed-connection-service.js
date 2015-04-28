import EDWebSocket from "domain/ed/connection/EDWebSocket";
import checkRoute from "domain/ed/connection/route-auth-check";

var
  edConnectionService,
  needsAuth,
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

  send( route, priority=10, data={} ) {
    var
      json = joinData( data, {
        action: {
          route,
          priority
        }
      });

    if ( checkRoute.needsAuth( route ) && !edSocket.isAuthenticated ) {
      edSocket.once( "authenticated", () => {
        this.formattedSend( json );
      });
      return;
    }

    this.formattedSend( json );
    return;
  },

  request( route, priority=10, data={} ) {
    var
      json = joinData( data, {
        action: {
          route,
          priority
        }
      });

    return new Promise(( resolve, reject ) => {
      if ( checkRoute.needsAuth( route ) && !edSocket.isAuthenticated ) {
        edSocket.once( "authenticated", () => {
          resolve( this.formattedRequest( json ) );
        });

        return;
      }

      resolve( this.formattedRequest( json ) );
    });
  },

  // these two functions mainly used by analytics send requests
  formattedSend( data ) {
    return edSocket.send( data );
  },

  formattedRequest( data ) {
    return edSocket.request( data ).then( parseSocketMessage );
  }
};
