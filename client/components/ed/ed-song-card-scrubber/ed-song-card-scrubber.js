( function( polymer ) {
  "use strict";

  polymer( "ed-song-card-scrubber", {
    ready: function() {
      this.back = this.shadowRoot.getElementById( "back-circle" );
      this.mid = this.shadowRoot.getElementById( "mid-circle" );
      this.front = this.shadowRoot.getElementById( "front-circle" );
      this.scrubber = this.shadowRoot.getElementById( "circle-scrubber" );
      this.hiddenInput = this.shadowRoot.getElementById( "hidden-input" );
      this.circFront = ( 6.28 * ( parseInt( this.front.getAttribute( "r" ), 10 )));
      this.circMid = ( 6.28 * ( parseInt( this.mid.getAttribute( "r" ), 10 )));
      this.bottomVal = parseInt( ( this.hiddenInput.max - this.hiddenInput.min ), 10 );
    },
    attached: function() {
      this.hiddenInput.addEventListener( "change", this.moveScrubber.bind( this ) );
    },
    moveScrubber: function() {
      this.topVal = parseInt( ( this.hiddenInput.value - this.hiddenInput.min ), 10 );
      this.valPercent = parseInt( ( this.topVal / this.bottomVal ) * 100, 10 );
      this.degPercent = parseInt( ( this.valPercent * 360 ) / 100, 10 );

      this.front.style[ "stroke-dasharray" ] = this.circFront + "%";
      this.front.style[ "stroke-dashoffset" ] = ( this.circFront - ( ( this.valPercent * this.circFront ) / 100 ) ) + "%";
      this.mid.style[ "stroke-dasharray" ] = this.circMid + "%";
      this.mid.style[ "stroke-dashoffset" ] = ( this.circMid - ( ( this.valPercent * this.circMid ) / 100 ) ) + "%";
      this.scrubber.style.webkitTransform = "rotate(" + ( this.degPercent - 92 ) + "deg)";
      this.scrubber.style.transform = "rotate(" + ( this.degPercent - 92 ) + "deg)";
    }
  });
})( window.Polymer );
