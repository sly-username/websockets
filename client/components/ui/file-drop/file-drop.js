( function( Polymer ) {
  "use strict";

  Polymer( "file-drop", {
    fileList: null,
    fileArr: [],
    /*** PROPERTIES ***/
    get files() {
      return this.fileArr;
    },
    get multiple() {
      if ( !null ) {
        return this._multiple;
      }
    },
    set multiple( value ) {
      if ( value !== null ) {
        this.setAttribute( "multiple", value );

        return this._multiple = value;
      }
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
        if ( ( this.hasAttribute( "multiple" ) && ( this.fileList.length > 1 ) ) || this.fileList.length === 1 ) {
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
    fillChanged: function( oldVal, newVal ) {
      this.fill = newVal;
      this.setAttribute( "fill", newVal );
    },
    acceptsChanged: function( oldVal, newVal ) {
      this.accepts = newVal;
      this.setAttribute( "accepts", newVal );
    },
    multipleChanged: function( oldVal, newVal ) {
      this.multiple = newVal;
      this.setAttribute( "multiple", newVal );
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
