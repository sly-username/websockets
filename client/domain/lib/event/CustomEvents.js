/**
 *
 * @param name
 * @param descriptor
 * @returns {*|Event}
 * @constructor
 */

  // check if supported via try/catch
export default function CustomEvents( name, descriptor ) {
  descriptor = {};
  var event;

  try {
    if ( window.CustomEvent === undefined ) {
      throw "Dispatch was not called with proper Event object";
    }
  } catch ( err ) {
    // not sure what is supposed to go here
    console.log( err );
  }

  if ( window.CustomEvent === undefined ) {
    function CustomEvent( name, bubbles = false, cancelable = false, detail = undefined ) {
      event = document.createEvent( CustomEvent );
      event.initCustomEvent( name, bubbles, cancelable, detail );
      return event;
    }
    CustomEvent.prototype = this.Event.prototype;
    this.CustomEvent = CustomEvent;
  } else {
    event = new CustomEvent( name, descriptor );
  }
};
