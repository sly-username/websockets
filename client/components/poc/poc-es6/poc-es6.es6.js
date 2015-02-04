( function( Polymer ) {
  "use strict";
  Polymer( "poc-es6", {
    attached() {
      System.import( "domain/main" ).then( hello => {
        this.addEventListener( "click", () => {
          hello.default( this.getAttribute( "my-name" ) );
        });
      });
    }
  });
})( window.Polymer );
