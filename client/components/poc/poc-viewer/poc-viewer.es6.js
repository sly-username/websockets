( function( Polymer ) {
  "use strict";

  Polymer( "poc-viewer", {
    setUrl: function( path ) {
      return this.exampleUrl = `components/${path}/example.html`;
    },
//    updateExample: function( loadEvent ) {
//      console.log( "loaded", loadEvent );
//      var linkImport = loadEvent.path[0].import,
//        content = linkImport.querySelector( "template" ).content;
//      console.log( "linkImport", content );
//      console.log( "content", content );
//      console.log( "clone", content.cloneNode( true ) );
//
//      this.appendChild( content.cloneNode( true ) );
//
//      //var content = loadEvent.path[0].import.childNodes[0];
//      //this.appendChild( content.cloneNode(true) );
//    },
//    createLink: function() {
//
//      this.link.rel = "import";
//      this.link.href = this.exampleUrl;
//      this.link.addEventListener( "load", this.updateExample.bind( this ) );
//      this.link.onload = this.updateExample;
//
//      this.createDefLink();
//
//      this.appendChild( this.link );
//      console.log( "done here,", this.link );
//    },
    createDefLink: function() {
      var link = document.createElement("link");
      link.rel = "import";
      link.href = this.exampleUrl.split("/").slice(0, -1).join("/") + "/ed-icon.html";
      this.appendChild( link );
    },
    /*** LIFECYCLE ***/
    ready: function() {
      this.link = document.createElement( "link" );
    },
    attached: function() {

      if ( this.attributes.path ) {
        this.setUrl( this.attributes.path.value );
      }
      this.createDefLink();
     // this.createLink();

      var icon = document.createElement( "ed-icon" );
      icon.name = "add189";
      icon.rotation = "180";
      this.appendChild( icon );
    },
//    detached: function() {},
    attributeChanged: function( attrName, oldVal, newVal ) {
      console.log( attrName, oldVal, newVal );

      if ( attrName === "path" ) {
        this.setUrl( newVal );
      }
    }
    /*** PROPERTIES ***/
    /*** METHODS ***/
  });
})( window.Polymer );
