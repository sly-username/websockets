( function( Polymer ) {
  "use strict";

  Polymer( "ed-modal", {
    get trigger() {
      return this._trigger;
    },
    set trigger( value ) {
      this.attributes.trigger.value = value;
      this._trigger = value;
      return value;
    },
    get clickOff() {
      return this._clickOff;
    },
    set clickOff( value ) {

    },
    get closeButton() {
      return this._closeButton;
    },
    set closeButton( value ) {

    },
    ready: function() {
      this.modalBox = this.shadowRoot.getElementById( this.attributes.trigger.value );
      this.modalButton = this.shadowRoot.getElementById( "modal-button" );
    },
    attached: function() {
      document.querySelector( this.attributes.trigger.value ).addEventListener( "click", this.open.bind( this ) );
      this.modalButton.addEventListener( "click", this.close.bind( this ) );
    },
    close: function() {
      this.modalBox.style.visibility = "hidden";
    },
    open: function() {
      console.log( this );
      this.modalBox.style.visibility = "visible";
    }
  });
})( window.Polymer );
