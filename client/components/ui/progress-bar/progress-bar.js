( function( Polymer ) {
  "use strict";

  Polymer( "progress-bar", {

    /*** PROPERTIES ***/
    // max value
    get max() {
      return this._max;
    },
    set max( value ) {
      this.setAttribute( "max", value );

      if ( value !== undefined ) {
        return ( this._max = value );
      } else {
        return ( this._max = 100 );
      }
    },
    // show value
    get showValue() {
      return this._showValue;
    },
    set showValue( value ) {
      this.setAttribute( "show-value", value );

      return ( this._showValue = value );
    },
    // percentage
    get progressBarVal() {
      return this._progressBarVal;
    },
    set progressBarVal( value ) {
      return ( this._progressBarVal = value );
    },
    /*** END PROPERTIES ***/
    /*** LIFECYCLE ***/
    ready: function() {
      this.innerBar = this.shadowRoot.getElementsByClassName( "inner-bar" )[0];

      // value
      this.value = parseInt( this.attributes.value.value );

      // text display
      this.currentText = this.shadowRoot.getElementsByClassName( "current-text" )[0];
      this.maxText = this.shadowRoot.getElementsByClassName( "max-text" )[0];
      this.progressDisplay = this.shadowRoot.getElementsByClassName( "progress-display" )[0];

      // checks if attribute is an integer and sets Max
      if ( this.attributes.max ) {
        this.max = parseInt( this.attributes.max.value ) && typeof parseInt( this.attributes.max.value ) == "number" ? parseInt( this.attributes.max.value ) : 100;
      } else {
        this.max = 100;
      }
      // percentage conversion
      if ( parseInt( this.value ) < parseInt( this.max ) ) {
        this.progressBarVal = Math.round( ( this.value * 100 ) / ( this.max ) );
      } else {
        alert( " Value is larger than Max " );
      }
      this.innerBar.style.width = this._progressBarVal + "%" ;

      // showValue if show-value exists
      // todo refactor showValue code
      if ( this.hasAttribute( "show-value" ) ) {
        this.showValue = this.attributes["show-value"].value;
      // if show-value is true of false
        if ( this.showValue === "true" ) {
          this.currentText.style.display = "block";
          this.maxText.style.display = "block";
          this.progressDisplay.style.display = "block";
        } else {
          this.currentText.style.display = "none";
          this.maxText.style.display = "none";
          this.progressDisplay.style.display = "none";
        }
      } else {
        this.currentText.style.display = "block";
        this.maxText.style.display = "block";
        this.progressDisplay.style.display = "block";
      }

      // bar directions
      if ( this.hasAttribute( "direction" ) ) {
        this.direction = this.attributes.direction.value;

        if ( this.direction === "RTL" ) {
          this.innerBar.id = "flipBar";
          this.currentText.id = "flipTextRight";
          this.progressDisplay.id = "flipTextRight";
          this.maxText.id = "flipTextLeft";
        }
      }

      // animation
      if ( this.hasAttribute( "animation" ) ) {
        this.animation = this.attributes.animation.value;

        if ( this.animation === "bars" ) {
          this.innerBar.classList.add( "addBarAnimation" );
        } else if ( this.animation === "pulse" ) {
          this.innerBar.classList.add( "addPulseAnimation" );
        }
      }
    },
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/

    valueChanged: function( oldVal, newVal ) {
      if ( !isNaN( newVal ) ) {
        this.value = newVal;
        this.setAttribute( "value", newVal );

        if ( parseInt( this.value ) <= parseInt( this.max ) ) {
          this.progressBarVal = Math.round( ( this.value * 100 ) / ( this.max ) );
        } else {
          alert( " Value is larger than Max " );
        }
        this.innerBar.style.width = this._progressBarVal + "%";
      } else {
        alert( "that isn't a number" );
        this.setAttribute( "value", 0 );
        this.setAttribute( "max", 100 );
      }
    },
    maxChanged: function( oldVal, newVal ) {
      if ( !isNaN( newVal ) ) {
        this.max = newVal;
        this.setAttribute( "max", newVal );

        if ( parseInt( this.value ) <= parseInt( this.max ) ) {
          this.progressBarVal = Math.round( ( this.value * 100 ) / ( this.max ) );
        } else {
          alert( " Value is larger than Max " );
        }
        this.innerBar.style.width = this._progressBarVal + "%";
      } else {
        alert( "that isn't a number" );
        this.setAttribute( "value", 0 );
        this.setAttribute( "max", 100 );
      }
    },

    directionChanged: function( oldVal, newVal ) {
      this.innerBar.removeAttribute( "id" );
      this.currentText.removeAttribute( "id" );
      this.progressDisplay.removeAttribute( "id" );
      this.maxText.removeAttribute( "id" );
      this.direction = newVal;
      this.setAttribute( "direction", newVal );

      if ( this.direction === "RTL" ) {
        this.innerBar.id = "flipBar";
        this.currentText.id = "flipTextRight";
        this.progressDisplay.id = "flipTextRight";
        this.maxText.id = "flipTextLeft";
      }
    },
    animationChanged: function( oldVal, newVal ) {
      this.animation = newVal;
      this.setAttribute( "animation", newVal );

      if ( this.animation === "bars" ) {
        this.innerBar.classList.remove( "addPulseAnimation" );
        this.innerBar.classList.add( "addBarAnimation" );
      } else if ( this.animation === "pulse" ) {
        this.innerBar.classList.remove( "addBarAnimation" );
        this.innerBar.classList.add( "addPulseAnimation" );
      }
    },
    _showValueChanged: function( oldVal, newVal ) {
      this._showValue = newVal;
      this.setAttribute( "show-value", newVal );

      if ( this._showValue === "true" ) {
        this.currentText.style.display = "block";
        this.maxText.style.display = "block";
        this.progressDisplay.style.display = "block";
      } else {
        this.currentText.style.display = "none";
        this.maxText.style.display = "none";
        this.progressDisplay.style.display = "none";
      }
    },

    // todo refactor attribute change to valueChange
    attributeChanged: function( attrName, oldVal, newVal ) {
      switch ( attrName ) {
        case "show-value":
          this._showValue = newVal;

          if ( this._showValue === "true" ) {
            this.currentText.style.display = "block";
            this.maxText.style.display = "block";
            this.progressDisplay.style.display = "block";
          } else {
            this.currentText.style.display = "none";
            this.maxText.style.display = "none";
            this.progressDisplay.style.display = "none";
          }
          break;
        default:
          // do nothing
          break;
      }
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
