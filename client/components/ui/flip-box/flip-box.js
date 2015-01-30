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
      this.degree = 0;
      this._animation = this.attributes.animation.value;
      this._rotation = this.attributes.rotation.value;
      this._trigger = this.attributes.trigger.value;

      this.boxEventList = [ "mouseleave", "touchleave" ];
      this.btnEventList = [ "mousedown", "touchstart" ];

      this.flipBoxContainer = this.shadowRoot
        .getElementsByClassName( "flipbox-container" )[ 0 ];
      this.triggerBoxes = Array.from( this.shadowRoot.getElementsByClassName( "box" ) );
      this.triggerButtons = Array.from( this.shadowRoot
        .getElementsByClassName( "flipbox-button" ) );

      this.flipFunction = this.flip.bind( this );
      this.loopFunction = this.loop.bind( this );
    },
    attached: function() {
      if ( this.trigger === "btn" ) {
        this.trigger = "btn";
        this.btnListener( "add" );
      } else {
        this.trigger = "box";
        this.boxListener( "add" );
        this.btnHiddenClass( "add" );
      }

      if ( this.animation === "vertical" ) {
        this.animation = "vertical";
      } else {
        this.animation = "horizontal";
      }

      if ( this.rotation === "loop" ) {
        this.rotation = "loop";
      } else {
        this.rotation = "toggle";
      }
    },
    /*** FUNCTIONS ***/
    flip: function() {
      this.flipBoxContainer.classList.toggle( "flip" );
    },
    loop: function() {
      this.degree += 180;

      if ( this.animation === "vertical" ) {
        this.flipBoxContainer.style.transform = "rotateY(" + this.degree + "deg)";
      } else {
        this.flipBoxContainer.style.transform = "rotateX(" + this.degree + "deg)";
      }
    },
    /* EVENT LISTENERS */
    btnListener: function( flag ) {
      this.triggerButtons.forEach( function( button ) {
        this.btnEventList.forEach( function( event ) {
          if ( this.rotation === "loop" ) {
            button[ flag + "EventListener" ]( event, this.loopFunction );
          } else {
            button[ flag + "EventListener" ]( event, this.flipFunction );
          }
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
            box[ flag + "EventListener" ]( event, this.loopFunction );
          } else {
            box[ flag + "EventListener" ]( event, this.flipFunction );
          }
        }.bind( this ) );
      }.bind( this ) );
    },
    listenersReset: function() {
      this.boxListener( "remove" );
      this.btnListener( "remove" );
      this.flipBoxContainer.removeAttribute( "style" );
    },
    btnPackage: function() {
      this.trigger = "btn";
      this.btnListener( "add" );
      this.btnHiddenClass( "remove" );
    },
    boxPackage: function() {
      this.trigger = "box";
      this.boxListener( "add" );
      this.btnHiddenClass( "add" );
    },
    /* ATTRIBUTE CHANGE */
    attributeChanged: function( attrName, oldVal, newVal ) {
      this.listenersReset();
      // trigger
      if ( attrName === "trigger" ) {
        this.trigger = newVal;

        if ( newVal === "btn" ) {
          this.btnPackage();
        } else {
          this.boxPackage();
        }
      // animation
      } else if ( attrName === "animation" ) {
        this.animation = newVal;

        if ( newVal === "vertical" ) {
          this.animation = "vertical";
        } else {
          this.animation = "horizontal";
        }

        if ( newVal === "btn" ) {
          this.btnPackage();
        } else {
          this.boxPackage();
        }
      // rotation
      } else if ( attrName === "rotation" ) {
        this.rotation = newVal;

        if ( newVal === "loop" ) {
          this.rotation = "loop";
        } else {
          this.rotation = "toggle";
        }

        if ( newVal === "btn" ) {
          this.btnPackage();
        } else {
          this.boxPackage();
        }
      }
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
