export default class CustomEvents {
  constructor( name, description ) {

  }

  createEvent( eventName, name, description, ...extraParams ) {
    // check if supported. use try/catch
    // try {
    //  /* if browser supports customEvent */
    // } catch( err ) {
    //  throw new TypeError( "Dispatch was not called with proper Event object" );
    // }

    // extraParams = { bubbles=false, cancelable=false, detail=undefined };

    //if ( window["CustomEvent"] === undefined ) {
    //  eventName = document.createEvent( "Event" );
    //  eventName.initEvent( name, bubbles, cancelable )
    //} else {
    //  eventName = new CustomEvent( name, "description" );
    //}
  }
}
