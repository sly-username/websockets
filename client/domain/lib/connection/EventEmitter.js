export default class EventEmitter {
  constructor( instanceObject, EventTarget ) {
    Object.assign( this, instanceObject );
  }

  on ( eventName, handler ) {
    EventTarget.addEventListener( eventName, handler );
  }

  off ( eventName, handler ) {

  }

  once ( eventName, handler ) {

  }

  dispatch( event ) {

  }
}
