( function( Polymer ) {
  "use strict";

  Polymer( "select-box", {
    _options: [],
    /*** LIFECYCLE ***/
    ready: function() {
      this.getOptions = this.shadowRoot.getElementsByClassName( "options" )[0];
      this.getOptions.style.maxHeight = ( this.size * 32.4 ) + "px";
    },
    created: function() {
      Array.prototype.forEach.call( this.children, function( elem ) {
        this._options.push({
          value: elem.value,
          label: elem.getAttribute( "label" ) || elem.textContent,
          selected: elem.selected
        });
      }.bind( this ) );
    },
    /*** PROPERTIES ***/
    /*** END PROPERTIES ***/
    /*** LIFECYCLE ***/
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
    sizeChanged: function( oldVal, newVal ) {
      this.size = newVal;
      this.setAttribute( "size", newVal );
      this.getOptions.style.maxHeight = ( newVal * 32.4 ) + "px";
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
