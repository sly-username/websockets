( function( polymer ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-player-service" ),
    System.import( "domain/ed/objects/model-type-checker" )
  ]).then(function( imported ) {
    var
      playerService = imported[ 0 ].default,
      typeChecker = imported[ 1 ].default,
      intervalTime = 500,
      updateCenterHandler = function() {
        var top = window.pageYOffset;
        this.mouseDown = true;

        // determines center of svg, using top to compensate for scrolling
        this.svgBox = this.svg.getBoundingClientRect();
        this.scrubCenter = [ ( this.svgBox.left + ( this.svgBox.width / 2 ) ),
                             ( ( this.svgBox.top + top ) + ( this.svgBox.height / 2 ) ) ];
      },
      swapIconHandler = function() {
        if ( this.playIcon.getAttribute( "name" ) === "play" ) {
          this.playIcon.setAttribute( "name", "pause" );
        } else {
          this.playIcon.setAttribute( "name", "play" );
        }
      },
      scrubFireHandler = function() {
        this.mouseDown = false;

        if ( this.currentVal ) {
          this.formattedValue = this.currentVal;
        }
        this.fire( "scrubEnd", {
          msg: "scrubEnd",
          newValue: this.currentVal
        });
      },
      triggerMoveHandler = function( e ) {
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
      };

    // TODO REMOVE
    window.playerService = playerService;

    polymer( "ed-song-card-scrubber", {
      complete: false,
      max: playerService.trackLength,
      value: playerService.currentTime,
      // Formats time into minute display
      get formattedValue() {
        return this._formattedValue;
      },
      set formattedValue( value ) {
        return this._formattedValue = playerService.formattedTime;
      },
      get formattedMax() {
        return this._formattedMax;
      },
      set formattedMax( value ) {
        return this._formattedMax = playerService.formatTime( playerService.trackLength );
      },
      ready: function() {
        this.mouseDown = false;
        // Selectors
        this.svg            = this.shadowRoot.getElementById( "svg-circle" );
        this.mid            = this.shadowRoot.getElementById( "mid-circle" );
        this.front          = this.shadowRoot.getElementById( "front-circle" );
        this.scrubber       = this.shadowRoot.getElementById( "circle-scrubber" );
        this.shadowScrubber = this.shadowRoot.getElementById( "shadow-scrubber" );
        this.playBtn        = this.shadowRoot.getElementById( "play-btn" );
        this.playIcon       = this.shadowRoot.getElementById( "play-icon" );

        // Event Handler
        this.handler = {
          swapIcon: swapIconHandler.bind( this ),
          updateCenter: updateCenterHandler.bind( this ),
          scrubFire: scrubFireHandler.bind( this ),
          triggerMove: triggerMoveHandler.bind( this )
        };

        // Calculates the circumference of circles
        this.circFront = ( 2.01 * Math.PI * ( parseInt( this.front.getAttribute( "r" ), 10 )));
        this.circMid = ( 2.01 * Math.PI * ( parseInt( this.mid.getAttribute( "r" ), 10 )));
        this.front.style[ "stroke-dasharray" ] = this.circFront + "%";
        this.mid.style[ "stroke-dasharray" ] = this.circMid + "%";

        this.playerServiceEventHandler = function( event ) {
          var eventType = event.detail.type;

          if ( eventType === "pause" || eventType === "stop" ) {
            clearInterval( this.intervalId );
          }

          if ( eventType === "play" ) {
            this.intervalId = setInterval( this.playerServiceEventHandler, intervalTime );
          }
        }.bind( this );
      },
      attached: function() {

        // mouse events
        this.playBtn.addEventListener( "click", this.handleEvents.bind( this ) );
        this.scrubber.addEventListener( "mousedown", this.handler.updateCenter );
        this.shadowScrubber.addEventListener( "mousedown", this.handler.updateCenter );
        this.addEventListener( "mouseup", this.handler.scrubFire );
        this.addEventListener( "mousemove", this.handler.triggerMove );
        // touch events
        this.playBtn.addEventListener( "tap", this.handler.swapIcon );
        this.scrubber.addEventListener( "touchstart", this.handler.updateCenter );
        this.shadowScrubber.addEventListener( "touchstart", this.handler.updateCenter );
        this.addEventListener( "touchend", this.handler.scrubFire );
        this.addEventListener( "touchmove", this.handler.triggerMove );

        //// mouse events
        //this.playBtn.addEventListener( "click", this.handleEvents.bind( this ) );
        //this.scrubber.addEventListener( "mousedown", this.updateCenter.bind( this ) );
        //this.shadowScrubber.addEventListener( "mousedown", this.updateCenter.bind( this ) );
        //this.addEventListener( "mouseup", this.scrubFire.bind( this ));
        //this.addEventListener( "mousemove", this.triggerMove.bind( this ) );
        //
        //// touch events
        ////this.playBtn.addEventListener( "tap", this.handleEvents.bind( this ) );
        //this.scrubber.addEventListener( "touchstart", this.updateCenter.bind( this ) );
        //this.shadowScrubber.addEventListener( "touchstart", this.updateCenter.bind( this ) );
        //this.addEventListener( "touchend", this.scrubFire.bind( this ));
        //this.addEventListener( "touchmove", this.triggerMove.bind( this ) );

        // init events
        this.updateScrub();

        // setup interval
        // only if playing
        this.intervalId = setInterval( this.updateScrub.bind( this ), 500 );

        // attach play/pause/stop event handlers
        playerService.emitter.on( "update", this.playerServiceEventHandler );
      },
      detached: function() {
        this.playBtn.removeEventListener( "click", this.handler.swapIcon );
        this.scrubber.removeEventListener( "mousedown", this.handler.updateCenter );
        this.shadowScrubber.removeEventListener( "mousedown", this.handler.updateCenter );
        this.removeEventListener( "mouseup", this.handler.scrubFire );
        this.removeEventListener( "mousemove", this.handler.triggerMove );

        // touch events
        this.playBtn.removeEventListener( "tap", this.handler.swapIcon );
        this.scrubber.removeEventListener( "touchstart", this.handler.updateCenter );
        this.shadowScrubber.removeEventListener( "touchstart", this.handler.updateCenter );
        this.removeEventListener( "touchend", this.handler.scrubFire );
        this.removeEventListener( "touchmove", this.handler.triggerMove );

        clearInterval( this.intervalId );

        // remove play/pause/stop event handlers
        playerService.emitter.off( "update", this.playerServiceEventHandler );
      },
      attributeChanged: function( attrName, oldVal, newVal ) {
        if ( attrName = "value" ) {
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
      handleEvents: function( event ) {
        var self = this,
          tempId = event.target.getAttribute( "id" );

        if ( event.type === "click" ||  event.type === "tap" && tempId === "play-icon" ) {
          this.swapIcon();
          this.playSong();
          this.updateScrub();

          //setInterval(function() {
          //  self.updateScrub();
          //}, 1000);
        }
      },
      playSong: function() {
        // Playing same song causes pause or resume
        if ( playerService.isPlaying ) {
          return playerService.pause();
        }

        if ( playerService.isPaused ) {
          playerService.play();
        }
      },
      updateScrub: function() {
        this.value = playerService.currentTime;
        var degPercent = parseInt( playerService.currentTime / playerService.trackLength * 360, 10 ),
          rotation = "rotate(" + ( degPercent - 90 ) + "deg)";

        //console.log( "this.value", this.value );

        this.scrubber.style.webkitTransform = rotation;
        this.scrubber.style.transform = rotation;

        this.shadowScrubber.style.webkitTransform = rotation;
        this.shadowScrubber.style.transform = rotation;

        this.front.style[ "stroke-dashoffset" ] = ( ( ( -1 * ( degPercent - 90 ) * this.circFront ) / 360 ) - ( this.circFront * 1.25 ) ) + "%";
        this.mid.style[ "stroke-dashoffset" ] = ( ( ( -1 * ( degPercent - 90 ) * this.circMid ) / 360 ) - ( this.circMid * 1.25 ) ) + "%";

        this.formattedValue = this.value;
        this.formattedMax = this.max;
        this.$["song-timer"].innerText = playerService.formattedTimeDisplay;
      },
      // To be removed once integrated with player service
      formatTime: function( time ) {
        var ss = Math.floor( time % 60 ),
          mm = Math.floor( time / 60 );
        ss = ss < 10 ? "0" + ss : ss;
        mm = mm < 10 ? "0" + mm : mm;

        return mm + ":" + ss;
      },
      swapIcon: function() {
        if ( playerService.isPaused ) {
          this.playIcon.setAttribute( "name", "pause" );
        }

        if ( playerService.isPlaying ) {
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
  });
})( window.Polymer );
