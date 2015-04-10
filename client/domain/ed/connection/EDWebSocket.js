var
  isAuthenticated = Symbol( "isAuthenticated" ),
  authenticateSocket,
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
      this.authenticate( edUserService.sessionAuthJSON.email, edUserService.sessionAuthJSON.password );
    });
    // todo
      //if ( true ) {
      //  authenticateSocket( this, {
      //    auth: edUserService.sessionAuthJSON
      //  });
      //}
  }

  get isAuthenticated() {
    return this[ isAuthenticated ];
  }

  //authenticate( email, password ) {
  //  var authBlock = {
  //    email,
  //    password
  //  };
  //
  //  //this.once( "message", event => {
  //  //  this[ isAuthenticated ] = true;
  //  //  this.dispatch( createEvent( "authenticated", {} ) );
  //  //});
  //
  //  this.request({
  //    auth: authBlock
  //  })
  //  .then( response => {
  //    this[ isAuthenticated ] = true;
  //    this.dispatch( createEvent( "authenticated" ) );
  //
  //    return response;
  //  }).catch( error => {
  //    console.error( "Issue Authenticating EDWebSocket" );
  //    console.error( error );
  //    throw error;
  //  });
  //
  //}

  authenticate( email, password ) {
    var authBlock = {
        auth: {
          email,
          password
        }
      };

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

        if ( data.status.code === 1 && typeof data.message.data.profileId === "string" ) {
          resolve( event );
          this.off( "message", checkForAuthResponse );
        }
      };

      this.on( "message", checkForAuthResponse );
      super.send( authBlock );
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
          responseData = JSON.parse( event );
          console.log( "responseData", responseData );
        } catch ( error ) {
          console.warn( "error in request handler" );
          console.error( error );
          responseData = event;
        }

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
