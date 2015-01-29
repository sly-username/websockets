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
    get rotation() {
      return this._rotation;
    },
    set rotation( value ) {
      this.setAttribute( "rotation", value );
      this._rotation = value;
      return value;
    },

    /*** LIFECYCLE ***/
    ready: function() {
      this.boxEventList = [ "mouseover", "touchmove" ];
      this.btnEventList = [ "mousedown", "touchstart" ];
      this.flipBoxContainer = this.shadowRoot
        .getElementsByClassName( "flipbox-container" )[ 0 ];
      this.flipListener = this.flip.bind( this );
      this.rotationListener = this.boxRotation.bind( this );
      this.triggerBoxes = Array.from( this.shadowRoot.getElementsByClassName( "box" ) );
      this.triggerButtons = Array.from( this.shadowRoot
        .getElementsByClassName( "flipbox-button" ) );
    },
    attached: function() {
      if ( this._trigger === "btn" ) {
        this.trigger = "btn";
        this.btnListener( "add" );
      } else {
        this.trigger = "box";
        this.boxListener( "add" );
      }

      if ( this._animation === "vertical" ) {
        this.animation = "vertical";
      } else {
        this.animation = "horizontal";
      }

      if ( this._rotation === "loop" ) {
        this.rotation = "loop";
      } else {
        this.rotation = "toggle";
      }
    },
    /*** FUNCTIONS ***/
    flip: function() {
      this.flipBoxContainer.classList.toggle( "flip" );
    },
    boxRotation: function() {
      if ( this.flipBoxContainer.classList.contains( "pause" ) ) {
        this.flipBoxContainer.classList.remove( "pause" );
        return;
      }
      this.flipBoxContainer.classList.add( "pause" );
      this.flipBoxContainer.addEventListener( "webkitAnimationEnd", function() {
        this.flipBoxContainer.style.webkitAnimationPlayState = "paused";
      });
    },
    /* EVENT LISTENERS */
    btnListener: function( flag ) {
      this.triggerButtons.forEach( function( button ) {
        this.btnEventList.forEach( function( event ) {
          button[ flag + "EventListener" ]( event, this.flipListener );
        }.bind( this ) );
      }.bind( this ) );
    },
    btnHiddenClass: function( flag ) {
      this.triggerButtons.forEach( function( button ) {
        button.classList[ flag ]( "hidden" );
      }, this );
    },
    boxListener: function( flag ) {
      this.triggerBoxes.forEach( function( box ) {
        this.boxEventList.forEach( function( event ) {
          if ( this.rotation === "loop" ) {
            box[ flag + "EventListener" ]( event, this.rotationListener );
          } else {
            box[ flag + "EventListener" ]( event, this.flipListener );
          }
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
          this.btnHiddenClass( "remove" );
        } else {
          this.btnListener( "remove" );
          this.trigger = "box";
          this.boxListener( "add" );
          this.btnHiddenClass( "add" );
        }
      } else if ( attrName === "animation" ) {
        this.animation = newVal;

        if ( newVal !== "vertical" ) {
          this.animation = "horizontal";
        }
      }
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
