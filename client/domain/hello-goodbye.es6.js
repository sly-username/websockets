/**
 * Created by rj on 11/24/14.
 */

export var hello = (name) => { alert("Hello " + name); return name; };

export var goodbye = (name) => { console.log("Goodbye " + name); };

export default {
  get hello(){ return hello; },
  get goodbye(){ return goodbye; }
};
