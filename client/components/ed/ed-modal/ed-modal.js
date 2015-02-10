( function( Polymer ) {
  "use strict";
  Polymer( "ed-modal", {
    publish: {
      clickoff: {
        reflect: true
      },
      closebutton: {
        reflect: true
      },
      trigger: {
        reflect: true
      }
    },
    _isOpen: false,
    get isOpen() {
      return this._isOpen;
    },
    /*** LIFECYCLE ***/
    ready: function() {
      this.closeListener = this.close.bind( this );
      this.closeModalListener = this.closeModal.bind( this );
      this.eventObjs = [ "mousedown", "touchstart" ];
      this.modalButton = this.shadowRoot.getElementsByClassName( "modal-button" )[ 0 ];
      this.modalContainer = this.shadowRoot.getElementsByClassName( "modal-container" )[ 0 ];
      this.openListener = this.open.bind( this );
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
    /*** FUNCTIONS ***/
    /*** event listeners ***/
    triggerListener: function( toggle ) {
      this.eventObjs.forEach( function( e ) {
        var elems = document.querySelectorAll( this.trigger );

        if ( elems.length === 0 ) {
          return;
        } else if ( elems.length === 1 ) {
          elems[ 0 ][ toggle + "EventListener" ]( e, this.openListener );
        } else {
          Array.from( elems ).forEach( function( elem ) {
            elem[ toggle + "EventListener" ]( e, this.openListener );
          }.bind( this ) );
        }
      }.bind( this ) );
    },
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
    /*** show/hide modal ***/
    open: function() {
      this.setZIndex();
      this.modalContainer.classList.add( "modal-container-opened" );
      this._isOpen = true;
    },
    close: function() {
      this.modalContainer.classList.remove( "modal-container-opened" );
      this._isOpen = false;
    },
    closeModal: function( e ) {
      if ( e.target === this.modalContainer ) {
        this.modalContainer.classList.remove( "modal-container-opened" );
      }
    },
    /*** attribute change ***/
    attributeChanged: function( attrName, oldVal, newVal ) {
      if ( attrName === "trigger" ) {
        this.triggerListener( "remove" );
        this.trigger = newVal;
        this.triggerListener( "add" );
      } else {
        this[ attrName ] = newVal === "";
      }

      if ( attrName === "closebutton" ) {
        this.modalButton.classList[ !newVal && newVal !== "" ? "add" : "remove" ]( "hidden" );
      }
    },
    /*** z-index ***/
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
