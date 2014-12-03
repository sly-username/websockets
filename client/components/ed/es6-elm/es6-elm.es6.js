/**
 * Created by rj on 12/2/14.
 */

import hello from "domain/main.es6";

console.log("execute es6-elm.es6");

window.Polymer("es6-elm", {
  attached(){
    console.log("attached called");
    var self = this;
    this.addEventListener("click", evt => {
      hello(self.getAttribute("my-name"));
    });
  }
});


