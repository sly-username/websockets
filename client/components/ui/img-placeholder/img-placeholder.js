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
    get src() {
      return this._src;
    },
    set src( value ) {
      this.attributes.src.value = value;
      this._src = value;
      this.fallBack = value;
      return value;
    },
    get image() {
      return this._image;
    },
    set image( value ) {
      this.attributes.image.value = value;
      this._image = value;
      return value;
    },
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
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
    imageChanged: function( oldVal, newVal ) {
      this.image = newVal;
      this.setAttribute( "image", newVal );
    },
    srcChanged: function( oldVal, newVal ) {
      this.src = newVal;
      this.setAttribute( "src", newVal );
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
