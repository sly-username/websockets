( function( polymer ) {
  "use strict";

  polymer( "ed-star-rating", {
    /* LIFECYCLE */
    disable: false,
    ready: function() {
      this.inputField = this.shadowRoot.getElementById( "input-field" );
      this.overlapField = this.shadowRoot.getElementById( "overlap-field" );
    },
    attached: function() {
      this.inputField.addEventListener( "click", this.triggerRating.bind( this ));
    },
    triggerRating: function( event ) {
      switch ( event.target.id ) {
        case "rate1":
          this.transformOverlap( -80 );
          break;
        case "rate2":
          this.transformOverlap( -60 );
          break;
        case "rate3":
          this.transformOverlap( -40 );
          break;
        case "rate4":
          this.transformOverlap( -20 );
          break;
        case "rate5":
          this.transformOverlap( 0 );
          break;
        default:
          // do nothing
          break;
      }
    },
    transformOverlap: function( percent ) {
      this.overlapField.style.transform = "translateX(" + percent + "%)";
      this.overlapField.style.webkitTransform = "translateX(" + percent + "%)";
      this.overlapField.style.msTransform = "translateX(" + percent + "%)";
    }
    /* PROPERTIES */
    /* METHODS */
  });
})( window.Polymer );
