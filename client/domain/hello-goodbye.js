/**
 * Created by rj on 11/24/14.
 */

System.map[ "hello-goodbye" ] = "domain/hello-goodbye.es6";

var hello = ( name ) => {
    console.log( "Hello " + name );
    return name;
  },
  goodbye = ( name ) => {
    console.log( "Goodbye " + name );
  };

export { hello, goodbye };

export default {
  get hello() { return hello; },
  get goodbye() { return goodbye; }
};
