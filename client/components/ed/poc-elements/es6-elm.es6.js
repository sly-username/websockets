( function( Polymer ) {
  "use strict";
  Polymer( "es6-elm", {
    attached() {
      System.import( "domain/main" ).then( hello => {
        this.addEventListener( "click", () => {
          hello.default( this.getAttribute( "my-name" ) );
        });
      });
    }
  });
})( window.Polymer );
