( function( Polymer ) {
  "use strict";

  Polymer( "select-box", {
    _options: [],
    /*** LIFECYCLE ***/
    created: function() {
      Array.prototype.forEach.call( this.children, function( elem ) {
        this._options.push({
          value: elem.value,
          label: elem.getAttribute( "label" ) || elem.textContent,
          selected: elem.selected
        });
      }.bind( this ) );
    }
    /*** PROPERTIES ***/
    /*** END PROPERTIES ***/
    /*** LIFECYCLE ***/
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
