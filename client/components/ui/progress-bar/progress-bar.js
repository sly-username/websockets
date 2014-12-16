( function( Polymer ) {
  "use strict";

  Polymer( "progress-bar", {

    /*** PROPERTIES ***/
    // todo refactor for setAttribute
    // current value
    get progressValue() {
      return this._progressValue;
    },
    set progressValue( value ) {
      this.attributes.value.value = value;

      return ( this._progressValue = value );
    },
    // max value
    get progressMax() {
      return this._progressMax;
    },
    set progressMax( value ) {
      if ( this.attributes.max ) {
        this.attributes.max.value = value;

        return ( this._progressMax = value );
      } else {
        return ( this._progressMax = 100 );
      }
    },
    // show value
    get showValue() {
      return this._showValue;
    },
    set showValue( value ) {
      this.attributes["show-value"].value = value;

      return ( this._showValue = value );
    },
    // percentage
    get progressBarVal() {
      return this._progressBarVal;
    },
    set progressBarVal( value ) {
      return ( this._progressBarVal = value );
    },
    // bar directions
    get barDirection() {
      return this._barDirection;
    },
    set barDirection( value ) {
      this.attributes.direction.value = value;

      return ( this._barDirection = value );
    },
    // animation
    get barAnimate() {
      return this._barAnimate;
    },
    set barAnimate( value ) {
      this.attributes.animation.value = value;

      return ( this._barAnimate = value );
    },
    /*** END PROPERTIES ***/
    /*** LIFECYCLE ***/
    ready: function() {
      this.innerBar = this.shadowRoot.getElementsByClassName( "inner-bar" )[0];

      // value
      this.progressValue = parseInt( this.attributes.value.value );

      // text display
      this.currentText = this.shadowRoot.getElementsByClassName( "current-text" )[0];
      this.maxText = this.shadowRoot.getElementsByClassName( "max-text" )[0];
      this.progressDisplay = this.shadowRoot.getElementsByClassName( "progress-display" )[0];

      // checks if attribute is an integer and sets Max
      if ( this.attributes.max ) {
        this.progressMax = parseInt( this.attributes.max.value ) && typeof parseInt( this.attributes.max.value ) == "number" ? parseInt( this.attributes.max.value ) : 100;
      } else {
        this.progressMax = 100;
      }
      // percentage conversion
      if ( parseInt( this.progressValue ) < parseInt( this.progressMax ) ) {
        this.progressBarVal = Math.round( ( this.progressValue * 100 ) / ( this.progressMax ) );
      } else {
        alert( " Value is larger than Max " );
      }
      this.innerBar.style.width = this._progressBarVal + "%" ;

      // showValue if show-value exists
      // todo refactor showValue code
      if ( this.hasAttribute( "show-value" ) ) {
        this.showValue = this.attributes["show-value"].value;
      // if show-value is true of false
        if ( this._showValue === "true" ) {
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
        this.barDirection = this.attributes.direction.value;

        if ( this.barDirection === "RTL" ) {
          this.innerBar.id = "flipBar";
          this.currentText.id = "flipTextRight";
          this.progressDisplay.id = "flipTextRight";
          this.maxText.id = "flipTextLeft";
        }
      }

      // animation
      if ( this.hasAttribute( "animation" ) ) {
        this.barAnimate = this.attributes.animation.value;

        if ( this.barAnimate === "bars" ) {
          this.innerBar.classList.add( "addBarAnimation" );
        } else if ( this.barAnimate === "pulse" ) {
          this.innerBar.classList.add( "addPulseAnimation" );
        }
      }
    },

    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
    // todo refactor attribute changed
    attributeChanged: function( attrName, oldVal, newVal ) {
      switch ( attrName ) {
        case "value":
          this.progressValue = newVal;

          if ( parseInt( this.progressValue ) < parseInt( this.progressMax ) ) {
            this.progressBarVal = Math.round( ( this.progressValue * 100 ) / ( this.progressMax ) );
          } else {
            alert( " Value is larger than Max " );
          }
          this.innerBar.style.width = this._progressBarVal + "%" ;
          break;
        case "max":
          this.progressMax = newVal;

          if ( parseInt( this.progressValue ) < parseInt( this.progressMax ) ) {
            this.progressBarVal = Math.round( ( this.progressValue * 100 ) / ( this.progressMax ) );
          } else {
            alert( " Value is larger than Max " );
          }
          this.innerBar.style.width = this._progressBarVal + "%" ;
          break;
        case "animation":
          this.barAnimate = newVal;

          if ( this.barAnimate === "bars" ) {
            this.innerBar.classList.remove( "addPulseAnimation" );
            this.innerBar.classList.add( "addBarAnimation" );
          } else if ( this.barAnimate === "pulse" ) {
            this.innerBar.classList.remove( "addBarAnimation" );
            this.innerBar.classList.add( "addPulseAnimation" );
          }
          break;
        case "direction":
          this.barDirection = newVal;

          if ( this.barDirection === "RTL" ) {
            this.innerBar.id = "flipBar";
            this.currentText.id = "flipTextRight";
            this.progressDisplay.id = "flipTextRight";
            this.maxText.id = "flipTextLeft";
          }
          break;
        case "show-value":
          this.showValue = newVal;

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
