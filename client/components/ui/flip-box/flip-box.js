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
      this.flipBoxContainer = this.shadowRoot.getElementsByClassName( "flipbox-container" )[ 0 ];
      this.backFlipBox = this.shadowRoot.getElementById( "back" );
      this.frontFlipBox = this.shadowRoot.getElementById( "front" );
      this.flipBoxButtons = Array.from( this.shadowRoot.getElementsByClassName( "flipbox-button" ) );
      this.boxes = Array.from( this.shadowRoot.getElementsByClassName( "box" ) );
      this._trigger = this.attributes.trigger.value;
    },
    attached: function() {
      this.btnListener();
      this.boxListener();
      // if trigger === "btn"
      //  then attach this.btnListener;
      //  also make button visible;

      // if trigger === "box"
      //  then attach this.boxListener
    },

    /*** FUNCTIONS ***/
    /* EVENT LISTENERS */
    btnListener: function() {
      this.flipBoxButtons.forEach( function( button ) {
        button.addEventListener( "mousedown", function() {
          this.flipBoxContainer.classList.toggle( "flip" );
        }.bind( this ) );
      }.bind( this ) );
    },
    boxListener: function() {
      this.boxes.forEach( function( box ) {
        box.addEventListener( "mouseover", function() {
          this.flipBoxContainer.classList.toggle( "flip" );
        }.bind( this ) );
      }.bind( this ) );
    },

    /* ATTRIBUTE CHANGE */
    attributeChanged: function( attrName, oldVal, newVal ) {

      if ( attrName === "trigger" ) {
        //this.triggerListener( "remove" );
        this.trigger = newVal;
        //this.triggerListener( "add" );
      } else {
        this[attrName] = newVal === "";
      }

      if ( attrName === "closebutton" ) {
        this.modalButton.classList[ !newVal && newVal !== "" ? "add" : "remove" ]( "hidden" );
      }
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
