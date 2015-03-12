/* jshint strict:false */
var handlerMap = Symbol( "handlerMap" ); // jshint ignore:line

export default class EventEmitter {
  constructor( eventNames ) {
    this[handlerMap] = {};

    if ( Array.isArray( eventNames )) {
      eventNames.forEach( name => this[handlerMap][name] = [] );
    }
  }

  on( eventName, handler ) {
    if ( Array.isArray( this[handlerMap][eventName] )) {
      this[handlerMap][ eventName ].push( handler );
    } else {
      this[handlerMap][ eventName ] = [ handler ];
    }

    return this;
  }

  off( eventName, handler ) {
    var handlerArray = this[handlerMap][eventName];

    if ( handlerArray && handlerArray.length > 0 ) {
      this[handlerMap][eventName] = handlerArray.filter( h => h !== handler );
    }

    return this;
  }

  once( eventName, handler ) {
    this.on( eventName, ( event ) => {
      this.off( eventName, handler );
      handler.call( this, event );
    });

    return this;
  }

  clear( eventName ) {
    if ( eventName ) {
      this[handlerMap][eventName].forEach( h => {
        this.off( eventName, h );
      });
    } else {
      Object.keys( this[handlerMap] ).forEach( evt => {
        this[handlerMap][evt] = [];
      });
    }

    return this;
  }

  dispatch( event, ...extraArgs ) {
    console.dir( extraArgs );
    console.log( "this[ handlerMap ]", this[ handlerMap ] );

    if ( !( event instanceof CustomEvent ) ) {
      console.log( "not a true event" );
    }

    extraArgs.unshift( event );

    this[ handlerMap ][ event.type ].forEach( h => {
      h.apply( this, extraArgs );
    });

    return this;
  }

  static bindToEventTarget( emitterInstance, eventTarget, eventNames ) {
    var listeners = eventNames.map( function( name ) {
      return function( event ) {
        emitterInstance.dispatch( event );
      };
    });

    eventNames.forEach( function( name, index ) {
      eventTarget.addEventListener( name, listeners[ index ] );
    });

    eventTarget.unbindEventEmitter = function() {
      eventNames.forEach( function( name, index ) {
        eventTarget.removeEventListener( name, listeners[ index ] );
      });
      delete eventTarget.unbindEventEmitter;
    };
  }
}
