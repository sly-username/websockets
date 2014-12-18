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

      // checks if attribute is an integer and sets Max
      if ( this.attributes.max ) {
        this.max = parseInt( this.attributes.max.value, 10 ) && typeof parseInt( this.attributes.max.value, 10 ) === "number" ? parseInt( this.attributes.max.value, 10 ) : 100;
      } else {
        this.max = 100;
      }
      // percentage conversion
      if ( parseInt( this.value, 10 ) < parseInt( this.max, 10 ) ) {
        this.valuePercentage = Math.round( ( this.value * 100 ) / this.max );
      }
      this.innerBar.style.width = this._valuePercentage + "%";
      // showValue
      if ( this.hasAttribute( "show-value" ) ) {
        this.showValue = this.attributes["show-value"].value;
      }

      // animation
      if ( this.hasAttribute( "animation" ) ) {
        this.animation = this.attributes.animation.value;
      }
    },
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/

    valueChanged: function( oldVal, newVal ) {
      this.updateRange( "value", newVal );
    },
    maxChanged: function( oldVal, newVal ) {
      this.updateRange( "max", newVal );
    },
    updateRange: function( property, newVal ) {
      this[property] = newVal;
      this.setAttribute( property, newVal );

      if ( parseInt( this.value, 10 ) <= parseInt( this.max, 10 ) ) {
        this.valuePercentage = Math.round( ( this.value * 100 ) / this.max  );
      }
      this.innerBar.style.width = this._valuePercentage + "%";
    },

    directionChanged: function( oldVal, newVal ) {
      this.direction = newVal;
      this.setAttribute( "direction", newVal );

      if ( this.hasAttribute( "direction" ) ) {
        this.direction = this.attributes.direction.value;
      }
    },
    animationChanged: function( oldVal, newVal ) {
      this.animation = newVal;
      this.setAttribute( "animation", newVal );
    },

    attributeChanged: function( attrName, oldVal, newVal ) {
      switch ( attrName ) {
        case "show-value":
          this._showValue = newVal;
          break;
        default:
          // do nothing
          break;
      }
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
