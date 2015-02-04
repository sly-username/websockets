( function( Polymer ) {
  "use strict";

  Polymer( "file-drop", {
    publish: {
      fill: {
        reflect: true
      },
      accepts: {
        reflect: true
      },
      multiple: {
        reflect: true
      }
    },
    fileList: null,
    fileArr: [],
    /*** PROPERTIES ***/
    get files() {
      return this.fileArr;
    },
    /*** END PROPERTIES ***/
    /*** LIFECYCLE ***/
    ready: function() {
      this.holder = this.shadowRoot.getElementById( "holder" );
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
        // resets the fileArr
        this.fileArr = [];
        // checks for multiple attribute
        if ( ( this.hasAttribute( "multiple" ) && ( this.fileList.length > 1 ) ) ||
          this.fileList.length === 1 ) {
          this.fileArr = Array.from( this.fileList ).filter( function( file ) {
            var compare = new RegExp( file.type );
            return compare.test( this.accepts );
          }.bind( this ) );
        }
        this.formData = new FormData();
        this.formData.append( "userFiles", this.fileArr );
      }.bind( this ) );
    },
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
    onDrop: function( callback ) {
      this.holder.addEventListener( "drop", callback );
    },
    onDragOver: function( callback ) {
      this.holder.addEventListener( "dragover", callback );
    },
    attributeChanged: function( attrName, oldVal, newVal ) {
      this[ attrName ] = newVal;
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
