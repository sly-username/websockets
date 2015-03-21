var tmpEvent, createEvent,
  createWithConstructor = function( name, descriptor ) {
    return new CustomEvent( name, descriptor );
  },
  createWithInit = function( name, descriptor ) {
    var event = document.createEvent( "CustomEvent" );
    descriptor = descriptor || {};

    event.initCustomEvent(
      name,
      descriptor.bubbles || false,
      descriptor.cancelable || false,
      descriptor.detail || {}
    );

    return event;
  };

if ( window ) {
  try {
    tmpEvent = new CustomEvent( "test" );
    createEvent = createWithConstructor;
  } catch ( error ) {
    // use fallback method
    createEvent = createWithInit;
  }
}

// check if supported via try/catch
export default createEvent;
