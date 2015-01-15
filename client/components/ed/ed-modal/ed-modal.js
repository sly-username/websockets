( function( Polymer ) {
  "use strict";
  Polymer( "ed-modal", {

/* GETTERS AND SETTERS */
  /* Click Off */
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
  /* Close Button */
    get closebutton() {
      return this.hasAttribute( "closebutton" );
    },
    set closebutton( value ) {
      if ( value ) {
        this.setAttribute( "closebutton", "" );
      } else {
        this.removeAttribute( "closebutton" );
      }
    },
  /* Trigger */
    get trigger() {
      return this._trigger;
    },
    set trigger( value ) {
      this.attributes.trigger.value = value;
      this._trigger = value;
      return value;
    },

  /* FUNCTIONS */
    ready: function() {
      this.modalContainer = this.shadowRoot.getElementById( this.attributes.trigger.value );
      this.modalButton = this.shadowRoot.getElementById( "modal-button" );
      this.openListener = this.open.bind( this );
      this.closeButtonListener = this.closeButton.bind( this );
      this.closeModalListener = this.closeModal.bind( this );
    },
    attached: function() {
      this.attachTriggerListener();

      [ "mousedown", "touchstart" ].forEach( function( e ) {
        this.modalButton.addEventListener( e, this.closeButtonListener );
      }.bind( this ) );

      if ( !this.hasAttribute( "closebutton" ) ) {
        this.modalButton.setAttribute( "class", "modal-button modal-container-closed" );
      }

      if ( this.hasAttribute( "clickoff" ) ) {
        this.attachClickoffListener();
      }
    },

  /* EVENT LISTENERS */
    /* Trigger */
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
    /* Click Off */
    attachClickoffListener: function() {
      [ "mousedown", "touchstart" ].forEach( function( e ) {
        this.modalContainer.addEventListener( e, this.closeModalListener );
      }.bind( this ) );
    },
    removeClickoffListener: function() {
      [ "mousedown", "touchstart" ].forEach( function( e ) {
        this.modalContainer.removeEventListener( e, this.closeModalListener );
      }.bind( this ) );
    },

    /* MODAL APPEAR AND DISAPPEAR */
    open: function() {
      this.setZIndices();
      this.modalContainer.setAttribute( "class", "modal-container modal-container-opened" );
    },
    closeButton: function() {
      this.modalContainer.setAttribute( "class", "modal-container" );
    },
    closeModal: function( e ) {
      if ( e.target == this.modalContainer ) {
        this.modalContainer.setAttribute( "class", "modal-container" );
      }
    },

  /* ATTRIBUTE CHANGED FUNCTIONS */
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

      switch ( attrName ) {
        case "clickoff":
          this.clickoff = newVal === "";
          break;
        case "closebutton":
          this.closebutton = newVal === "";

          if ( !this.hasAttribute( "closebutton" ) ) {
            this.modalButton.setAttribute( "class", "modal-button modal-container-closed" );
          } else {
            this.modalButton.setAttribute( "class", "modal-button" );
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
          //siblings = Array.from( this.siblings );
          levelOnes = Array.from( document.querySelectorAll( "body > *" ) );

      if ( !levelOnes.length ) {
        return highestZ;
      }

      levelOnes.forEach( function( elem ) {
        console.log("running?");
        var isItWorking = elem.style.position && elem.style.zIndex;
        console.log(isItWorking);

        if ( isItWorking ) {
          console.log("running!");
          currentZ = parseInt( elem.style.zIndex, 10 );
          console.log(currentZ);
          if ( currentZ > highestZ ) {
            highestZ = currentZ;
            console.log(highestZ);
          }
        }
      });
      return highestZ;
    },
    setZIndices: function() {
      var baseZ = this.findHighestZIndex();
      console.log(baseZ);
    }
  });
})( window.Polymer );
