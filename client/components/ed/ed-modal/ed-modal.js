( function( Polymer ) {
  "use strict";
  Polymer( "ed-modal", {
    get clickoff() {
      return this.hasAttribute( "clickoff" );
    },
    set clickoff( value ) {
      if ( value ) {
        this.setAttribute( "clickoff", "" );
        this.attachClickoffListener();
      } else {
        this.removeClickoffListener();
        this.removeAttribute( "clickoff" );
      }
    },
    get closebutton() {
      return this.hasAttribute( "closebutton" );
    },
    set closebutton( value ) {
      if ( value ) {
        this.setAttribute( "closebutton", "" );
        //this.attachClickoffListener();
      } else {
        //this.removeClickoffListener();
        this.removeAttribute( "closebutton" );
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
      this.modalContainer = this.shadowRoot.getElementById( this.attributes.trigger.value );
      this.modalBox = this.shadowRoot.getElementById( "modal-box" );
      this.modalButton = this.shadowRoot.getElementById( "modal-button" );
      this.openListener = this.open.bind( this );
      this.closeListener = this.close.bind( this );
    },
    attached: function() {
      this.attachTriggerListener();

      [ "mousedown", "touchstart" ].forEach( function( e ) {
        this.modalButton.addEventListener( e, this.closeListener );
      }.bind( this ) );

      if ( !this.hasAttribute( "closebutton" ) ) {
        this.modalButton.style.visibility = "hidden";
      }

      if ( this.hasAttribute( "clickoff" ) ) {
        this.attachClickoffListener();
      }

    },
    attachTriggerListener: function() {
      [ "mousedown", "touchstart" ].forEach( function( e ) {
        document.querySelector( this.attributes.trigger.value )
          .addEventListener( e, this.openListener );
      }.bind( this ) );
    },
    removeTriggerListener: function() {
      [ "mousedown", "touchstart" ].forEach( function( e ) {
        document.querySelector( this.attributes.trigger.value )
        .removeEventListener( e, this.openListener );
      }.bind( this ) );
    },
    attachClickoffListener: function() {
      [ "mousedown", "touchstart" ].forEach( function( e ) {
        this.modalBox.addEventListener( e, this.closeListener );
      }.bind( this ) );
    },
    removeClickoffListener: function() {
      [ "mousedown", "touchstart" ].forEach( function( e ) {
        this.modalBox.removeEventListener( e, this.closeListener );
      }.bind( this ) );
    },
    open: function() {
      this.modalContainer.style.display = "block";
      this.setZIndices();
    },
    close: function() {
      this.modalContainer.style.display = "none";
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
    attributeChanged: function( attrName, oldVal, newVal ) {
      if ( attrName === "clickoff" ) {
        this[attrName] = newVal === "";
      }
    },
    findHighestZIndex: function() {
      var currentZ,
          highestZ = 0,
          divs = document.getElementsByTagName( "*" );
      console.log(divs);

      if ( !divs.length ) {
        return highestZ;
      }
      divs.forEach( function( div ) {
        if ( div.style.position && div.style.zIndex ) {
          currentZ = parseInt( div.style.zIndex, 10 );

          if ( currentZ > highestZ ) {
            highestZ = currentZ;
          }
        }
      });
      return highestZ;
    },
    setZIndices: function() {

    }
  });
})( window.Polymer );
