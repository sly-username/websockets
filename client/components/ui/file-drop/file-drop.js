( function( Polymer ) {
  "use strict";

  Polymer( "file-drop", {
    fileList: null,
    fileArr: [],
    get files() {
      return this.fileArr;
    },
    /*** PROPERTIES ***/
    /*** END PROPERTIES ***/
    /*** LIFECYCLE ***/
    ready: function() {
      this.holder = this.shadowRoot.getElementById( "holder" );


      // fill attribute
    },
    attached: function() {
      // listens for drag events
      this.holder.addEventListener( "dragover", function( event ) {
        event.stopPropagation();
        event.preventDefault();
      });
      this.holder.addEventListener( "drop", function( event ) {
        event.stopPropagation();
        event.preventDefault();
        // filters files
        this.fileList = event.dataTransfer.files;
        this.fileArr = Array.from( this.fileList ).filter( function( file ) {
          var compare = new RegExp( file.type );
          return compare.test( this.accepts );
        }.bind( this ) );
        console.log( this.fileArr );
      }.bind( this ) );
    }
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
