import HealingWebSocket from "domain/lib/connection/HealingWebSocket";
import url from "domain/ed/urls";

export default class EDWebSocket extends HealingWebSocket {
  constructor() {
    super( url.path );
    //return this;
  }

  get isAuthenticated() {
    return true;
  }

  request( data ) {
    var promise, socket, token;
    console.log( "this", this );

    // TODO cordova
    // send salt key to server compiled with cordova
    // receive access token

    promise = new Promise( function( resolve, reject ) {
      socket.onmessage = function( msg ) {
        if ( msg.test( token ) ) {
          resolve( data );
          socket.off( "message" );
        } else {
          reject( data );
          socket.off( "message" );
        }
      };
    });

    return promise;
  }
}
