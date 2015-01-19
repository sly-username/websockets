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
      this[ value + "ClickOffListener"]();
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
      this.removeTriggerListener();
      this.setAttribute( "trigger", value );
      this._trigger = value;
      this.setTriggerListener();
      return value;
    },

/* FUNCTIONS */
    ready: function() {
      this.modalContainer = this.shadowRoot.getElementsByClassName( "modal-container" )[0];
      this.modalButton = this.shadowRoot.getElementsByClassName( "modal-button" )[0];
      this.openListener = this.open.bind( this );
      this.closeListener = this.close.bind( this );
      this.closeModalListener = this.closeModal.bind( this );
      this.eventObjs = [ "mousedown", "touchstart" ];
      this._trigger = this.attributes.trigger.value;
    },
    attached: function() {
      this.setTriggerListener();

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
    setTriggerListener: function() {
      this.eventObjs.forEach( function( e ) {
        var elems = document.querySelectorAll( this.trigger );

        if ( elems.length === 0 ) {
          return;
        } else if ( elems.length === 1 ) {
          document.querySelector( this.trigger ).addEventListener( e, this.openListener );
        } else {
          Array.prototype.forEach( elems, function( elem ) {
            elem.addEventListener( e, this.openListener );
          });
        }
      }.bind( this ) );
    },
    removeTriggerListener: function() {
      this.eventObjs.forEach( function( e ) {
        var elems = document.querySelectorAll( this.trigger );

        if ( elems.length === 0 ) {
          return;
        } else if ( elems.length === 1 ) {
          document.querySelector( this.trigger ).removeEventListener( e, this.openListener );
        } else {
          Array.prototype.forEach( elems, function( elem ) {
            elem.removeEventListener( e, this.openListener );
          });
        }
        document.querySelector( this.trigger ).removeEventListener( e, this.openListener );
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
        this.modalContainer.classList.add( "modal-container" );
      }
    },

  /* ATTRIBUTE CHANGED FUNCTIONS */
    triggerChanged: function( oldVal, newVal ) {
      this.removeTriggerListener();
      this.trigger = newVal;
      this.setAttribute( "trigger", newVal );

      if ( this.hasAttribute( "trigger" ) ) {
        this.trigger = this.attributes.trigger.value;
        this.setTriggerListener();
      }
    },
    attributeChanged: function( attrName, oldVal, newVal ) {

      switch ( attrName ) {
        case "clickoff":
          this.clickoff = newVal === "";
          break;
        case "closebutton":
          this.closebutton = newVal === "";

          if ( !this.hasAttribute( "closebutton" ) ) {
            this.modalButton.classList.add( "modal-button-closed" );
          } else {
            this.modalButton.classList.remove( "modal-button-closed" );
          }
          break;
        default:
          // do nothing
          break;
      }
    },

  /* Z-INDEX */
    findHighestZIndex: function() {
      var currentZ,
          highestZ = 1,
          siblingsList = Array.from( this.parentNode.children ).filter( function( elem ) {
            return this !== elem;
          }, this );

      if ( !siblingsList.length ) {
        return highestZ;
      }

      siblingsList.forEach( function( sib ) {
        var getZ = window.getComputedStyle( sib, null ).getPropertyValue( "z-index" ),
            getPosition = window.getComputedStyle( sib, null ).getPropertyValue( "position" );

        if ( getZ && getPosition ) {
          currentZ = parseInt( getZ, 10 );

          if ( 2147483647 > currentZ > highestZ ) {
            highestZ = currentZ;
          } else {
            highestZ = 2147483647;
          }
        }
      }, this );
      return highestZ;
    },
    setZIndex: function() {
      var baseZ = this.findHighestZIndex();
      this.modalContainer.style.zIndex = baseZ + 1;
    }
  });
})( window.Polymer );
