var
  isAuthenticated = Symbol( "isAuthenticated" ),
  token = 0,
  edUserService = {
    sessionAuthJSON: {
      email: "intdev@eardish.com",
      password: "intdevpass"
    }
  },
  generateToken;

import { default as HealingWebSocket, symbols } from "domain/lib/connection/HealingWebSocket";
import url from "domain/ed/urls";
import createEvent from "domain/lib/event/create-event";
//import edUserService from "domain/ed/services/ed-user-service";

generateToken = function() {
  return ++token;
};

export default class EDWebSocket extends HealingWebSocket {
  constructor() {
    super( url.path );
    this[ isAuthenticated ] = false;

    this.on( "close", () => {
      console.log( "socket was closed" );
      this[ isAuthenticated ] = false;
    });

    this.on( "heal", () => {
      console.log( "socket is being healed" );
    });

    this.on( "open", () => {
      console.log( "socket opened! %o", this );

      // needs to authenticate after socket opens
      // where would we grab the credentials on initial open tho?
      this.authenticate(
        edUserService.sessionAuthJSON.email,
        edUserService.sessionAuthJSON.password
      );
    });
  }

  get isAuthenticated() {
    return this[ isAuthenticated ];
  }

  needsAuth( route ) {
    // TODO needs to check route arg and return a boolean
    // need routes applicable
    // or how can i test this without given routes?
    // also where do we check for this again? in every socket method?
    return true;
  }

  authenticate( email, password ) {
    var authBlock = {
      auth: {
        email,
        password
      }
    };

    // getting a "Cannot read property 'forEach' of undefined"
    // in the EventEmitter all of a sudden
    // do i need to import EventEmitter and create events?

    return new Promise(( resolve, reject ) => {
      var checkForAuthResponse = event => {
        var data;
        console.log( "received message event:", event );
        try {
          data = JSON.parse( event.data );
        } catch ( error ) {
          console.error( error );
          return;
        }

        // validate response
        if ( data.status.code === 1 && typeof data.message.data.profileId === "string" ) {
          resolve( event );
          this[ isAuthenticated ] = true;
          this.dispatch( createEvent( "authenticated", {
            detail: {
              task: "for future self"
            }
          }));
          this.off( "message", checkForAuthResponse );
        }
      };

      // send to socket & bind message events
      super.send( authBlock );
      this.on( "message", checkForAuthResponse );
    });
  }

  send( data ) {
    if ( !this[ isAuthenticated ] ) {
      this.once( "authenticated", event => {
        super.send( data );
      });
      return;
    }

    super.send( data );
  }

  request( data ) {
    var newToken;

    if ( data instanceof ArrayBuffer || data instanceof Blob || data instanceof String || typeof data === "string" ) {
      throw new TypeError( "EDWebSocket request function only accepts simple objects" );
    }

    console.log( "request called: %o", data );
    if ( !this[ isAuthenticated ] && !( "auth" in data ) ) {
      console.log( "in request, not authed, no auth block %o", data );
      return new Promise( ( resolve, reject ) => {
        this.once( "authenticated", () => {
          resolve( this.request( data ) );
        });
      });
    }

    if ( !data.hasOwnProperty( "action" ) ) {
      data.action = {};
    }

    newToken = generateToken();
    data.action.responseToken = newToken;

    return new Promise( ( resolve, reject ) => {
      var handler = ( event ) => {
        var responseData;

        try {
          responseData = JSON.parse( event.data );
          console.log( "responseData", responseData );
        } catch ( error ) {
          console.warn( "error in request handler" );
          console.error( error );
          responseData = event;
        }

        console.log( "responseDatadsadsadasdasdw943u29329", responseData );

        if ( "meta" in responseData.data && responseData.data.meta.requestToken === newToken ) {
          resolve( responseData );
          this.off( "message", handler );
        }
      };

      this.on( "message", handler );
      console.log( "send in request! %o", data );
      console.log( "ready? ", this.readyState );
      super.send( data );
    });
  }

  // do we need this method?
  //[ symbols.heal ]( data ) {
  //  //if ( !this[ isAuthenticated ] ) {
  //  //  this[ performAuth ]();
  //  //  this.once( "authenticated", event => {
  //  //    super[ symbols.heal ]( data );
  //  //  });
  //  //}
  //
  //  // todo: hasCreds/openSesh
  //  if ( true ) {
  //    authenticateSocket( this, {
  //      auth: edUserService.sessionAuthJSON
  //    });
  //  }
  //  super[ symbols.heal ]( data );
  //}

}
