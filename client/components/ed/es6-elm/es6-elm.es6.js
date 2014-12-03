/**
 * Created by rj on 12/2/14.
 */

(function( Polymer ){
  console.log("execute es6-elm.es6");

  window.Polymer("es6-elm", {
    attached(){
      console.log("attached called");
      var self = this;
      System.import("domain/main.es6").then( hello => {
        self.addEventListener("click", evt => {
          hello.default(self.getAttribute("my-name"));
        });
      });
    }
  });
})( window.Polymer );

