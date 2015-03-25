var token = 0,
  generateToken,
  userService = {
    auth: {
      user: "macy gray"//,
      //password: "itriedbutichoked"
    }
  };

generateToken = () => ++token;

import { default as HealingWebSocket, symbols } from "domain/lib/connection/HealingWebSocket";
import url from "domain/ed/urls";

export default class EDWebSocket extends HealingWebSocket {
  constructor() {
    super( url.path );

    var self = this,
      evtQueue = [];

    this.on( "open", function( event ) {
      if ( this.isAuthenticated ) {

      } else {
        console.log( "event", event );
        evtQueue.push( event );
      }
    });

    console.log( "evtQueue", evtQueue );

    //while ( evtQueue.length > 0 ) {
    //  ( evtQueue.shift() )();
    //}


  }

  get isAuthenticated() {
    for ( let key of Object.keys( userService.auth ) ) {
      let val = userService.auth[ key ];
      return val != null;
    }
  }

  request( data ) {
    var newToken = generateToken(),
      self = this;

    if ( !( data instanceof ArrayBuffer || data instanceof Blob || typeof data === "string" ) ) {
      data = JSON.stringify( data );
    }

    data.action[ "response-token" ] = newToken;

    return new Promise( function( resolve, reject ) {
      self.on( "message", function( msg ) {
        if ( msg.meta[ "request-token" === newToken ] ) {
          resolve( data );
        } else {
          self.on( "close", function() {
            [ symbols.socket ].close();
            reject( data );
          });
        }
        self.off( "message" );
      });
    });
  }

  //clear( name ) {
  //  super.clear( name );
  //  this.on( "open", function() {
  //
  //  });
  //}

  [ symbols.heal ]( data ) {
    if ( this.isAuthenticated ) {
      super[ symbols.heal ]( data );
    }
  }
}
