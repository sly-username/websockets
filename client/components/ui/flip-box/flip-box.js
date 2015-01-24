( function( Polymer ) {
  "use strict";

  Polymer( "flip-box", {
    get trigger() {
      return this._trigger;
    },
    set trigger( value ) {
      this.setAttribute( "trigger", value );
      this._trigger = value;
      return value;
    },
    get animation() {
      return this._animation;
    },
    set animation( value ) {
      this.setAttribute( "animation", value );
      this._animation = value;
      return value;
    },

  /*** LIFECYCLE ***/
    ready: function() {
      this.boxEventList = [ "mouseover", "touchmove" ];
      this.btnEventList = [ "mousedown", "touchstart" ];
      this.flipBoxContainer = this.shadowRoot
        .getElementsByClassName( "flipbox-container" )[ 0 ];
      this.flipListener = this.flip.bind( this );
      this._trigger = this.attributes.trigger.value;
      this.triggerBoxes = Array.from( this.shadowRoot.getElementsByClassName( "box" ) );
      this.triggerButtons = Array.from( this.shadowRoot
        .getElementsByClassName( "flipbox-button" ) );
    },
    attached: function() {
      if ( this._trigger === "btn" ) {
        this.addBtnListener();
      } else if ( this._trigger === "box" ) {
        this.addBoxListener();
      }
    },
  /*** FUNCTIONS ***/
    flip: function() {
      this.flipBoxContainer.classList.toggle( "flip" );
    },
    /* EVENT LISTENERS */
    addBtnListener: function() {
      this.triggerButtons.forEach( function( button ) {
        this.btnEventList.forEach( function( event ) {
          button.addEventListener( event, this.flipListener );
        }.bind( this ) );
      }.bind( this ) );
    },
    removeBtnListener: function() {
      this.triggerButtons.forEach( function( button ) {
        this.btnEventList.forEach( function( event ) {
          button.removeEventListener( event, this.flipListener );
        }.bind( this ) );
      }.bind( this ) );
    },
    addBoxListener: function() {
      this.triggerBoxes.forEach( function( box ) {
        this.boxEventList.forEach( function( event ) {
          box.addEventListener( event, this.flipListener );
        }.bind( this ) );
      }.bind( this ) );
    },
    removeBoxListener: function() {
      this.triggerBoxes.forEach( function( box ) {
        this.boxEventList.forEach( function( event ) {
          box.removeEventListener( event, this.flipListener );
        }.bind( this ) );
      }.bind( this ) );
    },
    /* ATTRIBUTE CHANGE */
    attributeChanged: function( attrName, oldVal, newVal ) {
      if ( attrName === "trigger" ) {
        if ( newVal === "btn" ) {
          this.removeBoxListener();
          this.trigger = newVal;
          this.addbtnListener();
        } else if ( newVal === "box" ) {
          this.removeBtnListener();
          this.trigger = newVal;
          this.addBoxListener();
        }
      }
    },
    animationChanged: function( oldVal, newVal ) {
      this.animation = newVal;
      this.setAttribute( "animation", newVal );
    }
  /*** END FUNCTIONS ***/
  });
})( window.Polymer );
