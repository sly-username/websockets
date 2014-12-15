( function( Polymer ) {
  "use strict";

  Polymer( "progress-bar", {

    /*** PROPERTIES ***/
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
    get pbVal() {
      return this._pbVal;
    },
    set pbVal( value ) {
      return ( this._pbVal = value );
    },
    // bar directions
    get barDirection() {
      return this._barDirection;
    },
    set barDirection( value ) {
      this.attributes.direction.value = value;

      return ( this._barDirection = value );
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
      if ( this.progressValue < this.progressMax ) {
        this.pbVal = Math.round( ( this.progressValue * 100 ) / ( this.progressMax ) );
      } else {
        alert( " Value is larger than Max " );
      }
      this.innerBar.style.width = this._pbVal + "%" ;

      // showValue if show-value exists
      // todo better optimize showValue code
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
    }

    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
