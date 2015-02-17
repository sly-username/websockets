( function( Polymer ) {
  "use strict";

  Polymer( "poc-viewer", {
    setUrl: function( path ) {
      return this.exampleUrl = `components/${path}/example.html`;
    },
    updateExample: function( loadEvent ) {
      console.log( "loaded", loadEvent );
      console.log( "currentLink: ", this.currentLink );
    },
    createLink: function() {
      var link = document.createElement( "link" );
      link.rel = "import";
//      link.addEventListener( "load", this.updateExample );
      link.onload = this.updateExample;

      link.href = this.exampleUrl;

      console.log( "done here,", link );
      this.currentLink = link;
    },
    /*** LIFECYCLE ***/
    ready: function() {},
    attached: function() {

      if ( this.attributes.path ) {
        this.setUrl( this.attributes.path.value );
      }

      this.createLink();
    },
    detached: function() {},
    attributeChanged: function( attrName, oldVal, newVal ) {
      if ( attrName === "path" ) {
        this.setUrl( newVal );
      }

    }
    /*** PROPERTIES ***/
    /*** METHODS ***/
  });
})( window.Polymer );
