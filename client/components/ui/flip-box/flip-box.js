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
    /*** LIFECYCLE ***/
    ready: function() {
      this.flipBoxContainer = this.shadowRoot.getElementsByClassName( "flipbox-container" )[0];
      this.backFlipBox = this.shadowRoot.getElementById( "back" );
      this.frontFlipBox = this.shadowRoot.getElementById( "front" );
      this.flipBoxButton = this.shadowRoot.getElementsByClassName( "flipbox-button" )[0];
      this._trigger = this.attributes.trigger.value;
    },
    attached: function() {
      //  this.visibleClass = ["front", "back"];
      this.btnListener();
      this.frontFlipBox.classList.add( "front" );
    },

    /*** FUNCTIONS ***/
    /* EVENT LISTENERS */
    btnListener: function() {


        this.flipBoxButton.addEventListener( "mousedown", function() {
          console.log(this.frontFlipBox);
          this.frontFlipBox.classList.toggle( "front" );
          console.log(this.frontFlipBox.classList.contains("front"));
          this.backFlipBox.classList.toggle( "back" );
          console.log(this.backFlipBox.classList.contains("back"));
        }.bind( this ) );

    },

    // if trigger = btn
    //  then add click listener to this.flipboxButton
    //    when button is clicked,
    //      this.flipbox.classList.toggle("front")
    //      classList.toggle("back")
    // if trigger = box
    //  then add hover listener to this.flipboxContainer
    //    when user hovers over the flip box,
    //      then class will change from front/back or back/front

    //  need to know if current class is front or back - for the event handler
    //    if classList contains .front, then remove that and add .back
    //    classList.toggle("front")
    //      will it toggle between front and back?

    //  this.flipbox.classList.toggle("front");
    //    can you toggle multiple classes?
    //    it will start out with front. so the toggle will remove front
    //    and the back toggle will add back.
    //    hopefully.

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
