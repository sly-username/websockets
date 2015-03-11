/* jshint strict:false */
var handlerMap = Symbol( "handlerMap" ); // jshint ignore:line

export default class EventEmitter {
  constructor( eventName ) {
    this[handlerMap] = {};

    if ( Array.isArray( eventName )) {
      eventName.forEach( name => this[handlerMap][name] = [] );
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
    this[ handlerMap ][ event.name ].forEach( h => {
      h.apply( this, extraArgs.unshift( event ) );
    });

    return this;
  }
}
