( function( Polymer ) {
  "use strict";

  Polymer( "flip-box", {
    publish: {
      trigger: {
        reflect: true
      },
      rotation: {
        reflect: true
      },
      animation: {
        reflect: true
      }
    },
    get isFlipped() {
      return this.flipBoxContainer.classList.contains( "flip" );
    },
    set isFlipped( value ) {
      this.flipBoxContainer.classList[ value ? "add" : "remove" ]( "flip" );
    },
    /*** LIFECYCLE ***/
    ready: function() {
      this.eventList = [ "mousedown", "touchleave" ];

      this.flipBoxContainer = this.shadowRoot
        .getElementsByClassName( "flipbox-container" )[ 0 ];
      this.triggerButtons = Array.from( this.shadowRoot
        .getElementsByClassName( "flipbox-button" ) );

      // Add transition end
      this.flipBoxContainer.addEventListener( "transitionend", function() {
        if ( this.needsReset ) {
          this.flipBoxContainer.classList.remove( "flipbox-transition", "continue" );
          this.flipBoxContainer.classList.add( "no-transform" );
        }
      }. bind( this ) );
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
      this.flipBoxContainer.classList.remove( "no-transform" );
      this.flipBoxContainer.classList.add( "flipbox-transition" );
      this.flipBoxContainer.classList.toggle( "flip" );
    },
    loop: function() {
      if ( this.flipBoxContainer.classList.contains( "flip" ) ) {
        this.needsReset = true;
        this.flipBoxContainer.classList.remove( "flip" );
        this.flipBoxContainer.classList.add( "flipbox-transition", "continue" );
      } else {
        this.flipBoxContainer.classList.remove( "no-transform" );
        this.flipBoxContainer.classList.add( "flip", "flipbox-transition" );
      }
    },
    /* EVENT LISTENERS */
    btnListener: function( flag ) {
      this.eventList.forEach( function( event ) {
        this[ flag + "EventListener" ]( event, this.btnListenerFunction );
      }.bind( this ) );
    },
    btnListenerFunction: function( e ) {
      if ( e.path[ 0 ].classList.contains( "flipbox-button" ) ) {
        this.rotation === "loop" ? this.loop() : this.flip();
      }
    },
    boxListener: function( flag ) {
      this.eventList.forEach( function( event ) {
        this[ flag + "EventListener" ]( event, this.boxListenerFunction );
      }.bind( this ) );
    },
    boxListenerFunction: function() {
      this.rotation === "loop" ? this.loop() : this.flip();
    },
    // resetting event listeners
    btnPackage: function() {
      this.boxListener( "remove" );
      this.btnListener( "add" );
    },
    boxPackage: function() {
      this.btnListener( "remove" );
      this.boxListener( "add" );
    },
    /* ATTRIBUTE CHANGE */
    attributeChanged: function( attrName, oldVal, newVal ) {
      // trigger
      if ( attrName === "trigger" ) {
        if ( newVal === "btn" ) {
          this.trigger = newVal;
          this.btnPackage();
        } else {
          this.trigger = "box";
          this.boxPackage();
        }
      // animation
      } else if ( attrName === "animation" ) {
        this.animation = newVal === "vertical" ? newVal : "horizontal";
      // rotation
      } else if ( attrName === "rotation" ) {
        this.rotation = newVal === "loop" ? newVal : "toggle";
      }
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
