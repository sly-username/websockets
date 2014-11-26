/**
 * Created by rj on 11/24/14.
 */

import helloGoodbye from "./hello-goodbye.es6.js"


helloGoodbye.hello("ES6");

helloGoodbye.goodbye("ES5");


export default name => helloGoodbye.hello(name);


