export function CustomEvents( eventName, eventType, description, ...extraParams ) {

  //check if supported. use try/catch
  try {
    //if ( window["CustomEvent"] === undefined ); not sure what to write here
  } catch( err ) {
    throw new TypeError( "Dispatch was not called with proper Event object" );
  }

  extraParams = { bubbles=false, cancelable=false, detail=undefined };

  if ( window["CustomEvent"] === undefined ) {
    eventName = document.createEvent( eventType );
    eventName.initEvent( name, bubbles, ...extraParams );
    return eventName;
  } else {
    eventName = new CustomEvent( eventType, description );
  }

}
