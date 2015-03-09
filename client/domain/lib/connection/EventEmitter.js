export default class EventEmitter {
  constructor( eventNameList ) {
    this.handlerMap = {};
    this[ handlerMap ][ event ] = [];
  }

  isInHandlerMapArray( event, handlerMap ) {
    var handlerMapArray = handlerMap.keys( event ).map( key => event[key]);

  }

  on( eventName, handler ) {
    // need to check if there is no event in handler map, then add it to array
    // if handler is not in handlerMap, then
    this[ handlerMap ][ eventName ].push( handler );
  }

  off( eventName, handler ) {
    this[ handlerMap ][ eventName ] = this[ handlerMap ][ eventName ].filter( ( evt ) =>
      evt === handler );
    // filter out handler that has been passed in
  }

  once( eventName, handler ) {
    // once = on + off. math.
  }

  dispatch( event ) {
    this[ handlerMap ][ event.name ].forEach( h => {
      h.call( this, event );
    });
    // needs to take event, not the string name
    // iterate over array, calling each handler in sequence
  }
}
