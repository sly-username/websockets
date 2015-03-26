var
  token = 0,
  edUserService = {
    sessionAuthJSON: {
      auth: {
        user: "macygray",
        password: "itriedbutchoked"
        //user: null,
        //password: null
      }
    }
  },
  generateToken;

import { default as HealingWebSocket, symbols } from "domain/lib/connection/HealingWebSocket";
import url from "domain/ed/urls";
import createEvent from "domain/lib/event/create-event";

generateToken = function() {
  return ++token;
};

export default class EDWebSocket extends HealingWebSocket {
  constructor() {
    super( url.path );
  }

  get isAuthenticated() {
    return this.doAuthentication();
  }

  doAuthentication() {
    var credentials = edUserService.sessionAuthJSON,
      authenticatedEvent = createEvent( "authenticated", {
        detail: {
          credentials
        }
      });

    this.dispatch( authenticatedEvent );
  }

  send( data ) {
    if ( !this.isAuthenticated ) {
      this.once( "authenticated", event => {
        this.send( data );
      });
    }
  }

  request( data ) {
    var newToken = generateToken(),
      self = this;

    if ( !this.isAuthenticated && !( "auth" in data ) ) {
      return new Promise( function( resolve, reject ) {
        this.once( "authenticated", function() {
          resolve( self.request( data ) );
        });
      });
    }

    data.action[ "response-token" ] = newToken;

    return new Promise( function( resolve, reject ) {
      var handler = function( msg ) {
        if ( msg.meta["request-token"] === newToken ) {
          resolve( data );
          self.off( "message", handler );
        }
      };

      self.on( "message", handler );

    });
  }

  [ symbols.heal ]( data ) {
    if ( !this.isAuthenticated ) {
      this.once( "authenticated", event => {
        this[ symbols.heal ]( data );
      });
    }
  }
}
