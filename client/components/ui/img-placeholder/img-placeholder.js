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
      this.fallBack = this.shadowRoot.getElementsByClassName( "fall-back" )[0];
    },
    attached: function() {
      this.updateSrc();
    },
    /*** END LIFECYCLE ***/
    /*** FUNCTION ***/
    imageChanged: function( oldVal, newVal ) {
      this.image = newVal;
      this.updateSrc()
      this.setAttribute( "image", newVal );
    },
    updateSrc: function() {
      this.checkSrc( this.src ).then( function( result ) {
        if ( result ) {
          this.fallBack.src = this.src;
        } else {
          this.fallBack.src = globalMap[this.image];
        }
      }.bind( this ) );
    },
    checkSrc: function( src ) {
      return ( new Promise( function( resolve, reject ) {
        var tmpImage = new Image();
        tmpImage.onload = function( event ) {
          resolve( true );
        }
        tmpImage.onerror = function( event ) {
          resolve( false );
        }
        tmpImage.src = src;
      }) );
    }
    /*** END FUNCTION ***/
  });
})( window.Polymer );
