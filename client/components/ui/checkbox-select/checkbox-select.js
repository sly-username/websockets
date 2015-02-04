( function( Polymer ) {
  "use strict";

  var copyAttributes = function( elemFrom, elemTo, attrs ) {
    attrs.forEach( function( attr ) {
      if ( elemFrom.hasAttribute( attr ) ) {
        elemTo.setAttribute( attr, elemFrom.getAttribute( attr ) );
      } else {
        elemTo.removeAttribute( attr );
      }
    });
  };

  Polymer( "checkbox-select", {
    ready: function() {
      this.checkboxField = this.shadowRoot.getElementById( "checkbox-field" );

      this.addEventListener( "click", function() {
        if ( this.hasAttribute( "disabled" ) ) {
          return false;
        }

        this.checked = !this.checked;
        this[ this.checked ? "setAttribute" : "removeAttribute" ]( "checked", "" );
        this.children[ 0 ].style.transform = "scale(1)";
      });
    },
    attached: function() {
      copyAttributes( this, this.checkboxField, [ "checked", "disabled", "required" ]);
    }
  });
})( Polymer );
