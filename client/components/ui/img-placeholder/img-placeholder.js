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
    };

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
      this.fallBack = this.shadowRoot.getElementsByClassName( "fall-back" )[0];
    },
    attached: function() {
      this.updateSrc();
    },
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
    imageChanged: function( oldVal, newVal ) {
      this.image = newVal;
      this.updateSrc().setAttribute( "image", newVal );
    },
    updateSrc: function() {
      this.checkSrc( this.src ).then( function( result ) {
        this.fallBack.src = result ? this.src : globalMap[this.image];
      }.bind( this ) );
      return this;
    },
    checkSrc: function( src ) {
      return new Promise( function( resolve ) {
        var tmpImage = new Image();
        tmpImage.onload = function( event ) {
          resolve( true );
        };
        tmpImage.onerror = function( event ) {
          resolve( false );
        };
        tmpImage.src = src;
      });
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
