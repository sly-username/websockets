/**
 * Created by rj on 12/2/14.
 */

(function( Polymer ){
  window.Polymer("es6-elm", {
    attached(){
      System.import("domain/main.es6").then((hello => {
        self.addEventListener("click", (() => {
          hello.default(self.getAttribute("my-name"));
        }).bind(this));
      }).bind(this));
    }
  });
})( window.Polymer );

