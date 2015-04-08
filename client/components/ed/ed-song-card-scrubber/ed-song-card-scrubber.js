( function( polymer ) {
  "use strict";

  polymer( "ed-song-card-scrubber", {
    get currentTime() {
      return this.value;
    },

    get currentSeconds() {
      return Math.floor( this.currentTime % 60 );
    },

    get currentMinutes() {
      return Math.floor( this.currentTime / 60 );
    },

    get currentHours() {
      return Math.floor( 60 / this.currentTime );
    },

    get formattedTime() {
      var ss = this.currentSeconds,
        mm = this.currentMinutes,
        hh = this.currentHours;
      ss = ss < 10 ? "0" + ss : ss;
      mm = mm < 10 ? "0" + mm : mm;
      hh = hh < 10 ? "0" + hh : hh;

      if ( hh !== "00" ) {
        return `${ hh }:${ mm }:${ ss }`;
      }
      return `${ mm }:${ ss }`;
    },
    ready: function() {
      this.mouseDown = false;

      // Selectors
      this.svg = this.shadowRoot.getElementById( "svg-circle" );
      this.mid = this.shadowRoot.getElementById( "mid-circle" );
      this.front = this.shadowRoot.getElementById( "front-circle" );
      this.scrubber = this.shadowRoot.getElementById( "circle-scrubber" );

      // Calculates the circumference of circles
      this.circFront = ( 2.01 * Math.PI * ( parseInt( this.front.getAttribute( "r" ), 10 )));
      this.circMid = ( 2.01 * Math.PI * ( parseInt( this.mid.getAttribute( "r" ), 10 )));
      this.front.style[ "stroke-dasharray" ] = this.circFront + "%";
      this.mid.style[ "stroke-dasharray" ] = this.circMid + "%";
    },
    attached: function() {
      // mouse events
      this.scrubber.addEventListener( "mousedown", function() {
        this.mouseDown = true;
        // Calculates the center for the scrubber, not sure why this doesn't work correctly
        // in the polymer attached or ready function
        this.svgBox = this.scrubber.getBoundingClientRect();
        this.scrubCenter = [ ( this.svgBox.left + ( this.svgBox.width / 2 ) ),
          ( this.svgBox.top + ( this.svgBox.height / 2 ) ) ];
      }.bind( this ));
      this.addEventListener( "mouseup", function() {
        this.mouseDown = false;
        this.fire( "scrubEnd", {
          msg: "scrubEnd",
          newValue: this.currentVal
        });
      }.bind( this ));
      this.addEventListener( "mousemove", this.triggerMove.bind( this ) );
      // touch events
      this.scrubber.addEventListener( "touchstart", function() {
        this.svgBox = this.scrubber.getBoundingClientRect();
        this.scrubCenter = [ ( this.svgBox.left + ( this.svgBox.width / 2 ) ),
          ( this.svgBox.top + ( this.svgBox.height / 2 ) ) ];
        this.mouseDown = true;
      }.bind( this ));
      this.addEventListener( "touchend", function() {
        this.mouseDown = false;
        this.fire( "scrubEnd", {
          msg: "scrubEnd",
          newValue: this.currentVal
        });
      }.bind( this ));
      this.addEventListener( "touchmove", this.triggerMove.bind( this ) );
    },
    // TODO Event listener may not be removed as expected
    detached: function() {
      this.scrubber.removeEventListener( "mousedown", function() { this.mouseDown = true; }.bind( this ));
      this.removeEventListener( "mouseup", function() { this.mouseDown = false; }.bind( this ));
      this.removeEventListener( "mousemove", this.triggerMove.bind( this ) );
      // touch events
      this.scrubber.removeEventListener( "touchstart", function() { this.mouseDown = true; }.bind( this ));
      this.removeEventListener( "touchend", function() { this.mouseDown = false; }.bind( this ));
      this.removeEventListener( "touchmove", this.triggerMove.bind( this ) );
    },
    triggerMove: function( e ) {
      var angle,
        radians;

      if ( this.mouseDown ) {
        radians = Math.atan2( e.pageX - this.scrubCenter[ 0 ], e.pageY - this.scrubCenter[ 1 ] );
        angle = ( radians * ( 180 / Math.PI ) * -1 ) + 90;
        this.currentVal = ( angle * this.max ) / 360;
        this.scrubber.style.webkitTransform = "rotate(" + angle + "deg)";
        this.scrubber.style.transform = "rotate(" + angle + "deg)";
        this.front.style[ "stroke-dashoffset" ] = ( ( ( -1 * angle * this.circFront ) / 360 ) - ( this.circFront * 1.25 ) ) + "%";
        this.mid.style[ "stroke-dashoffset" ] = ( ( ( -1 * angle * this.circMid ) / 360 ) - ( this.circMid * 1.25 ) ) + "%";
      }
    },
    attributeChanged: function() {
      var degPercent = parseInt( ( this.value / this.max ) * 360, 10 );
      this.scrubber.style.webkitTransform = "rotate(" + ( degPercent - 90 ) + "deg)";
      this.scrubber.style.transform = "rotate(" + ( degPercent - 90 ) + "deg)";
      this.front.style[ "stroke-dashoffset" ] = ( ( ( -1 * ( degPercent - 90 ) * this.circFront ) / 360 ) - ( this.circFront * 1.25 ) ) + "%";
      this.mid.style[ "stroke-dashoffset" ] = ( ( ( -1 * ( degPercent - 90 ) * this.circMid ) / 360 ) - ( this.circMid * 1.25 ) ) + "%";
    }
  });
})( window.Polymer );
