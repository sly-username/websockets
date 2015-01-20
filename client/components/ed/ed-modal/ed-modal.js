( function( Polymer ) {
  "use strict";
  Polymer( "ed-modal", {
/* GETTERS AND SETTERS */
  /* Click Off */
    get clickoff() {
      return this.hasAttribute( "clickoff" );
    },
    set clickoff( value ) {
      value = value ? "set" : "remove";
      this[ value + "Attribute" ]( "clickoff", "" );
      this[ value + "ClickoffListener"]();
    },
  /* Close Button */
    get closebutton() {
      return this.hasAttribute( "closebutton" );
    },
    set closebutton( value ) {
      this[ value ? "setAttribute" : "removeAttribute" ]( "closebutton", "" );
    },
  /* Trigger */
    get trigger() {
      return this._trigger;
    },
    set trigger( value ) {
      this.setAttribute( "trigger", value );
      this._trigger = value;
      return value;
    },

/* FUNCTIONS */
  /* Life Cycle */
    ready: function() {
      this.closeListener = this.close.bind( this );
      this.closeModalListener = this.closeModal.bind( this );
      this.eventObjs = [ "mousedown", "touchstart" ];
      this.modalButton = this.shadowRoot.getElementsByClassName( "modal-button" )[0];
      this.modalContainer = this.shadowRoot.getElementsByClassName( "modal-container" )[0];
      this.openListener = this.open.bind( this );
      this._trigger = this.attributes.trigger.value;
    },
    attached: function() {
      this.triggerListener( "add" );

      this.eventObjs.forEach( function( e ) {
        this.modalButton.addEventListener( e, this.closeListener );
      }.bind( this ) );

      if ( !this.hasAttribute( "closebutton" ) ) {
        this.modalButton.classList.add( "modal-button-closed" );
      }

      if ( this.hasAttribute( "clickoff" ) ) {
        this.setClickoffListener();
      }
    },

  /* EVENT LISTENERS */
    /* Trigger */
    triggerListener: function( toggle ) {
      this.eventObjs.forEach( function( e ) {
        var elems = document.querySelectorAll( this.trigger );

        if ( elems.length === 0 ) {
          return;
        } else if ( elems.length === 1 ) {
          elems[0][ toggle + "EventListener" ]( e, this.openListener );
        } else {
          Array.prototype.forEach( elems, function( elem ) {
            elem[ toggle + "EventListener" ]( e, this.openListener );
          });
        }
      }.bind( this ) );
    },
    /* Click Off */
    setClickoffListener: function() {
      this.eventObjs.forEach( function( e ) {
        this.modalContainer.addEventListener( e, this.closeModalListener );
      }.bind( this ) );
    },
    removeClickoffListener: function() {
      this.eventObjs.forEach( function( e ) {
        this.modalContainer.removeEventListener( e, this.closeModalListener );
      }.bind( this ) );
    },

  /* MODAL APPEAR AND DISAPPEAR */
    open: function() {
      this.setZIndex();
      this.modalContainer.classList.add( "modal-container-opened" );
    },
    close: function() {
      this.modalContainer.classList.remove( "modal-container-opened" );
    },
    closeModal: function( e ) {
      if ( e.target === this.modalContainer ) {
        this.modalContainer.classList.remove( "modal-container-opened" );
      }
    },

  /* ATTRIBUTE CHANGE */
    attributeChanged: function( attrName, oldVal, newVal ) {

      if ( attrName === "trigger" ) {
        this.triggerListener( "remove" );
        this.trigger = newVal;
        this.triggerListener( "add" );
      } else {
        this[attrName] = newVal === "";
      }

      if ( attrName === "closebutton" ) {
        this.modalButton.classList[ !newVal && newVal !== "" ? "add" : "remove" ]( "hidden" );
      }
    },

  /* Z-INDEX */
    findHighestZIndex: function() {
      var highestZ = 1,
          siblingsList = Array.from( this.parentNode.children ).filter( function( elem ) {
            return this !== elem;
          }, this );

      if ( !siblingsList.length ) {
        return highestZ;
      }

      siblingsList.forEach( function( sib ) {
        var getZ = window.getComputedStyle( sib, null ).getPropertyValue( "z-index" ),
            currentZ = parseInt( getZ, 10 );

        if ( getZ && getZ !== "auto" ) {
          highestZ = currentZ > highestZ ? currentZ : highestZ;
          highestZ = highestZ >= 2147483647 ? 2147483646 : highestZ;
        }
      });
      return highestZ;
    },
    setZIndex: function() {
      var baseZ = this.findHighestZIndex();
      this.modalContainer.style.zIndex = baseZ + 1;
    }
  });
})( window.Polymer );
