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


  Polymer( "radio-select", {
    ready: function() {
      this.radioButton = this.shadowRoot.getElementById( "radioSelect" );

      this.addEventListener( "click", function( event ) {
        if ( this.disabled ) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }

        if ( !this.checked ) {
          this.checked = true;
          this.setAttribute( "checked", "" );
          this.clearOthers();
          this.children[0].style.transform = "scale(1)";
        }
      });
    },
    attached: function() {
      copyAttributes( this, this.radioButton, [ "checked", "disabled", "required" ]);
    },
    get otherMembers() {
      return Array.prototype.slice.call(
        document.querySelectorAll( "radio-select[name=\"" + this.attributes.name.value + "\"]" ),
        0
      ).filter( function( elm ) {
          return this !== elm;
        }, this );
    },
    clearOthers: function() {
      this.otherMembers.forEach( function( elm ) {
        elm.checked = "";
        elm.removeAttribute( "checked" );
        elm.children[0].style.transform = "scale(1)";
      }, this );
    }
  });
})( Polymer );
