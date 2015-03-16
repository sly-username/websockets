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
    console.log( "is once working?" );
    console.log( eventName );
    this.on( eventName, ( event ) => {
      console.log( "are you getting here?" );
      console.log( handler );
      this.off( eventName, handler );
      console.log( "did you call off?" );
      console.log( handler );
      handler.call( this, event );
      console.log( "did you fire the handler?" );
    });

    return this;
  }

  clear( eventName ) {
    if ( eventName ) {
      this[handlerMap][eventName] = [];
    } else {
      this[handlerMap] = {};
    }

    return this;
  }

  dispatch( event, ...extraArgs ) {
    if ( !( event instanceof Event ) || event.type == null ) {
      throw new TypeError( "Dispatch was not called with proper Event object" );
    }

    extraArgs.unshift( event );

    this[ handlerMap ][ event.type ].forEach( h => {
      h.apply( this, extraArgs );
    });

    return this;
  }

  static bindToEventTarget( emitterInstance, eventTarget, eventNames, ...extraArgs ) {
    var listeners = eventNames.map( function( name ) {
      return function( event ) {
        emitterInstance.dispatch( event, ...extraArgs );
        extraArgs.unshift( event );
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
