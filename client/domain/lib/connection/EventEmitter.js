/* jshint strict:false */
// var handlerMap = Symbol( "handlerMap" ); // jshint ignore:line

export default class EventEmitter {
  constructor( eventName ) {
    var openListener = function() {};
    this.handlerMap = {};
  }

  isInHandlerMapArray( eventName ) {
    var handlerMapArray = Object.keys( this.handlerMap );
//    this.eventNameList.forEach( ( event ) => {
    return ( handlerMapArray.indexOf( eventName ) > -1 );
//    });
  }

  on( eventName, handler ) {
    if ( this.isInHandlerMapArray === true ) {
      this.handlerMap[ eventName ].push( handler );
    } else {
      this.handlerMap[ eventName ] = handler;
    }
  }

  off( eventName, handler ) {
    if ( this.isInHandlerMapArray === true ) {
      this.handlerMap[ eventName ] = this.handlerMap[ eventName ].filter( ( h ) =>
      h === handler );
    }
    // filter out handler that has been passed in
  }

  once( eventName, handler ) {
    // once = on + off. math.
    this.on( eventName, ( event ) => {
      this.off( eventName, handler );
      handler.call( this, event );
    });
  }

  dispatch( event ) {
    this[ handlerMap ][ event.name ].forEach( h => {
      h.call( this, event );
    });
    // needs to take event, not the string name
    // iterate over array, calling each handler in sequence
  }
}
