import HealingWebSocket, { symbols as sym } from "domain/lib/connection/HealingWebSocket";
import url from "domain/ed/urls";

var token = 0,
  generateToken = () => token++;

export default class EDWebSocket extends HealingWebSocket {
  constructor() {
    super( url.path );
    //add auth on open events as first
  }

  get isAuthenticated() {
    // TODO cordova
    // send salt key to server compiled with cordova
    // receive access token
    return true;
  }

  request( data ) {
    var requestToken = generateToken();
    console.log( "token", requestToken );
    data.action[ "response-token" ] = requestToken;

    //return new Promise( function( resolve, reject ) {
    //  this.on( "message", function( msg ) {
    //    if ( msg.test( token ) ) {
    //      resolve( data );
    //      sym.off( "message" );
    //    } else {
    //      reject( data );
    //      socket.off( "message" );
    //    }
    //  });
    //});
  }
}
