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
    get clickOff() {
      return this.hasAttribute( "click-off" );
    },
    set clickOff( value ) {
      if ( value ) {
        this.setAttribute( "click-off", "" );
      } else {
        this.removeAttribute( "click-off" );
      }
    },
    get closeButton() {
      return this.hasAttribute( "close-button" );
    },
    set closeButton( value ) {
      if ( value ) {
        // turn on
      } else {
        this.removeAttribute( "close-button" );
      }
    },
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
      this.openListener = this.open.bind( this );
      this.closeListener = this.close.bind( this );
    },
    attached: function() {
      copyAttributes( this, this.modalBox, [ "clickOff", "closeButton" ] );

      this.attachTriggerListener();
      //[ "mousedown", "touchstart" ].forEach( function( e ) {
      //  document.querySelector( this.attributes.trigger.value )
      //    .addEventListener( e, this.open() );
      //}.bind( this ) );

      [ "mousedown", "touchstart" ].forEach( function( e ) {
        console.log( this.modalButton );
        this.modalButton.addEventListener( e, this.closeListener );
      }.bind( this ) );

      if ( !this.hasAttribute( "close-button" ) ) {
        this.modalButton.style.visibility = "hidden";
      }
    },
    attachTriggerListener: function() {
      [ "mousedown", "touchstart" ].forEach( function( e ) {
        document.querySelector( this.attributes.trigger.value )
          .addEventListener( e, this.openListener );
      }.bind( this ) );
    },
    removeTriggerListener: function() {
      document.querySelector( this.attributes.trigger.value )
        .removeEventListener( "click", this.openListener );
    },
    open: function() {
      this.modalBox.style.visibility = "visible";
    },
    close: function() {
      this.modalBox.style.visibility = "hidden";
    },
    triggerChanged: function( oldVal, newVal ) {
      this.removeTriggerListener();
      this.trigger = newVal;
      this.setAttribute( "trigger", newVal );

      if ( this.hasAttribute( "trigger" ) ) {
        this.trigger = this.attributes.trigger.value;
        this.attachTriggerListener();
      }
    },
    clickOffChanged: function( oldVal, newVal ) {
      this.clickOff = newVal;
      this.setAttribute( "click-off", newVal );
    },
    closeButtonChanged: function( oldVal, newVal ) {
      this.closeButton = newVal;
      this.setAttribute( "close-button", newVal );
    }
  });
})( window.Polymer );
