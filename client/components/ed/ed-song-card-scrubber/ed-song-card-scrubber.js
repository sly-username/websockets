( function( polymer ) {
  "use strict";

  polymer( "ed-song-card-scrubber", {
    // Formats time into minute display
    // TODO can be more dry
    get formattedValue() {
      return this._formattedValue;
    },
    set formattedValue( value ) {
      return this._formattedValue = this.formatTime( value );
    },
    get formattedMax() {
      return this._formattedMax;
    },
    set formattedMax( value ) {
      return this._formattedMax = this.formatTime( value );
    },
    ready: function() {
      this.mouseDown = false;
      this.formattedValue = this.value;
      this.formattedMax = this.max;
      // Selectors
      this.svg = this.shadowRoot.getElementById( "svg-circle" );
      this.mid = this.shadowRoot.getElementById( "mid-circle" );
      this.front = this.shadowRoot.getElementById( "front-circle" );
      this.scrubber = this.shadowRoot.getElementById( "circle-scrubber" );
      this.shadowScrubber = this.shadowRoot.getElementById( "shadow-scrubber" );

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
        this.updateCenter();
      }.bind( this ));
      this.shadowScrubber.addEventListener( "mousedown", function() {
        this.mouseDown = true;
        this.updateCenter();
      }.bind( this ));
      this.addEventListener( "mouseup", function() {
        this.mouseDown = false;
        this.formattedValue = this.currentVal;
        this.fire( "scrubEnd", {
          msg: "scrubEnd",
          newValue: this.currentVal
        });
      }.bind( this ));
      this.addEventListener( "mousemove", this.triggerMove.bind( this ) );
      // touch events
      this.scrubber.addEventListener( "touchstart", function() {
        this.mouseDown = true;
        this.updateCenter();
      }.bind( this ));
      this.shadowScrubber.addEventListener( "touchstart", function() {
        this.mouseDown = true;
        this.updateCenter();
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

    detached: function() {
      // TODO find a good way to remove event listeners
    },
    attributeChanged: function() {
      var degPercent = parseInt( ( this.value / this.max ) * 360, 10 );
      this.scrubber.style.webkitTransform = "rotate(" + ( degPercent - 90 ) + "deg)";
      this.scrubber.style.transform = "rotate(" + ( degPercent - 90 ) + "deg)";
      this.shadowScrubber.style.webkitTransform = "rotate(" + ( degPercent - 90 ) + "deg)";
      this.shadowScrubber.style.transform = "rotate(" + ( degPercent - 90 ) + "deg)";
      this.front.style[ "stroke-dashoffset" ] = ( ( ( -1 * ( degPercent - 90 ) * this.circFront ) / 360 ) - ( this.circFront * 1.25 ) ) + "%";
      this.mid.style[ "stroke-dashoffset" ] = ( ( ( -1 * ( degPercent - 90 ) * this.circMid ) / 360 ) - ( this.circMid * 1.25 ) ) + "%";
      this.formattedValue = this.value;
      this.formattedMax = this.max;
    },
    triggerMove: function( e ) {
      var angle,
        radians;

      if ( this.mouseDown ) {
        // the following function does not generate a max of 360 degress, buffer of 10 deg left and right
        // TODO fix
        radians = Math.atan2( e.pageX - this.scrubCenter[ 0 ], e.pageY - this.scrubCenter[ 1 ] );
        angle = ( radians * ( 180 / Math.PI ) * -1 ) + 90;
        this.currentVal = ( ( ( angle + 90 ) * this.max ) / 360 );
        console.log( this.currentVal );
        this.scrubber.style.webkitTransform = "rotate(" + angle + "deg)";
        this.scrubber.style.transform = "rotate(" + angle + "deg)";
        this.shadowScrubber.style.webkitTransform = "rotate(" + angle + "deg)";
        this.shadowScrubber.style.transform = "rotate(" + angle + "deg)";
        this.front.style[ "stroke-dashoffset" ] = ( ( ( -1 * angle * this.circFront ) / 360 ) - ( this.circFront * 1.25 ) ) + "%";
        this.mid.style[ "stroke-dashoffset" ] = ( ( ( -1 * angle * this.circMid ) / 360 ) - ( this.circMid * 1.25 ) ) + "%";
      }
    },
    formatTime: function( time ) {
      var ss = Math.floor( time % 60 ),
        mm = Math.floor( time / 60 ),
        hh = Math.floor( 60 / time );
      ss = ss < 10 ? "0" + ss : ss;
      mm = mm < 10 ? "0" + mm : mm;
      hh = hh < 10 ? "0" + hh : hh;

      if ( hh !== "00" ) {
        return `${ hh }:${ mm }:${ ss }`;
      }
      return `${ mm }:${ ss }`;
    },
    updateCenter: function() {
      // Calculates the center for the scrubber, getBoundingClientRect does not take into account scrolling
      // TODO find alternative to getBoundingClientRect
      this.svgBox = this.svg.getBoundingClientRect();
      this.scrubCenter = [ ( this.svgBox.left + ( this.svgBox.width / 2 ) ),
        ( this.svgBox.top + ( this.svgBox.height / 2 ) ) ];
    }
  });
})( window.Polymer );
