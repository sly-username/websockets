( function( Polymer ) {
  "use strict";
  Polymer( "es6-elm", {
    attached() {
      System.import( "domain/main.es6" ).then( hello => {
        this.addEventListener( "click", () => {
          hello.default( this.getAttribute( "my-name" ) );
        });
      });
    }
  });
})( window.Polymer );
