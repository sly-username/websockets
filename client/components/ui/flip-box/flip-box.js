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
        this.btnListener( "add" );
      } else if ( this._trigger === "box" ) {
        this.boxListener( "add" );
      }
    },
    /*** FUNCTIONS ***/
    flip: function() {
      this.flipBoxContainer.classList.toggle( "flip" );
    },
    /* EVENT LISTENERS */
    btnListener: function( flag ) {
      this.triggerButtons.forEach( function( button ) {
        this.btnEventList.forEach( function( event ) {
          button[ flag + "EventListener" ]( event, this.flipListener );
        }.bind( this ) );
      }.bind( this ) );
    },
    boxListener: function( flag ) {
      this.triggerBoxes.forEach( function( box ) {
        this.boxEventList.forEach( function( event ) {
          box[ flag + "EventListener" ]( event, this.flipListener );
        }.bind( this ) );
      }.bind( this ) );
    },
    /* ATTRIBUTE CHANGE */
    attributeChanged: function( attrName, oldVal, newVal ) {
      if ( attrName === "trigger" ) {
        if ( newVal === "btn" ) {
          this.boxListener( "remove" );
          this.trigger = newVal;
          this.btnListener( "add" );
        } else if ( newVal === "box" ) {
          this.btnListener( "remove" );
          this.trigger = newVal;
          this.boxListener( "add" );
        }
      } else if ( attrName === "animation" ) {
        this.animation = newVal;
        this.setAttribute( "animation", newVal );
      }
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
