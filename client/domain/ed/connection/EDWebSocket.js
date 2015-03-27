var
  isAuthenticated = Symbol( "isAuthenticated" ),
  token = 0,
  edUserService = {
    sessionAuthJSON: {
      auth: {
        email: "mgray@eardish.com",
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
    this[ isAuthenticated ] = this.doAuthentication();
  }

  doAuthentication() {
    var credentials = edUserService.sessionAuthJSON,
      authenticatedEvent = createEvent( "authenticated", {
        detail: {
          credentials
        }
      });

    this.on( "authenticated", ( event ) => {
      return event.detail.credentials === edUserService.sessionAuthJSON;
    });

    this.dispatch( authenticatedEvent );
  }

  send( data ) {
    if ( !this[ isAuthenticated ] ) {
      this.once( "authenticated", event => {
        super.send( data );
      });
    }
  }

  request( data ) {
    var newToken = generateToken();

    if ( !this[ isAuthenticated ] && !( "auth" in data ) ) {
      return new Promise( ( resolve, reject ) => {
        this.once( "authenticated", () => {
          resolve( this.request( data ) );
        });
      });
    }

    data.action[ "response-token" ] = newToken;

    return new Promise( ( resolve, reject ) => {
      var handler = ( msg ) => {
        if ( msg.meta[ "request-token" ] === newToken ) {
          resolve( msg );
          this.off( "message", handler );
        }
      };

      this.on( "message", handler );
      super.send( data );
    });
  }

  [ symbols.heal ]( data ) {
    if ( !this[ isAuthenticated ] ) {
      this.once( "authenticated", event => {
        super[ symbols.heal ]( data );
      });
    }
  }
}
