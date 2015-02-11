( function( Polymer ) {
  "use strict";

  Polymer( "progress-bar", {
    publish: {
      value: {
        value: 0,
        reflect: true
      },
      animation: {
        reflect: true
      },
      max: {
        value: 1,
        reflect: true
      },
      direction: {
        value: "RTL",
        reflect: true
      }
    },
    /*** PROPERTIES ***/
    // show value
    get showValue() {
      return this._showValue;
    },
    set showValue( value ) {
      this.setAttribute( "show-value", value );
      this._showValue = value;
      return value;
    },
    // percentage
    get valuePercentage() {
      return this._valuePercentage;
    },
    set valuePercentage( value ) {
      this._valuePercentage = value;
      return value;
    },
    /*** END PROPERTIES ***/
    /*** LIFECYCLE ***/
    ready: function() {
      this.innerBar = this.shadowRoot.getElementsByClassName( "inner-bar" )[ 0 ];
      this.currentText = this.shadowRoot.getElementsByClassName( "current-text" )[ 0 ];
      this.maxText = this.shadowRoot.getElementsByClassName( "max-text" )[ 0 ];
      this.progressDisplay = this.shadowRoot.getElementsByClassName( "progress-display" )[ 0 ];
      this.valuePercentage = Math.round( this.value * 100 ) / this.max;
      this.innerBar.style.width = this._valuePercentage + "%";

      // showValue
      if ( this.hasAttribute( "show-value" ) ) {
        this.showValue = this.attributes[ "show-value" ].value;
      }

      // animation
      if ( this.hasAttribute( "animation" ) ) {
        this.animation = this.attributes.animation.value;
      }
    },
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/

    attributeChanged: function( attrName, oldVal, newVal ) {
      console.log( "attributeChanged", oldVal, newVal );

      if ( newVal == null && ( /^(value|max|direction)/ ).test( attrName ) ) {
        console.log( "hit" );
        this[attrName] = this.publish[attrName].value;
        return;
      }
    },
    valueChanged: function( oldValue, newValue ) {
      if ( newValue == null ) {
        console.log( "valueChanged" );
        this.value = this.publish.value.value;
      }
    },
    maxChanged: function( oldValue, newValue ) {
      if ( newValue == null || newValue < 1 ) {
        console.log( "maxChanged" );
        this.max = this.publish.max.value;
      }
    },
    directionChanged: function( oldValue, newValue ) {
      if ( (/^(RTL|LTR)$/).test( newValue ) ) {
        console.log( "directionChanged" );
        this.direction = this.publish.direction.value;
      }
    }

//    updateRange: function( property, newVal ) {
//      console.log( "proptery changed", property, newVal );
//      this[ property ] = newVal;
//
//      if ( parseInt( this.value, 10 ) <= parseInt( this.max, 10 ) ) {
//        this.valuePercentage = Math.round( this.value * 100 ) / this.max;
//      }
//      this.innerBar.style.width = this._valuePercentage + "%";
//    },

//    attributeChanged: function( attrName, oldVal, newVal ) {
//      switch ( attrName ) {
//        case "show-value":
//          this._showValue = newVal;
//          break;
//        case "direction":
//          this.setAttribute( "direction", newVal );
//
//          if ( this.hasAttribute( "direction" ) ) {
//            this.direction = this.attributes.direction.value;
//          }
//          break;
//        case "max":
//          this.updateRange( "max", newVal );
//          break;
//        case "value":
//          this.updateRange( "value", newVal );
//          console.log( "attribute Changed", newVal );
//          break;
//        case "animation":
//          this.setAttribute( "animation", newVal );
//          break;
//        default:
//          // do nothing
//          break;
//      }
//    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
