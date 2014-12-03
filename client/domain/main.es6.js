/**
 * Created by rj on 11/24/14.
 */

import helloGoodbye from "domain/hello-goodbye.es6";

helloGoodbye.hello("ES6");

helloGoodbye.goodbye("ES5");

export default name => helloGoodbye.hello(name);


