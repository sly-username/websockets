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
      this.fallBack.addEventListener( "error", this.errorOut.bind( this ) );
    },
    /*** END LIFECYCLE ***/
    /*** FUNCTION ***/
    errorOut: function() {
      this.fallBack[globalMap[this.image] ? "setAttribute" : "removeAttribute"]( "src", globalMap[this.image] );
    },
    imageChanged: function( oldVal, newVal ) {
      var promise = this.checkSrc( this.src );
      this.image = newVal;

      if ( !this.src ) {
        this.fallBack.src = this.src || globalMap[this.image];
      } else {
        promise.then( function( response ) {
          this.fallBack.src = this.src;
        }.bind( this ) ).catch( function( error ) {
          this.fallBack.src = globalMap[this.image];
        }.bind( this ) );
      }
      this.setAttribute( "image", newVal );
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
