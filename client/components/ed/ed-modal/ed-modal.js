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

  Polymer( "ed-modal", {
    get trigger() {
      return this._trigger;
    },
    set trigger( value ) {
      this.attributes.trigger.value = value;
      this._trigger = value;
      return value;
    },
    ready: function() {
      this.modalBox = this.shadowRoot.getElementById( this.attributes.trigger.value );
      this.modalButton = this.shadowRoot.getElementById( "modal-button" );
    },
    attached: function() {
      copyAttributes( this, this.modalBox, [ "clickOff", "closeButton" ]);
      document.querySelector( this.attributes.trigger.value ).addEventListener( "click", this.open.bind( this ) );
      this.modalButton.addEventListener( "click", this.close.bind( this ) );

      if ( !this.hasAttribute( "closeButton" ) ) {
        this.modalButton.style.visibility = "hidden";
      }

      if ( this.hasAttribute( "clickOff" ) ) {
        this.modalBox.addEventListener( "click", this.close.bind( this ) );
      }
    },
    open: function() {
      this.modalBox.style.visibility = "visible";
    },
    close: function() {
      this.modalBox.style.visibility = "hidden";
    },
    triggerChanged: function( oldVal, newVal ) {
      this.trigger = newVal;
      this.setAttribute( "trigger", newVal );

      if ( this.hasAttribute( "trigger" ) ) {
        this.trigger = this.attributes.trigger.value;
      }
    },
    //clickOffChanged: function( oldVal, newVal ) {
    //  this.clickOff = newVal;
    //  this.setAttribute( "clickOff", "" );
    //},
    //closeButtonChanged: function( oldVal, newVal ) {
    //  this.closeButton = newVal;
    //}
  });
})( window.Polymer );
