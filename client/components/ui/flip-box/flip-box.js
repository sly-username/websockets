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
      this._animation = this.attributes.animation.value;
      this._trigger = this.attributes.trigger.value;
      this.boxEventList = [ "mouseover", "touchmove" ];
      this.btnEventList = [ "mousedown", "touchstart" ];
      this.flipBoxContainer = this.shadowRoot
        .getElementsByClassName( "flipbox-container" )[ 0 ];
      this.flipListener = this.flip.bind( this );
      this.triggerBoxes = Array.from( this.shadowRoot.getElementsByClassName( "box" ) );
      this.triggerButtons = Array.from( this.shadowRoot
        .getElementsByClassName( "flipbox-button" ) );
    },
    attached: function() {
      console.log( this.attributes.animation.value );
      console.log( this.attributes.trigger.value );

      if ( this._trigger === "btn" ) {
        this.attributes.trigger.value = "btn";
        this.btnListener( "add" );
      } else {
        this.attributes.trigger.value = "box";
        this.boxListener( "add" );
      }

      if ( this._animation === "vertical" ) {
        this.attributes.animation.value = "vertical";
      } else {
        this.attributes.animation.value = "horizontal";
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
        this.trigger = newVal;

        if ( newVal === "btn" ) {
          this.boxListener( "remove" );
          this.btnListener( "add" );
        } else {
          this.btnListener( "remove" );
          this.trigger = "box";
          this.boxListener( "add" );
        }
      } else if ( attrName === "animation" ) {
        console.log( "are you noticing the animation change" );
        this.animation = newVal;

        if ( newVal === "vertical" ) {
          this.animation = "vertical";
        } else {
          this.animation = "horizontal";
        }
      }
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
