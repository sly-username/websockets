/**
 *
 * @param name
 * @param descriptor
 * @returns {*|Event}
 * @constructor
 */

  // check if supported via try/catch
export default function( name, descriptor ) {
  descriptor = {};
  var event,
    ourEvent = function( name, bubbles = false, cancelable = false, detail = undefined ) {
      event = document.createEvent( "CustomEvent" );
      event.initCustomEvent( name, bubbles, cancelable, detail );
      return event;
    };

  try {
    if ( window.CustomEvent === undefined ) {
      throw "Dispatch was not called with proper Event object";
    }
  } catch ( err ) {
    console.log( err );
  }

  if ( window.CustomEvent === undefined ) {
    ourEvent.prototype = window.Event.prototype;
    window.CustomEvent = ourEvent;
  } else {
    event = new CustomEvent( name, descriptor );
  }
}
