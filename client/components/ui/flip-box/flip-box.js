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
    get isFlipped() {
      return this.flipBoxContainer.classList.contains( "flip" );
    },
    set isFlipped( value ) {
      this.flipBoxContainer.classList[ value ? "add" : "remove" ]( "flip" );
    },
    /*** LIFECYCLE ***/
    ready: function() {
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
      this.flipBoxContainer.classList.remove( "continue" );
      this.flipBoxContainer.classList.remove( "no-transform" );
      this.flipBoxContainer.classList.add( "flipbox-transition" );
      this.flipBoxContainer.classList.toggle( "flip" );
    },
    loop: function() {
      if ( this.flipBoxContainer.classList.contains( "flip" ) ) {
        this.flipBoxContainer.classList.remove( "flip" );
        this.flipBoxContainer.classList.add( "flipbox-transition", "continue" );
        this.flipBoxContainer.addEventListener( "transitionend", function() {
          this.flipBoxContainer.classList.remove( "continue", "flipbox-transition"  );
          this.flipBoxContainer.classList.add( "no-transform" );
          this.flipBoxContainer.removeEventListener( "transitionEnd" );
        }. bind( this ) );
      } else {
        this.flipBoxContainer.classList.remove( "no-transform" );
        this.flipBoxContainer.classList.add( "flip", "flipbox-transition" );
      }
    },
    /* EVENT LISTENERS */
    btnListener: function( flag ) {
      // look into event delegation (event.target)
      this.btnEventList.forEach( function( event ) {
        this[ flag + "EventListener" ]( event, function( e ) {
          if ( e.path[ 0 ].classList.contains( "flipbox-button" ) ) {
            this.rotation === "loop" ? this.loop() : this.flip();
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
      this.boxEventList.forEach( function( event ) {
        this[ flag + "EventListener" ]( event, function() {
          this.rotation === "loop" ? this.loop() : this.flip();
        }.bind( this ) );
      }.bind( this ) );
    },
    listenersReset: function() {
      this.boxListener( "remove" );
      this.btnListener( "remove" );
      this.flipBoxContainer.classList.add( "no-transform" );
      this.flipBoxContainer.classList.remove( "flipbox-transition" );
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
      // trigger
      if ( attrName === "trigger" ) {
        this.listenersReset();
        this.trigger = newVal;

        if ( newVal === "btn" ) {
          this.btnPackage();
        } else {
          this.boxPackage();
        }
      // animation
      } else if ( attrName === "animation" ) {
        this.listenersReset();
        this.animation = newVal;

        if ( newVal === "vertical" ) {
          this.animation = "vertical";
        } else {
          this.animation = "horizontal";
        }

        if ( this.trigger === "btn" ) {
          this.btnPackage();
        } else {
          this.boxPackage();
        }
      // rotation
      } else if ( attrName === "rotation" ) {
        this.listenersReset();
        this.rotation = newVal;

        if ( newVal === "loop" ) {
          this.rotation = "loop";
        } else {
          this.rotation = "toggle";
        }

        if ( this.trigger === "btn" ) {
          this.btnPackage();
        } else {
          this.boxPackage();
        }
      }
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
