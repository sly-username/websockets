( function( polymer ) {
  "use strict";

  polymer( "ed-song-card-scrubber", {
    complete: false,
    // Formats time into minute display
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
      // Selectors
      this.svg = this.shadowRoot.getElementById( "svg-circle" );
      this.mid = this.shadowRoot.getElementById( "mid-circle" );
      this.front = this.shadowRoot.getElementById( "front-circle" );
      this.scrubber = this.shadowRoot.getElementById( "circle-scrubber" );
      this.shadowScrubber = this.shadowRoot.getElementById( "shadow-scrubber" );
      this.playBtn = this.shadowRoot.getElementById( "play-btn" );
      this.playIcon = this.shadowRoot.getElementById( "btn-icon" );

      // Calculates the circumference of circles
      this.circFront = ( 2.01 * Math.PI * ( parseInt( this.front.getAttribute( "r" ), 10 )));
      this.circMid = ( 2.01 * Math.PI * ( parseInt( this.mid.getAttribute( "r" ), 10 )));
      this.front.style[ "stroke-dasharray" ] = this.circFront + "%";
      this.mid.style[ "stroke-dasharray" ] = this.circMid + "%";
      this.updateScrub();
    },
    attached: function() {
      // mouse events
      this.playBtn.addEventListener( "click", this.swapIcon.bind( this ) );
      this.scrubber.addEventListener( "mousedown", this.updateCenter.bind( this ) );
      this.shadowScrubber.addEventListener( "mousedown", this.updateCenter.bind( this ) );
      this.addEventListener( "mouseup", this.scrubFire.bind( this ));
      this.addEventListener( "mousemove", this.triggerMove.bind( this ) );
      // touch events
      this.playBtn.addEventListener( "tap", this.swapIcon.bind( this ) );
      this.scrubber.addEventListener( "touchstart", this.updateCenter.bind( this ) );
      this.shadowScrubber.addEventListener( "touchstart", this.updateCenter.bind( this ) );
      this.addEventListener( "touchend", this.scrubFire.bind( this ));
      this.addEventListener( "touchmove", this.triggerMove.bind( this ) );
    },
    attributeChanged: function( attrName, oldVal, newVal ) {
      if ( attrName === "value" ) {
        this.updateScrub();
      }

      if ( this.value === this.max ) {
        this.complete = true;
        this.setAttribute( "complete", "" );
        this.scrubber.style.opacity = 0;
        this.shadowScrubber.style.opacity = 0;
        this.playBtn.disabled = true;
        this.playIcon.style.opacity = 0.02;
      } else {
        this.complete = false;
        this.removeAttribute( "complete" );
      }
    },
    triggerMove: function( e ) {
      var angle,
        radians;

      if ( this.mouseDown ) {
        radians = Math.atan2( e.pageX - this.scrubCenter[ 0 ], e.pageY - this.scrubCenter[ 1 ] );
        angle = ( radians * ( 180 / Math.PI ) * -1 ) + 90;
        this.currentVal = ( ( ( angle + 90 ) * this.max ) / 360 );
        this.scrubber.style.webkitTransform = "rotate(" + angle + "deg)";
        this.scrubber.style.transform = "rotate(" + angle + "deg)";
        this.shadowScrubber.style.webkitTransform = "rotate(" + angle + "deg)";
        this.shadowScrubber.style.transform = "rotate(" + angle + "deg)";
        this.front.style[ "stroke-dashoffset" ] = ( ( ( -1 * angle * this.circFront ) / 360 ) - ( this.circFront * 1.25 ) ) + "%";
        this.mid.style[ "stroke-dashoffset" ] = ( ( ( -1 * angle * this.circMid ) / 360 ) - ( this.circMid * 1.25 ) ) + "%";
      }
    },
    // To be removed once integrated with player service
    formatTime: function( time ) {
      var ss = Math.floor( time % 60 ),
        mm = Math.floor( time / 60 );
      ss = ss < 10 ? "0" + ss : ss;
      mm = mm < 10 ? "0" + mm : mm;

      return mm + ":" + ss;
    },
    updateCenter: function() {
      var top = window.pageYOffset;
      this.mouseDown = true;
      // determines center of svg, using top to compensate for scrolling
      this.svgBox = this.svg.getBoundingClientRect();
      this.scrubCenter = [ ( this.svgBox.left + ( this.svgBox.width / 2 ) ),
        ( ( this.svgBox.top + top ) + ( this.svgBox.height / 2 ) ) ];
    },
    updateScrub: function() {
      var degPercent = parseInt( ( this.value / this.max ) * 360, 10 ),
        rotation = "rotate(" + ( degPercent - 90 ) + "deg)";
      this.scrubber.style.webkitTransform = rotation;
      this.scrubber.style.transform = rotation;
      this.shadowScrubber.style.webkitTransform = rotation;
      this.shadowScrubber.style.transform = rotation;
      this.front.style[ "stroke-dashoffset" ] = ( ( ( -1 * ( degPercent - 90 ) * this.circFront ) / 360 ) - ( this.circFront * 1.25 ) ) + "%";
      this.mid.style[ "stroke-dashoffset" ] = ( ( ( -1 * ( degPercent - 90 ) * this.circMid ) / 360 ) - ( this.circMid * 1.25 ) ) + "%";
      this.formattedValue = this.value;
      this.formattedMax = this.max;
    },
    swapIcon: function() {
      if ( this.playIcon.getAttribute( "name" ) === "play" ) {
        this.playIcon.setAttribute( "name", "pause" );
      } else {
        this.playIcon.setAttribute( "name", "play" );
      }
    },
    scrubFire: function() {
      this.mouseDown = false;

      if ( this.currentVal ) {
        this.formattedValue = this.currentVal;
      }
      this.fire( "scrubEnd", {
        msg: "scrubEnd",
        newValue: this.currentVal
      });
    }
  });
})( window.Polymer );