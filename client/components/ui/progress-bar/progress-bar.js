( function( Polymer ) {
  "use strict";

  Polymer( "progress-bar", {

    /*** PROPERTIES ***/
    // show value
    get showValue() {
      return this._showValue;
    },
    set showValue( value ) {
      this.setAttribute( "show-value", value );

      return ( this._showValue = value );
    },
    // percentage
    get valuePercentage() {
      return this._valuePercentage;
    },
    set valuePercentage( value ) {
      return ( this._valuePercentage = value );
    },
    /*** END PROPERTIES ***/
    /*** LIFECYCLE ***/
    ready: function() {
      this.innerBar = this.shadowRoot.getElementsByClassName( "inner-bar" )[0];

      // value
      this.value = parseInt( this.attributes.value.value, 10 );

      // text display
      this.currentText = this.shadowRoot.getElementsByClassName( "current-text" )[0];
      this.maxText = this.shadowRoot.getElementsByClassName( "max-text" )[0];
      this.progressDisplay = this.shadowRoot.getElementsByClassName( "progress-display" )[0];
      this.progressNumbers = this.shadowRoot.getElementsByClassName( "progress-numbers" );

      // checks if attribute is an integer and sets Max
      if ( this.attributes.max ) {
        this.max = parseInt( this.attributes.max.value, 10 ) && typeof parseInt( this.attributes.max.value, 10 ) == "number" ? parseInt( this.attributes.max.value ) : 100;
      } else {
        this.max = 100;
      }
      // percentage conversion
      if ( parseInt( this.value, 10 ) < parseInt( this.max, 10 ) ) {
        this.valuePercentage = Math.round( ( this.value * 100 ) / this.max );
      }
      this.innerBar.style.width = this._valuePercentage + "%" ;

      // showValue
      for ( var i = 0; i < this.progressNumbers.length; i++ ) {
        if ( this.hasAttribute( "show-value" ) ) {
          this.showValue = this.attributes["show-value"].value;
          // if show-value is true or false
          if ( this.showValue === "true" ) {
            this.progressNumbers[i].classList.add( "visibility" );
          } else {
            this.progressNumbers[i].classList.add( "no-visibility" );
          }
        } else {
          this.progressNumbers[i].classList.add( "visibility" );
        }
      }

      // bar directions
      if ( this.hasAttribute( "direction" ) ) {
        this.direction = this.attributes.direction.value;

        if ( this.direction === "RTL" ) {
          this.innerBar.classList.remove( "inner-float" );
          this.innerBar.classList.add( "flipBar" );
          this.currentText.classList.add( "flipTextRight" );
          this.progressDisplay.classList.add( "flipTextRight" );
          this.maxText.classList.remove( "max-text" );
          this.maxText.classList.add( "flipTextLeft" );
        }
      }

      // animation
      if ( this.hasAttribute( "animation" ) ) {
        this.animation = this.attributes.animation.value;

        if ( this.animation === "bars" ) {
          this.innerBar.classList.add( "bar-animation" );
        } else if ( this.animation === "pulse" ) {
          this.innerBar.classList.add( "pulse-animation" );
        }
      }
    },
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/

    valueChanged: function( oldVal, newVal ) {
      this.value = newVal;
      this.setAttribute( "value", newVal );

      if ( parseInt( this.value, 10 ) <= parseInt( this.max, 10 ) ) {
        this.valuePercentage = Math.round( ( this.value * 100 ) /  this.max  );
      }
      this.innerBar.style.width = this._valuePercentage + "%";
    },
    maxChanged: function( oldVal, newVal ) {
      this.max = newVal;
      this.setAttribute( "max", newVal );

      if ( parseInt( this.value, 10 ) <= parseInt( this.max, 10 ) ) {
        this.valuePercentage = Math.round( ( this.value * 100 ) / this.max );
      }
      this.innerBar.style.width = this._valuePercentage + "%";
    },

    directionChanged: function( oldVal, newVal ) {
      this.direction = newVal;
      this.setAttribute( "direction", newVal );

      if ( this.hasAttribute( "direction" ) ) {
        this.direction = this.attributes.direction.value;

        if ( this.direction === "RTL" ) {
          this.innerBar.classList.remove( "inner-float" );
          this.maxText.classList.remove( "max-text" );
          this.innerBar.classList.add( "flipBar" );
          this.currentText.classList.add( "flipTextRight" );
          this.progressDisplay.classList.add( "flipTextRight" );
          this.maxText.classList.add( "flipTextLeft" );
        } else if ( this.direction === "LTR" ) {
          this.innerBar.classList.add( "inner-float" );
          this.maxText.classList.add( "max-text" );
          this.innerBar.classList.remove( "flipBar" );
          this.currentText.classList.remove( "flipTextRight" );
          this.progressDisplay.classList.remove( "flipTextRight" );
          this.maxText.classList.remove( "flipTextLeft" );
        }
      }
    },
    animationChanged: function( oldVal, newVal ) {
      this.animation = newVal;
      this.setAttribute( "animation", newVal );

      if ( this.animation === "bars" ) {
        this.innerBar.classList.remove( "pulse-animation" );
        this.innerBar.classList.add( "bar-animation" );
      } else if ( this.animation === "pulse" ) {
        this.innerBar.classList.remove( "bar-animation" );
        this.innerBar.classList.add( "pulse-animation" );
      }
    },

    // todo refactor attribute change to valueChange
    attributeChanged: function( attrName, oldVal, newVal ) {
      switch ( attrName ) {
        case "show-value":
          this.showValue = newVal;

          for ( var i = 0; i < this.progressNumbers.length; i++ ) {
            if ( this.hasAttribute( "show-value" ) ) {
              this.showValue = this.attributes["show-value"].value;
              // if show-value is true or false
              if ( this.showValue === "true" ) {
                this.progressNumbers[i].classList.remove( "no-visibility" );
                this.progressNumbers[i].classList.add( "visibility" );
              } else {
                this.progressNumbers[i].classList.remove( "visibility" );
                this.progressNumbers[i].classList.add( "no-visibility" );
              }
            } else {
              this.progressNumbers[i].classList.remove( "no-visibility" );
              this.progressNumbers[i].classList.add( "visibility" );
            }
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
