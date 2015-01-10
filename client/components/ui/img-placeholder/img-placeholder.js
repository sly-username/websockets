( function( Polymer ) {
  "use strict";

  var globalMap = {},
      updateMap = function() {
        Array.prototype.forEach.call(
          document.getElementsByTagName( "img-placeholder" ),
          function( element ) {
            element.rePrep();
            return true;
          }
        );
  }


  Polymer( "img-placeholder", {
    /*** PROPERTIES ***/
    get imageMap() {
      return globalMap;
    },
    set imageMap( value ) {
      globalMap = value;
      updateMap();
      return globalMap;
    },
    rePrep: function() {
      if ( !this.src ) {
        this.fallBack.src = this.src || globalMap[this.image];
      }
    },
    /*** END PROPERTIES ***/
    /*** LIFECYCLE ***/
    ready: function() {
      this.fallBack = this.shadowRoot.getElementsByClassName( "display" )[0];
    }
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
